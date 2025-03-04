export const InputBar = ({
  type,
  placeholder,
  onChange,
  name,
  value,
  minLength,
  maxLength,
}) => {
  return (
    <input
      className="h-[30px] w-full rounded-3xl border-2 border-my-main pl-2 text-xs"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
};

export const InputRadio = ({ name, value, onChange, checked }) => {
  return (
    <input
      className="h-4 w-4 accent-my-main focus:ring-my-main"
      type="radio"
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
    />
  );
};
