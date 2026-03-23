"use client";

import type { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";

function Fallback({
  error,
  resetErrorBoundary,
  moduleName,
  ...props
}: any): ReactElement | null {
  if (props) {
    console.error("ModuleErrorBoundary", moduleName, error);
  }

  return null;
}

export function ModuleErrorBoundary({
  children,
  moduleName,
  ...props
}: any): ReactElement {
  return (
    <ErrorBoundary
      {...props}
      FallbackComponent={(fbProps) => (
        <Fallback moduleName={moduleName} {...fbProps} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
