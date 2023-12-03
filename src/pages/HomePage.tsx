import { useAppSelector } from '../store/storeTypes';
import './homePage.scss';

const HomePage = () => {
  const { base64HookImage, base64Image, formHookData, formData } =
    useAppSelector((state) => state.form);

  return (
    <div className="home">
      <h1>HomePage</h1>
      <div className="home__wrapper">
        <div className="home__desc">
          <p className="home__desc-title"></p>
          <p className="home__desc-title">
            <b>Name</b>
          </p>
          <p className="home__desc-title">
            <b>Age</b>
          </p>
          <p className="home__desc-title">
            <b>Email</b>
          </p>
          <p className="home__desc-title">
            <b>Gender</b>
          </p>
          <p className="home__desc-title">
            <b>Country</b>
          </p>
        </div>
        <div className="home__form">
          {formData.name && (
            <>
              <div className="home__desc-image">
                <img
                  src={base64Image || ''}
                  width={250}
                  height={250}
                  alt="avatar"
                />
              </div>
              <p className="home__desc-title">{formData.name}</p>
              <p className="home__desc-title">{formData.age}</p>
              <p className="home__desc-title">{formData.email}</p>
              <p className="home__desc-title">{formData.gender as string}</p>
              <p className="home__desc-title">{formData.country}</p>
            </>
          )}
        </div>
        <div className="home__form">
          {formHookData.name && (
            <>
              <div className="home__desc-image">
                <img
                  src={base64HookImage || ''}
                  width={250}
                  height={250}
                  alt="avatar"
                />
              </div>
              <p className="home__desc-title">{formHookData.name}</p>
              <p className="home__desc-title">{formHookData.age}</p>
              <p className="home__desc-title">{formHookData.email}</p>
              <p className="home__desc-title">
                {formHookData.gender as string}
              </p>
              <p className="home__desc-title">{formHookData.country}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
