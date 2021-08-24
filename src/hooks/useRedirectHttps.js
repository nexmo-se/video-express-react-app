import React from 'react';

export default function useRedirectHttps() {
  const redirectHttps = React.useCallback(() => {
    const url = window.location.href;
    if (
      url.toString().indexOf('http://') === 0 &&
      url.toString().indexOf('http://localhost') !== 0
    ) {
      window.location.href = window.location.href
        .toString()
        .replace('http://', 'https://');
    }
  }, []);

  return {
    redirectHttps
  };
}
