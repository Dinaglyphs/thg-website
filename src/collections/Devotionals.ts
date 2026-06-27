import type { CollectionConfig } from 'payload'

// Daily devotionals — Scripture, a thought, and a prayer.
export const Devotionals: CollectionConfig = {
  slug: 'devotionals',
  labels: { singular: 'Devotional', plural: 'Devotionals' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'scriptureRef'],
    description: 'A short daily devotional. The most recent one shows as "Today\'s Word".',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'scriptureRef', type: 'text', label: 'Scripture reference', admin: { description: 'e.g. "Psalm 46:10"' } },
    { name: 'scriptureText', type: 'textarea', label: 'Scripture quote' },
    { name: 'thought', type: 'textarea', label: 'Devotional thought' },
    { name: 'body', type: 'richText', label: 'Longer reflection (optional)' },
    { name: 'prayer', type: 'textarea', label: 'Prayer' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Image (optional)' },
  ],
}
