export default function Input({ multiline, value, onChange, ...props }: { multiline?: boolean } & React.HTMLProps<HTMLInputElement>) {
  const classNames="bg-white text-black rounded-lg px-2 py-[4px] placeholder-gray-darker border border-muted w-full h-full max-h-[200px]"

  if (multiline) {
    return (
      <textarea
        className={classNames}
        value={value}
        onChange={onChange}
        rows={3}
        {...props}
      />
    );
  }

  return (
    <input
      className={classNames}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
