import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import CartItem from "../Cart/CartItem";
export const Context = createContext();

 const AppContext = ({ children }) => {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    
    const params={
        headers:{
            Authorization:"bearer " + import.meta.env.VITE_APP_STRIPE_APP_KEY
        },
    }

    //api.js
    const fetchDataFromApi=async(url)=>{
        try{
        const {data}=await axios.get(import.meta.env.VITE_APP_DEV_URL + url,params)
        return data;
        }
        catch(error){
        console.log(error)
        return error
        }
        }

    //Payment Request

    const makePaymentRequest = axios.create({
        baseURL: import.meta.env.VITE_APP_DEV_URL,params
    });

    //getprodut home.js
    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*").then((res) => {
            setProducts(res.data);
  
        });
    };
    //getCategories home.js
    const getCategories = () => {
        fetchDataFromApi("/api/categories?populate=*").then((res) => {
            setCategories(res.data);
        });
    };
    
    //Scroll
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    
    
    //Cart Functionality
    
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    
    

    useEffect(() => {
        let count = 0;
        cartItems?.map((item) => (count += item.quantity));
        setCartCount(count);

        let subTotal = 0;
        cartItems.map(
            (item) =>
                (subTotal += item.price * item.quantity)
        );
        setCartSubTotal(subTotal);
    }, [cartItems]);

    const handleAddToCart = (product, quantity) => {
        product.quantity=1
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (index !== -1) {
            items[index].quantity += quantity;
        } else {
            product.quantity = quantity;
            items = [...items, product];
        }
        setCartItems(items);
        console.log(cartItems)
    };

    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items?.filter((p) => p.id !== product?.id);
        setCartItems(items);
    };

    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (type === "inc") {
            items[index].quantity += 1;
        } else if (type === "dec") {
            if (items[index].quantity === 1) return;
            items[index].quantity -= 1;
        }
        setCartItems(items);
    };

    //Login
    // const isToken=!!localStorage.getItem("jwt")
    const[login,setLogin]=useState(false)
    
    //Profile
    const[profile,setProfile]=useState(false)
    const[profilePage,setProfilePage]=useState(false)

    return (
        <Context.Provider
            value={{
                products,
                setProducts,
                categories,
                setCategories,
                cartItems,
                setCartItems,
                handleAddToCart,
                cartCount,
                handleRemoveFromCart,
                showCart,
                setShowCart,
                handleCartProductQuantity,
                cartSubTotal,
                fetchDataFromApi,
                getProducts,
                getCategories,
                makePaymentRequest,
                login,
                setLogin,
                profile,
                setProfile,
                profilePage,
                setProfilePage
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;