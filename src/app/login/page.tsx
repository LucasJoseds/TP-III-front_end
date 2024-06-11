"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'email') {
            setEmail(value);
        } else if (id === 'senha') {
            setSenha(value);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('senha', senha);

            const response = await fetch('http://localhost:5284/api/clientes/autenticar', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sucesso:', data);
                // Redirecionar para a página desejada após o login
                await router.push('/'); // ajuste a rota conforme necessário
            } else {
                console.error('Email ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (

    
            <form onSubmit={handleSubmit}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" placeholder="Informe seu e-mail" value={email} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="senha">Senha</Label>
                                <Input id="senha" type="password" placeholder="informe sua senha" value={senha} onChange={handleChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Button className="w-full" type="submit" variant="destructive">Entrar</Button>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Link href="/cliente/cliente-form" className={buttonVariants({ variant: 'outline' })} >Cadastre-se</Link>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </form>
    );
}
