"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, FormEvent } from 'react';
import { Cardapio } from "@/app/interface/Cardapio";


export default function CardapioForm() {

    const [cardapio, setCardapio] = useState<Cardapio>({
        nome: '',
        descricao: '',
        preco: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setCardapio((prevState: any) => ({
            ...prevState,
            [id]: id === 'preco' ? Number(value) : value
        }));
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', cardapio.nome);
        formData.append('descricao', cardapio.descricao);
        formData.append('preco', cardapio.preco.toString());


        try {
            const response = await fetch('http://localhost:5284/api/cardapio/adicionar', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sucesso:', data);
            } else {
                console.error('Erro na requisição');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-[750px]">
                <CardHeader>
                    <CardTitle>Adicionar prato</CardTitle>
                    
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" placeholder="Nome do prato" value={cardapio.nome} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="descricao">Descrição</Label>
                            <Textarea id="descricao" placeholder="Composição do prato" value={cardapio.descricao} onChange={handleChange} />
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex flex-col space-y-1.5 w-1/2">
                                <Label htmlFor="preco">Valor</Label>
                                <Input id="preco" type="number" placeholder="Valor" value={cardapio.preco} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 w-1/2">
                                <Label htmlFor="imagem">Imagem</Label>
                                <Input id="imagem" type="file" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancelar</Button>
                    <Button type="submit">Cadastrar</Button>
                </CardFooter>

            </Card>
        </form>




    );
}
