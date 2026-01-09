import { useRef, useState } from "react";
import clsx from "clsx";

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  selected: boolean;
};

const RippleButton = ({
  children,
  selected,
  className,
  ...props
}: RippleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rippling, setRippling] = useState(false);

  const createRipple = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    if (rippling) return;

    setRippling(true);

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");

    const size = Math.max(rect.width, rect.height);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${clientX - rect.left - size / 2}px`;
    ripple.style.top = `${clientY - rect.top - size / 2}px`;
    ripple.className =
      "absolute rounded-full opacity-0 pointer-events-none bg-white/30 animate-ripple";

    button.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.style.opacity = "1";
    });

    setTimeout(() => {
      ripple.remove();
      setRippling(false);
    }, 600);
  };

  return (
    <button
      {...props}
      ref={buttonRef}
      onClick={(e) => {
        createRipple(e);
        if (props.onClick) props.onClick(e as any);
      }}
      className={clsx(
        "cursor-pointer relative overflow-hidden select-none touch-manipulation transition-all rounded-xl",
        "active:scale-95 active:brightness-95",
        className
      )}
    >
      {children}
    </button>
  );
};

export default RippleButton;
