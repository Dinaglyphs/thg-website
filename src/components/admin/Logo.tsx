import React from 'react'

// Shown on the CMS login screen.
export default function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '8px 0' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/rccg-emblem.png" alt="Treasure House of God" width={92} height={92} />
      <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '1.4rem', fontWeight: 600 }}>
        Treasure House of God
      </div>
      <div style={{ fontSize: '.68rem', letterSpacing: '.22em', textTransform: 'uppercase', opacity: 0.6 }}>
        RCCG · Hemel Hempstead
      </div>
    </div>
  )
}
