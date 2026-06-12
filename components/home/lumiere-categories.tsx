import Link from "next/link";

function publicSrc(path: string): string {
  return (
    "/" +
    path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

const categories = [
  {
    name: "Health & Care",
    path: "/search/health-care",
    image: publicSrc("one/main/主图1.jpg"),
  },
  {
    name: "Seasonal Deals",
    path: "/search/seasonal-hot-deals",
    image: publicSrc("three/main/主图1.jpg"),
  },
  {
    name: "All Products",
    path: "/search",
    image: publicSrc("four/main/主图2.jpg"),
  },
];

export function LumiereCategories() {
  return (
    <section
      id="categories"
      className="container-site section-pad py-24"
    >
      <h2 className="mb-16 text-center font-serif text-3xl md:text-4xl">Shop by Category</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.path}
            className="group relative block aspect-[3/4] overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-serif text-3xl tracking-wide text-white">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
