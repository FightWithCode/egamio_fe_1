export function TypographyH1({ children, className }) {
  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl leading-10 md:leading-10 ${className}`}>
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }) {
  return (
    <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 leading-10 md:leading-10 ${className}`}>
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight leading-10 md:leading-8 ${className}`}>
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }) {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }) {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  );
}

export function TypographyBlockquote({ children, className }) {
  return (
    <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
      "{children}"
    </blockquote>
  );
}

export function TypographyTable({ rows }) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              King's Treasury
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              People's happiness
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{row[0]}</td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
