export const LongButton = ({ type, onClick, children }) => {
  return (
    <button
      className="hover:bg-my-hover h-[40px] w-64 rounded-3xl bg-my-main"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ShortButton = ({ type, onClick, children }) => {
  return (
    <button
      className="h-[30px] w-24 rounded-3xl bg-my-main"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
