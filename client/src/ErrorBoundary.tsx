import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.debug(errorInfo);
    console.error(error);
  }

  public render() {
    return this.state.hasError ? (
      <div>Oops.. Something went wrong</div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
