"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  // Gets access to the current url
  const searchParmas = useSearchParams();
  // Allows us to do programatic navigation
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParmas.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParmas);

    params.set("capacity", filter);

    // 'scroll: false' make sure that the page doesn't navigate back to the top.
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>

      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash; 8 guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash; 12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
