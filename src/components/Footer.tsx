import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="fwm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/rccg-emblem.png" alt="" width={46} height={46} />
              <span>Treasure House of God</span>
            </div>
            <p style={{ fontSize: '.95rem', maxWidth: '34ch' }}>
              A parish of the Redeemed Christian Church of God. Everyone is welcome — come as you are.
            </p>
            <div className="socials">
              <a href="https://www.instagram.com/rccgthg/" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.6 15.6 2.6 15.2 2.6 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2z" /></svg>
              </a>
              <a href="https://www.facebook.com/rccg.treasurehouse" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.6V21h3.4z" /></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M23 7.5c-.2-1-.9-1.7-1.9-2C19.4 5 12 5 12 5s-7.4 0-9.1.5c-1 .3-1.7 1-1.9 2C.5 9.2.5 12 .5 12s0 2.8.5 4.5c.2 1 .9 1.7 1.9 2C4.6 19 12 19 12 19s7.4 0 9.1-.5c1-.3 1.7-1 1.9-2 .5-1.7.5-4.5.5-4.5s0-2.8-.5-4.5zM9.8 15.3V8.7l6 3.3-6 3.3z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Visit Us</h4>
            <ul>
              <li>Gadebridge Community Centre</li>
              <li>The Nokes, Galley Hill</li>
              <li>Hemel Hempstead, HP1 3LE</li>
              <li style={{ marginTop: 8 }}><a href="tel:+447944731768">07944 731768</a></li>
              <li><a href="mailto:info@rccgthg.org">info@rccgthg.org</a></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/departments">Departments</Link></li>
              <li><Link href="/sermons">Sermons</Link></li>
              <li><Link href="/devotionals">Devotionals</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/give">Give</Link></li>
            </ul>
          </div>
          <div>
            <h4>Gatherings</h4>
            <ul>
              <li>Sunday — 10:00am</li>
              <li>Tuesday — 7:00pm</li>
              <li>Wednesday — 7:00pm</li>
              <li>Men&apos;s Prayer — 1st Sun 5pm</li>
            </ul>
          </div>
        </div>
        <div className="fline">
          <span>© 2026 RCCG Treasure House of God · Registered Charity No. 1147670 · Company No. 07324586</span>
          <span><a href="#">Privacy &amp; Cookies</a> · <a href="#">Safeguarding</a></span>
        </div>
      </div>
    </footer>
  )
}
