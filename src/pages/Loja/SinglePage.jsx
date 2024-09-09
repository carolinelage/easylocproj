import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function SinglePage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:8080/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const addToCart = (e) => {
    e.stopPropagation();
    if (!selectedMode) {
      setError('Por favor, selecione um modo de aluguel antes de adicionar ao carrinho.');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...book, mode: selectedMode, price: selectedMode.price, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="text-white py-1 px-3 rounded transition"
          style={{backgroundColor: '#858666'}} 
          onClick={() => navigate('/home')}
        >
          Voltar para Home
        </button>
        <FaShoppingCart className="text-2xl cursor-pointer" onClick={() => navigate('/cart')} color='#858666'/>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img 
          src={book.image_url} 
          alt={book.title} 
          className="w-full md:w-2/3 h-80 object-contain rounded mb-4 md:mb-0 md:mr-4 mx-auto" 
        />
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-2 text-center md:text-left">{book.title}</h2>
          <p className="text-lg text-gray-600 mb-1 text-center md:text-left">{book.author}</p>
          <p className="text-lg text-gray-600 mb-1 text-center md:text-left">{book.genre}</p>
          <p className="text-md text-gray-700 mb-4 text-center md:text-left">{book.description}</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {book.book_rental_modes.map((mode) => (
              <button 
                key={mode.rental_mode.id} 
                className={`py-1 px-3 rounded border transition ${selectedMode?.id === mode.id ? 'border-blue-600 text-blue-600' : 'border-gray-500 text-gray-500 hover:border-blue-600 hover:text-blue-600'}`}
                onClick={() => {
                  setSelectedMode(mode);
                  setError('');
                }}
              >
                {mode.rental_mode.mode_name} - R$ {mode.price}
              </button>
            ))}
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button 
            className="mt-4 text-white py-1 px-3 rounded transition"
            onClick={addToCart}
            disabled={!selectedMode}
            style={{backgroundColor: '#858666'}} 
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;