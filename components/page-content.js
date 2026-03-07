export function PageContent({ title, description, children, showContentHeader = true }) {
  return (
    <>
      {showContentHeader ? (
        <div className="content-header">
          <h1 className="content-title">{title}</h1>
          {description ? <p className="content-description">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </>
  );
}
