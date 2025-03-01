export const Button = ({ mode, type, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${mode} hover:bg-my-hover`}
    >
      {children}
    </button>
  );
};
