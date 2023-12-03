import './form.scss';
import { useForm } from 'react-hook-form';
import { IPerson, personSchema } from '../../../schema/user';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../input/Input';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/storeTypes';
import { setCountry } from '../../../store/reducers/countriesSlice';
import {
  setBase64HookImage,
  setHookForm,
} from '../../../store/reducers/formSlice';
import { useNavigate } from 'react-router-dom';

const HookForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(personSchema) });

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const navigate = useNavigate();

  const [valueCountry, setValueCountry] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const countryState = register('country');

  const onSubmit = async (data: IPerson) => {
    const { file, ...form } = data;
    const picture = file as FileList;
    if (picture) {
      const image = new FileReader();
      image.onloadend = () => {
        const base64String = image.result;
        dispatch(setBase64HookImage(base64String));
      };
      image.readAsDataURL(picture[0]);
    }
    dispatch(setHookForm(form));
    setValueCountry('');
    navigate('/');
    reset();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValueCountry(e.target.value);
    setIsOpen(true);
  };

  const handleCountrySelect = (country: string) => {
    dispatch(setCountry(country));
    setValueCountry(country);
    setIsOpen(!isOpen);
    setValue('country', country);
  };

  const filteredCountries = countries.filter((country) => {
    return country.toLowerCase().includes(valueCountry.toLowerCase());
  });

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          description={'Name'}
          error={errors.name?.message}
          id="name"
          {...register('name')}
          type={'text'}
          autoComplete="off"
        />
        <Input
          description={'Age'}
          error={errors.age?.message}
          id="age"
          {...register('age')}
          type={'text'}
        />
        <Input
          description={'Email'}
          error={errors.email?.message}
          id="email"
          {...register('email')}
          type={'email'}
          autoComplete="off"
        />
        <Input
          description={'Password'}
          error={errors.password?.message}
          id="password"
          {...register('password')}
          type={'password'}
          autoComplete="off"
        />
        <Input
          description={'Confirm password'}
          error={errors.confirmPassword?.message}
          id="confirmPassword"
          {...register('confirmPassword')}
          type={'password'}
          autoComplete="off"
        />
        <div className="form__wrapper">
          <div className="form-input">
            <label htmlFor="gender">
              Gender
              <select id="gender" {...register('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <p className="form__error">{errors.gender?.message} </p>
          </div>
          <div className="form-input">
            <label htmlFor="country">Select Country</label>
            <input
              type="search"
              {...countryState}
              onChange={handleSearch}
              id="country"
              value={valueCountry}
              autoComplete="off"
            />
            {valueCountry && isOpen ? (
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
            <p className="form__error">{errors && errors.country?.message} </p>
          </div>
        </div>
        <div className="form__wrapper">
          <div className="form-input">
            <input
              type="checkbox"
              id="acceptTerms"
              {...register('acceptTerms')}
            />
            <label htmlFor="acceptTerms">Accept T&C</label>
            <p className="form__error">{errors.acceptTerms?.message} </p>
          </div>
          <div className="form-input">
            <input type="file" {...register('file')} />
            <p className="form__error">{errors.file?.message} </p>
          </div>
        </div>
        <input
          className="form__btn"
          type="submit"
          value="Submit"
          disabled={!isValid}
        />
      </form>
    </>
  );
};

export default HookForm;
