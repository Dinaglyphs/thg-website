/**
 * Idempotent content seeding. Safe to call repeatedly — it only creates a
 * record if one with the same slug doesn't already exist, and never deletes
 * anything. Called automatically on server start (payload.config onInit) and
 * by the `npm run seed` command.
 */
export async function seedDatabase(payload: any) {
  const ensure = async (collection: string, slug: string, data: Record<string, unknown>) => {
    const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 })
    if (existing.totalDocs === 0) {
      await payload.create({ collection, data: { slug, ...data } })
    }
  }

  // ---- Departments ----
  const ministries: [string, string, string][] = [
    ['children', 'Children', 'A safe, joyful, Bible-based space where children are loved, taught and nurtured each Sunday.'],
    ['youth', 'Youth', 'A community where young people grow in faith, confidence and purpose, and build real friendships.'],
    ['workers-in-training', 'Workers in Training', 'Discipleship and equipping for those preparing to serve and lead within the house.'],
    ['choir', 'Choir', 'Leading the congregation into heartfelt, Spirit-led worship through song each week.'],
    ['creative-arts-drama', 'Creative Arts & Drama', 'Telling the gospel story through drama, media and the creative arts.'],
    ['house-fellowship', 'House Fellowship', 'Smaller groups meeting midweek to pray, study the Word, and do life together.'],
    ['good-women', 'Good Women', 'A fellowship of women supporting, praying for and building one another up.'],
    ['mens-fellowship', "Men's Fellowship", 'Men growing together in faith, accountability, brotherhood and service.'],
  ]
  for (let i = 0; i < ministries.length; i++) {
    const [slug, title, excerpt] = ministries[i]
    await ensure('departments', slug, { title, excerpt, kind: 'ministry', order: i + 1 })
  }
  const teams: [string, string, string][] = [
    ['evangelism', 'Evangelism', 'Sharing the good news, near and far.'],
    ['ushering-protocol', 'Ushering & Protocol', 'A warm, ordered welcome every week.'],
    ['sunday-school', 'Sunday School', 'Grounding the church in the Word.'],
    ['media-publication', 'Media & Publication', 'Telling our story across platforms.'],
    ['welfare', 'Welfare', 'Caring practically for the church family.'],
    ['first-timers', 'First Timers', 'Looking after everyone who is new.'],
    ['decoration', 'Decoration', 'Preparing a beautiful place to worship.'],
    ['baptismal-class', 'Baptismal Class', 'Walking with new believers.'],
  ]
  for (let i = 0; i < teams.length; i++) {
    const [slug, title, excerpt] = teams[i]
    await ensure('departments', slug, { title, excerpt, kind: 'team', order: 100 + i })
  }

  // ---- Events ----
  await ensure('events', 'holy-ghost-service-jul', {
    title: 'Holy Ghost Service', date: '2026-07-03', time: '6:30pm',
    location: 'Gadebridge Community Centre', format: 'in-person', featured: true, registrationEnabled: true,
    excerpt: 'Our monthly night of worship, the Word and prayer — a global RCCG programme hosted here in Hemel Hempstead.',
  })
  await ensure('events', 'womens-vigil-jul', {
    title: "Women's Vigil", date: '2026-07-31', time: '9:00pm', location: 'Streamed live',
    format: 'online', registrationEnabled: true, excerpt: 'A night of prayer and worship for the women of the house.',
  })
  await ensure('events', 'mens-prayer-breakfast-aug', {
    title: "Men's Prayer Breakfast", date: '2026-08-02', time: '5:00pm',
    location: 'Gadebridge Community Centre', format: 'in-person', registrationEnabled: true,
    excerpt: 'Men gathering to pray and break bread together.',
  })
  await ensure('events', 'community-outreach-day-aug', {
    title: 'Community Outreach Day', date: '2026-08-15', time: '11:00am', location: 'Town centre',
    format: 'in-person', registrationEnabled: true, excerpt: 'Serving and blessing our town together.',
  })

  // ---- Sermons ----
  await ensure('sermons', 'with-god-all-things-are-possible', { title: 'With God, All Things Are Possible', date: '2026-06-21', speaker: 'Pastor (THG)' })
  await ensure('sermons', 'anchored-in-hope', { title: 'Anchored in Hope', date: '2026-06-14', speaker: 'Pastor (THG)' })
  await ensure('sermons', 'the-fathers-heart', { title: "The Father's Heart", date: '2026-06-07', speaker: 'Pastor (THG)' })
  await ensure('sermons', 'faith-that-works', { title: 'Faith That Works', date: '2026-05-31', speaker: 'Pastor (THG)' })

  // ---- Devotionals ----
  await ensure('devotionals', 'be-still-and-know', {
    title: 'Be still, and know', date: '2026-06-27', scriptureRef: 'Psalm 46:10',
    scriptureText: '“He says, ‘Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.’”',
    thought: 'In a week that asks so much of you, God’s invitation is the opposite of striving: be still. Stillness here is not idleness — it is trust. Before the noise of today begins, give Him the first quiet minute.',
    prayer: 'Father, quiet my heart. Help me to trust You with what I cannot control, and to walk through today knowing You are God. Amen.',
  })
  await ensure('devotionals', 'strength-for-the-weary', {
    title: 'Strength for the weary', date: '2026-06-26', scriptureRef: 'Isaiah 40:29',
    scriptureText: '“He gives strength to the weary and increases the power of the weak.”',
    thought: 'When you have nothing left, God is not impatient with your weakness — He meets it with His strength.',
  })
  await ensure('devotionals', 'a-lamp-to-my-feet', {
    title: 'A lamp to my feet', date: '2026-06-25', scriptureRef: 'Psalm 119:105',
    scriptureText: '“Your word is a lamp for my feet, a light on my path.”',
    thought: 'God rarely lights the whole road — just the next step. That is enough to keep walking.',
  })
  await ensure('devotionals', 'cast-your-cares', {
    title: 'Cast your cares', date: '2026-06-24', scriptureRef: '1 Peter 5:7',
    scriptureText: '“Cast all your anxiety on him because he cares for you.”',
    thought: 'The same God who holds the nations invites you to hand Him today’s worries. He can carry what you cannot.',
  })

  // ---- Pages (editable page headers) ----
  const pages: [string, string, string, string, string][] = [
    // slug, title, eyebrow, heading, intro
    ['home', 'Home', 'Welcome home', 'Come, taste and see that the Lord is good.', 'A warm, Bible-believing church family where God is perfecting destinies and restoring hope.'],
    ['about', 'About', 'About us', 'Perfecting destinies, restoring hope.', 'A Pentecostal, Bible-believing family in Hemel Hempstead — local and personal, yet part of a global church.'],
    ['im-new', "I'm New", "I'm new", "We've saved you a seat.", 'Walking into a new church can feel daunting. So here’s exactly what to expect before you come — no surprises, just a warm welcome.'],
    ['departments', 'Departments', 'Get involved', "There's a place for everyone", 'From our youngest children to our elders, every person matters and every gift has a use. Explore our departments and find where you belong.'],
    ['sermons', 'Sermons', 'Sermons', 'The Word for your week', 'Missed a Sunday, or want to go deeper? Watch and listen to recent messages — filter by series, speaker or topic.'],
    ['devotionals', 'Devotionals', 'Devotionals', 'The Word for today', 'A short daily devotional — a passage of Scripture, a thought to carry, and a prayer. Start each day anchored in God’s Word.'],
    ['events', 'Events', 'Events', "What's on at Treasure House", 'Conferences, programmes and special services — in person and online. Each event has its own page where you can read the details and register to save your place.'],
    ['give', 'Give', 'Giving', 'Your giving goes a long way', 'Everything we do — worship, discipleship, and serving our community — is made possible by the generosity of people like you. Thank you for partnering with us.'],
    ['contact', 'Contact', 'Contact', "We'd love to hear from you", 'A question, a prayer request, or just want to say hello before you visit? Reach out — a real person will reply.'],
  ]
  for (const [slug, title, eyebrow, heading, intro] of pages) {
    await ensure('pages', slug, { title, hero: { eyebrow, heading, intro } })
  }

  // ---- Globals (only set if not already configured) ----
  const st: any = await payload.findGlobal({ slug: 'service-times' })
  if (!st?.services || st.services.length === 0) {
    await payload.updateGlobal({
      slug: 'service-times',
      data: {
        services: [
          { cadence: 'weekly', when: 'Sunday', name: 'Main Service', time: '10:00am' },
          { cadence: 'weekly', when: 'Tuesday', name: 'Bible Study', time: '7:00pm' },
          { cadence: 'weekly', when: 'Wednesday', name: 'Mid-week Prayers', time: '7:00pm' },
          { cadence: 'monthly', when: '1st Sunday', name: "Men's Prayer", time: '5:00pm' },
          { cadence: 'monthly', when: '1st Friday', name: 'Holy Ghost Service', time: 'TBC' },
          { cadence: 'monthly', when: 'Last Friday', name: "Women's Vigil", time: 'TBC' },
        ],
      },
    })
  }

  const navg: any = await (payload as any).findGlobal({ slug: 'navigation' })
  if (!navg?.header || navg.header.length === 0) {
    await (payload as any).updateGlobal({
      slug: 'navigation',
      data: {
        header: [
          { label: 'About', href: '/about' },
          { label: 'Departments', href: '/departments' },
          { label: 'Media', children: [
            { label: 'Sermons', href: '/sermons' },
            { label: 'Devotionals', href: '/devotionals' },
          ] },
          { label: 'Events', href: '/events' },
          { label: 'Contact', href: '/contact' },
          { label: "I'm New", href: '/im-new' },
        ],
        footer: [
          { heading: 'Visit Us', links: [
            { label: 'Gadebridge Community Centre' },
            { label: 'The Nokes, Galley Hill' },
            { label: 'Hemel Hempstead, HP1 3LE' },
            { label: '07944 731768', href: 'tel:+447944731768' },
            { label: 'info@rccgthg.org', href: 'mailto:info@rccgthg.org' },
          ] },
          { heading: 'Explore', links: [
            { label: 'About', href: '/about' },
            { label: 'Departments', href: '/departments' },
            { label: 'Sermons', href: '/sermons' },
            { label: 'Devotionals', href: '/devotionals' },
            { label: 'Events', href: '/events' },
            { label: 'Give', href: '/give' },
          ] },
          { heading: 'Gatherings', links: [
            { label: 'Sunday — 10:00am' },
            { label: 'Tuesday — 7:00pm' },
            { label: 'Wednesday — 7:00pm' },
            { label: "Men's Prayer — 1st Sun 5pm" },
          ] },
        ],
      },
    })
  }
}
