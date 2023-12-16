import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  name,
  placeholder = "",
  type = "text",
  register,
  attributes,
  error,
  className = "",
  passwordIcon = false,
  children,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={name}
            {...register(name)}
            {...attributes}
            className={`input-field ${className}`}
          >
            {children}
          </select>
        );
      case "checkbox":
      case "radio":
        return (
          <div className="flex gap-2 items-center">
            <input
              type={showPassword ? "text" : type}
              id={name}
              {...register(name)}
              {...attributes}
              className={`accent-primary focus:accent-primary`}
            />
            <label htmlFor={name} className="mt-2">
              {label}
            </label>
          </div>
        );
      case "textarea":
        return (
          <textarea
            id={name}
            rows="4"
            className={`w-full px-0 text-sm text-gray-900 bg-white border-0 ${className}`}
            placeholder={placeholder ? placeholder : "Write a comment..."}
            {...register(name)}
            {...attributes}
          ></textarea>
        );
      default:
        return (
          <div className="relative ">
            <input
              type={showPassword ? "text" : type}
              id={name}
              placeholder={placeholder}
              {...register(name)}
              {...attributes}
              className={`input-field ${className} ${
                attributes?.disabled ? "bg-gray-200" : ""
              }`}
            />
            {passwordIcon && (
              <button
                type="button"
                className="absolute bottom-3 right-3 text-gray-400"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <FaEye className="h-5 w-5" />
                ) : (
                  <FaEyeSlash className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {type !== "checkbox" && type !== "radio" && type !== "file" && label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-2 leading-6 text-gray-900`}
        >
          {label}
        </label>
      )}
      {renderInput()}
      {error && <p className={`text-red-700 font-normal text-sm`}>{error}</p>}
    </div>
  );
};

export default Input;
