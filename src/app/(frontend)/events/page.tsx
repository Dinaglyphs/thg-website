import { getPayload } from 'payload'
import config from '@payload-config'
import { dayNum, monShort, fullDate } from '@/lib/format'
import { IMG } from '@/lib/images'
import { getPageHero } from '@/lib/page'

export const metadata = { title: 'Events' }
export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const payload = await getPayload({ config })
  const hero = await getPageHero('events')
  const { docs: events } = await payload.find({ collection: 'events', sort: 'date', limit: 100 })

  const featured = (events.find((e: any) => e.featured) || events[0]) as any

  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || 'Events'}</span>
          <h1>{hero.heading || "What's on at Treasure House"}</h1>
          <p className="lead">{hero.intro || 'Conferences, programmes and special services — in person and online. Each event has its own page where you can read the details and register to save your place.'}</p>
        </div>
      </section>

      {featured && (
        <section style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <span className="label">Featured</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 0, marginTop: 22, border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', background: 'var(--surface)' }}>
              <div style={{ position: 'relative', minHeight: 320 }}>
                <img className="img" src={IMG.event} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className={`tag ${featured.format === 'online' ? 'tag--online' : 'tag--inperson'}`} style={{ position: 'absolute', top: 18, left: 18 }}>{featured.format === 'online' ? 'Online' : 'In person'}</span>
              </div>
              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', color: 'var(--muted)', fontSize: '.9rem' }}><span>{fullDate(featured.date)}</span>{featured.time && <><span>·</span><span>{featured.time}</span></>}</div>
                <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', marginTop: 12 }}>{featured.title}</h2>
                {featured.excerpt && <p className="muted" style={{ marginTop: 14, maxWidth: '46ch' }}>{featured.excerpt}</p>}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 26 }}>
                  <a className="btn btn--accent" href="#register">Register to attend <span className="arw">→</span></a>
                  <a className="btn btn--line" href="#">Add to calendar</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="wrap">
          <span className="label">Upcoming</span>
          {events.length === 0 ? (
            <p className="muted" style={{ marginTop: 22 }}>No events are scheduled right now — check back soon.</p>
          ) : (
            <div className="evlist">
              {(events as any[]).map((e) => (
                <div className="event" key={e.id}>
                  <div className="date"><div className="d">{dayNum(e.date)}</div><div className="m">{monShort(e.date)}</div></div>
                  <div className="info">
                    <span className={`tag ${e.format === 'online' ? 'tag--online' : 'tag--inperson'}`}>{e.format === 'online' ? 'Online' : 'In person'}</span>
                    <h3 style={{ marginTop: 8 }}>{e.title}</h3>
                    <div className="meta">{e.time && <span>{e.time}</span>}{e.location && <span>{e.location}</span>}</div>
                  </div>
                  <div className="actions">{e.registrationEnabled !== false && <a className="btn btn--line btn-mini" href="#register">Register</a>}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="panel-indigo" id="register">
        <div className="wrap give-grid">
          <div>
            <hr className="hr-gold" style={{ marginBottom: 18 }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem,3.4vw,3rem)' }}>Save your place</h2>
            <p className="muted" style={{ marginTop: 18, maxWidth: '46ch' }}>Tell us you&apos;re coming and we&apos;ll have everything ready for you. Registration is free, and you&apos;ll get a reminder before the event. For online events, we&apos;ll send you the link.</p>
          </div>
          <form style={{ display: 'grid', gap: 14, background: 'rgba(255,255,255,.05)', border: '1px solid var(--line-dk)', borderRadius: 16, padding: 28 }}>
            <input type="text" placeholder="Full name" style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.06)', color: '#fff', fontFamily: 'var(--body)', fontSize: '1rem' }} />
            <input type="email" placeholder="you@email.com" style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.06)', color: '#fff', fontFamily: 'var(--body)', fontSize: '1rem' }} />
            <button className="btn btn--accent" style={{ justifyContent: 'center' }}>Register <span className="arw">→</span></button>
          </form>
        </div>
      </section>
    </>
  )
}
