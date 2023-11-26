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
        <div className={styles.error__left}></div>
        <div className={styles.error__right}>
          <h1 className={styles.error__title}>
            Something Went Wrong! <br />
            Please, reload the page.
          </h1>
          <button
            type="button"
            className={styles.error__btn}
            onClick={() => this.setState({ error: false })}
          >
            Try again?
          </button>
        </div>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
