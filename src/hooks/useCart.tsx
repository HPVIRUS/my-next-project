"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCart = () => {
  // get all cart items by query -->cart
  // add to cart --> addToCartMutation
  // delete from cart --> removeCartItemMutation
  const queryClient = useQueryClient();

  // fetch cart data
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      // get data fro DB
      const res = await fetch("/api/cart/");
      if (!res.ok) throw new Error("Failed to fetch cart");
      console.log(cart);
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  // add to cart

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: { "Content-type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("item is added");
    },
    onError: () => {
      toast.error("failed to add");
    },
  });

  const removeCartItemMutation = useMutation({
    mutationFn: async ({
      productId,
      removeAll = false,
    }: {
      productId: string;
      removeAll?: boolean;
    }) => {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, removeAll }),
      });

      if (!res.ok) throw new Error("Failed to remove from cart");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to remove");
    },
  });

  return { cart, isLoading, error, addToCartMutation, removeCartItemMutation };
};
