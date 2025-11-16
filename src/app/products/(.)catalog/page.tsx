import CatalogList from "@/components/catalog/List";

import Spinner from "@/components/Spinner";
import React, { Suspense } from "react";

function Catalog() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col items-center mx-auto my-4">
        <CatalogList />
      </div>
    </Suspense>
  );
}

export default Catalog;
