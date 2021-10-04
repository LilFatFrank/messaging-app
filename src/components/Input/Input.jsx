import "./Input.scss";

const Input = ({ width, onChange, placeholder }) => {
  return (
    <input
      className={`input`}
      style={{ width: width || "auto" }}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Type here"}
    />
  );
};

export default Input;
