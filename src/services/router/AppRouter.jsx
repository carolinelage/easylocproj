import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './../../pages/Login';
import Register from "../../pages/Register";
import Home from "../../pages/Loja/Home";
import SinglePage from "../../pages/Loja/SinglePage";
import CartPage from "../../pages/Loja/CartPage";

export function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/single-page/:id"  element={<SinglePage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    </BrowserRouter>
  )
}
