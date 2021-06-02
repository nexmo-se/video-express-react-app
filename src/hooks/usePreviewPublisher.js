import React, { useState, useRef, useCallback } from 'react';
const MP = window.MP;

export default function usePreviewPublisher() {
  let previewPublisher = useRef(null);

  const createPreview = useCallback(
    async (targetEl) => {
      try {
        previewPublisher.current = new MP.PreviewPublisher(targetEl);
        await previewPublisher.current.previewMedia({
          targetElement: targetEl,
        });
        console.log('[Preview Created] - ', previewPublisher);
      } catch (err) {
        console.log('[createPreview]', err);
      }
    },
    []
  );

  const destroyPreview = useCallback(() => {
    if (previewPublisher && previewPublisher.current) {
      previewPublisher.current.destroyPreviewPublisher();
      console.log('[destroyPreview] - ', previewPublisher);
    }
  }, []);

  return {
    previewPublisher: previewPublisher.current,
    createPreview,
    destroyPreview,
  };
}
