'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.FallbackComponent) {
        return (
          <this.props.FallbackComponent
            error={this.state.error!}
            resetErrorBoundary={this.resetErrorBoundary}
          />
        );
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-xl font-space text-purple-500">Oops! Something went wrong</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We encountered an error while loading the simulation. Please try refreshing the page.
            </p>
            <button
              onClick={this.resetErrorBoundary}
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-500 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 