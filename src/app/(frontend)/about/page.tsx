import { getPageHero } from '@/lib/page'

export const metadata = { title: 'About' }
export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const hero = await getPageHero('about')
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <span className="label">{hero.eyebrow || 'About us'}</span>
          <h1>{hero.heading || 'Perfecting destinies, restoring hope.'}</h1>
          <p className="lead">{hero.intro || 'A Pentecostal, Bible-believing family in Hemel Hempstead — local and personal, yet part of a global church.'}</p>
        </div>
      </section>

      <section>
        <div className="wrap editorial">
          <div className="prose">
            <h2 style={{ fontSize: 'clamp(1.9rem,3.2vw,2.7rem)' }}>A house God has been building since 2006.</h2>
            <p>We are Treasure House of God, a parish of the Redeemed Christian Church of God, established on 12 November 2006 in Hemel Hempstead, Hertfordshire. We are Pentecostal and Bible-believing, and all our values and beliefs are directed by the Word of God.</p>
            <p>God has grown this house steadily. In 2011 we became an Area Headquarters church; in 2012 we established RCCG Hope House in Burnt Oak, London; and in 2013 we planted a further parish as an Area in Wolverhampton.</p>
            <p className="pull">&ldquo;Come, taste, and see that the Lord is good.&rdquo;</p>
          </div>
        </div>
      </section>

      <section className="panel-indigo">
        <div className="wrap editorial">
          <div className="prose">
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.9rem,3.2vw,2.7rem)' }}>Part of a global family.</h2>
            <p className="muted">The Redeemed Christian Church of God was established in 1952 and today has a presence in over 190 countries, with more than 870 churches across the United Kingdom alone. As one of its parishes, Treasure House of God shares that same mission and mandate.</p>
            <p className="serif-it" style={{ color: '#fff', fontSize: '1.35rem', marginTop: 24, maxWidth: '34ch' }}>&ldquo;To make heaven, and to take as many people as possible with us.&rdquo;</p>
            <p className="muted" style={{ marginTop: 8 }}>— The RCCG mandate</p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><h2>Rooted in the Word</h2><p className="intro muted">Our faith rests on the whole of Scripture. In summary, we believe in:</p></div>
          <div className="pillars-row">
            <div className="p"><h3 style={{ fontSize: '1.25rem' }}>The Holy Trinity</h3><p className="muted">God the Father, Son and Holy Spirit — three in One.</p></div>
            <div className="p"><h3 style={{ fontSize: '1.25rem' }}>Salvation in Christ</h3><p className="muted">A gift of grace through faith in Jesus&apos; death and resurrection.</p></div>
            <div className="p"><h3 style={{ fontSize: '1.25rem' }}>The Holy Bible</h3><p className="muted">The infallible, authoritative Word of God for all of life.</p></div>
          </div>
          <div style={{ marginTop: 30 }}><a className="tlink" href="#">Read our full Statement of Faith <span className="arw">→</span></a></div>
        </div>
      </section>

      <section className="quiet">
        <div className="wrap"><h2 style={{ marginTop: 0 }}>Come and see for yourself this Sunday.</h2><a className="btn btn--accent" href="/im-new">I&apos;m new here <span className="arw">→</span></a></div>
      </section>
    </>
  )
}
