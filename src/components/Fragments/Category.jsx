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
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-slate-700"
    >
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
