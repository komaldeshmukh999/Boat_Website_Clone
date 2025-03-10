// import React,{useContext} from 'react'
// import { Context } from '../utils/context'
// import Product from './product/product'
// export default function Products() {
// const {products}=useContext(Context)
// console.log(products)

//   return (
//     <div>
//       {products && products.map((product)=>{
//          return <div className="Product" key={product.id}>
//            <img src={import.meta.env.VITE_APP_DEV_URL+product.img[0].url} alt="product image"/>
//          </div>
//         })}
//     </div>
//   )
// }
import "./Products.css";
import Product from "./product/product";

const Products = ({ products, innerPage, headingText }) => {
    return (
        <div className="products-container">
            {!innerPage && <div className="sec-heading">{headingText}</div>}
            <div className={`products ${innerPage ? "innerPage" : ""}`}>
                {innerPage ? products && products.data.map((item) => (
                    <Product
                        key={item.id}
                        id={item.id}
                        data={item}
                    />
                )):products && products.map((item) => (
                    <Product
                        key={item.id}
                        id={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;