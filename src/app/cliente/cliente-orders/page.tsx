
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pedido } from "@/app/interface/Pedido";
import { ItemCardapio } from "@/app/pedido/pedido-form/page";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";


export default function ClienteOrder() {

    const [pedido, setPedido] = useState<Pedido[]>([]);
    const idCliente = 2;
    const router = useRouter();

    async function fetchPedido(): Promise<Pedido[]> {

        const result = await fetch(`http://localhost:5284/api/pedidos/cliente?idCliente=${idCliente}`, {
            method: 'GET'
        });
        return result.json()
    }
    useEffect(() => {
        const getPedido = async () => {
            const data = await fetchPedido();
            setPedido(data);
        };
        getPedido();

    }, []);

    const formatarData = (dataISO: any) => {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    if (pedido.length === 0) {
        return (
            <div>
                <div>
                    <h1 className="text-center text-3xl leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">Você não possui nenhum pedido!</h1>
                </div>
                <div>
                    <Button variant={"destructive"} onClick={() => router.push("/")} className="w-full mt-5">
                        <IoMdArrowRoundBack className="mr-3" /> Ver nossas opções
                    </Button>
                </div>
            </div>

        )
    }

    return (
        <div className="grid grid-cols-4 gap-12">
            {pedido.map(p => (
                <Card key={p.id}>
                    <CardHeader className="flex-row gap-4 intems-center">
                        <CardTitle className="">Situação: {p.status}</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        Seu Pedido
                        <CardDescription>{
                            p.itens?.map(i => (
                                <CardDescription key={i.cardapioId}>
                                    <div className="flex justify-between mt-4">
                                        <CardDescription >{i.cardapio.nome}</CardDescription>
                                        <CardDescription >R$ {i.cardapio.preco}</CardDescription>
                                    </div>
                                </CardDescription>
                            ))
                        }
                        </CardDescription>

                    </CardContent>
                    <CardFooter>
                        Data do pedido: {formatarData(p.dataPedido)}
                    </CardFooter>
                </Card>
            ))}
        </div>

    );
}