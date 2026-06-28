import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Departments } from './collections/Departments'
import { Events } from './collections/Events'
import { Sermons } from './collections/Sermons'
import { Devotionals } from './collections/Devotionals'
import { ServiceTimes } from './globals/ServiceTimes'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { seedDatabase } from './seedData'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // Match the live site, which uses a light "paper" palette.
    theme: 'light',
    meta: {
      titleSuffix: ' — Treasure House of God',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
    },
  },
  // Order here = order shown in the admin sidebar
  collections: [Pages, Departments, Events, Sermons, Devotionals, Media, Users],
  globals: [Navigation, ServiceTimes, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./thg.db',
      // Used only in production (e.g. a hosted Turso libSQL database).
      // Locally this is undefined and the file database above is used.
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  // Ensure starter content exists on startup. Idempotent: only creates what's
  // missing (by slug) and never overwrites your edits.
  onInit: async (payload) => {
    try {
      await seedDatabase(payload)
    } catch (err) {
      payload.logger.error(`Seed on init failed: ${err}`)
    }
  },
})
