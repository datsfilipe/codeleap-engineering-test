export default function Button({ children, ...props }: { children: React.ReactNode } & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className="bg-primary font-bold text-white rounded-lg px-6 py-[4px] disabled:bg-gray disabled:text-muted"
      {...props}
    >
      {children}
    </button>
  );
}
