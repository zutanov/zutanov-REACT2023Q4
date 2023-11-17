import loader from '../../assets/loader.png';
import './loader.scss';

export const Loader = () => {
  return (
    <div className="loader">
      <img className="loader__img" src={loader} alt="loader" />
    </div>
  );
};
