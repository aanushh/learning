import type { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  label: string;
}

const Button: FC<Props> = ({ id, label, onClick, type, ...otherProps }) => {
  return (
    <button id={id} type={type} onClick={onClick} {...otherProps}>
      {label}
    </button>
  );
};

export default Button;
