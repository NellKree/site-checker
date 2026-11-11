const paths = {
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  diagonal: 'M6 18 18 6M8 6h10v10',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  globe: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM2 12h20M12 2c5 5 5 15 0 20-5-5-5-15 0-20Z',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5',
  file: 'M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6',
  person: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2',
  scan: 'M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6m0-3h18',
  cross: 'M6 6l12 12M18 6 6 18',
  chevron: 'm6 9 6 6 6-6',
  plus: 'M4 12h16m-8-8v16',
}

export function Icon({ name, size = 18 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>
}

export function Mark({ size = 28 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 32 32" fill="currentColor"><path d="M2 21 19 4h11L13 21H2Zm6 7L26 10h4L12 28H8Z" /></svg>
}

export function Brand({ children }) {
  return <a href="#/" className="brand"><Mark /><span>Срез</span>{children}</a>
}
