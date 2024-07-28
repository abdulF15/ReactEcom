import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CardProduct({ title, image, price, category, slug, id }) {
  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num) + "..." : str;

  const { dispatch } = useCart();

  const addToCart = (id, qty) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, qty } });
  };

  return (
    <div className="card bg-base-100 w-auto shadow-xl">
      <a>
        {image.length === 0 ? (
          <div className="card-body">
            <h2 className="card-title">No Image</h2>
          </div>
        ) : (
          <figure>
            <img
              src={`https://apiecomm.abdulfattah.my.id/${image}`}
              alt="Shoes"
            />
          </figure>
        )}
      </a>
      <div className="card-body">
        <Link to={`/products/${slug}`}>
          <h2 className="card-title hover:underline">
            {truncateString(title, 20)}
          </h2>
        </Link>
        <p className="text-sm font-bold">Rp. {price}</p>

        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
        </div>
        <button
          className="btn btn-sm bg-sky-600 hover:bg-sky-700 w-16 mx-auto"
          onClick={() => addToCart(id, 1)}
        >
          <FontAwesomeIcon icon={faCartShopping} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
