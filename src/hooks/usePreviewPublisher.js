import React, { useState, useRef, useCallback, useContext } from 'react';

export default function usePreviewPublisher() {
  let previewPublisher = useRef();

  const MP = window.MP;

  const createPreview = useCallback(
    async (targetEl, publisherOptions) => {
      try {
        const publisherProperties = Object.assign({}, publisherOptions);
        console.log('[createPreview]', publisherProperties);
        previewPublisher.current = new MP.PreviewPublisher(targetEl);
        await previewPublisher.current.previewMedia({
          targetElement: targetEl,
          publisherProperties,
        });
        console.log('[Preview Created] - ', previewPublisher);
      } catch (err) {
        console.log('[createPreview]', err);
      }
    },
    [MP.PreviewPublisher]
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
