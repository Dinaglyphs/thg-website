import { getPageHero } from '@/lib/page'

export const metadata = { title: 'Contact' }
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const hero = await getPageHero('contact')
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || 'Contact'}</span>
          <h1>{hero.heading || "We'd love to hear from you"}</h1>
          <p className="lead">{hero.intro || 'A question, a prayer request, or just want to say hello before you visit? Reach out — a real person will reply.'}</p>
        </div>
      </section>

      <section>
        <div className="wrap give-grid" style={{ alignItems: 'start', color: 'var(--ink)' }}>
          <div>
            <span className="label">Visit &amp; contact</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', marginTop: 14 }}>Find us in Hemel Hempstead</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 14, marginTop: 22 }}>
              <li><div style={{ color: 'var(--muted)', fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>Address</div><div style={{ fontSize: '1.05rem' }}>Gadebridge Community Centre, The Nokes, Galley Hill, Hemel Hempstead, HP1 3LE</div></li>
              <li><div style={{ color: 'var(--muted)', fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>Phone</div><a href="tel:+447944731768" style={{ fontSize: '1.05rem' }}>07944 731768</a></li>
              <li><div style={{ color: 'var(--muted)', fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>Email</div><a href="mailto:info@rccgthg.org" style={{ fontSize: '1.05rem' }}>info@rccgthg.org</a></li>
            </ul>
            <div style={{ marginTop: 24, border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '16 / 9', minHeight: 220, background: '#e9e6da' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg,#eceadf,#eceadf 16px,#e6e3d6 16px,#e6e3d6 32px)' }}></div>
              <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: 'var(--muted)', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>Map · HP1 3LE</span>
            </div>
          </div>
          <form style={{ display: 'grid', gap: 14, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 28 }}>
            <span className="label">Send a message</span>
            <input type="text" placeholder="Full name" style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid var(--line)', fontFamily: 'var(--body)', fontSize: '1rem' }} />
            <input type="email" placeholder="you@email.com" style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid var(--line)', fontFamily: 'var(--body)', fontSize: '1rem' }} />
            <select style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid var(--line)', fontFamily: 'var(--body)', fontSize: '1rem' }}>
              <option>Ask a question</option><option>Share a prayer request</option><option>Plan my first visit</option><option>Get involved / serve</option>
            </select>
            <textarea rows={4} placeholder="How can we help?" style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid var(--line)', fontFamily: 'var(--body)', fontSize: '1rem', resize: 'vertical' }}></textarea>
            <button className="btn btn--accent" style={{ justifyContent: 'center' }}>Send message <span className="arw">→</span></button>
          </form>
        </div>
      </section>
    </>
  )
}
