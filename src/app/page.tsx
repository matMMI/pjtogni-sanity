// src/app/page.tsx
import { Suspense } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { portableTextComponents } from "@/components/PortableTextComponents";
import HomeSkeleton from "@/components/HomeSkeleton";

const HOME_PAGE_QUERY = `*[_type == "page"][0]{
  title,
  content,
  mainImage,
  "slug": slug.current
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

async function HomeContent() {
  try {
    const homePage = await client.fetch<SanityDocument>(
      HOME_PAGE_QUERY,
      {},
      options
    );

    if (!homePage) {
      return (
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Bienvenue</h1>
          <p>
            Aucune page n&apos;a été trouvée. Veuillez ajouter du contenu dans
            Sanity.
          </p>
        </div>
      );
    }

    const pageImageUrl = homePage.mainImage
      ? urlFor(homePage.mainImage)?.width(1200).height(400).url()
      : null;

    return (
      <div className="flex-1 overflow-y-auto p-8">
        {pageImageUrl && (
          <Image
            src={pageImageUrl}
            alt={homePage.title}
            className="w-full rounded-xl mb-8"
            width={1200}
            height={400}
            priority
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{homePage.title}</h1>
        <div className="prose max-w-none">
          {Array.isArray(homePage.content) && (
            <PortableText
              value={homePage.content}
              components={portableTextComponents}
            />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération de la page :", error);
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Erreur</h1>
        <p>Une erreur est survenue lors du chargement de la page.</p>
      </div>
    );
  }
}

export default function IndexPage() {
  return (
    <main className="flex min-h-screen overflow-hidden">
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Suspense fallback={<HomeSkeleton />}>
          <HomeContent />
        </Suspense>
      </div>
    </main>
  );
}
