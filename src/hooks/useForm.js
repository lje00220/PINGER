import { useState } from 'react';

const useForm = (initialState = {}, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validate) {
      const error = validate(name, value, formData.password);
      setFormError((prev) => {
        const updatedError = { ...prev };

        if (value.length === 0) {
          delete updatedError[name];
        } else {
          updatedError[name] = error;
        }

        return updatedError;
      });
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setFormError({});
  };

  return { formData, formError, handleChange, resetForm };
};

export default useForm;
