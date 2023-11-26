import styles from '../../styles/loader.module.scss';
import loader from '../../public/assets/loader.png';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <img className={styles.loader__img} src={loader.src} alt="loader" />
    </div>
  );
};
