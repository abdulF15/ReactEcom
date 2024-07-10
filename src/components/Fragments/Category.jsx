import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories.service";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories((res) => {
      if (res.success === true) {
        setCategories(res.data);
      } else {
        console.log("error");
      }
    });
  }, []);
  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box ">
      <li>
        <Link to="/">All</Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link to={`/category/${category.slug}`}>{category.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Category;
