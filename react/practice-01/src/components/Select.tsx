import type { FC, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  isLoading: boolean;
  label?: string;
  options: string[];
}

const Select: FC<Props> = ({
  className,
  id,
  isLoading,
  label,
  name,
  options,
  ...otherProps
}) => {
  return (
    <>
      {label ? <label htmlFor={name}>{label}</label> : null}

      <select name={name} id={id} className={className} {...otherProps}>
        <option value="">Select a value</option>

        {isLoading ? <option value="">Loading ...</option> : null}

        {options.length > 0
          ? options.map((option) => <option key={option}>{option}</option>)
          : null}
      </select>
    </>
  );
};

export default Select;
