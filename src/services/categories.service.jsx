import axios from "axios";

export function getCategories(callback) {
  axios
    .get("https://apiecomm.abdulfattah.my.id/api/categories")
    .then((res) => callback(res.data))
    .catch((err) => console.log(err));
}
