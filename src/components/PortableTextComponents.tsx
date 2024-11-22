import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface ImageValue {
  value: SanityImageSource & { alt?: string };
}

export const portableTextComponents = {
  types: {
    image: ({ value }: ImageValue) => {
      const imageUrl = urlFor(value).url();
      return (
        <Image
          src={imageUrl}
          alt={value.alt || ""}
          width={800}
          height={500}
          className="my-8 rounded-lg"
        />
      );
    },
  },
};
