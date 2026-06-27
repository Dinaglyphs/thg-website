import type { GlobalConfig } from 'payload'

// Church-wide details used in the header, footer and contact pages.
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true },
  admin: { group: 'Settings', description: 'Contact details, social links, giving and governance info.' },
  fields: [
    {
      type: 'group',
      name: 'contact',
      label: 'Contact & location',
      fields: [
        { name: 'venue', type: 'text', defaultValue: 'Gadebridge Community Centre' },
        { name: 'addressLine', type: 'text', defaultValue: 'The Nokes, Galley Hill' },
        { name: 'town', type: 'text', defaultValue: 'Hemel Hempstead' },
        { name: 'postcode', type: 'text', defaultValue: 'HP1 3LE' },
        { name: 'phone', type: 'text', defaultValue: '07944 731768' },
        { name: 'email', type: 'text', defaultValue: 'info@rccgthg.org' },
      ],
    },
    {
      type: 'group',
      name: 'social',
      label: 'Social links',
      fields: [
        { name: 'instagram', type: 'text', defaultValue: 'https://www.instagram.com/rccgthg/' },
        { name: 'facebook', type: 'text', defaultValue: 'https://www.facebook.com/rccg.treasurehouse' },
        { name: 'youtube', type: 'text' },
        { name: 'x', type: 'text', defaultValue: 'https://x.com/rccgthg' },
      ],
    },
    {
      type: 'group',
      name: 'giving',
      label: 'Giving (bank transfer)',
      fields: [
        { name: 'accountName', type: 'text', defaultValue: 'RCCG Treasure House of God' },
        { name: 'sortCode', type: 'text' },
        { name: 'accountNumber', type: 'text' },
        { name: 'reference', type: 'text', defaultValue: 'Tithe / Offering / Building' },
      ],
    },
    {
      type: 'group',
      name: 'governance',
      label: 'Governance (footer)',
      fields: [
        { name: 'charityNumber', type: 'text', defaultValue: '1147670' },
        { name: 'companyNumber', type: 'text', defaultValue: '07324586' },
      ],
    },
  ],
}
