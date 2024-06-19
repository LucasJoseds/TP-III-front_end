"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginUser } from "../interface/LoginUser";

export default function AutenticarFuncionario() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [generalError, setGeneralError] = useState('');
    const router = useRouter();

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!email) {
            newErrors.email = 'E-mail é obrigatório';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Formato de e-mail inválido';
            }
        }
        if (!senha) newErrors.senha = 'Senha é obrigatória';
        return newErrors;
    };

    const handleSubmitFuncionario = async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        const loginData: LoginUser = {
            email: email,
            senha: senha
        };
    
        try {
            const response = await fetch('http://localhost:5284/api/autenticar/funcionario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.jwt;
                localStorage.setItem('token', token);

                await router.push('/pedido/pedido-list');
                console.log('Sucesso:', data);
            } else {
                const errorData = await response.json();
                if (errorData.message) {
                    setGeneralError(errorData.message);
                } else {
                    setGeneralError('Erro ao realizar o login. Por favor, tente novamente.');
                }
                console.error('Erro na requisição');
            }
        } catch (error) {
            setGeneralError('Erro na requisição. Por favor, tente novamente.');
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login Funcionário</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" placeholder="Informe seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="senha">Senha</Label>
                        <Input id="senha" type="password" placeholder="Informe sua senha" value={senha} onChange={e => setSenha(e.target.value)} />
                        {errors.senha && <span className="text-red-500">{errors.senha}</span>}
                    </div>
                    {generalError && <span className="text-red-500">{generalError}</span>}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Button className="w-full" onClick={handleSubmitFuncionario} variant="destructive">Entrar</Button>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Link href="/cliente/cliente-form" className={buttonVariants({ variant: 'outline' })}>Cadastre-se</Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
