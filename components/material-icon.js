export function MaterialIcon({ name, className = "", style, ...props }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} style={style} {...props}>
      {name}
    </span>
  );
}
