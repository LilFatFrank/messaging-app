import "./Button.scss";

const Button = ({ children, onClick, className, style, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className || ""}`}
      style={{ ...style }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
