import { getPayload } from 'payload'
import config from './payload.config'

/**
 * Seeds the CMS with the current site content. Safe to run repeatedly:
 * it only creates a record if one with the same slug doesn't already exist,
 * and it never deletes anything you've added.
 *
 * Run with:  npm run seed
 */
const seed = async () => {
  const payload = await getPayload({ config })

  // create a record if its slug isn't already present
  const ensure = async (collection: any, slug: string, data: Record<string, unknown>) => {
    const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 })
    if (existing.totalDocs === 0) {
      await payload.create({ collection, data: { slug, ...data } })
      payload.logger.info(`  + ${collection}: ${slug}`)
    }
  }

  // ---- first admin (if none) ----
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { name: 'Admin', email: 'admin@rccgthg.org', password: 'changeme123', role: 'admin' },
    })
    payload.logger.info('✓ Created default admin → admin@rccgthg.org / changeme123 (change this!)')
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
  await ensure('sermons', 'with-god-all-things-are-possible', {
    title: 'With God, All Things Are Possible', date: '2026-06-21', speaker: 'Pastor (THG)',
  })
  await ensure('sermons', 'anchored-in-hope', {
    title: 'Anchored in Hope', date: '2026-06-14', speaker: 'Pastor (THG)',
  })
  await ensure('sermons', 'the-fathers-heart', {
    title: "The Father's Heart", date: '2026-06-07', speaker: 'Pastor (THG)',
  })
  await ensure('sermons', 'faith-that-works', {
    title: 'Faith That Works', date: '2026-05-31', speaker: 'Pastor (THG)',
  })

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

  // ---- Globals ----
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
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      contact: {
        venue: 'Gadebridge Community Centre', addressLine: 'The Nokes, Galley Hill',
        town: 'Hemel Hempstead', postcode: 'HP1 3LE', phone: '07944 731768', email: 'info@rccgthg.org',
      },
      social: {
        instagram: 'https://www.instagram.com/rccgthg/',
        facebook: 'https://www.facebook.com/rccg.treasurehouse',
        x: 'https://x.com/rccgthg',
      },
      giving: { accountName: 'RCCG Treasure House of God', reference: 'Tithe / Offering / Building' },
      governance: { charityNumber: '1147670', companyNumber: '07324586' },
    },
  })

  payload.logger.info('✓ Seed complete.')
  process.exit(0)
}

seed()
