const Box = ({ children, className = "" }) => {
  return (
    <div
      className={`${className} flex gap-4 justify-between items-center rounded-md w-full bg-white `}
    >
      {children}
    </div>
  );
};

export default Box;
