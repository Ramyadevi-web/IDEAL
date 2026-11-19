import { useEffect, useRef } from 'react';
import useScrollAnimations from '../hooks/useScrollAnimations';
import PageHero from './PageHero';

/**
 * Wraps every page: sets the browser tab title, runs the scroll animations
 * for that page, and (for inner pages) shows the banner with breadcrumbs.
 */
export default function Page({ title, hero, children }) {
  const ref = useRef(null);
  useScrollAnimations(ref);

  useEffect(() => {
    document.title = title ? `${title} | Ideal School CBSE, Mayiladuthurai` : 'Ideal School CBSE, Mayiladuthurai | Affiliation No. 1930571';
  }, [title]);

  return (
    <main ref={ref} id="main">
      {hero && <PageHero {...hero} />}
      {children}
    </main>
  );
}
