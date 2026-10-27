import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";
import Popup from "@/components/home/Popup";
import SeoPageBlocks from "@/components/SeoPageBlocks";
import { buildSchemas, absoluteUrl } from "@/lib/seoPageSchema";

/**
 * Serves every page built in the dashboard (Dashboard -> SEO Pages).
 *
 * This is a root-level dynamic route, so it only ever handles URLs that no
 * file in pages/ already claims -- Next.js matches static routes first.
 * /about-us, /nios-datesheet and the rest keep rendering their own files.
 *
 * Unknown slugs return notFound, which renders the normal 404 page.
 */
export default function SeoPage({ page, schemas }) {
  if (!page) return null;

  const title = page.metaTitle || page.title;
  const canonical = absoluteUrl(page.canonicalUrl || `/${page.slug}`);
  const robots = `${page.indexable ? "index" : "noindex"}, ${
    page.followLinks ? "follow" : "nofollow"
  }`;

  return (
    <>
      <Head>
        <title>{title}</title>
        {page.metaDescription ? (
          <meta name="description" content={page.metaDescription} />
        ) : null}
        {page.metaKeywords ? (
          <meta name="keywords" content={page.metaKeywords} />
        ) : null}
        <meta name="robots" content={robots} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonical} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph -- falls back to the meta title/description so a page
            always previews correctly when shared, even if nobody filled the
            social tab. */}
        <meta property="og:type" content={page.ogType || "website"} />
        <meta property="og:site_name" content="SS Coaching" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={page.ogTitle || title} />
        <meta
          property="og:description"
          content={page.ogDescription || page.metaDescription || ""}
        />
        {page.ogImage ? (
          <meta property="og:image" content={absoluteUrl(page.ogImage)} />
        ) : null}

        <meta
          name="twitter:card"
          content={page.ogImage ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:title" content={page.ogTitle || title} />
        <meta
          name="twitter:description"
          content={page.ogDescription || page.metaDescription || ""}
        />
        {page.ogImage ? (
          <meta name="twitter:image" content={absoluteUrl(page.ogImage)} />
        ) : null}

        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* Header already renders the breadcrumb trail, and its own
            BreadcrumbList JSON-LD with it, on every page except the home
            page -- so nothing is added here. */}

        <SeoPageBlocks blocks={page.blocks} />

        <Footer />

        {/* The same enquiry popup the hand-built admission pages use. It
            binds itself to every .cta-btn on the page, so the hero button
            and the call-to-action bands open the form instead of
            navigating away. */}
        <Popup />
      </section>
    </>
  );
}

export async function getStaticPaths() {
  // Only pre-render what already exists. Anything published later is built
  // on first request thanks to fallback: "blocking", so a new page goes
  // live without a deploy.
  let paths = [];

  try {
    const [{ default: dbConnect }, { default: SeoPageModel }] = await Promise.all([
      import("@/lib/dbConnect"),
      import("@/models/SeoPage"),
    ]);

    await dbConnect();
    const pages = await SeoPageModel.find({ status: "published" }, { slug: 1 }).lean();
    paths = pages.map((p) => ({ params: { slug: p.slug } }));
  } catch (err) {
    // A DB hiccup at build time must not fail the whole build -- the pages
    // are still served on demand by the fallback.
    console.error("[slug] getStaticPaths failed:", err.message);
  }

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slug = String(params?.slug || "").toLowerCase();

  let page = null;

  try {
    const [{ default: dbConnect }, { default: SeoPageModel }] = await Promise.all([
      import("@/lib/dbConnect"),
      import("@/models/SeoPage"),
    ]);

    await dbConnect();
    page = await SeoPageModel.findOne({ slug, status: "published" }).lean();
  } catch (err) {
    console.error("[slug] getStaticProps failed:", err.message);
  }

  // Drafts and unknown slugs both fall through to the 404 page.
  if (!page) return { notFound: true, revalidate: 60 };

  page.blocks = (page.blocks || [])
    .filter((b) => b && b.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Header's Breadcrumb component emits the BreadcrumbList itself, so one
  // built here would be a second, conflicting copy on the same page.
  const schemas = buildSchemas({
    ...page,
    schemaTypes: (page.schemaTypes || []).filter((t) => t !== "BreadcrumbList"),
  });

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      schemas,
    },
    revalidate: 60,
  };
}
