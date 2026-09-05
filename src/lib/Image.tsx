import React from 'react';

export default function Image({
  src,
  alt = '',
  width,
  height,
  className = '',
  fill,
  sizes,
  priority,
  ...props
}: any) {
  const style = fill
    ? {
        position: 'absolute' as const,
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'contain' as const,
        ...props.style,
      }
    : props.style;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      style={style}
      {...props}
    />
  );
}
