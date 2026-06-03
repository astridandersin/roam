"use client";

import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Rendered when the boundary catches an error. */
  fallback: ReactNode;
  /** Optional callback invoked once with the caught error. */
  onError?: (error: unknown) => void;
};

type State = { hasError: boolean };

/**
 * Generic React error boundary. Used around the WebGL Globe so a failed
 * `THREE.WebGLRenderer` (sandboxed iframe, context-limit exhaustion, GPU
 * driver crash, etc.) doesn't propagate into the rest of the page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
