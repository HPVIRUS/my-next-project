"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getProductId } from "@/modules/products/services";
import { ProducstWithImage } from "@/type";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";

function CatalogList() {
  const params = useSearchParams();
  const id = params.get("id");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchImages = async () => {
      setLoading(true);
      const images = (await getProductId(id)) as ProducstWithImage;
      const { image } = images;
      setImages(image || []);
      setLoading(false);
    };
    fetchImages();
  }, [id]);

  if (!id) return null;
  if (loading) return <Spinner />;

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {images.map((_image, index) => (
        <div className="p-1" key={index}>
          <Card>
            <CardContent className="flex w-[400px] h-[400px] items-center justify-center p-6">
              <Image
                src={_image.image}
                alt="gallery"
                width={400}
                height={400}
                className="hover:scale-105 transform transition-transform duration-300"
              />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CatalogList;
