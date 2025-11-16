"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
} from "@/components/ui";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

export default function CartDropdown() {
  const { cart } = useCart();

  return (
    <div className="relative">
      <Link
        href="/shopping-cart"
        className="
          inline-flex items-center gap-2
          px-4 py-2
          rounded-xl
          bg-primary text-primary-foreground
          hover:bg-primary/90
          transition
          shadow-sm
          text-sm font-medium
        "
      >
        <ShoppingCart size={20} />
        View Cart
        {cart?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </Link>
    </div>
  );
}
