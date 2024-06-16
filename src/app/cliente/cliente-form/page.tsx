"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { Cliente } from "@/app/interface/Cliente";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function ClienteForm() {
    const [cliente, setCliente] = useState<Cliente>({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        senha: ''
    });

    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setCliente((prevState: Cliente) => ({
            ...prevState,
            [id]: value
        }));
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
        if (!cliente.senha) {
            newErrors.senha = 'Senha é obrigatória';
        } else if (cliente.senha.length < 8) {
            newErrors.senha = 'Senha deve ter no mínimo 8 caracteres';
        }
        if (cliente.senha !== confirmarSenha) {
            newErrors.confirmarSenha = 'As senhas não coincidem';
        }

        return newErrors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append('nome', cliente.nome);
        formData.append('cpf', cliente.cpf);
        formData.append('telefone', cliente.telefone);
        formData.append('email', cliente.email);
        formData.append('senha', cliente.senha);

        try {
            const response = await fetch('http://localhost:5284/api/clientes/adicionar', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso! Você será redirecionado para a tela de Login', 'success')
                    .then(() => {
                        router.push('/login');
                    });
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
                    <CardTitle>Criar conta</CardTitle>
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
                            <Label htmlFor="senha">Senha</Label>
                            <Input id="senha" type="password" placeholder="Informe sua senha" value={cliente.senha} onChange={handleChange} />
                            {errors.senha && <span className="text-red-500">{errors.senha}</span>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                            <Input id="confirmarSenha" type="password" placeholder="Repita sua senha" value={confirmarSenha} onChange={handleConfirmarSenhaChange} />
                            {errors.confirmarSenha && <span className="text-red-500">{errors.confirmarSenha}</span>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex flex-col space-y-1.5">
                        <Link href="/login" className={buttonVariants({ variant: 'outline' })}>Já tenho conta</Link>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Button className="w-full" type="submit" variant="destructive">Criar conta</Button>
                    </div>
                </CardFooter>
            </Card>
        </form>
    );
}
