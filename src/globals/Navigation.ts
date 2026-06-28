import type { GlobalConfig } from 'payload'

// The top menu and the footer link columns. Everything here is editable, and
// every list can be dragged into a new order in the admin.
export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation & Footer',
  access: { read: () => true },
  admin: {
    group: 'Settings',
    description: 'The top menu and the footer. Drag any row by its handle to reorder.',
  },
  fields: [
    {
      name: 'header',
      label: 'Top menu',
      type: 'array',
      labels: { singular: 'Menu item', plural: 'Menu items' },
      admin: { description: 'Links in the top navigation bar. Drag to reorder. Add sub-links to turn an item into a dropdown (e.g. “Media”).' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', label: 'Link', admin: { description: 'e.g. /about — leave blank if this item only opens a dropdown.' } },
        {
          name: 'children',
          label: 'Dropdown sub-links',
          type: 'array',
          labels: { singular: 'Sub-link', plural: 'Sub-links' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', label: 'Link', required: true },
          ],
        },
      ],
    },
    {
      name: 'footer',
      label: 'Footer columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      admin: { description: 'Each footer column has a heading and a list of items. Drag columns or items to reorder.' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          label: 'Items',
          type: 'array',
          labels: { singular: 'Item', plural: 'Items' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', label: 'Link (optional)', admin: { description: 'Leave blank to show as plain text (e.g. an address line).' } },
          ],
        },
      ],
    },
  ],
}
