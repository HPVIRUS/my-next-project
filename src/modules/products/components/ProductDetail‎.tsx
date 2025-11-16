"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProducstWithImage } from "@/type";
import { useCart } from "@/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function ProductDetail({
  product,
}: {
  product: ProducstWithImage;
}) {
  const { addToCartMutation } = useCart();
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  const handleAddToCart = () => {
    if (!isSignedIn) {
      setOpen(true);
      return;
    }
    addToCartMutation.mutate(product.id);
  };

  return (
    <div className="container mx-auto py-10">
      {/* Product Card */}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {product ? (
                <Image
                  src={product?.image?.[0]?.image || "/mock/2.jpeg"}
                  alt={product?.name || "Product image"}
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                  No Image Available
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between">
              <p className="text-xl font-semibold">
                ${product?.price?.toFixed(2)}
              </p>
              <p className="text-gray-700">Quantity: {product?.quantity}</p>
              <p className="mt-2 text-sm">Category: {product?.category}</p>
              <p className="text-gray-600 line-clamp">
                {product?.description || "No description available."}
              </p>

              <Button
                className="cursor-pointer my-4 flex items-center justify-center"
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
              >
                Add to cart <ShoppingCart className="ml-2 h-4 w-4" />
              </Button>

              <Button className="cursor-pointer" variant="secondary" asChild>
                <Link href="/products">Back to Products</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 animate-fade-in scale-in">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold mb-2">
              Hey there! 🌟
            </DialogTitle>
            <p className="text-gray-700 mb-6">
              To add this product to your cart, please sign in or create an
              account first.
            </p>
          </DialogHeader>

          <DialogFooter className="flex gap-4 justify-center mb-4">
            <Button variant="outline" asChild className="flex-1">
              <Link href={{ pathname: "/sign-up" }}>Sign Up</Link>
            </Button>
            <Button
              asChild
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link href={{ pathname: "/sign-in" }}>Sign In</Link>
            </Button>
          </DialogFooter>

          <Button
            variant="ghost"
            className="mt-3 px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 w-full"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
