
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pedido } from "@/app/interface/Pedido";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Cliente } from "@/app/interface/Cliente";


export default function ClienteOrder() {

    const [pedido, setPedido] = useState<Pedido[]>([]);
    const router = useRouter();
    const [cliente , setCliente] = useState<Cliente>();


    
    useEffect(()=>{

        (async ()=>{
          const response = await fetch('http://localhost:5284/api/clientes/cliente',{
            method: 'GET',
            credentials:'include',
          });
          const content = await response.json();
          setCliente(content);
        }
      )();
      },[]);


      useEffect(() => {
        const fetchPedido = async () => {
            if (!cliente || !cliente.id) return;
    
            try {
                const result = await fetch(`http://localhost:5284/api/pedidos/cliente?idCliente=${cliente.id}`, {
                    method: 'GET',
                });
                const data = await result.json();
                setPedido(data);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            }
        };
    
        fetchPedido();
    }, [cliente]);
    


  
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
                    <CardHeader className="flex-row gap-4 items-center">
                        <CardTitle>Situação: {p.status}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-4">
                            <p className="font-bold">Seu Pedido</p>
                            {p.itens?.map(i => (
                                <div key={i.cardapioId} className="flex justify-between mt-2">
                                    <div>{i.quantidade}x</div>
                                    <div>{i.cardapio.nome}</div>
                                    <div>R$ {i.cardapio.preco.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>Data do pedido: {formatarData(p.dataPedido)}</CardFooter>
                </Card>
            ))}
        </div>
    );
    
}