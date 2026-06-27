import { getPageHero } from '@/lib/page'

export const metadata = { title: 'Give' }
export const dynamic = 'force-dynamic'

export default async function GivePage() {
  const hero = await getPageHero('give')
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || 'Giving'}</span>
          <h1>{hero.heading || 'Your giving goes a long way'}</h1>
          <p className="lead">{hero.intro || 'Everything we do — worship, discipleship, and serving our community — is made possible by the generosity of people like you. Thank you for partnering with us.'}</p>
        </div>
      </section>

      <section>
        <div className="wrap give-grid" style={{ color: 'var(--ink)' }}>
          <div>
            <span className="label">Why we give</span>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.2vw,2.7rem)', marginTop: 14 }}>Giving is worship</h2>
            <p className="muted" style={{ marginTop: 16, maxWidth: '48ch' }}>We give not out of obligation but out of love — joining God in His work of restoring hope and changing lives, here in Hemel Hempstead and beyond.</p>
            <p className="serif-it" style={{ color: 'var(--indigo)', fontSize: '1.4rem', marginTop: 24, maxWidth: '32ch' }}>&ldquo;Each of you should give what you have decided in your heart to give.&rdquo;</p>
            <p className="muted">2 Corinthians 9:7</p>
          </div>
          <div>
            <span className="label">Give by bank transfer</span>
            <div className="bank" style={{ ['--line-dk' as any]: 'var(--line)', marginTop: 10, borderColor: 'var(--line)' }}>
              <div className="row" style={{ borderColor: 'var(--line)' }}><span className="k" style={{ color: 'var(--muted)' }}>Account name</span><span className="v" style={{ color: 'var(--ink)' }}>RCCG Treasure House of God</span></div>
              <div className="row" style={{ borderColor: 'var(--line)' }}><span className="k" style={{ color: 'var(--muted)' }}>Sort code</span><span className="v" style={{ color: 'var(--ink)' }}>•• — •• — ••</span></div>
              <div className="row" style={{ borderColor: 'var(--line)' }}><span className="k" style={{ color: 'var(--muted)' }}>Account number</span><span className="v" style={{ color: 'var(--ink)' }}>•••• ••••</span></div>
              <div className="row" style={{ borderColor: 'var(--line)' }}><span className="k" style={{ color: 'var(--muted)' }}>Reference</span><span className="v" style={{ color: 'var(--ink)' }}>Tithe / Offering / Building</span></div>
            </div>
            <p className="muted" style={{ marginTop: 14, fontSize: '.9rem' }}>Bank details will be confirmed before launch. You can also give in person on a Sunday.</p>
          </div>
        </div>
      </section>

      <section className="panel-indigo">
        <div className="wrap editorial">
          <div className="prose">
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.5rem)' }}>Make your gift go 25% further</h2>
            <p className="muted">If you&apos;re a UK taxpayer, Gift Aid lets us reclaim 25p from every £1 you give — at no extra cost to you. On a £100 gift, that&apos;s an extra £25 toward the work of the church.</p>
            <p className="muted">Complete a one-time Gift Aid declaration and it applies to your giving going forward.</p>
            <div style={{ marginTop: 22 }}><a className="btn btn--accent" href="/contact">Request a Gift Aid form <span className="arw">→</span></a></div>
          </div>
        </div>
      </section>
    </>
  )
}
