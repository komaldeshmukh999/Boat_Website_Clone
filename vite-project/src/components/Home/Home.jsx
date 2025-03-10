import React,{useEffect,useContext} from 'react'
import Banner from './Banner'
import "./Home.css"
import { Context } from '../utils/context'
import CategoryH from './CategoryH'
import Products from '../Products/products'
import CartItem from '../Cart/CartItem'
const Home = () => {
  const {getProducts,getCategories,products } = useContext(Context);
  useEffect(() => {
      getProducts();
      getCategories();
  }, []);
return (
      <div>
          <Banner />
          <div className="main-content">
                <div className="layout">
                    <CategoryH/>
                    <Products
                        headingText="Popular Products"
                        products={products}
                    />
                    <CartItem/>
                </div>
            </div>
      </div>
  );
};

export default Home;