import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Button({
  children,
  className,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'bg-primary-600 hover:bg-primary-700 whitespace-nowrap rounded px-3 py-2 text-white transition',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
