"use client";

import { Cardapio } from "@/app/interface/Cardapio";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pedido } from "@/app/interface/Pedido";
import { FaRegTrashAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { GoPlus } from "react-icons/go";


export interface ItemCardapio {
    cardapio: Cardapio,
    quantidade: number
    valor?: number,
    cardapioId?: number,
    pedidoId?: number

}

export default function PedidoForm() {

    const [items, setItems] = useState<ItemCardapio[]>([]);
    const [total, setTotal] = useState(0);
    const [numeroMesa, setNumeroMesa] = useState(0);
    const clienteId = 2;

    useEffect(() => {
        const currentOrder = JSON.parse(localStorage.getItem("pedido") || "[]");
        setItems(currentOrder);
        calculateTotal(currentOrder)

    }, []);


    function calculateTotal(items: ItemCardapio[]) {
        const total = items.reduce((acc, item) => {
            return acc + item.cardapio.preco * item.quantidade;
        }, 0);
        setTotal(total);
    }

    const handleDecrement = (itemId: number) => {
        const updatedItems = items.map(item => {
            if (item.cardapio.id === itemId && item.quantidade > 1) {
                return { ...item, quantidade: item.quantidade - 1 };
            }
            return item;
        }).filter(item => item.quantidade > 0);
        setItems(updatedItems);
        localStorage.setItem("pedido", JSON.stringify(updatedItems));
        calculateTotal(updatedItems);
    };

    const handleIncrement = (itemId: number) => {
        const updatedItems = items.map(item => {
            if (item.cardapio.id === itemId) {
                return { ...item, quantidade: item.quantidade + 1 };
            }
            return item;
        });
        setItems(updatedItems);
        localStorage.setItem("pedido", JSON.stringify(updatedItems));
        calculateTotal(updatedItems);
    };

    const handleSubmit = async () => {
        const currentOrder = JSON.parse(localStorage.getItem("pedido") || "[]") as ItemCardapio[];

        const pedidoData: Pedido = {
            id: 0,
            clienteId: clienteId,
            itens: currentOrder.map((item) => ({
                quantidade: item.quantidade,
                valor: item.cardapio.preco * item.quantidade,
                cardapioId: item.cardapio.id, 
                cardapio:item.cardapio      
            })),
            numeroMesa: numeroMesa
            
        };

        try {
            const response = await fetch('http://localhost:5284/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoData)
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

    const handleDelete = (itemId: number) => {
        const updatedItems = items.filter(item => item.cardapio.id !== itemId);
        setItems(updatedItems);
        localStorage.setItem("pedido", JSON.stringify(updatedItems));
        calculateTotal(updatedItems);
    };


    return (
        
        <div>
           <div className="text-center my-8">
                <h1 className="text-4xl  text-gray-800">Seu pedido</h1>
          
            </div>

            <div className="row gap-8 mt-3">
                {items.map(item => (
                    <Card className="mt-3" key={item.cardapio.id}>
                        <CardHeader className="flex-row gap-4 items-center flex justify-between">
                            <CardTitle>{item.cardapio.nome}</CardTitle>
                            <FaRegTrashAlt onClick={() => handleDelete(item.cardapio.id)} className="cursor-pointer" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="flex-row gap-4 items-centers">{item.cardapio.descricao}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <p className="font-bold">R$ {item.cardapio.preco},00</p>
                            <div className="flex items-center gap-2">
                                <FaMinus onClick={() => handleDecrement(item.cardapio.id)} className="cursor-pointer" size={10} />
                                <Badge variant={"destructive"}>{item.quantidade}</Badge>
                                <FaPlus onClick={() => handleIncrement(item.cardapio.id)} className="cursor-pointer" size={10} />
                            </div>
                        </CardFooter>
                    </Card>

                ))}
            <Button className="grid w-full items-center gap-4 mt-3 mb-7" variant={"ghost"}>Adicionar mais itens </Button>
            </div>

            <div className="flex justify-between ml-10">
                <h4 className="mt-4 font-bold ">Total:</h4>
                <Badge className="items-center mt-3 p-2 mr-10">
                        R${total.toFixed(2)}
                    </Badge>            
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center mt-2">
                    <span className="w-full border-t"></span>
                </div>
            </div>
            <div className="grid w-full items-center gap-4 mt-6">
                <Label htmlFor="preco">Número da mesa</Label>
                <Input type="number" value={numeroMesa} onChange={e => setNumeroMesa(parseInt(e.target.value))} placeholder="Número da Mesa" />
            </div>

            <div className="grid w-full items-center gap-4">
                <Button className="mt-10" variant={"destructive"} onClick={handleSubmit}>Confirmar Pedido</Button>
            </div>

        </div>
    );
}