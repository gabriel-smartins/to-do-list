import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { api } from "../services/api";

import Container from "../components/container";
import Card from "../components/card";
import Text from "../components/text";
import InputText from "../components/input-text";
import Button from "../components/button";
import Logo from "../assets/images/Logo.svg?react";
import { toast } from "sonner";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { username, password });
      localStorage.setItem("todo_token", response.data.token);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      toast.error("Usuário ou senha incorretos");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      <Card className="w-full max-w-md p-8 flex flex-col gap-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl">
        <div className="text-center space-y-2">
          <Logo className="h-16 w-auto mx-auto mb-6 text-pink-500" />
          <Text as="p" variant="body-md">
            Entre para gerenciar suas tarefas
          </Text>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Text as="label" variant="body-sm-bold" className="text-zinc-300">
              Usuário
            </Text>
            <InputText
              placeholder="Ex: fulano_dev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Text as="label" variant="body-sm-bold" className="text-zinc-300">
              Senha
            </Text>
            <InputText
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full placeholder:text-gray-600"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="text-center">
          <Text variant="body-sm-bold">
            Não tem conta?{" "}
            <Link to="/register" className="text-pink-500 hover:underline">
              Cadastre-se
            </Link>
          </Text>
        </div>
      </Card>
    </Container>
  );
}
