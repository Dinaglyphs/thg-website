import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add Next.js options here as the project grows.
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
