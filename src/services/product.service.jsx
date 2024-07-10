import axios from "axios";

export function getProducts(callback) {
  axios
    .get("https://apiecomm.abdulfattah.my.id/api/products")
    .then((res) => callback(res.data))
    .catch((err) => console.log(err));
}

export function getDetailsProduct(slug, callback) {
  axios
    .get(`https://apiecomm.abdulfattah.my.id/api/products/${slug}`)
    .then((res) => callback(res.data))
    .catch((err) => console.log(err));
}

export function getProductsByCategory(slug, callback) {
  axios
    .get(`https://apiecomm.abdulfattah.my.id/api/categories/${slug}`)
    .then((res) => callback(res.data))
    .catch((err) => console.log(err));
}
