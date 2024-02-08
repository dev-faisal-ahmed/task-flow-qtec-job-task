/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type TextAreaProps = {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<any>;
};

export function TextArea({
  label,
  name,
  placeholder,
  defaultValue,
  className,
  error,
  register,
}: TextAreaProps) {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      <label className='font-semibold' htmlFor={name}>
        {label}
      </label>
      <textarea
        className={twMerge(
          'w-full rounded-md border border-primary-100 bg-transparent px-3 py-1 outline-none ring-primary-600 placeholder:text-sm focus:border-primary-600 focus:ring-1',
          error
            ? 'border-red-600 ring-red-600 focus:border-red-600 focus:ring-1'
            : null,
        )}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
        rows={3}
      />
      {error?.message && (
        <p className='mt-1 block w-full rounded bg-red-50 px-2 py-[2px] text-xs text-red-600'>
          {error.message}
        </p>
      )}
    </div>
  );
}
