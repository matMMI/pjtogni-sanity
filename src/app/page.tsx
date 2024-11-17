import Navbar from "../components/Navbar";
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { portableTextComponents } from "@/components/PortableTextComponents";

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

export default async function IndexPage() {
  try {
    const homePage = await client.fetch<SanityDocument>(
      HOME_PAGE_QUERY,
      {},
      options
    );

    if (!homePage) {
      return (
        <main className="parent mx-auto min-h-screen">
          <Navbar />
          <section className="div2">
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-8">Bienvenue</h1>
              <p>
                Aucune page n'a été trouvée. Veuillez ajouter du contenu dans
                Sanity.
              </p>
            </div>
          </section>
        </main>
      );
    }

    const pageImageUrl = homePage.mainImage
      ? urlFor(homePage.mainImage)?.width(1200).height(400).url()
      : null;

    return (
      <main className="parent mx-auto min-h-screen">
        <Navbar />
        <section className="div2">
          {pageImageUrl && (
            <Image
              src={pageImageUrl}
              alt={homePage.title}
              className="w-full object-cover"
              width={1200}
              height={400}
              priority
            />
          )}
          <div className="p-8">
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
        </section>
      </main>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération de la page :", error);
    return (
      <main className="parent mx-auto min-h-screen">
        <Navbar />
        <section className="div2">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">Erreur</h1>
            <p>Une erreur est survenue lors du chargement de la page.</p>
          </div>
        </section>
      </main>
    );
  }
}
