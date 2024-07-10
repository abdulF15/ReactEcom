import { useParams } from "react-router-dom";
import TopBar from "../components/Fragments/TopBar";
import Navbar from "../components/Layouts/Navbar";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../services/product.service";
import Skeleton from "../components/Fragments/Skeleton";
import CardProduct from "../components/Fragments/CardProduct";
import Carausel from "../components/Fragments/Carausel";

function CategoryProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProductsByCategory(slug, (res) => {
      if (res.success === true) {
        if (res.data && res.data.products) {
          setProducts(res.data);
        } else {
          console.error("Invalid data structure", res.data);
          setProducts({ products: [] }); // Jika tidak ada data products, set menjadi array kosong
        }
        setLoading(false);
      } else {
        console.log("error");
        setLoading(false);
      }
    });
  }, [slug]);

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="container mx-auto px-3 lg:px-5 mt-20 lg:mt-28 ">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="card bg-base-100 image-full w-full lg:w-96 shadow-xl">
            <figure>
              <img
                src={`https://apiecomm.abdulfattah.my.id/${products.image}`}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{products.title}</h2>
              <p>{products.description}</p>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto justify-items-center mt-20 px-2 lg:px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-28 mb-[2000px]">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} /> // Menampilkan skeleton loading 4
            ))
          : products &&
            products.products &&
            products.products.map((product) => {
              const imageUrl =
                product.productImages && product.productImages.length > 0
                  ? product.productImages[0].image
                  : "";
              return (
                <CardProduct
                  key={product.id}
                  title={product.title}
                  image={imageUrl}
                  price={product.price}
                  slug={product.slug}
                  category={products.title}
                />
              );
            })}
      </div>
    </>
  );
}

export default CategoryProductsPage;
