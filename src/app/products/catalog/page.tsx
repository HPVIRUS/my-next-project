import CatalogList from "@/components/catalog/List";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Suspense } from "react";

function Catalog() {
  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <Suspense fallback={<Spinner />}>
        <CatalogList />
      </Suspense>
      <Button asChild>
        <Link href="/products">Back To Product List</Link>
      </Button>
    </div>
  );
}

export default Catalog;
