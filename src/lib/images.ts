// Curated, free-to-use imagery for the cards and feature panels.
//
// Source: Pexels (https://www.pexels.com). The Pexels Licence allows free use
// for commercial and non-commercial purposes with no attribution required, and
// permits hotlinking from their CDN. Images are referenced directly by URL so
// nothing needs to be stored in the repo or the CMS.
//
// To swap an image later: pick a photo on pexels.com, take the number in its
// URL (e.g. pexels.com/photo/.../8422137/), and drop it into the maps below —
// or, once cloud media storage is added, upload real church photos in the CMS.

const px = (id: number, w = 1200): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=${w}`

// One relevant image per department, keyed by slug.
export const DEPT_IMAGE: Record<string, string> = {
  children: px(8422137), // diverse children in a classroom
  youth: px(5325719), // group of cheerful teenagers
  'workers-in-training': px(34612053), // hands engaged in Bible study
  choir: px(30550589), // church choir singing (Lagos)
  'creative-arts-drama': px(31746939), // performer under stage lights (Ibadan)
  'house-fellowship': px(8468750), // small group praying and reading together
  'good-women': px(5254676), // women sharing a joyful moment
  "mens-fellowship": px(16257489), // group of men, fellowship
}

// Thematic imagery used in hero and feature panels.
export const IMG = {
  hero: px(34328505, 1500), // lively worship under colourful lights
  scripture: px(15382621), // an open Bible, softly lit
  sermon: px(8815033, 1500), // pastor delivering a sermon, hands raised
  event: px(34328516, 1500), // congregation raising hands in worship
}

// Rotating pools for lists where there isn't a one-to-one subject.
const DEPT_POOL = [px(8422137), px(5325719), px(30550589), px(8468750)]
export const SERMON_POOL = [px(8815033), px(12093922), px(8815002), px(29422232)]
export const SCRIPTURE_POOL = [px(15382621), px(8268309), px(9446065), px(6186376)]

// Department image by slug, falling back to a rotating pool.
export function deptImage(slug: string, i = 0): string {
  return DEPT_IMAGE[slug] || DEPT_POOL[i % DEPT_POOL.length]
}

// Pick from a pool by index (wraps around).
export function fromPool(pool: string[], i: number): string {
  return pool[i % pool.length]
}
