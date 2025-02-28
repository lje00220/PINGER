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
      className="h-[30px] w-3/4 rounded-3xl border-2 border-my-main pl-2 text-sm"
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
