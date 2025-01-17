import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext"; // Importando o AuthContext
import { useNavigate } from "react-router-dom"; // Importando o useNavigate
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/ocultar senha

const CadastroForm = () => {
  const { signUp } = useAuth(); // Obtendo a função signUp
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(""); // Estado para mensagem de sucesso
  const [showSenha, setShowSenha] = useState(false); // Controle de visibilidade da senha
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false); // Controle de visibilidade da confirmação de senha
  const navigate = useNavigate(); // Hook para navegação

  const toggleShowSenha = () => setShowSenha(!showSenha);
  const toggleShowConfirmarSenha = () => setShowConfirmarSenha(!showConfirmarSenha);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    try {
      await signUp(nome, email, senha);  // Chamando a função signUp do contexto
      setSucesso("Usuário cadastrado com sucesso!"); // Exibe mensagem de sucesso
      setTimeout(() => {
        navigate("/"); // Redireciona para a página de login após 2 segundos
      }, 2000);
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {erro && <p className="text-red-500">{erro}</p>}
      {sucesso && <p className="text-green-500">{sucesso}</p>} {/* Exibe a mensagem de sucesso */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Informe seu nome *"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Informe seu email *"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo de Senha */}
        <div className="relative">
          <input
            type={showSenha ? "text" : "password"}
            placeholder="Senha *"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button type="button" onClick={toggleShowSenha} className="text-gray-500">
              {showSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Campo de Confirmar Senha */}
        <div className="relative">
          <input
            type={showConfirmarSenha ? "text" : "password"}
            placeholder="Confirme sua senha *"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button type="button" onClick={toggleShowConfirmarSenha} className="text-gray-500">
              {showConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md py-3 text-lg uppercase tracking-wide transition-colors"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default CadastroForm;
