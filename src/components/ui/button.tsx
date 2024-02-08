import { twMerge } from 'tailwind-merge';
import { WrapperType } from '../../utils/types';

export type ButtonProps = WrapperType & {
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
        'whitespace-nowrap rounded bg-primary-600 px-3 py-2 text-white transition hover:bg-primary-700',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
