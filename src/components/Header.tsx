'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV: { href: string; label: string }[] = [
  { href: '/about', label: 'About' },
  { href: '/departments', label: 'Departments' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/devotionals', label: 'Devotionals' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
  { href: '/im-new', label: "I'm New" },
]

export function Header() {
  const path = usePathname()
  const cur = (p: string) => (path === p ? { 'aria-current': 'page' as const } : {})
  const mediaActive = path === '/sermons' || path === '/devotionals'
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [path])

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
          <button
            className={`nav-toggle${open ? ' is-open' : ''}`}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`}>
        <nav>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} {...cur(item.href)} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="btn btn--accent" href="/give" onClick={() => setOpen(false)}>
            Give <span className="arw">→</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
