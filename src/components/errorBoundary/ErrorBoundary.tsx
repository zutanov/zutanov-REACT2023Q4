import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: Error) {
    console.log(error);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <h1>Something Went Wrong!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
