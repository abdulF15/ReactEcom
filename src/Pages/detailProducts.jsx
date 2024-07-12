import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBar from "../components/Fragments/TopBar";
import Navbar from "../components/Layouts/Navbar";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { getDetailsProduct } from "../services/product.service";
import { useEffect, useState } from "react";
import Skeleton from "../components/Fragments/Skeleton";

function DetailProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailsProduct(slug, (res) => {
      if (res.success === true) {
        setProduct(res.data);
        setLoading(false);
      } else {
        console.log("error");
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
          <div>
            <Link to="/" className="btn btn-sm bg-sky-500 hover:bg-sky-700">
              {" "}
              Back
            </Link>
            <div className="card lg:card-side bg-base-100 shadow-xl mt-2">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                  alt="Album"
                />
              </figure>
              <div className="card-body">
                <h4>
                  Category :{" "}
                  {product && product.category && product.category.title}
                </h4>
                <h2 className="card-title">{product.title}</h2>
                <p>{product.description}</p>
                <p className="font-bold">Rp. {product.price}</p>
                <div className="card-actions justify-end">
                  <button className="btn bg-sky-600 hover:bg-sky-700">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default DetailProductPage;
