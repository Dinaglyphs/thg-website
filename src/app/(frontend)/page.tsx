import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { dayNum, monShort, fullDate } from '@/lib/format'
import { deptImage, IMG } from '@/lib/images'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const [services, eventsRes, deptRes, devRes] = await Promise.all([
    payload.findGlobal({ slug: 'service-times' }),
    payload.find({ collection: 'events', sort: 'date', limit: 2 }),
    payload.find({ collection: 'departments', where: { kind: { equals: 'ministry' } }, sort: 'order', limit: 3 }),
    payload.find({ collection: 'devotionals', sort: '-date', limit: 1 }),
  ])
  const allServices = ((services as any)?.services || []) as any[]
  const weekly = allServices.filter((s) => s.cadence !== 'monthly')
  const monthly = allServices.filter((s) => s.cadence === 'monthly')
  const events = eventsRes.docs as any[]
  const departments = deptRes.docs as any[]
  const devotional = devRes.docs[0] as any

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="label">RCCG · Hemel Hempstead <span className="dot">—</span> Est. 2006</span>
            <h1>Come, taste and see that <span className="em">the Lord is good.</span></h1>
            <p className="lead">A warm, Bible-believing church family where God is perfecting destinies and restoring hope. Wherever you&apos;re starting from, there&apos;s a place for you here.</p>
            <div className="hero-actions">
              <Link className="btn btn--solid" href="/im-new">I&apos;m new here <span className="arw">→</span></Link>
              <Link className="btn btn--line" href="/sermons">Watch a sermon</Link>
            </div>
          </div>
          <div className="hero-figure">
            <img className="img" src={IMG.hero} alt="Worship at Treasure House of God" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="figtag"><div className="k">Gather with us · Sundays</div><div className="v">10:00am</div></div>
          </div>
        </div>
        <div className="metabar">
          <div className="wrap">
            <div className="cell"><div className="k">Where</div><div className="v sm">Gadebridge Community Centre, HP1 3LE</div></div>
            <div className="cell"><div className="k">Sunday Service</div><div className="v">10:00am</div></div>
            <div className="cell"><div className="k">Midweek</div><div className="v sm">Tue &amp; Wed · 7:00pm</div></div>
            <div className="cell"><div className="k">Talk to us</div><a className="v sm" href="tel:+447944731768">07944 731768</a></div>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section>
        <div className="wrap editorial">
          <div>
            <h2>A family to belong to, not just a service to attend.</h2>
            <p className="lead" style={{ marginTop: 22 }}>We are Treasure House of God, a parish of the Redeemed Christian Church of God, established in Hemel Hempstead in 2006. We&apos;re Pentecostal and Bible-believing, and everything we do is shaped by the Word of God.</p>
            <p className="muted" style={{ marginTop: 16, maxWidth: '60ch' }}>Jesus loves you and is interested in the affairs of your life. Open your heart, cast your cares on Him, and discover that our God is good indeed — whatever your age or your story.</p>
            <div style={{ marginTop: 26 }}><Link className="tlink" href="/about">More about us <span className="arw">→</span></Link></div>
            <p className="pull">&ldquo;Perfecting destinies, restoring hope, and making disciples of men.&rdquo;</p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <hr className="hr-gold" style={{ marginBottom: 6 }} />
          <div className="pillars-row">
            <div className="p"><h3>Power of Praise</h3><p className="muted">Worship that is alive and heartfelt — full of energy, yet rooted in reverence for God.</p></div>
            <div className="p"><h3>Family Friendly</h3><p className="muted">A home for every generation — children, youth, parents and elders all have a place.</p></div>
            <div className="p"><h3>Undiluted Word</h3><p className="muted">Scripture taught plainly and faithfully, to help you grow strong in your walk with God.</p></div>
          </div>
        </div>
      </section>

      {/* SERVICES (from CMS global) */}
      <section className="panel-indigo">
        <div className="wrap">
          <div className="sec-head">
            <h2>Our Services</h2>
            <p className="intro muted">These are our regular gatherings — the same every week and month. You&apos;re welcome at every one of them.</p>
          </div>
          <div className="schedule">
            <div className="sched-col">
              <h3>Weekly</h3>
              {weekly.map((s, i) => (
                <div className="sched-row" key={i}><span className="when">{s.when}</span><span className="name">{s.name}</span><span className="time">{s.time}</span></div>
              ))}
            </div>
            <div className="sched-col">
              <h3>Monthly</h3>
              {monthly.map((s, i) => (
                <div className="sched-row" key={i}><span className="when">{s.when}</span><span className="name">{s.name}</span><span className="time">{s.time}</span></div>
              ))}
            </div>
          </div>
          <p className="sched-note">Looking for a one-off event, conference or programme? Those live on our{' '}
            <Link className="tlink" style={{ color: '#fff' }} href="/events">Events page <span className="arw">→</span></Link>
          </p>
        </div>
      </section>

      {/* DEPARTMENTS TEASER (from CMS) */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>Find your place</h2>
            <p className="intro muted">From our youngest children to our elders, every person matters and every gift has a use.</p>
          </div>
          <div className="cardgrid">
            {departments.map((d, i) => (
              <Link className="card" href="/departments" key={d.id}>
                <div className="ph">
                  <img className="img" src={deptImage(d.slug, i)} alt={d.title} />
                  <div className="ph-grain"></div>
                  <span className="cap">{d.title}</span>
                </div>
                <div className="body"><h3>{d.title}</h3><p>{d.excerpt}</p><span className="more">Explore <span className="arw">→</span></span></div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 34 }}><Link className="tlink" href="/departments">See all departments <span className="arw">→</span></Link></div>
        </div>
      </section>

      {/* EVENTS TEASER (from CMS) */}
      <section className="quiet" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Upcoming events</h2>
            <p className="intro muted">Conferences, programmes and special services — in person and online. Save your place.</p>
          </div>
          <div className="evlist">
            {events.map((e) => (
              <div className="event" key={e.id}>
                <div className="date"><div className="d">{dayNum(e.date)}</div><div className="m">{monShort(e.date)}</div></div>
                <div className="info"><span className={`tag ${e.format === 'online' ? 'tag--online' : 'tag--inperson'}`}>{e.format === 'online' ? 'Online' : 'In person'}</span><h3 style={{ marginTop: 8 }}>{e.title}</h3><div className="meta">{e.time && <span>{e.time}</span>}{e.location && <span>{e.location}</span>}</div></div>
                <div className="actions"><Link className="btn btn--line btn-mini" href="/events">Register</Link></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}><Link className="tlink" href="/events">View all events <span className="arw">→</span></Link></div>
        </div>
      </section>

      {/* DEVOTIONALS TEASER (from CMS) */}
      <section className="panel-indigo">
        <div className="wrap give-grid">
          <div>
            <hr className="hr-gold" style={{ marginBottom: 18 }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem,3.4vw,3rem)' }}>The Word for today</h2>
            <p className="muted" style={{ marginTop: 18, maxWidth: '44ch' }}>A short daily devotional to keep you anchored through the week — a passage of Scripture, a thought to carry, and a prayer. Wherever you are, start the day in the Word.</p>
            <div style={{ marginTop: 26 }}><Link className="btn btn--accent" href="/devotionals">Read today&apos;s devotional <span className="arw">→</span></Link></div>
          </div>
          {devotional && (
            <div className="cardgrid" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
              <Link className="card" href="/devotionals" style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.14)' }}>
                <div className="ph" style={{ height: 170 }}>
                  <img className="img" src={IMG.scripture} alt="" />
                  <div className="ph-grain"></div>
                  <span className="cap">Today · {fullDate(devotional.date)}</span>
                </div>
                <div className="body">
                  <h3 style={{ color: '#fff' }}>{devotional.title}</h3>
                  <p style={{ color: '#c9c6e2' }}>{devotional.scriptureText} {devotional.scriptureRef ? `— ${devotional.scriptureRef}` : ''}</p>
                  <span className="more" style={{ color: '#fff' }}>Read devotional <span className="arw">→</span></span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* OUTREACH */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>A blessing to Hemel Hempstead</h2>
            <p className="intro muted">Faith works through love. Beyond Sundays, we serve our town in practical, ongoing ways.</p>
          </div>
          <div className="olist">
            <div className="o"><h3>Food &amp; Clothing Bank</h3><p className="muted">Regular donations of food and clothing to support local families in need.</p></div>
            <div className="o"><h3>Saturday Maths Class</h3><p className="muted">Free Maths tuition for children across the Hemel Hempstead community.</p></div>
            <div className="o"><h3>Tackling Homelessness</h3><p className="muted">Partnering with local initiatives to support people facing homelessness.</p></div>
          </div>
        </div>
      </section>

      {/* PRAYER */}
      <section className="quiet">
        <div className="wrap">
          <div style={{ maxWidth: '30ch' }}><span className="label">We&apos;d love to pray with you</span></div>
          <h2 style={{ marginTop: 0 }}>Whatever you&apos;re facing, you don&apos;t have to face it alone.</h2>
          <Link className="btn btn--accent" href="/contact">Share a prayer request <span className="arw">→</span></Link>
        </div>
      </section>
    </>
  )
}
