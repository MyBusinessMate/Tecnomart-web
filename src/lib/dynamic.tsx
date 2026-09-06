import React, { Suspense } from 'react';

export default function dynamic(
  loader: () => Promise<any>,
  options?: {
    ssr?: boolean;
    loading?: () => React.ReactNode;
  }
) {
  const LazyComponent = React.lazy(loader);
  return function DynamicComponent(props: any) {
    return (
      <Suspense fallback={options?.loading ? options.loading() : null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
