import { Link } from 'react-router-dom';

/**
 * One link component for everything:
 *  - "/admissions" or "/#contact" → React Router link (no page reload)
 *  - "https://…", "tel:", "mailto:", "/docs/x.pdf" → normal <a> (PDFs/external open in a new tab)
 *  - "#section" → in-page jump
 */
export default function SmartLink({ to, href, children, external, ...rest }) {
  const target = to ?? href ?? '#';
  const isFile = /\.(pdf|jpe?g|png|docx?)$/i.test(target);
  const isExternal = external || /^(https?:)?\/\//.test(target);

  if (isExternal || isFile) {
    return (
      <a href={target} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (/^(tel:|mailto:|#)/.test(target)) {
    return <a href={target} {...rest}>{children}</a>;
  }
  return <Link to={target} {...rest}>{children}</Link>;
}
