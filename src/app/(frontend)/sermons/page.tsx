import { getPayload } from 'payload'
import config from '@payload-config'
import { sermonDate, fullDate, placeholder } from '@/lib/format'
import { getPageHero } from '@/lib/page'

export const metadata = { title: 'Sermons' }
export const dynamic = 'force-dynamic'

export default async function SermonsPage() {
  const payload = await getPayload({ config })
  const hero = await getPageHero('sermons')
  const { docs } = await payload.find({ collection: 'sermons', sort: '-date', limit: 100 })
  const latest = docs[0] as any
  const rest = (docs as any[]).slice(1)

  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || 'Sermons'}</span>
          <h1>{hero.heading || 'The Word for your week'}</h1>
          <p className="lead">{hero.intro || 'Missed a Sunday, or want to go deeper? Watch and listen to recent messages — filter by series, speaker or topic.'}</p>
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <span className="label">Latest message</span>
          {latest ? (
            <div style={{ marginTop: 20, border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', background: 'var(--surface)' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 7', minHeight: 280, background: '#14113A' }}>
                <img className="img" src="/assets/ph-a.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '28px clamp(24px,4vw,40px)' }}>
                <div style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{fullDate(latest.date)}{latest.speaker ? ` · ${latest.speaker}` : ''}</div>
                <h2 style={{ fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', marginTop: 8 }}>{latest.title}</h2>
              </div>
            </div>
          ) : (
            <p className="muted" style={{ marginTop: 20 }}>Sermons will appear here soon.</p>
          )}
          <div style={{ marginTop: 22, padding: '18px 22px', border: '1px dashed var(--line)', borderRadius: 12, background: 'var(--paper-2)', color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--ink)' }}>Coming soon:</strong> sermons will stream from the church&apos;s YouTube channel. Once it&apos;s live, this page becomes a full, searchable archive.
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <section>
          <div className="wrap">
            <span className="label">Recent sermons</span>
            <div className="cardgrid">
              {rest.map((s, i) => (
                <a className="card" href="#" key={s.id}>
                  <div className="ph"><img className="img" src={`/assets/ph-${placeholder(i + 1)}.svg`} alt="" /><div className="ph-grain"></div></div>
                  <div className="body"><div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{sermonDate(s.date)}</div><h3 style={{ marginTop: 6 }}>{s.title}</h3>{s.series && <p>{s.series}</p>}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
