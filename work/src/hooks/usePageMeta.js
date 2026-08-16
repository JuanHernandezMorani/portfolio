import { useEffect } from 'react';

const BASE_TITLE = 'Juan Braian Hernández Morani';
const DEFAULT_DESCRIPTION = 'Portfolio of Juan Braian Hernández Morani, Full-Stack Developer focused on Artificial Intelligence, Big Data and software engineering.';

export function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | AI & Full-Stack Developer`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);
}
