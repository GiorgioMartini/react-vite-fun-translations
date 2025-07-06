import clsx from "clsx";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string;
}

export default function Input({
  onChange,
  className,
  error,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <input
        {...props}
        onChange={onChange}
        className={clsx(
          "w-full px-4 py-2 rounded-md border",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "border-gray-300 dark:border-gray-600",
          "placeholder-gray-500 dark:placeholder-gray-400",
          "focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
          "focus:border-transparent",
          error && "border-red-500 dark:border-red-400",
          className
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
