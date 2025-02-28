import { useState } from 'react';

const useForm = (initailState = {}, validate) => {
  const [formData, setFormData] = useState(initailState);
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
    setFormData(initailState);
    setFormError({});
  };

  return { formData, formError, handleChange, resetForm };
};

export default useForm;
