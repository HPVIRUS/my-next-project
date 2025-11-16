"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

// Product type
export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number; // stock quantity
}

// Cart item type
export interface CartItem {
  id: number;
  userId: string;
  productId: string;
  quantity: number; // quantity in cart
  product: Product;
}

export default function ShoppingCart() {
  const { cart, isLoading, removeCartItemMutation, addToCartMutation } =
    useCart();
  console.log(cart);
  const subtotal =
    cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) ||
    0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Shopping Cart
            </h1>
            <p className="text-sm text-muted-foreground">
              Review and update the items you've added before checkout.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Badge variant="secondary">{cart?.length || 0} items</Badge>
            <Button size="sm" asChild>
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead className="text-right">Total (USD)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : !cart || cart.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          Your cart is empty.
                        </TableCell>
                      </TableRow>
                    ) : (
                      cart.map((item: CartItem) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage alt={item.product.name} />
                                <AvatarFallback>
                                  {item.product.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {item.product.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {item.product.description || ""}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{item.product.price}</TableCell>
                          <TableCell>
                            <div className="inline-flex items-center gap-2">
                              {/* حذف یکی */}
                              <Button
                                size="sm"
                                disabled={removeCartItemMutation.isPending}
                                onClick={() =>
                                  removeCartItemMutation.mutate({
                                    productId: item.productId,
                                    removeAll: false,
                                  })
                                }
                              >
                                {removeCartItemMutation.isPending ? (
                                  <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-700 rounded-full inline-block" />
                                ) : (
                                  "−"
                                )}
                              </Button>
                              <div className="w-8 text-center">
                                {item.quantity}
                              </div>
                              <Button
                                size="sm"
                                disabled={removeCartItemMutation.isPending}
                                onClick={() =>
                                  addToCartMutation.mutate(item.productId)
                                }
                              >
                                {addToCartMutation.isPending ? (
                                  <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-700 rounded-full inline-block" />
                                ) : (
                                  "+"
                                )}
                              </Button>

                              <Button
                                size="sm"
                                disabled={removeCartItemMutation.isPending}
                                onClick={() =>
                                  removeCartItemMutation.mutate({
                                    productId: item.productId,
                                    removeAll: true,
                                  })
                                }
                                title="Remove all of this product"
                              >
                                🗑
                              </Button>
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            {item.product.price * item.quantity}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-center">
                <div className=" flex items-center justify-center text-sm text-muted-foreground">
                  Prices include taxes
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Subtotal</div>
                  <div className="font-medium">{subtotal}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Shipping</div>
                  <div className="font-medium">Free</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Discount</div>
                  <div className="font-medium">—</div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-xl font-semibold">{subtotal}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </div>

                <Separator className="my-2" />

                <div className="text-xs bg-ce text-muted-foreground">
                  Secure payment, easy returns within 7 days, 24/7 support.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed left-0 right-0 bottom-4 md:hidden px-6">
          <div className="mx-auto max-w-3xl">
            <div className="bg-white border rounded-2xl p-3 shadow-md flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="font-semibold">{subtotal}</div>
              </div>
              <Button>Quick Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
