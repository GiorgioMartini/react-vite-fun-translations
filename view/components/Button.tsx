import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "p-3 border border-amber-400 bg-amber-50  rounded-md",
        className
      )}
      {...props}
    />
  );
}
