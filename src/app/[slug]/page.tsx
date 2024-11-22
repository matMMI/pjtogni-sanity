import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
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
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page: SanityDocument | null = await client.fetch(
    PAGE_QUERY,
    { slug },
    options
  );

  if (!page) {
    notFound();
  }

  const pageImageUrl = page.mainImage
    ? urlFor(page.mainImage)?.width(1200).height(400).url()
    : null;

  return (
    <main className="parent-container min-h-screen">
      <Navbar />
      <div className="div2-container flex-1 overflow-hidden">
        <div className="div2 p-8 overflow-y-auto h-full">
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
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const pages = await client.fetch<{ slug: string }[]>(
    `*[_type == "page"]{ "slug": slug.current }`
  );
  return pages.map((page) => ({ slug: page.slug }));
}
