import { getPayload } from 'payload'
import config from '@payload-config'
import { placeholder } from '@/lib/format'
import { getPageHero } from '@/lib/page'

export const metadata = { title: 'Departments' }
export const dynamic = 'force-dynamic'

export default async function DepartmentsPage() {
  const payload = await getPayload({ config })
  const hero = await getPageHero('departments')
  const { docs } = await payload.find({ collection: 'departments', sort: 'order', limit: 200 })
  const ministries = (docs as any[]).filter((d) => d.kind !== 'team')
  const teams = (docs as any[]).filter((d) => d.kind === 'team')

  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || 'Get involved'}</span>
          <h1>{hero.heading || "There's a place for everyone"}</h1>
          <p className="lead">{hero.intro || 'From our youngest children to our elders, every person matters and every gift has a use. Explore our departments and find where you belong.'}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {ministries.length === 0 ? (
            <p className="muted">Departments will appear here.</p>
          ) : (
            <div className="cardgrid">
              {ministries.map((d, i) => (
                <a className="card" href="/contact" key={d.id}>
                  <div className="ph">
                    <img className="img" src={`/assets/ph-${placeholder(i)}.svg`} alt="" />
                    <div className="ph-grain"></div>
                    <span className="cap">{d.title}</span>
                  </div>
                  <div className="body"><h3>{d.title}</h3><p>{d.excerpt}</p><span className="more">Get involved <span className="arw">→</span></span></div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {teams.length > 0 && (
        <section style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head"><h2>Many hands, one house</h2><p className="intro muted">Behind every service is a team of volunteers. There&apos;s always room to serve.</p></div>
            <div className="olist" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
              {teams.map((o) => (
                <div className="o" style={{ paddingTop: 30 }} key={o.id}><h3 style={{ fontSize: '1.1rem' }}>{o.title}</h3><p className="muted">{o.excerpt}</p></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="quiet">
        <div className="wrap"><h2 style={{ marginTop: 0 }}>Not sure where you&apos;d fit? Let&apos;s talk.</h2><a className="btn btn--accent" href="/contact">Get in touch <span className="arw">→</span></a></div>
      </section>
    </>
  )
}
