import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { portableTextComponents } from "@/components/PortableTextComponents";

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  content,
  "slug": slug.current,
  mainImage,
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const page = await client.fetch<SanityDocument>(
    PAGE_QUERY,
    { slug },
    options
  );

  if (!page) {
    return <div>Page not found</div>;
  }

  const pageImageUrl = page.mainImage
    ? urlFor(page.mainImage)?.width(1200).height(400).url()
    : null;

  return (
    <main className="parent min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        {pageImageUrl && (
          <Image
            src={pageImageUrl}
            alt={page.title}
            className="w-full rounded-xl mb-8"
            width={1200}
            height={400}
            priority
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
        <div className="prose max-w-none">
          {Array.isArray(page.content) && (
            <PortableText
              value={page.content}
              components={portableTextComponents}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const pages = await client.fetch<SanityDocument[]>(
    `*[_type == "page"]{
      "slug": slug.current
    }`
  );

  return pages.map((page) => ({
    slug: page.slug,
  }));
}
