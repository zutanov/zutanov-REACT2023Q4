import styles from '../styles/notFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2>404 Not Found</h2>
      <p>Sorry, page does not exist</p>
    </div>
  );
};

export default NotFound;
