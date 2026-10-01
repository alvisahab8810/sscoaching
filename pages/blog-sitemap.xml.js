// ✅ /blog-sitemap.xml — public/sitemap.xml static hai aur usme ek bhi blog post
// URL nahi tha, isliye blog posts ke liye alag dynamic sitemap.
// robots.txt mein iska Sitemap: entry add kiya gaya hai.
const SITE_URL = "https://sscoaching.in";

const escapeXml = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export default function BlogSitemap() {
  // getServerSideProps response likhta hai; yeh component kabhi render nahi hota.
  return null;
}

export async function getServerSideProps({ res }) {
  let blogs = [];

  try {
    const { default: dbConnect } = await import("@/lib/dbConnect");
    const { default: Blog } = await import("@/models/Blog");

    await dbConnect();
    blogs = await Blog.find({ status: "published" })
      .select("slug publishDate updatedAt")
      .sort({ publishDate: -1 })
      .lean();
  } catch (err) {
    console.error("blog-sitemap error:", err.message);
  }

  const urls = blogs
    .map((b) => {
      const lastmod = new Date(b.updatedAt || b.publishDate || Date.now())
        .toISOString();
      return [
        "  <url>",
        `    <loc>${escapeXml(`${SITE_URL}/blogs/${b.slug}`)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.70</priority>",
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    `    <loc>${SITE_URL}/blogs</loc>`,
    "    <changefreq>daily</changefreq>",
    "    <priority>0.80</priority>",
    "  </url>",
    urls,
    "</urlset>",
  ].join("\n");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate");
  res.write(xml);
  res.end();

  return { props: {} };
}
