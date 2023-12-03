import './input.scss';
import { InputHTMLAttributes, Ref, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  description?: string;
  name: string;
}

const Input = forwardRef(
  (
    { error, description, name, ...props }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="inp">
        <label htmlFor={name} className="inp__label">
          {description}
        </label>
        <input {...props} ref={ref} id={name} name={name} />
        <p className="inp__error">{error} </p>
      </div>
    );
  }
);

export default Input;
