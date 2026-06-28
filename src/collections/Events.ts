import type { CollectionConfig } from 'payload'

// Individual, dated events (conferences, programmes, special services) with registration.
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'format'],
    description: 'One-off events and programmes. These appear on the Events page.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Event name' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true, label: 'Date', admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'time', type: 'text', label: 'Time', admin: { description: 'e.g. "6:30pm"' } },
    { name: 'location', type: 'text', label: 'Location', defaultValue: 'Gadebridge Community Centre' },
    {
      name: 'format',
      type: 'select',
      label: 'Format',
      defaultValue: 'in-person',
      options: [
        { label: 'In person', value: 'in-person' },
        { label: 'Online', value: 'online' },
      ],
    },
    { name: 'guest', type: 'text', label: 'Special guest / minister', admin: { description: 'Optional — e.g. "Pastor John Doe, Guest Minister".' } },
    { name: 'cost', type: 'text', label: 'Cost', admin: { description: 'Optional — e.g. "Free entry". Leave blank to hide.' } },
    { name: 'excerpt', type: 'textarea', label: 'Short description' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Image' },
    { name: 'body', type: 'richText', label: 'Full details' },
    {
      name: 'registrationEnabled',
      type: 'checkbox',
      label: 'Allow people to register',
      defaultValue: true,
    },
    { name: 'registrationUrl', type: 'text', label: 'External registration link', admin: { description: 'Optional — if set, the Register button links here. Otherwise it opens the on-page form.' } },
    { name: 'featured', type: 'checkbox', label: 'Feature at top of Events page', defaultValue: false },
  ],
}
