import type { CollectionConfig } from 'payload'

// The media library — uploaded photos and files used across the site.
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image / File', plural: 'Media Library' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    description: 'Upload photos and PDFs here, then select them on pages, departments, events, etc.',
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'card', width: 800, height: 640, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
      { name: 'thumbnail', width: 400, height: 320, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text',
      required: true,
      admin: { description: 'A short description of the image (helps accessibility & SEO).' },
    },
  ],
}
