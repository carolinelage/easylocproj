import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedModes, setSelectedModes] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:8080/books')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/single-page/${id}`);
  };

  const goToCartPage = () => {
    navigate('/cart');
  };

  const addToCart = (product, e) => {
    e.stopPropagation();
    const mode = selectedModes[product.id];
    if (!mode) {
      setError('Por favor, selecione um modo de aluguel antes de adicionar ao carrinho.');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, mode, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const selectMode = (productId, mode, e) => {
    e.stopPropagation();
    setSelectedModes({ ...selectedModes, [productId]: mode });
    setError('');
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar livros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-md"
        />
        <button 
          className="ml-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={goToCartPage}
        >
          <FaShoppingCart size={24} />
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="border p-4 rounded-lg shadow-lg flex flex-col items-center bg-white cursor-pointer"
            onClick={() => handleCardClick(product.id)}
          >
            <img 
              src={product.image_url} 
              alt={product.title} 
              className="w-full h-64 object-contain rounded mb-4" 
            />
            <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-1 text-center">{product.author}</p>
            <p className="text-sm text-gray-600 mb-1 text-center">{product.genre}</p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {product.book_rental_modes.map((mode) => (
                <div key={mode.rental_mode.id} className="relative group">
                  <button 
                    className={`py-1 px-2 rounded border transition ${selectedModes[product.id]?.id === mode.id ? 'border-blue-600 text-blue-600' : 'border-gray-500 text-gray-500 hover:border-blue-600 hover:text-blue-600'}`}
                    onClick={(e) => selectMode(product.id, mode, e)}
                  >
                    {mode.rental_mode.mode_name}
                  </button>
                  <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                    R$ {mode.price}
                  </div>
                </div>
              ))}
            </div>
            <button 
              className={`mt-4 py-1 px-2 rounded transition ${selectedModes[product.id] ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}
              onClick={(e) => addToCart(product, e)}
              disabled={!selectedModes[product.id]}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;