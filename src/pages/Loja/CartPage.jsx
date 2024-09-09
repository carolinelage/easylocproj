import React, { useState, useEffect } from 'react';

function CartPage() {
  const [cart, setCart] = useState([]);

  // Carrega o carrinho do localStorage ao montar o componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Função para remover um item específico do carrinho
  const removeFromCart = (bookId, modeId) => {
    // Filtra o carrinho para manter apenas os itens que NÃO correspondem ao bookId e modeId selecionados
    const updatedCart = cart.filter(book => !(book.id === bookId && book.mode.id === modeId));
    
    // Atualiza o estado e o localStorage
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Função para calcular a quantidade total de livros no carrinho
  const getTotalQuantity = () => {
    return cart.reduce((total, book) => total + book.quantity, 0);
  };

  // Função para calcular o valor total do carrinho
  const getTotalPrice = () => {
    return cart.reduce((total, book) => total + (book.quantity * book.mode.price), 0).toFixed(2);
  };

  // Renderiza mensagem se o carrinho estiver vazio
  if (cart.length === 0) {
    return <div>O carrinho está vazio.</div>;
  }

  // Renderiza o conteúdo do carrinho
  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">Carrinho</h2>
      {cart.map((book) => (
        <div key={`${book.id}-${book.mode.id}`} className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-600">Quantidade: {book.quantity}</p>
            <p className="text-gray-600">Modalidade: {book.mode.rental_mode.mode_name}</p>
            <p className="text-gray-600">Preço: R$ {book.mode.price}</p>
          </div>
          <button 
            className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
            onClick={() => removeFromCart(book.id, book.mode.id)}
          >
            Remover
          </button>
        </div>
      ))}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Total de livros: {getTotalQuantity()}</h3>
        <h3 className="text-xl font-semibold">Valor total: R$ {getTotalPrice()}</h3>
      </div>
    </div>
  );
}

export default CartPage;