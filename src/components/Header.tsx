'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { HeaderItem, NavLink } from '@/lib/nav'

export function Header({ items }: { items: HeaderItem[] }) {
  const path = usePathname()
  const cur = (p?: string) => (p && path === p ? { 'aria-current': 'page' as const } : {})
  const isActive = (p?: string) => !!p && path === p
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [path])

  // Flatten for the mobile menu (dropdown children become top-level items).
  const flat: NavLink[] = []
  items.forEach((it) => {
    if (it.children?.length) it.children.forEach((c) => flat.push(c))
    else if (it.href) flat.push({ label: it.label, href: it.href })
  })

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
          {items.map((it, i) => {
            if (it.children?.length) {
              const active = it.children.some((c) => isActive(c.href))
              return (
                <div className="has-sub" key={i}>
                  <button className={`menu-trigger${active ? ' active' : ''}`} type="button">
                    {it.label}<span className="caret">▾</span>
                  </button>
                  <div className="submenu">
                    {it.children.map((c, j) => (
                      <Link key={j} href={c.href || '#'} {...cur(c.href)}>{c.label}</Link>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <Link key={i} href={it.href || '#'} {...cur(it.href)}>{it.label}</Link>
            )
          })}
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
          {flat.map((item, i) => (
            <Link key={i} href={item.href || '#'} {...cur(item.href)} onClick={() => setOpen(false)}>
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
