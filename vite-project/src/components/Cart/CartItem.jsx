import React, { useContext } from "react";
import { Context } from "../utils/context";
import { MdClose } from "react-icons/md";

import "./CartItem.css";
const CartItem = () => {
    const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
        useContext(Context);
        console.log("cartItems")
        console.log(cartItems)
    return (
        <div className="cart-products">
            {cartItems?.map((item) => (
                <div
                    className="search-result-item"
                    key={item.id}
                    onClick={() => {}}
                >
                    <div className="image-container">
                        <img
                            src={
                                import.meta.env.VITE_APP_DEV_URL +item.img[0].url
                            } 
                        />
                    </div>
                    <div className="prod-details">
                        <span className="name">{item.title}</span>
                        <MdClose
                            className="close-btn"
                            onClick={() => handleRemoveFromCart(item)}
                        />
                        <div className="quantity-buttons">
                            <span
                                onClick={() =>
                                    handleCartProductQuantity("dec", item)
                                }
                            >
                                -
                            </span>
                            <span>{item.quantity}</span>
                            <span
                                onClick={() =>
                                    handleCartProductQuantity("inc", item)
                                }
                            >
                                +
                            </span>
                        </div>
                        <div className="text">
                            <span>{item.quantity}</span>
                            <span>x</span>
                            <span className="highlight">
                                <span>&#8377;</span>
                                {item.price *
                                    item.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItem;
