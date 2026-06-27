import type { CollectionConfig } from 'payload'

// Sermons — audio/video messages, filterable by series and speaker.
export const Sermons: CollectionConfig = {
  slug: 'sermons',
  labels: { singular: 'Sermon', plural: 'Sermons' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'speaker', 'date'],
    description: 'Recorded messages. Paste a YouTube link once the channel is live.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Sermon title' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'speaker', type: 'text', label: 'Speaker' },
    { name: 'series', type: 'text', label: 'Series (optional)' },
    { name: 'videoUrl', type: 'text', label: 'YouTube/video URL' },
    { name: 'audioUrl', type: 'text', label: 'Audio URL (optional)' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', label: 'Thumbnail image' },
    { name: 'description', type: 'richText', label: 'Description / notes' },
  ],
}
