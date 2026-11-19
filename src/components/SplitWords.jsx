/**
 * Wraps each word in a masked span so GSAP can slide words up one by one.
 * The full sentence stays readable for screen readers via aria-label.
 */
export default function SplitWords({ text, as: Tag = 'h2', className = '', ...rest }) {
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text} data-split {...rest}>
      {words.map((w, i) => (
        <span className="word" aria-hidden="true" key={i}>
          <span>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
