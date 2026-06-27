import { getPageHero } from '@/lib/page'

export const metadata = { title: "I'm New" }
export const dynamic = 'force-dynamic'

export default async function ImNewPage() {
  const hero = await getPageHero('im-new')
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || "I'm new"}</span>
          <h1>{hero.heading || "We've saved you a seat."}</h1>
          <p className="lead">{hero.intro || "Walking into a new church can feel daunting. So here's exactly what to expect before you come — no surprises, just a warm welcome."}</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a className="btn btn--accent" href="#plan">Let us know you&apos;re coming <span className="arw">→</span></a>
            <a className="btn btn--line-light" href="/contact">Get directions</a>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><h2>Your first Sunday</h2><p className="intro muted">Come as you are. Here&apos;s how the morning usually goes.</p></div>
          <div className="pillars-row">
            <div className="p"><h3 style={{ fontSize: '1.35rem' }}>A warm welcome</h3><p className="muted">Look for our First Timers team at the door — they&apos;ll help you settle in and answer any questions.</p></div>
            <div className="p"><h3 style={{ fontSize: '1.35rem' }}>Worship &amp; the Word</h3><p className="muted">Heartfelt praise, prayer, and a clear, encouraging message from the Bible you can take into your week.</p></div>
            <div className="p"><h3 style={{ fontSize: '1.35rem' }}>Time together</h3><p className="muted">Tea, coffee and a chance to meet people. No pressure — stay as long or as little as you like.</p></div>
          </div>
        </div>
      </section>

      <section className="panel-indigo">
        <div className="wrap">
          <div className="sec-head"><h2 style={{ color: '#fff' }}>A few common questions</h2></div>
          <div className="schedule" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div><h3 style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', color: '#fff' }}>What should I wear?</h3><p className="muted">Whatever you&apos;re comfortable in. You&apos;ll see everything from smart to casual.</p></div>
            <div><h3 style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', color: '#fff' }}>Anything for my kids?</h3><p className="muted">Yes — a safe, fun children&apos;s ministry runs during the service, with a warm team.</p></div>
            <div><h3 style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', color: '#fff', marginTop: 24 }}>Where do I park?</h3><p className="muted">There&apos;s parking at and around Gadebridge Community Centre. We&apos;ll point you the right way.</p></div>
            <div><h3 style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', color: '#fff', marginTop: 24 }}>Will I be put on the spot?</h3><p className="muted">Never. You&apos;re welcome to simply observe and enjoy. Come as a guest.</p></div>
          </div>
        </div>
      </section>

      <section id="plan">
        <div className="wrap give-grid" style={{ color: 'var(--ink)' }}>
          <div>
            <span className="label">Let us know</span>
            <h2 style={{ fontSize: 'clamp(2rem,3.4vw,3rem)', marginTop: 14 }}>Tell us you&apos;re coming</h2>
            <p className="muted" style={{ marginTop: 18, maxWidth: '46ch' }}>It&apos;s completely optional — but if you let us know, we&apos;ll look out for you, save you a seat, and make sure your first visit is a great one.</p>
          </div>
          <form style={{ display: 'grid', gap: 14, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 28 }}>
            <input type="text" placeholder="Full name" style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid var(--line)', fontFamily: 'var(--body)', fontSize: '1rem' }} />
            <input type="email" placeholder="you@email.com" style={{ padding: '13px 14px', borderRadius: 8, border: '1px solid var(--line)', fontFamily: 'var(--body)', fontSize: '1rem' }} />
            <button className="btn btn--accent" style={{ justifyContent: 'center' }}>I&apos;m planning to visit <span className="arw">→</span></button>
          </form>
        </div>
      </section>
    </>
  )
}
