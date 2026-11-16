// apps/frontend/src/components/ui/dropzone.tsx
'use client';

import * as React from 'react';
import { ScanIcon, CheckIcon, CloseIcon } from '../icons/index';

export interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  isProcessing?: boolean;
  statusText?: string;
  error?: string;
  previewUrl?: string | null;
  onClear?: () => void;
  className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelect,
  accept = 'image/png, image/jpeg, image/webp',
  isProcessing = false,
  statusText,
  error,
  previewUrl,
  onClear,
  className = '',
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {previewUrl ? (
        <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden border border-line bg-surface flex items-center justify-center">
          <img src={previewUrl} alt="Upload preview" className="object-contain w-full h-full" />
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black"
              aria-label="Remove image"
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`w-full p-8 rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-state select-none ${
            isDragOver
              ? 'border-volt bg-volt/5'
              : error
              ? 'border-risk bg-risk/5'
              : 'border-line hover:border-line-strong bg-surface'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-text-2 mb-3">
            <ScanIcon size={24} />
          </div>

          <span className="text-[15px] font-bold uppercase tracking-tight text-white">
            Upload App Transfer Screenshot
          </span>
          <span className="text-[12px] text-text-3 mt-1">
            Drag and drop or tap to browse (PNG, JPEG, WebP up to 10MB)
          </span>
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center gap-2 p-3 bg-surface-2 rounded-[8px] border border-line">
          <span className="w-4 h-4 border-2 border-volt border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-[13px] font-mono text-volt animate-pulse">
            {statusText || 'Extracting booking reference with OCR...'}
          </span>
        </div>
      )}

      {error && (
        <span className="text-[12px] font-medium text-risk">{error}</span>
      )}
    </div>
  );
};
