
import CategoryPreview from '../../Components/category-preview/category-preview.component';

import './shop.styles.scss';

import {Routes, Route} from 'react-router-dom';
import Category from '../category/category.component';

const Shop = () => {
//   const { categoriesMap } = useContext(CategoriesContext);

  return (

    <Routes>
        <Route index element={<CategoryPreview />} />
        <Route path=":category" element ={<Category />} />
    </Routes>
  )
};

export default Shop;