"use client";

export default function YouTubePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">YouTube Automation</h1>
      <div className="bg-surface-elevated border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-4xl mb-4">▶</div>
            <div className="text-text-muted">YouTube content pipeline status</div>
            <div className="text-xs text-text-muted mt-2">Videos processed, thumbnails, metadata</div>
          </div>
        </div>
      </div>
    </div>
  );
}
