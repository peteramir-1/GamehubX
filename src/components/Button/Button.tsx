import React from "react";

// Models
import {
  BaseClass,
  buttonColorClasses,
  buttonSizesClasses,
  prefixClasses,
  suffixClasses,
} from "./ButtonVariants";

// Types
import type { Colors, Sizes } from "./ButtonVariants";

type ButtonProps = {
  size?: Sizes;
  color?: Colors;
  children?: React.ReactNode;
  className?: string;
  onButtonClick?: () => void;
  onClick?: () => void;
  containerClassName?: string;
};

type ButtonAccessoriesProps = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const ButtonSuffix = ({ children }: ButtonAccessoriesProps) => {
  return <>{children}</>;
};
ButtonSuffix.displayName = "ButtonSuffix";

const ButtonPrefix = ({ children }: ButtonAccessoriesProps) => {
  return <>{children}</>;
};
ButtonPrefix.displayName = "ButtonPrefix";

const Button = ({
  children,
  size = "md",
  color = "primary",
  className,
  containerClassName = "",
  onButtonClick = () => {},
  onClick = () => {},
}: ButtonProps) => {
  const childrenArray = React.Children.toArray(children);

  const suffix = childrenArray.find(
    (child: any) => child.type?.displayName === "ButtonSuffix"
  );

  const prefix = childrenArray.find(
    (child: any) => child.type?.displayName === "ButtonPrefix"
  );

  const body = childrenArray.filter(
    (child: any) =>
      child.type?.displayName !== "ButtonPrefix" &&
      child.type?.displayName !== "ButtonSuffix"
  );

  return (
    <div onClick={() => onClick()} className={`${containerClassName}`}>
      {prefix}
      <button
        onClick={() => onButtonClick()}
        className={`${BaseClass} ${buttonColorClasses[color]} ${
          buttonSizesClasses[size]
        } ${
          !!prefix ? prefixClasses : !!suffix ? suffixClasses : "rounded-md"
        } ${className}`}
      >
        {body}
      </button>
      {suffix}
    </div>
  );
};

export { ButtonPrefix, ButtonSuffix };
export default Button;
