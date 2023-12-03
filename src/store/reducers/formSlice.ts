import { createSlice } from '@reduxjs/toolkit';
import { IPerson } from '../../schema/user';

interface IForm {
  base64HookImage: null;
  base64Image: null;
  formHookData: Omit<IPerson, 'file'>;
  formData: Omit<IPerson, 'file'>;
}

const initialState: IForm = {
  base64HookImage: null,
  base64Image: null,
  formHookData: {} as IPerson,
  formData: {} as IPerson,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setHookForm(state, action) {
      state.formHookData = action.payload;
    },
    setForm(state, action) {
      state.formData = action.payload;
    },
    setBase64Image(state, action) {
      state.base64Image = action.payload;
    },
    setBase64HookImage(state, action) {
      state.base64HookImage = action.payload;
    },
  },
});

export const { setForm, setHookForm, setBase64HookImage, setBase64Image } =
  formSlice.actions;
export default formSlice.reducer;
