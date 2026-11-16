from playwright.sync_api import sync_playwright

def run_scroll_test(page):
    return page.evaluate("""() => {
        return new Promise((resolve) => {
            let frames = 0, longFrames = 0, lastTime = performance.now(), totalJank = 0;
            const startTime = performance.now();
            function countFrame(now) {
                frames++;
                const delta = now - lastTime;
                if (delta > 20) { longFrames++; totalJank += (delta - 16.67); }
                lastTime = now;
                if (frames < 120) requestAnimationFrame(countFrame);
                else resolve({ frames, longFrames, totalJank: Math.round(totalJank), avgFps: Math.round((frames / (now - startTime)) * 1000) });
            }
            requestAnimationFrame(countFrame);
            let scrollY = 0;
            const interval = setInterval(() => {
                scrollY += 35;
                window.scrollTo(0, scrollY);
                if (scrollY > 3000) clearInterval(interval);
            }, 16);
        });
    }""")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3002/', wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # 1. Baseline
    print("1. Baseline:", run_scroll_test(page))
    
    # 2. No backdrop filter on header
    page.evaluate("""() => {
        const header = document.querySelector('header');
        if (header) {
            header.style.backdropFilter = 'none';
            header.style.webkitBackdropFilter = 'none';
        }
    }""")
    print("2. No header blur:", run_scroll_test(page))
    
    # 3. Disable video autoplay in LazyVideoCards
    page.evaluate("""() => {
        document.querySelectorAll('video').forEach(v => {
            v.pause();
            v.removeAttribute('src');
            v.load();
        });
    }""")
    print("3. No videos playing:", run_scroll_test(page))
    
    # 4. Remove petals
    page.evaluate("""() => {
        document.querySelectorAll('.petal').forEach(p => p.remove());
    }""")
    print("4. No petals:", run_scroll_test(page))
    
    # 5. Remove aura elements
    page.evaluate("""() => {
        document.querySelectorAll('[class*="aura-"]').forEach(el => el.remove());
    }""")
    print("5. No auras:", run_scroll_test(page))

    browser.close()
