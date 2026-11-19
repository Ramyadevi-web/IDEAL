import { useState } from 'react';

/**
 * Image with a graceful fallback: if the file is missing (e.g. infra photos
 * not copied yet) it shows a soft striped box with a label instead of a broken icon.
 */
export default function Img({ src, alt = '', className = '', label, eager = false, ...rest }) {
  const [missing, setMissing] = useState(!src);

  return (
    <div className={`img-box ${missing ? 'img-box--missing' : ''} ${className}`} {...rest}>
      {missing ? (
        <span>{label || alt || 'Add photo'}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}
