/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  label: string;
  type: 'text';
  name: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<any>;
};

export function Input({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  className,
  error,
  register,
}: InputProps) {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      <label className='font-semibold' htmlFor={name}>
        {label}
      </label>
      <input
        className={twMerge(
          'border-primary-100 ring-primary-600 focus:border-primary-600 w-full rounded-md border bg-transparent px-3 py-1 outline-none placeholder:text-sm focus:ring-1',
          error
            ? 'border-error-600 ring-error-600 focus:border-error-600 focus:ring-1'
            : null,
        )}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {error?.message && (
        <p className='bg-error-50 text-error-600 mt-1 block w-full rounded px-2 py-[2px] text-xs'>
          {error.message}
        </p>
      )}
    </div>
  );
}
