export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <h2>
        {title}
      </h2>
      <p>{children}</p>
    </div>
  );
}
