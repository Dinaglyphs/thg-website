import type { CollectionConfig } from 'payload'

// Admin/editor accounts. Authentication is enabled so people can log in to the CMS.
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team Member', plural: 'Team & Admins' },
  auth: true,
  admin: {
    useAsTitle: 'name',
    group: 'Settings',
    description: 'People who can log in and edit the website.',
  },
  fields: [
    { name: 'name', type: 'text', label: 'Full name', required: true },
    {
      name: 'role',
      type: 'select',
      label: 'Access level',
      defaultValue: 'editor',
      options: [
        { label: 'Editor (edit content)', value: 'editor' },
        { label: 'Administrator (full access)', value: 'admin' },
      ],
    },
  ],
}
