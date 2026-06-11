import type { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ id, label, onChange, ...otherProps }) => {
  return (
    <div className="m-2 relative">
      {label ? (
        <label
          htmlFor={id}
          className="absolute text-sm -top-2.5 bg-white ml-2 font-medium"
        >
          {label}
        </label>
      ) : null}
      <input
        {...otherProps}
        type="text"
        id={id}
        className="border border-gray-400 rounded-sm p-2"
        placeholder="Type something ..."
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
