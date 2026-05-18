import type { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLElement> {
  label?: string;
}

const Input: FC<Props> = ({
  id,
  label,
  name,
  type,
  placeholder,
  ...otherProps
}) => {
  return (
    <>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...otherProps}
      />
    </>
  );
};

export default Input;
