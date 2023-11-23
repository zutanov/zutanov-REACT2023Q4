import { Component, ReactNode } from 'react';
import styles from '../../styles/errorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: false,
  };

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  render() {
    return this.state.error ? (
      <div className={styles.error}>
        <h1 className={styles.error__title}>
          Something Went Wrong! Please, <br /> reload the page.
        </h1>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
