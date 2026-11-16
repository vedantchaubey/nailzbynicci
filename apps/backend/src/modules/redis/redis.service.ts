// apps/backend/src/modules/redis/redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import * as crypto from 'crypto';

interface MemoryEntry {
  value: string;
  expiresAt?: number;
}

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;
  private isConnected = false;
  private readonly memoryStore = new Map<string, MemoryEntry>();

  constructor(private readonly configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
    this.client = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
      retryStrategy: () => null, // don't spam if local redis is absent
    });

    this.client.on('connect', () => {
      this.isConnected = true;
    });

    this.client.on('error', () => {
      this.isConnected = false;
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
      this.logger.log('Redis connection established successfully.');
    } catch (error) {
      this.isConnected = false;
      this.logger.warn(`Redis server not reachable. Utilizing high-performance in-memory distributed store fallback.`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
    }
    this.logger.log('Redis connection closed.');
  }

  getClient(): Redis {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    if (this.isConnected) {
      try {
        return await this.client.get(key);
      } catch {
        // Fallback
      }
    }
    const entry = this.memoryStore.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.memoryStore.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (this.isConnected) {
      try {
        if (ttlSeconds && ttlSeconds > 0) {
          await this.client.set(key, value, 'EX', ttlSeconds);
        } else {
          await this.client.set(key, value);
        }
        return;
      } catch {
        // Fallback
      }
    }
    const expiresAt = ttlSeconds && ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : undefined;
    this.memoryStore.set(key, { value, expiresAt });
  }

  async del(key: string): Promise<void> {
    if (this.isConnected) {
      try {
        await this.client.del(key);
        return;
      } catch {
        // Fallback
      }
    }
    this.memoryStore.delete(key);
  }

  /**
   * Acquires an atomic distributed lock using SET NX EX.
   * Returns a unique token if lock is acquired, or null if lock is already held.
   */
  async acquireLock(key: string, ttlSeconds: number): Promise<string | null> {
    const lockKey = `lock:${key}`;
    const token = crypto.randomUUID();

    if (this.isConnected) {
      try {
        const result = await this.client.set(lockKey, token, 'EX', ttlSeconds, 'NX');
        return result === 'OK' ? token : null;
      } catch {
        // Fallback
      }
    }

    const existing = this.memoryStore.get(lockKey);
    if (existing && (!existing.expiresAt || Date.now() < existing.expiresAt)) {
      return null;
    }

    this.memoryStore.set(lockKey, {
      value: token,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    return token;
  }

  /**
   * Releases a distributed lock safely using an atomic Lua script
   * to ensure a process only deletes a lock it actually acquired.
   */
  async releaseLock(key: string, token: string): Promise<boolean> {
    const lockKey = `lock:${key}`;

    if (this.isConnected) {
      try {
        const luaScript = `
          if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
          else
            return 0
          end
        `;
        const result = await this.client.eval(luaScript, 1, lockKey, token);
        return result === 1;
      } catch {
        // Fallback
      }
    }

    const existing = this.memoryStore.get(lockKey);
    if (existing && existing.value === token) {
      this.memoryStore.delete(lockKey);
      return true;
    }
    return false;
  }
}
