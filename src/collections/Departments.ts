import type { CollectionConfig } from 'payload'

// Departments / ministries (Children, Youth, Choir, etc.)
export const Departments: CollectionConfig = {
  slug: 'departments',
  labels: { singular: 'Department', plural: 'Departments' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'order'],
    description: 'The ministries and serving teams of the church.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Name' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly name, e.g. "youth". Lowercase, no spaces.' },
    },
    {
      name: 'kind',
      type: 'select',
      label: 'Type',
      defaultValue: 'ministry',
      options: [
        { label: 'Featured ministry (shows as a card)', value: 'ministry' },
        { label: 'Serving team (shows in the list)', value: 'team' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Short description',
      admin: { description: 'One or two sentences shown on the card.' },
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Photo' },
    { name: 'body', type: 'richText', label: 'Full description (optional)' },
    {
      name: 'order',
      type: 'number',
      label: 'Display order',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
}
