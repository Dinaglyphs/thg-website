import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { fullDate, shortDay } from '@/lib/format'
import { IMG, SCRIPTURE_POOL, fromPool } from '@/lib/images'
import { getPageHero } from '@/lib/page'

export const metadata = { title: 'Devotionals' }
export const dynamic = 'force-dynamic'

export default async function DevotionalsPage() {
  const payload = await getPayload({ config })
  const hero = await getPageHero('devotionals')
  const { docs } = await payload.find({ collection: 'devotionals', sort: '-date', limit: 100 })
  const today = docs[0] as any
  const rest = (docs as any[]).slice(1)
  const todayImg = (today?.image && typeof today.image === 'object' && today.image.url) || IMG.scripture

  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || 'Devotionals'}</span>
          <h1>{hero.heading || 'The Word for today'}</h1>
          <p className="lead">{hero.intro || 'A short daily devotional — a passage of Scripture, a thought to carry, and a prayer. Start each day anchored in God’s Word.'}</p>
        </div>
      </section>

      {today && (
        <section style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <Link className="devotion-today" href={`/devotionals/${today.slug}`}>
              <div className="devotion-today__media">
                <img src={todayImg} alt="" />
                <span className="cap">Today · {fullDate(today.date)}</span>
              </div>
              <div className="devotion-today__body">
                <span className="label">Today&apos;s Word</span>
                <h2 style={{ fontSize: 'clamp(1.9rem,3vw,2.7rem)', marginTop: 12 }}>{today.title}</h2>
                {today.scriptureText && <p className="serif-it" style={{ color: 'var(--indigo)', fontSize: '1.3rem', marginTop: 16, lineHeight: 1.5 }}>{today.scriptureText}</p>}
                {today.scriptureRef && <p className="muted" style={{ marginTop: 6 }}>{today.scriptureRef}</p>}
                {today.thought && <p style={{ marginTop: 18, maxWidth: '52ch' }}>{today.thought}</p>}
                <span className="more" style={{ marginTop: 20 }}>Read the full devotional <span className="arw">→</span></span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <div className="wrap">
            <hr className="hr-gold" />
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>Recent devotionals</h2>
            <div className="cardgrid">
              {rest.map((d, i) => {
                const cardImg = (d.image && typeof d.image === 'object' && d.image.url) || fromPool(SCRIPTURE_POOL, i + 1)
                return (
                  <Link className="card" href={`/devotionals/${d.slug}`} key={d.id}>
                    <div className="ph"><img className="img" src={cardImg} alt="" /><div className="ph-grain"></div><span className="cap">{shortDay(d.date)}</span></div>
                    <div className="body"><h3>{d.title}</h3>{d.scriptureText && <p>{d.scriptureText} {d.scriptureRef ? `— ${d.scriptureRef}` : ''}</p>}<span className="more">Read <span className="arw">→</span></span></div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="panel-indigo">
        <div className="wrap give-grid">
          <div>
            <hr className="hr-gold" style={{ marginBottom: 18 }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.9rem,3.2vw,2.7rem)' }}>Get the daily devotional</h2>
            <p className="muted" style={{ marginTop: 16, maxWidth: '44ch' }}>Have each morning&apos;s Word delivered straight to your inbox. One short, encouraging email a day — unsubscribe any time.</p>
          </div>
          <form style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', alignSelf: 'center' }}>
            <input type="email" placeholder="you@email.com" style={{ flex: 1, minWidth: 220, padding: '15px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.06)', color: '#fff', fontFamily: 'var(--body)', fontSize: '1rem' }} />
            <button className="btn btn--accent">Subscribe <span className="arw">→</span></button>
          </form>
        </div>
      </section>
    </>
  )
}
