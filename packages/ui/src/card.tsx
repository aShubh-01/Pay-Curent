export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className='p-2'>
      <h2 className='font-semibold text-[25px]'>
        {title}
      </h2>
      <div className='p-2'>{children}</div>
    </div>
  );
}
