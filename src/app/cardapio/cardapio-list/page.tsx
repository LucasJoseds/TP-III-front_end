"use client"

import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cardapio } from "../../interface/Cardapio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ItemCardapio } from "@/app/pedido/pedido-form/page";
import { Badge } from "@/components/ui/badge";


async function fetchCardapio(): Promise<Cardapio[]> {

    const result = await fetch('http://localhost:5284/api/cardapio/listar-todos', {
        method: 'GET'
    });


    return result.json()
}

export default function CardapioList() {

    noStore();
    const [cardapios, setCardapios] = useState<Cardapio[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getCardapio = async () => {
            const data = await fetchCardapio();
            setCardapios(data);
        };

        getCardapio();
    }, []);


    const handleOrder = (cardapioID: number) => {
        const cardapioN = cardapios.find((cardapio) => cardapio.id === cardapioID);
        if (!cardapioN) return;


        const currentOrder = JSON.parse(localStorage.getItem("pedido") || "[]");
        const itemIndex = currentOrder.findIndex((item: ItemCardapio) => item.cardapio.id === cardapioID);

        if (itemIndex > -1) {
            // Item already exists, update the quantity
            currentOrder[itemIndex].quantidade += 1;
        } else {
            // Item does not exist, add it to the order
            const itemAdd: ItemCardapio = {
                cardapio: cardapioN,
                quantidade: 1,
                cardapioId: cardapioID,
            };
            currentOrder.push(itemAdd);
        }

        localStorage.setItem("pedido", JSON.stringify(currentOrder));

        router.push(`/pedido/pedido-form`);
    }


    return (
        <div className="">

            <div className="text-center my-8">
                <h1 className="text-4xl  text-gray-800">Top Escolhas dos Clientes</h1>
                <p className="text-3x1 text-gray-600 mt-2">Confira os pratos que nossos clientes mais adoram!</p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cardapios.map(c => (
                    <Card key={c.id}>
                        <CardHeader className="flex-row gap-4 intems-center">
                            <Avatar>
                                <AvatarImage src="/img/comida.png" />
                                <AvatarFallback>
                                    {c.nome?.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle>{c.nome}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{c.descricao}
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <Badge>R$:{c.preco},00</Badge>
                        </CardContent>
                        <CardFooter>
                            <div className="grid w-full items-center gap-4">
                                <Button variant={"destructive"} onClick={() => handleOrder(c.id)} > Adicionar ao pedido</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>


        </div>

    );

}