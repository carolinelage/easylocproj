import { useState }from 'react';
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const loginFirebase = () => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then(() => {
      navigate('/home'); // Redireciona para a página de registro após login bem-sucedido
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white p-5">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-neutral-800 mb-3">Bem vindo de volta</h1>
        <p className="text-base text-neutral-500 mb-6">
          Bem vindo de volta! Por favor, insira seus dados.
        </p>

        <input
          name="email"
          type="text"
          placeholder="Digite seu e-mail"
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-neutral-300 rounded-lg mb-4"
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border border-neutral-300 rounded-lg mb-4"
        />
        <div className="flex justify-center mb-4 text-sm font-medium italic">
          <a href="#" style={{color: '#858666'}}>Esqueceu sua senha?</a>
        </div>
        <button 
        style={{backgroundColor: '#858666'}} 
        className="w-full text-white p-4 rounded-lg font-semibold"
        type="submit"
        onClick={loginFirebase}
        >
          Login
        </button>
        
        <div className="flex justify-center mt-4 text-sm font-medium italic">
          <label
          style={{color:'#79858E'}} className="flex items-center mr-2">
            Não possuí uma conta?
          </label>
          <Link to="/register" style={{color: '#858666'}}>Cadastre-se</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
