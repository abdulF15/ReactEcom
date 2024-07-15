import Carausel from "../components/Fragments/Carausel";
import TopBar from "../components/Fragments/TopBar";
import Navbar from "../components/Layouts/Navbar";

import CardProduct from "../components/Fragments/CardProduct";
import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import Skeleton from "../components/Fragments/Skeleton";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState([products]);

  useEffect(() => {
    getProducts((res) => {
      if (res.success === true) {
        setProducts(res.data);
        setSearch(res.data);
        setLoading(false);
      } else {
        console.log("error");
      }
    });
  }, []);

  const onSearchChange = (value) => {
    if (typeof value === "string") {
      const filterProducts = products.filter((item) => {
        return item.title.toLowerCase().includes(value.toLowerCase());
      });
      setSearch(filterProducts);
    }
  };
  return (
    <>
      <TopBar />
      <Navbar onSearchChange={onSearchChange} />
      <div className="container mx-auto justify-items-center px-2 lg:px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 mt-8 lg:mt-16 mb-[2000px]">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} /> // Menampilkan skeleton loading 4
            ))
          : search.map((product, index) => {
              const imageUrl =
                product.productImages && product.productImages.length > 0
                  ? product.productImages[0].image
                  : "";
              return (
                <CardProduct
                  key={index}
                  title={product.title}
                  image={imageUrl}
                  price={product.price}
                  category={product.category.title}
                  slug={product.slug}
                />
              );
            })}
      </div>
    </>
  );
}

export default HomePage;
