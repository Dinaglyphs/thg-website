import { getPayload } from 'payload'
import config from '@payload-config'

export type NavLink = { label: string; href?: string }
export type HeaderItem = { label: string; href?: string; children?: NavLink[] }
export type FooterColumn = { heading: string; links: NavLink[] }

// Used if the Navigation global hasn't been set up yet, so the site never
// renders an empty menu or footer.
const DEFAULT_HEADER: HeaderItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Departments', href: '/departments' },
  { label: 'Media', children: [
    { label: 'Sermons', href: '/sermons' },
    { label: 'Devotionals', href: '/devotionals' },
  ] },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
  { label: "I'm New", href: '/im-new' },
]

const DEFAULT_FOOTER: FooterColumn[] = [
  { heading: 'Visit Us', links: [
    { label: 'Gadebridge Community Centre' },
    { label: 'The Nokes, Galley Hill' },
    { label: 'Hemel Hempstead, HP1 3LE' },
    { label: '07944 731768', href: 'tel:+447944731768' },
    { label: 'info@rccgthg.org', href: 'mailto:info@rccgthg.org' },
  ] },
  { heading: 'Explore', links: [
    { label: 'About', href: '/about' },
    { label: 'Departments', href: '/departments' },
    { label: 'Sermons', href: '/sermons' },
    { label: 'Devotionals', href: '/devotionals' },
    { label: 'Events', href: '/events' },
    { label: 'Give', href: '/give' },
  ] },
  { heading: 'Gatherings', links: [
    { label: 'Sunday — 10:00am' },
    { label: 'Tuesday — 7:00pm' },
    { label: 'Wednesday — 7:00pm' },
    { label: "Men's Prayer — 1st Sun 5pm" },
  ] },
]

const cleanLinks = (arr: any[]): NavLink[] =>
  (arr || []).map((l) => ({ label: l.label, href: l.href || undefined })).filter((l) => l.label)

export async function getNav(): Promise<{ header: HeaderItem[]; footer: FooterColumn[] }> {
  let nav: any = null
  let pages: any[] = []
  try {
    const payload = await getPayload({ config })
    nav = await (payload as any).findGlobal({ slug: 'navigation' })
    pages = ((await payload.find({ collection: 'pages', limit: 200 })).docs as any[]) || []
  } catch {
    // fall through to defaults
  }

  const baseHeader: HeaderItem[] = nav?.header?.length
    ? nav.header.map((i: any) => ({
        label: i.label,
        href: i.href || undefined,
        children: i.children?.length ? cleanLinks(i.children) : undefined,
      }))
    : DEFAULT_HEADER

  const baseFooter: FooterColumn[] = nav?.footer?.length
    ? nav.footer.map((c: any) => ({ heading: c.heading, links: cleanLinks(c.links) }))
    : DEFAULT_FOOTER

  // Pages can opt into the menus when they're created.
  const byOrder = (a: any, b: any) => (a?.nav?.order ?? 99) - (b?.nav?.order ?? 99)
  const headerPages: HeaderItem[] = pages
    .filter((p) => p?.nav?.showInHeader)
    .sort(byOrder)
    .map((p) => ({ label: p.nav.navLabel || p.title, href: `/${p.slug}` }))

  const header = [...baseHeader, ...headerPages]

  const footer = baseFooter.map((col) => {
    const colPages = pages
      .filter((p) => p?.nav?.footerColumn && String(p.nav.footerColumn).trim().toLowerCase() === String(col.heading).trim().toLowerCase())
      .sort(byOrder)
      .map((p) => ({ label: p.nav.navLabel || p.title, href: `/${p.slug}` }))
    return { heading: col.heading, links: [...col.links, ...colPages] }
  })

  return { header, footer }
}
