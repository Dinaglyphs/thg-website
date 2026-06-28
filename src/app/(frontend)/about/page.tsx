import { getPageHero } from '@/lib/page'

export const metadata = { title: 'About' }
export const dynamic = 'force-dynamic'

// ---- The mission & vision of the RCCG (applies to every parish) ----
const MISSION: string[] = [
  'To make heaven.',
  'To take as many people with us.',
  'To have a member of the RCCG in every family of all nations.',
  'To accomplish No. 1 above, holiness will be our lifestyle.',
  'To accomplish No. 2 and 3 above, we will plant churches within five minutes walking distance in every city and town of developing countries, and within five minutes driving distance in every city and town of developed countries.',
  'We will pursue these objectives until every nation in the world is reached for the Lord Jesus Christ.',
]

// ---- Our beliefs — the RCCG statement of faith, grouped for reading ----
type Belief = { h: string; p: string }
type BeliefGroup = { group: string; items: Belief[] }

const BELIEFS: BeliefGroup[] = [
  {
    group: 'God and His Word',
    items: [
      { h: 'The Bible', p: 'The entire Scripture, both Old and New Testaments, is written by the inspiration of the Holy Spirit. It is the written and revealed will of God, holy and unchangeable; the heavens and the earth may pass away, but the Word of God stands forever (II Tim. 3:16–17; II Peter 1:21; Matt. 24:35).' },
      { h: 'About God', p: 'There is only one God, the Creator of all things visible and invisible. He alone exists forever, and in Him every creature receives life (Gen. 1:1; Isa. 43:10–11; John 1:1–3; John 5:26).' },
      { h: 'About Jesus Christ', p: 'Jesus is the Son of God and God revealed in the flesh, born of the Virgin Mary. Through Him all things were made. By His death on the cross and His resurrection He brought redemption and took away the sin of the world (John 1:1–14; Isa. 53:5–6; I Pet. 2:24; I Cor. 15:3).' },
      { h: 'About the Holy Spirit', p: 'The Holy Spirit is the third Person of the Trinity, of the same power and glory as the Father and the Son. He regenerates, teaches, sanctifies, empowers and gives gifts to believers (John 14:16–17; Acts 1:8; I Cor. 12:7).' },
      { h: 'The Trinity', p: 'God the Father, God the Son and God the Holy Spirit are one God in three Persons — one in Trinity (Matt. 3:16–17; Matt. 28:19; II Cor. 13:14).' },
      { h: 'About the Devil', p: 'There is a devil who seeks the downfall of every person and brought sin, sickness and death into the world. He and his followers will finally be cast into the lake of fire (Gen. 3:1–16; I Peter 5:8; Rev. 20:10).' },
      { h: 'About Man', p: 'God formed man of the dust of the ground and breathed into him the breath of life. Man is of three parts — body, soul and spirit — and is God’s ambassador on earth, set above the rest of creation (Gen. 1:26–28; Gen. 2:7).' },
    ],
  },
  {
    group: 'The way of salvation',
    items: [
      { h: 'Repentance', p: 'Repentance is godly sorrow for sin with a decision to turn away from it (Acts 3:19; II Cor. 7:10; Isa. 55:7).' },
      { h: 'Justification (New Birth)', p: 'By God’s grace, through faith in the blood of Jesus, we are cleansed from our sins and stand before God as though we had never sinned (Rom. 5:1; Titus 3:5; John 3:3–5).' },
      { h: 'Sanctification (Holiness)', p: 'Sanctification is the grace by which the soul is progressively and completely cleansed, wrought through faith in the blood of Jesus after we are justified (I Thess. 4:3; Heb. 12:14; I Peter 1:16).' },
      { h: 'Water Baptism', p: 'Every saved soul should receive immersion baptism in the name of the Father, the Son and the Holy Spirit — an outward sign of true repentance and of being joined with Christ in His death, burial and resurrection (Matt. 28:19; Rom. 6:1–4).' },
      { h: 'Baptism of the Holy Spirit', p: 'Every born-again believer should ask for the Holy Spirit, the promise of the Father given to those who obey Him. The evidence of this baptism is speaking in tongues (Luke 24:49; Acts 2:4; Acts 2:38–39).' },
      { h: 'Restitution', p: 'Restitution is a sign of true repentance — putting right whatever cannot give a clear conscience before God and man (Lev. 6:1–7; Luke 19:8; Prov. 28:13).' },
    ],
  },
  {
    group: 'The Christian life',
    items: [
      { h: 'Prayer', p: 'We are commanded to pray without ceasing, in the name of Jesus and in faith. The Holy Spirit helps us in prayer, and the apostles put prayer first in their lives (I Thess. 5:17; John 16:23; Rom. 8:26; Acts 6:4).' },
      { h: 'Divine Healing', p: 'Healing is part of the gospel. By the stripes of Jesus we are healed; we obtain healing through prayer, agreement, the laying on of hands and the ministry of the elders, offered freely (Isa. 53:4–5; James 5:14–15; Matt. 10:8).' },
      { h: 'Holy Communion', p: 'Instituted by our Lord shortly before His death, Christians gather regularly to share the bread and the cup until He comes again (Luke 22:17–20; I Cor. 11:23–30).' },
      { h: 'The Church of God', p: 'The born-again, the sanctified in Christ Jesus, are the Church of God. They gather to worship in spirit and in truth, with Christ as the head, and their assignment is to spread the gospel to all nations (Eph. 1:22; Acts 2:41–47; Matt. 28:19).' },
      { h: 'The Lord’s Day', p: 'The first day of the week, Sunday, is set apart as the Lord’s day, on which believers gather to worship, for the Lord rose on the first day of the week (Acts 20:7; Rev. 1:10; Mark 16:9).' },
      { h: 'Holy Matrimony', p: 'Marriage is honourable in all and may be solemnised in the church. We hold to one husband and one wife, with divorce permitted only on the grounds of adultery (Heb. 13:4; Matt. 19:4–6; Matt. 5:31–32).' },
      { h: 'Dedication of Children', p: 'After a child is born, parents bring the child to the house of the Lord to be dedicated unto Him (1 Sam. 1:22; Matt. 19:13–15).' },
      { h: 'Holiness & Separation', p: 'God has called us unto holiness. The dedicated Christian lives a separated life, modest in adornment and conduct, a hearer and a doer of the Word (I Thess. 4:7; Rom. 12:1–2; I Peter 1:15–16).' },
      { h: 'Respect for Authority', p: 'Christians obey the law of the land and the governing authorities, honour their parents and elders, and submit to their spiritual leaders (Rom. 13:1–5; Eph. 6:1–3; Heb. 13:17).' },
      { h: 'Free from Debt', p: 'Believers are encouraged not to enter willingly into debts they cannot repay, for Scripture says, “Owe no man anything, but to love one another” (Rom. 13:7–8).' },
    ],
  },
  {
    group: 'The blessed hope',
    items: [
      { h: 'The Dead in Christ', p: 'Those who sleep in the Lord are already with Christ. We do not sorrow as those who have no hope, nor do we worship the dead (Phil. 1:21–23; I Thess. 4:13–18).' },
      { h: 'Resurrection', p: 'There is a resurrection of the body. Jesus taught that the buried body will be raised at the last day; the holy to everlasting life, sinners to judgement (I Cor. 15:42–44; John 5:28–29; Dan. 12:2).' },
      { h: 'The Second Coming', p: 'Jesus Christ will return visibly and bodily — first to receive His Bride in the air, and then to the earth to judge the ungodly (Acts 1:9–11; I Thess. 4:15–17; Rev. 19:11–21).' },
      { h: 'The Millennial Reign', p: 'After Christ appears on the earth He will set up His kingdom with His holy people for a thousand years — a reign of peace in which Satan is bound (Rev. 20:1–6; Isa. 65:18–25).' },
      { h: 'The Coming Judgements', p: 'There will be the judgement of believers, the judgement of the nations, and the white-throne judgement of unbelievers (II Cor. 5:10; Acts 17:31; Rev. 20:11–15).' },
      { h: 'New Heaven & New Earth', p: 'After judgement, God will make a new heaven and a new earth in which holiness dwells (II Peter 3:12–13; Rev. 21:1–3; Isa. 65:17).' },
      { h: 'Eternal Life & Eternal Punishment', p: 'Scripture teaches both eternal life for the righteous and eternal punishment for the wicked (Matt. 25:46; Mark 9:43–44; Rev. 14:10–11).' },
    ],
  },
]

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

      {/* THG local story */}
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

      {/* RCCG history */}
      <section className="panel-indigo">
        <div className="wrap">
          <div className="sec-head"><h2 style={{ color: '#fff' }}>Our history</h2><p className="intro muted">The story of the Redeemed Christian Church of God — the family we belong to.</p></div>
          <div className="editorial" style={{ marginTop: 8 }}>
            <div className="prose">
              <p className="muted">In July 1909, a son was born into the Akindayomi family of Ondo State, Nigeria. Though he grew up surrounded by idol worship, he yearned to know the God who created the earth and everyone on it. That pursuit led him through the Church Missionary Society, where he was baptised in 1927, and on to a deepening walk with God.</p>
              <p className="muted">For seven years he resisted a voice within him saying, “You will be my servant.” Broken and wholly dependent on grace, he finally yielded: “Lord, I will go wherever you want me to go.” In 1952, persuaded to leave his former church, Pa Josiah Akindayomi began a house fellowship in Lagos — the Glory of God Fellowship. It started with nine members but grew rapidly as news of God’s miracles spread.</p>
              <p className="muted">In a vision, words appeared as though written on a blackboard: “The Redeemed Christian Church of God.” Though Pa Akindayomi could neither read nor write, he was supernaturally able to write them down. God promised that this church would go to the ends of the earth, and established a covenant with him — that He would meet the needs of the church in an awesome way if its members served Him faithfully and obeyed His Word. On that covenant the RCCG was built, and so the church was born in 1952.</p>
              <p className="muted">In 1973 a young University of Lagos mathematics lecturer, Enoch Adejare Adeboye, joined the church and began interpreting Pa Akindayomi’s sermons from Yoruba into English. He was ordained a pastor in 1975, and following Pa Akindayomi’s passing he became the General Overseer in 1981.</p>
              <p className="muted">Since then the church has grown explosively — tens of thousands of parishes across Nigeria and a presence in over 190 nations. Among its best-known programmes is the Holy Ghost Service, an all-night miracle service held on the first Friday of every month, now mirrored across the United Kingdom, the United States, Canada, South Africa, India and beyond. Treasure House of God is one parish in that worldwide family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section>
        <div className="wrap">
          <div className="sec-head"><h2>Mission &amp; vision</h2><p className="intro muted">The mandate that shapes every RCCG parish, ours included.</p></div>
          <div className="olist is-2">
            {MISSION.map((m, i) => (
              <div className="o" style={{ paddingTop: 30 }} key={i}>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', color: 'var(--gold)', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                <p style={{ marginTop: 10 }}>{m}</p>
              </div>
            ))}
          </div>
          <p className="serif-it" style={{ color: 'var(--indigo)', fontSize: '1.4rem', marginTop: 34, maxWidth: '40ch' }}>&ldquo;To make heaven, and to take as many people as possible with us.&rdquo;</p>
          <p className="muted">— The RCCG mandate</p>
        </div>
      </section>

      {/* Our beliefs */}
      <section className="quiet" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head"><h2>What we believe</h2><p className="intro muted">Our faith rests on the whole of Scripture. This is the statement of faith we share with the Redeemed Christian Church of God worldwide.</p></div>
          {BELIEFS.map((grp) => (
            <div key={grp.group} style={{ marginTop: 44 }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--gold)', letterSpacing: '.04em', textTransform: 'uppercase' }}>{grp.group}</h3>
              <div className="olist is-2" style={{ marginTop: 6 }}>
                {grp.items.map((b) => (
                  <div className="o" style={{ paddingTop: 26 }} key={b.h}>
                    <h4 style={{ fontFamily: 'var(--display)', fontSize: '1.15rem', color: 'var(--ink)' }}>{b.h}</h4>
                    <p className="muted" style={{ marginTop: 8 }}>{b.p}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="quiet">
        <div className="wrap"><h2 style={{ marginTop: 0 }}>Come and see for yourself this Sunday.</h2><a className="btn btn--accent" href="/im-new">I&apos;m new here <span className="arw">→</span></a></div>
      </section>
    </>
  )
}
