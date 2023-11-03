// import { Fragment, useContext } from "react";

//  import ProductCard from "../../Components/product-card/product-card.component";
//  import { CategoriesContext } from "../../contexts/categories.context";
//  import './shop.styles.scss';

//  const Shop=()=>{
//     const {CategoriesMap} =useContext(CategoriesContext);
//     return(

//         <Fragment>
//             {Object.keys(CategoriesMap).map((title)=>(
//                 <Fragment key={title}>
//                     <h2>{title}</h2>
//                     <div className="products-container">
//             {CategoriesMap[title].map((product)=>(
//                 <ProductCard key={product.id} product={product} />
//             ))}
//         </div>
                   
//                     </Fragment>
//             ))}
//         </Fragment>
       
//     );
//  };

//  export default Shop;


import { useContext, Fragment } from 'react';

import ProductCard from '../../Components/product-card/product-card.component'

import { CategoriesContext } from '../../contexts/categories.context';

import './shop.styles.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className='products-container'>
            {categoriesMap[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;