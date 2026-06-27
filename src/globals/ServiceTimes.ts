import type { GlobalConfig } from 'payload'

// The recurring weekly/monthly gatherings shown in "Our Services" and the footer.
export const ServiceTimes: GlobalConfig = {
  slug: 'service-times',
  label: 'Service Times',
  access: { read: () => true },
  admin: { group: 'Settings', description: 'Your regular weekly and monthly gatherings.' },
  fields: [
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      labels: { singular: 'Service', plural: 'Services' },
      admin: { description: 'Add each regular gathering.' },
      fields: [
        { name: 'cadence', type: 'select', label: 'How often', defaultValue: 'weekly',
          options: [
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
          ] },
        { name: 'when', type: 'text', label: 'When', admin: { description: 'e.g. "Sunday" or "1st Friday"' } },
        { name: 'name', type: 'text', label: 'Service name', admin: { description: 'e.g. "Main Service"' } },
        { name: 'time', type: 'text', label: 'Time', admin: { description: 'e.g. "10:00am" or "TBC"' } },
      ],
    },
  ],
}
