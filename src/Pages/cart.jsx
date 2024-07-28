import { useEffect, useState } from "react";
import Navbar from "../components/Layouts/Navbar";
import { getProducts } from "../services/product.service";
import { useCart } from "../context/CartContext";

function CartPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts((res) => {
      if (res.success) {
        setProducts(res.data);
      } else {
        console.log("error");
      }
    });
  }, []);

  const { cart } = useCart();
  let totalPriceCart = 0;
  let totalItems = 0;

  const cartProducts = cart
    .map((cartItem) => {
      const product = products.find((product) => product.id === cartItem.id);
      if (product) {
        totalPriceCart += cartItem.qty * product.price;
        totalItems += cartItem.qty;
        return { ...product, qty: cartItem.qty };
      }
      return null;
    })
    .filter((item) => item !== null);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.length > 0 ? (
                      cartProducts.map((product, index) => (
                        <tr key={index}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={
                                  product.image ||
                                  "https://via.placeholder.com/150"
                                }
                                alt="Product"
                              />
                              <span className="font-semibold">
                                {product.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">${product.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button className="border rounded-md py-2 px-4 mr-2">
                                -
                              </button>
                              <span className="text-center w-8">
                                {product.qty}
                              </span>
                              <button className="border rounded-md py-2 px-4 ml-2">
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            ${product.price * product.qty}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No items in cart
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPriceCart.toFixed(2)}</span>
                </div>

                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ${totalPriceCart.toFixed(2)}
                  </span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
