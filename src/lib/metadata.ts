import { Metadata } from "next";

interface ProductImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface ProductMetadata {
  title?: string;
  description?: string | null;
  keywords?: string[];
  images?: ProductImage[] | null;
}

export default function customMetadataGenerator({
  title = "digital shop",
  description = "a digital shop for ...",
  keywords = ["digital", "laptop", "mobile"],
  images = undefined,
}: ProductMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      type: "website",
      url: `http://localhost:3000/products/${title}`,
      images: images || [],
    },
  };
}
