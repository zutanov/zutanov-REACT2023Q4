import * as yup from 'yup';
export interface IPerson extends yup.InferType<typeof personSchema> {}

export const personSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .transform((value, originValue) =>
      typeof originValue === 'string' ? originValue.trim() : originValue
    )
    .test('is-uppercase', 'First letter must be uppercase', function (value) {
      if (value) {
        return /^[A-Z]/.test(value[0]);
      }
      return false;
    })
    .required('Name is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required')
    .typeError('Number is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(4)
    .test(
      'is-valid-password',
      'Password must contain: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
      function (value) {
        if (value) {
          return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{4,20}$/.test(
            value
          );
        }
        return false;
      }
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], "Password doesn't match")
    .required('Confirm Password'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup
    .boolean()
    .transform((value, originalValue) =>
      originalValue === 'on' ? true : value
    )
    .oneOf([true], 'Accept T&C')
    .required('Accept T&C'),
  file: yup
    .mixed()
    .required('You need to provide a file')
    .test({
      name: 'fileFormat',
      message: 'Unsupported file format',
      test: (value) => {
        if (value && value instanceof FileList) {
          const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
          return supportedFormats.includes(value[0]?.type);
        }
        return true;
      },
    })
    .test({
      name: 'fileSize',
      message: 'File size is too large',
      test: (value) => {
        if (value && value instanceof FileList) {
          const maxSize = 2 * 1024 * 1024;
          return value[0]?.size <= maxSize;
        }
        return true;
      },
    }),
  country: yup.string().required('Select country'),
});
