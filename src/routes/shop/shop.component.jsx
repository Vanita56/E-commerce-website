import { useContext } from "react";
 import ProductCard from "../../Components/product-card/product-card.component";
 import { ProductsContext } from "../../contexts/product.context";
 import './shop.styles.scss';

 const Shop=()=>{
    const {products} =useContext(ProductsContext);
    return(
        <div className="products-container">
            {products.map((product)=>(
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
 };

// import SHOP_DATA from '../../shop-data.json';

// const Shop =()=>{
//     return(
//         <div>
//             {SHOP_DATA.map(({id, name})=>(
//                 <div key={id}>
//                     <h1>{name}</h1>
//                     <h1>hgvhvhb</h1>
//                 </div>
//             ))}

//             <h1>vhdvecxbindxawml</h1>
//         </div>
//     )
// }
 export default Shop;