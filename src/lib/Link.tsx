import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Link({
  href,
  to,
  children,
  className,
  onClick,
  target,
  rel,
  ...props
}: any) {
  const destination = to || href || '/';
  const isExternal =
    typeof destination === 'string' &&
    (destination.startsWith('http://') ||
      destination.startsWith('https://') ||
      destination.startsWith('mailto:') ||
      destination.startsWith('tel:'));

  if (isExternal) {
    return (
      <a
        href={destination}
        className={className}
        onClick={onClick}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={destination} className={className} onClick={onClick} {...props}>
      {children}
    </RouterLink>
  );
}
