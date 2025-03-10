import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import "./CategoryH.css";
import { Context } from "../utils/context";
const CategoryH = () => {
    const{categories}=useContext(Context)
    console.log(categories)
    const navigate = useNavigate();
    return (
        <div className="shop-by-category">
            <div className="categories">
                { categories && categories.map((item) => (
                    <div
                        key={item.id}
                        className="category"
                        onClick={() => navigate(`/category/${item.id}`)}
                    >
                <img src={import.meta.env.VITE_APP_DEV_URL+item.img.url} alt="category image is missing"/> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryH;