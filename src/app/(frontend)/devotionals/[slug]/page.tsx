import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { fullDate } from '@/lib/format'
import { IMG } from '@/lib/images'

export const dynamic = 'force-dynamic'

async function getDevotional(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'devotionals',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] as any
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = await getDevotional(slug)
  return { title: d ? d.title : 'Devotional' }
}

export default async function DevotionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = await getDevotional(slug)
  if (!d) notFound()

  const img = (d.image && typeof d.image === 'object' && d.image.url) || IMG.scripture
  const hasBody = d.body && typeof d.body === 'object'

  return (
    <article className="devotional">
      {/* banner */}
      <section style={{ padding: 0, position: 'relative' }}>
        <div className="dev-banner">
          <img className="img" src={img} alt="" />
          <div className="dev-banner__veil" />
          <div className="wrap dev-banner__inner">
            <Link className="dev-back" href="/devotionals">← Devotionals</Link>
            <span className="label" style={{ color: 'var(--gold)' }}>{fullDate(d.date)}</span>
            <h1>{d.title}</h1>
            {d.scriptureRef && <p className="dev-ref">{d.scriptureRef}</p>}
          </div>
        </div>
      </section>

      {/* body */}
      <section>
        <div className="wrap dev-body">
          {d.scriptureText && (
            <blockquote className="dev-scripture">
              {d.scriptureText}
              {d.scriptureRef && <cite>— {d.scriptureRef}</cite>}
            </blockquote>
          )}

          {d.thought && <p className="dev-lead">{d.thought}</p>}

          {hasBody && (
            <div className="prose dev-rich">
              <RichText data={d.body} />
            </div>
          )}

          {d.prayer && (
            <div className="dev-prayer">
              <span className="label">Prayer</span>
              <p>{d.prayer}</p>
            </div>
          )}

          <div className="dev-foot">
            <Link className="tlink" href="/devotionals">← Back to all devotionals</Link>
            <Link className="btn btn--accent" href="/im-new">Plan your visit <span className="arw">→</span></Link>
          </div>
        </div>
      </section>
    </article>
  )
}
