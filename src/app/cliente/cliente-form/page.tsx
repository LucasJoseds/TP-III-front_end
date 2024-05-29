"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import  Link  from "next/link";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { Cliente } from "@/app/interface/Cliente";
import {  useRouter } from "next/navigation";


export default function ClienteForm(){

    

    const [cliente, setCliente] = useState<Cliente>({
        nome:'',
        cpf:'',
        telefone: '',  
        email:'',
        senha:''
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setCliente((prevState: Cliente) => ({
            ...prevState,
            [id]:value  

        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
       
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
                const data = await response.json();
                console.log('Sucesso:', data);
                await router.push('/login')
            } else {
                console.error('Erro na requisição');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }

      
    }



    return(

        <form onSubmit={handleSubmit}>
            <Card className="w-[750px]">
                <CardHeader>
                    <CardTitle>Criar conta</CardTitle>

                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" placeholder="Informe seu nome" value={cliente.nome} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input id="cpf" placeholder="Informe seu CPF" value={cliente.cpf} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input id="telefone" placeholder="Informe seu telefone" value={cliente.telefone} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" placeholder="Informe seu e-mail" value={cliente.email} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="senha">Senha</Label>
                            <Input id="senha" type="password" placeholder="informe sua senha" value={cliente.senha} onChange={handleChange}/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    
                        <div className="flex flex-col space-y-1.5">
                            <Button className="w-full" type="submit" variant="destructive">Criar conta</Button>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Link href="/login" className={buttonVariants({variant:'outline'})} >Já tenho conta</Link>
                        </div>
                
                </CardFooter>

            </Card>
        </form>
    );
}