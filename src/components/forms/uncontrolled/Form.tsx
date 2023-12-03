import { IPerson, personSchema } from '../../../schema/user';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/storeTypes';
import { setCountry } from '../../../store/reducers/countriesSlice';
import { setBase64Image, setForm } from '../../../store/reducers/formSlice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Input from '../../input/Input';

const Form = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const formRef = useRef<HTMLFormElement>(null);
  const [isError, setIsError] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const handleCountrySelect = (country: string) => {
    dispatch(setCountry(country));
    setValue(country);
    setIsOpen(!isOpen);
  };

  const filteredCountries = countries.filter((country) => {
    return country.toLowerCase().includes(value.toLowerCase());
  });

  const handleInpFocus = (inpName: string) => {
    setIsError((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [inpName]: currentError, ...restErrors } = prev;
      return restErrors;
    });
  };

  const readAndDispatchBase64 = async (picture: {
    size: number;
    type: string;
  }) => {
    const image = new FileReader();
    image.onload = () => {
      const base64String = image.result;
      dispatch(setBase64Image(base64String));
    };
    image.readAsDataURL(picture as Blob);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(formRef.current!);
    const formData = Object.fromEntries(data.entries()) as Partial<IPerson>;
    try {
      const validationData = await personSchema.validate(formData, {
        abortEarly: false,
      });
      setIsError({});

      if (validationData) {
        const { file } = validationData;
        await readAndDispatchBase64(file as { size: number; type: string });
        dispatch(setForm(validationData));
        navigate('/');
      }
      formRef.current!.reset();
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        e.inner.forEach((err) => {
          errors[err.path as string] = err.message;
        });
        setIsError(errors);
      }
    }
  };

  return (
    <>
      <form className="form" ref={formRef} onSubmit={handleSubmit}>
        <Input
          description={'Name'}
          error={isError.name}
          name={'name'}
          type={'text'}
          autoComplete="off"
          onFocus={() => handleInpFocus('name')}
          required
        />
        <Input
          description={'Age'}
          error={isError.age}
          name={'age'}
          type={'text'}
          onFocus={() => handleInpFocus('age')}
          required
        />
        <Input
          description={'Email'}
          error={isError.email}
          name={'email'}
          type={'email'}
          autoComplete="off"
          onFocus={() => handleInpFocus('email')}
          required
        />
        <Input
          description={'Password'}
          error={isError.password}
          name={'password'}
          type={'password'}
          autoComplete="off"
          onFocus={() => handleInpFocus('password')}
          required
        />
        <Input
          description={'Confirm password'}
          error={isError.confirmPassword}
          name={'confirmPassword'}
          type={'password'}
          autoComplete="off"
          onFocus={() => handleInpFocus('confirmPassword')}
          required
        />
        <div className="form__wrapper">
          <div className="form-input">
            <label htmlFor="gender">
              Gender
              <select name="gender" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="form-input">
            <label htmlFor="country">Select Country</label>
            <input
              type="text"
              onChange={handleSearch}
              id="country"
              value={value}
              name="country"
              autoComplete="off"
              onFocus={() => handleInpFocus('country')}
              required
            />
            {value && isOpen ? (
              <ul className="form-input__list">
                {filteredCountries.map((country) => (
                  <li
                    className="form-input__item"
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="form__error">{isError && isError.country}</p>
          </div>
        </div>
        <div className="form__wrapper">
          <div className="form-input">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              onFocus={() => handleInpFocus('acceptTerms')}
              required
            />
            <label htmlFor="acceptTerms">Accept T&C</label>
            <p className="form__error">{isError.acceptTerms} </p>
          </div>
          <div className="form-input">
            <input
              type="file"
              id="file"
              name="file"
              onFocus={() => handleInpFocus('file')}
              required
            />
            <p className="form__error">{isError.file} </p>
          </div>
        </div>
        <input
          className="form__btn"
          type="submit"
          value="Submit"
          disabled={Object.keys(isError).length > 0}
        />
      </form>
    </>
  );
};

export default Form;
