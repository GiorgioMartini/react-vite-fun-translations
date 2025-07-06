import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md transition-colors",
        "text-amber-900 dark:text-amber-100",
        "bg-amber-50 dark:bg-amber-900",
        "border border-amber-400 dark:border-amber-600",
        "hover:bg-amber-100 dark:hover:bg-amber-800",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "disabled:hover:bg-amber-50 dark:disabled:hover:bg-amber-900",
        className
      )}
      {...props}
    />
  );
}
