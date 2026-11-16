// apps/frontend/src/components/transfer/screenshot-dropzone.tsx
import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { UploadPurpose } from '@ticketpass/shared';
import { apiClient } from '../../lib/api-client';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface ScreenshotDropzoneProps {
  orderId: string;
  purpose: UploadPurpose;
  title: string;
  description: string;
  onUploadSuccess: (uploadData: { id: string; url: string; ocrText?: string }) => void;
  className?: string;
}

export function ScreenshotDropzone({
  orderId,
  purpose,
  title,
  description,
  onUploadSuccess,
  className,
}: ScreenshotDropzoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedRecord, setUploadedRecord] = useState<{ id: string; url: string; ocrText?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setError(null);

    // Validate size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please take a smaller screenshot.');
      return;
    }

    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
      setError('Please upload a PNG, JPG, or WEBP image.');
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('purpose', purpose);
      formData.append('orderId', orderId);

      const res = await apiClient.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = res.data;
      setUploadedRecord(data);
      onUploadSuccess({
        id: data.id,
        url: data.url,
        ocrText: data.ocrText,
      });
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err?.message || 'Failed to upload screenshot. Please retry.');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadedRecord(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4', className)}>
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-900">{title}</h4>
          {uploadedRecord && (
            <Badge variant="success" className="text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Uploaded &amp; OCR Scanned
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>

      {uploadedRecord ? (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-950">Screenshot Proof Verified</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Replace Image
            </button>
          </div>

          {previewUrl && (
            <div className="relative w-full max-h-48 overflow-hidden rounded-lg border border-emerald-200 bg-black/5">
              <img src={previewUrl} alt="Uploaded Proof" className="w-full h-auto object-contain max-h-48 mx-auto" />
            </div>
          )}

          {uploadedRecord.ocrText && (
            <div className="text-[11px] bg-white/80 p-2.5 rounded-lg border border-emerald-100 font-mono text-gray-700">
              <div className="font-semibold text-emerald-900 mb-1">OCR Analysis Snippet:</div>
              <div className="truncate">{uploadedRecord.ocrText.slice(0, 150)}...</div>
            </div>
          )}
        </div>
      ) : previewUrl ? (
        <div className="space-y-3">
          <div className="relative rounded-xl border border-gray-200 bg-gray-50 overflow-hidden p-2">
            <button
              type="button"
              onClick={handleReset}
              className="absolute top-3 right-3 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors z-10"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={previewUrl} alt="Preview" className="w-full max-h-56 object-contain rounded-lg mx-auto" />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="button"
            variant="primary"
            className="w-full shadow-sm"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Sharp Normalization &amp; OCR...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload &amp; Run OCR Verification
              </>
            )}
          </Button>
        </div>
      ) : (
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 hover:border-brand-400 bg-gray-50/50 hover:bg-brand-50/20 rounded-xl p-6 text-center cursor-pointer transition-all"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
            <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-500">
              <ImageIcon className="w-6 h-6 text-brand-600" />
            </div>
            <div className="text-xs font-semibold text-gray-800">
              Click to select or drag &amp; drop app screenshot
            </div>
            <div className="text-[11px] text-gray-400 mt-1">PNG, JPG, or WEBP up to 5MB</div>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
