'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const path = usePathname()
  const cur = (p: string) => (path === p ? { 'aria-current': 'page' as const } : {})
  const mediaActive = path === '/sermons' || path === '/devotionals'

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="wordmark" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rccg-emblem.png" alt="RCCG Treasure House of God" width={44} height={44} />
          <span>
            <span className="wm-name">Treasure House of God</span>
            <span className="wm-sub">RCCG · Hemel Hempstead</span>
          </span>
        </Link>

        <nav className="menu">
          <Link href="/about" {...cur('/about')}>About</Link>
          <Link href="/departments" {...cur('/departments')}>Departments</Link>

          <div className="has-sub">
            <button className={`menu-trigger${mediaActive ? ' active' : ''}`} type="button">
              Media<span className="caret">▾</span>
            </button>
            <div className="submenu">
              <Link href="/sermons" {...cur('/sermons')}>Sermons</Link>
              <Link href="/devotionals" {...cur('/devotionals')}>Devotionals</Link>
            </div>
          </div>

          <Link href="/events" {...cur('/events')}>Events</Link>
          <Link href="/contact" {...cur('/contact')}>Contact</Link>
          <Link href="/im-new" {...cur('/im-new')}>I&apos;m New</Link>
        </nav>

        <div className="header-cta">
          <Link className="btn btn--accent btn-mini" href="/give">Give</Link>
        </div>
      </div>
    </header>
  )
}
