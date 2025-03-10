// import React,{useContext} from 'react';
// import "./Category.css";
// import { Context } from '../utils/context'
//  export default function Category() {
//   const {categories} = useContext(Context);
//   return (
//     <div className="shop-by-category">
//       <div className="categories">
//       {categories && categories.map((category)=>{
//          return <div className="category">
//            <img src={import.meta.env.VITE_APP_DEV_URL+category.img.url} alt="category image is missing"/>
//          </div>
//         })}
//        </div>
//       </div>
//   )
// }
//Single Category Page
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Products from "../Products/products";
import "./Category.css";
const Category = () => {
    const { id } = useParams();
    const { data } = useFetch(
        `/api/products?populate=*&[filters][categories][id]=${id}`
    );

    

    return (
        <div className="category-main-content">
            <div className="layout">
                <div className="category-title">
                    {
                    data?.data[0].categories.title
                    }
                </div>
                {data && <Products innerPage={true} products={data} />}
            </div>
        </div>
    );
};

export default Category;
