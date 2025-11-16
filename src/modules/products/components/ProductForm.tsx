"use client";

import { Product, ProductCategoey } from "@prisma/client";
import {
  Input,
  Button,
  Textarea,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { upsertProduct } from "../services";
import UploadImage from "./UploadImage";

const ProductForm = ({ product }: { product: Product | null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const discount = searchParams.get("discount");

  const { register, handleSubmit, setValue } = useForm<Product>();

  const onSubmitForm = async (data: Product) => {
    const _product = {
      ...data,
      id: product?.id,
      category: data.category || ProductCategoey.OTHERS,
      price: parseFloat(data?.price?.toString() || "0"),
      quantity: parseFloat(data?.quantity?.toString() || "0"),
    };

    await upsertProduct(_product as Product);
    router.back();
  };

  return (
    <Card className="w-[500px] mx-auto mt-10">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmitForm)}>
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>Create New Product</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="my-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              {...register("name")}
              id="name"
              required
              defaultValue={product?.name || ""}
            />
          </div>

          <div className="my-2">
            <Label htmlFor="category">Category</Label>
            <Select
              required
              onValueChange={(value) =>
                setValue("category", value as ProductCategoey)
              }
              defaultValue={product?.category || ProductCategoey.OTHERS}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategoey).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="my-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              id="description"
              defaultValue={product?.description || ""}
            />
          </div>

          <div className="my-2">
            <Label htmlFor="price">Price</Label>
            <Input
              {...register("price")}
              type="number"
              id="price"
              step="0.01"
              defaultValue={product?.price || ""}
            />
          </div>

          <div className="my-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              {...register("quantity")}
              type="number"
              id="quantity"
              defaultValue={product?.quantity || ""}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit">
            {product?.id ? "Update Product" : "Add Product"}
          </Button>
        </CardFooter>
      </form>
      {product?.id && (
        <CardFooter>
          <UploadImage productId={product?.id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductForm;
