import type { CollectionConfig } from 'payload'

// Flexible content pages (e.g. About, I'm New, Give, Contact copy).
// The main designed pages are coded routes; this lets admins edit their text.
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  access: { read: () => true },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    description: 'Editable text for the main pages.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'e.g. "about", "im-new", "give", "contact".' },
    },
    {
      type: 'group',
      name: 'hero',
      label: 'Page header',
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Small label' },
        { name: 'heading', type: 'text', label: 'Heading' },
        { name: 'intro', type: 'textarea', label: 'Intro paragraph' },
      ],
    },
    { name: 'body', type: 'richText', label: 'Main content' },
    {
      type: 'group',
      name: 'nav',
      label: 'Navigation placement',
      admin: { description: 'Optionally add this page to the top menu and/or the footer.' },
      fields: [
        { name: 'showInHeader', type: 'checkbox', label: 'Show in the top menu' },
        {
          name: 'footerColumn',
          type: 'text',
          label: 'Footer column',
          admin: { description: 'To show in the footer, type the exact heading of a footer column (e.g. “Explore”). Leave blank to hide from the footer.' },
        },
        { name: 'navLabel', type: 'text', label: 'Menu label (optional)', admin: { description: 'Overrides the page title in the menus.' } },
        { name: 'order', type: 'number', label: 'Order', admin: { description: 'Lower numbers appear first among page links.' } },
      ],
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
