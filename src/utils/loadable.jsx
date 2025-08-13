import ErrorBoundary from 'ErrorBoundary';
import { lazy, Suspense } from 'react';
import ProgressBar from 'react-topbar-progress-indicator';

function loadable(importFunc, fallback = <ProgressBar />) {
  const LazyComponent = lazy(importFunc);
  return (props) => (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default loadable;
