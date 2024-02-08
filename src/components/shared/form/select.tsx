/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type SelectProps = {
  label: string;
  name: string;
  defaultValue?: string;
  className?: string;
  error?: FieldError;
  options: string[];
  register: UseFormRegister<any>;
};

export function Select({
  label,
  name,
  defaultValue,
  className,
  error,
  options,
  register,
}: SelectProps) {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      <label className='font-semibold' htmlFor={name}>
        {label}
      </label>
      <select
        className={twMerge(
          'w-full rounded-md border border-primary-100 bg-transparent p-1 outline-none ring-primary-600 placeholder:text-sm focus:border-primary-600 focus:ring-1',
          error
            ? 'border-red-600 ring-red-600 focus:border-red-600 focus:ring-1'
            : null,
        )}
        id={name}
        defaultValue={defaultValue}
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className='mt-1 block w-full rounded bg-red-50 px-2 py-[2px] text-xs text-red-600'>
          {error.message}
        </p>
      )}
    </div>
  );
}
