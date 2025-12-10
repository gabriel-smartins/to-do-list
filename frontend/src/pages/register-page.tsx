import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { api } from "../services/api";

import Container from "../components/container";
import Card from "../components/card";
import Button from "../components/button";
import Text from "../components/text";
import InputText from "../components/input-text";
import Logo from "../assets/images/Logo.svg?react";
import { toast } from "sonner";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/register", { username, password });
      toast.success("Conta criada com sucesso! Por favor faça login");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao criar conta.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      <Card className="w-full max-w-md p-8 flex flex-col gap-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl">
        <div className="text-center space-y-2">
          <Logo className="h-16 w-auto mx-auto mb-6 text-pink-500" />
          <Text as="h1" variant="body-md-bold" className="text-3xl">
            Criar Conta
          </Text>
          <Text as="p" variant="body-md">
            Comece a organizar seu dia!
          </Text>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Text as="label" variant="body-sm-bold" className="text-zinc-300">
              Escolha um Usuário
            </Text>
            <InputText
              placeholder="Ex: mestre_dos_codigos"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full  placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Text as="label" variant="body-sm-bold" className="text-zinc-300">
              Escolha uma Senha
            </Text>
            <InputText
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-fullplaceholder:text-gray-600"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
          >
            {isLoading ? "Criando..." : "Cadastrar"}
          </Button>
        </form>

        <div className="text-center">
          <Text variant="body-sm-bold">
            Já tem conta?{" "}
            <Link to="/" className="text-pink-500 hover:underline">
              Fazer Login
            </Link>
          </Text>
        </div>
      </Card>
    </Container>
  );
}
