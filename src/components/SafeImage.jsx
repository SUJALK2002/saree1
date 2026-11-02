import React, { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/saree-placeholder.svg";

export default function SafeImage({ src, alt, ...props }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <img
      {...props}
      src={hasError ? FALLBACK_IMAGE : src || FALLBACK_IMAGE}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}
