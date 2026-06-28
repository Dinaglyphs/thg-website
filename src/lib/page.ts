import { getPayload } from 'payload'
import config from '@payload-config'

export type Hero = { eyebrow?: string; heading?: string; intro?: string }

// Reads the editable header (eyebrow / heading / intro) for a page from the
// Pages collection. Returns {} if the page hasn't been created yet.
export async function getPageHero(slug: string): Promise<Hero> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
    return ((docs[0] as any)?.hero as Hero) || {}
  } catch {
    // e.g. the database schema hasn't been updated yet — fall back to defaults.
    return {}
  }
}
