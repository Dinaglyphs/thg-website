import type { Access, CollectionConfig, FieldAccess } from 'payload'

// True only for logged-in Administrators.
const isAdmin: Access = ({ req }) => req.user?.role === 'admin'
const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

// Admin/editor accounts. Authentication is enabled so people can log in to the CMS.
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team Member', plural: 'Team & Admins' },
  auth: true,
  access: {
    // Only an Administrator can create new accounts (so no one else can
    // make themselves — or anyone else — an admin). There is no public
    // sign-up: once the first user exists, /admin only shows the login page.
    create: isAdmin,
    // Only an Administrator can delete accounts.
    delete: isAdmin,
    // Administrators see everyone; everyone else can only see their own account.
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return { id: { equals: req.user?.id } }
    },
    // Administrators can edit anyone; others can only edit their own account.
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return { id: { equals: req.user?.id } }
    },
  },
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
      // Only Administrators can set or change a role. This stops an Editor
      // from updating their own account to promote themselves to Admin.
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      options: [
        { label: 'Editor (edit content)', value: 'editor' },
        { label: 'Administrator (full access)', value: 'admin' },
      ],
    },
  ],
}
