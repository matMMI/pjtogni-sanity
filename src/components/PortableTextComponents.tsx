import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
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
