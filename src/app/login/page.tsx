"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginUser } from "../interface/LoginUser";


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();


    const handleSubmit = async () => {

        const loginData: LoginUser = {
            email: email,
            senha: senha
        };

        try {
            const response = await fetch('http://localhost:5284/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify(loginData)
            });
            
            if (response.ok) {
                const data = await response.json();
                const token = data.jwt;
                localStorage.setItem('token',token);
               
                await router.push('/');
                console.log('Sucesso:', data);
            } else {
                console.error('Erro na requisição');
            }
        }
     catch (error) {
        console.error('Erro na requisição:', error);
    }
};

return (

        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" placeholder="Informe seu e-mail"value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="senha">Senha</Label>
                        <Input id="senha" type="password" placeholder="informe sua senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Button className="w-full" onClick={handleSubmit} variant="destructive">Entrar</Button>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Link href="/cliente/cliente-form" className={buttonVariants({ variant: 'outline' })} >Cadastre-se</Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
);
    }

