import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { fullDate } from '@/lib/format'
import { IMG } from '@/lib/images'

export const dynamic = 'force-dynamic'

async function getEvent(slug: string) {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'events', where: { slug: { equals: slug } }, limit: 1 })
    return docs[0] as any
  } catch {
    return undefined
  }
}

async function getContact() {
  try {
    const payload = await getPayload({ config })
    const s: any = await payload.findGlobal({ slug: 'site-settings' })
    return s?.contact || {}
  } catch {
    return {}
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e = await getEvent(slug)
  return { title: e ? e.title : 'Event' }
}

// Build a Google Calendar link. Tries to parse the time (e.g. "6:30pm"); if it
// can't, it creates an all-day entry so the link still works.
function calendarLink(e: any): string {
  const d = new Date(e.date)
  const pad = (n: number) => String(n).padStart(2, '0')
  const ymd = `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`
  let dates = `${ymd}/${ymd}`
  const m = String(e.time || '').match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i)
  if (m) {
    let h = parseInt(m[1], 10) % 12
    if (/pm/i.test(m[3])) h += 12
    const min = m[2] ? parseInt(m[2], 10) : 0
    const start = `${ymd}T${pad(h)}${pad(min)}00`
    const end = `${ymd}T${pad((h + 2) % 24)}${pad(min)}00`
    dates = `${start}/${end}`
  }
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title || 'Event',
    dates,
    details: e.excerpt || '',
    location: e.location || '',
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [e, contact] = await Promise.all([getEvent(slug), getContact()])
  if (!e) notFound()

  const img = (e.image && typeof e.image === 'object' && e.image.url) || IMG.event
  const hasBody = e.body && typeof e.body === 'object'
  const online = e.format === 'online'
  const mapQuery = encodeURIComponent([e.location, contact.postcode].filter(Boolean).join(', '))
  const canRegister = e.registrationEnabled !== false
  // The Register button points to the event's external link (e.g. a Google
  // Form). If none is set, it falls back to emailing the church.
  const registerHref =
    e.registrationUrl ||
    (contact.email ? `mailto:${contact.email}?subject=${encodeURIComponent('Register: ' + e.title)}` : '/contact')
  const registerExternal = !!e.registrationUrl

  return (
    <article className="evt">
      <section style={{ padding: 0, position: 'relative' }}>
        <div className="evt-banner">
          <img className="img" src={img} alt="" />
          <div className="evt-banner__veil" />
          <div className="wrap evt-banner__inner">
            <Link className="evt-back" href="/events">← All events</Link>
            <span className={`tag ${online ? 'tag--online' : 'tag--inperson'}`}>{online ? 'Online' : 'In person'}</span>
            <h1>{e.title}</h1>
            <div className="evt-banner__meta">
              <span>{fullDate(e.date)}</span>
              {e.time && <span>· {e.time}</span>}
              {e.location && <span>· {e.location}</span>}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap evt-grid">
          <div className="evt-main">
            {e.excerpt && <p className="evt-lead">{e.excerpt}</p>}
            {hasBody && <div className="prose evt-rich"><RichText data={e.body} /></div>}

            {e.guest && (
              <div className="evt-guest">
                <span className="label">Special guest</span>
                <p>{e.guest}</p>
              </div>
            )}
          </div>

          <aside className="evt-aside">
            <div className="evt-card">
              <h3>Event details</h3>
              <div className="evt-row"><span className="k">Date</span><span className="v">{fullDate(e.date)}</span></div>
              {e.time && <div className="evt-row"><span className="k">Time</span><span className="v">{e.time}</span></div>}
              <div className="evt-row"><span className="k">Format</span><span className="v">{online ? 'Online' : 'In person'}</span></div>
              {e.location && (
                <div className="evt-row"><span className="k">Venue</span><span className="v">{e.location}{!online && (
                  <><br /><a className="tlink" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer">View on map →</a></>
                )}</span></div>
              )}
              {e.cost && <div className="evt-row"><span className="k">Cost</span><span className="v">{e.cost}</span></div>}
              {e.guest && <div className="evt-row"><span className="k">Guest</span><span className="v">{e.guest}</span></div>}

              <div className="evt-actions">
                {canRegister && <a className="btn btn--accent" href={registerHref} {...(registerExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ justifyContent: 'center' }}>Register <span className="arw">→</span></a>}
                <a className="btn btn--line" href={calendarLink(e)} target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'center' }}>Add to calendar</a>
              </div>
            </div>

            <div className="evt-card">
              <h3>Questions?</h3>
              <p className="muted" style={{ fontSize: '.95rem' }}>Get in touch and a real person will help.</p>
              <div className="evt-contact">
                {contact.phone && <a href={`tel:${String(contact.phone).replace(/\s+/g, '')}`}>{contact.phone}</a>}
                {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </article>
  )
}
