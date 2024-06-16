"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Cliente } from "@/app/interface/Cliente";
import Swal from 'sweetalert2';

export default function EditarConta() {
  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: ''
  });

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  useEffect(() => {
    // Buscar dados do cliente logado
    (async () => {
      const response = await fetch('http://localhost:5284/api/clientes/cliente', {
        method: 'GET',
        credentials: 'include',
      });
      const content = await response.json();
      setCliente(content);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCliente((prevState: Cliente) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSenhaAtualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenhaAtual(e.target.value);
  };

  const handleNovaSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovaSenha(e.target.value);
  };

  const handleConfirmarSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmarSenha(e.target.value);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!cliente.nome) newErrors.nome = 'Nome é obrigatório';
    if (!cliente.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else {
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cliente.cpf)) {
        newErrors.cpf = 'CPF deve conter 11 números';
      }
    }
    if (!cliente.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else {
      const telefoneRegex = /^\d{11}$/;
      if (!telefoneRegex.test(cliente.telefone)) {
        newErrors.telefone = 'Telefone deve conter 11 números';
      }
    }
    if (!cliente.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cliente.email)) {
        newErrors.email = 'Formato de e-mail inválido';
      }
    }
    if (novaSenha && novaSenha.length < 8) {
      newErrors.novaSenha = 'Nova senha deve ter no mínimo 8 caracteres';
    }
    if (novaSenha && novaSenha !== confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }
    if (!senhaAtual) newErrors.senhaAtual = 'Senha atual é obrigatória';

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const clienteAtualizado = {
      ...cliente,
      senhaAtual,
      novaSenha: novaSenha || undefined // Passar undefined se nova senha não foi informada
    };

    try {
      const response = await fetch('http://localhost:5284/api/clientes/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(clienteAtualizado)
      });

      if (response.ok) {
        Swal.fire('Sucesso!', 'Conta atualizada com sucesso!', 'success')
          .then(() => {
            router.push('/');
          });
      } else if (response.status === 401) {
        setErrors({ senhaAtual: 'Senha atual inválida' });
      } else {
        console.error('Erro na requisição');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle>Editar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Informe seu nome" value={cliente.nome} onChange={handleChange} />
              {errors.nome && <span className="text-red-500">{errors.nome}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="Informe seu CPF" value={cliente.cpf} onChange={handleChange} />
              {errors.cpf && <span className="text-red-500">{errors.cpf}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" placeholder="Informe seu telefone" value={cliente.telefone} onChange={handleChange} />
              {errors.telefone && <span className="text-red-500">{errors.telefone}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" placeholder="Informe seu e-mail" value={cliente.email} onChange={handleChange} />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="senhaAtual">Senha Atual</Label>
              <Input id="senhaAtual" type="password" placeholder="Informe sua senha atual" value={senhaAtual} onChange={handleSenhaAtualChange} />
              {errors.senhaAtual && <span className="text-red-500">{errors.senhaAtual}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="novaSenha">Nova Senha</Label>
              <Input id="novaSenha" type="password" placeholder="Informe sua nova senha" value={novaSenha} onChange={handleNovaSenhaChange} />
              {errors.novaSenha && <span className="text-red-500">{errors.novaSenha}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
              <Input id="confirmarSenha" type="password" placeholder="Repita sua nova senha" value={confirmarSenha} onChange={handleConfirmarSenhaChange} />
              {errors.confirmarSenha && <span className="text-red-500">{errors.confirmarSenha}</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/')}>Cancelar</Button>
          <Button type="submit" variant="destructive">Salvar Alterações</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
