// Small date helpers for displaying CMS dates on the site.
const GB = 'en-GB'

export function dayNum(d: string | Date): string {
  return new Date(d).getDate().toString().padStart(2, '0')
}
export function monShort(d: string | Date): string {
  return new Date(d).toLocaleDateString(GB, { month: 'short' })
}
export function weekday(d: string | Date): string {
  return new Date(d).toLocaleDateString(GB, { weekday: 'long' })
}
export function fullDate(d: string | Date): string {
  return new Date(d).toLocaleDateString(GB, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
// "Fri · 26 June"
export function shortDay(d: string | Date): string {
  const date = new Date(d)
  const wk = date.toLocaleDateString(GB, { weekday: 'short' })
  const day = date.getDate()
  const mon = date.toLocaleDateString(GB, { month: 'long' })
  return `${wk} · ${day} ${mon}`
}
// "14 Jun 2026"
export function sermonDate(d: string | Date): string {
  return new Date(d).toLocaleDateString(GB, { day: 'numeric', month: 'short', year: 'numeric' })
}
// rotate placeholder art a/b/c/d
export function placeholder(i: number): string {
  return ['a', 'b', 'c', 'd'][i % 4]
}
