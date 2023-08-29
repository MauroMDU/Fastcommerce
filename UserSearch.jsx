import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import productsActions from '../redux/actions/products';
import ProductsSearched from '../pages/products/ProductsSearched';

const UserSearch = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((store) => store.products.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // Filtrar productos cuando cambie la búsqueda
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  useEffect(() => {
    // Obtener la lista completa de productos al montar el componente
    dispatch(productsActions.data_products());
  }, [dispatch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search your product"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div>
        {filteredProducts.map((product) => (
          <ProductsSearched key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
