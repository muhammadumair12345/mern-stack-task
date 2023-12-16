import Loader from "./Loader";

const Button = ({
  variant = "primary",
  isLoading = false,
  type = "button",
  className = "",
  children,
  ...props
}) => {
  const variantStyles = {
    primary: "btn",
    secondary: "btn-success",
    disabled: "btn-disabled",
  };

  const buttonStyles = `${className} ${
    variantStyles[variant] || variantStyles.primary
  }`;

  return (
    <button
      type={type}
      className={buttonStyles}
      {...props}
      disabled={isLoading}
    >
      {isLoading ? <Loader color="white" w={"20px"} h={"20px"} /> : children}
    </button>
  );
};

export default Button;
