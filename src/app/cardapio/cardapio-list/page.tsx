"use client"

import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cardapio } from "../../interface/Cardapio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ItemCardapio } from "@/app/pedido/pedido-form/page";


async function fetchCardapio(): Promise<Cardapio[]> {

    const result = await fetch('http://localhost:5284/api/cardapio/listar-todos', {
        method: 'GET'
    });


    return result.json()
}

export default function CardapioList() {

    noStore();

    const [cardapios, setCardapios] = useState<Cardapio[]>([]);
    const [pedido, setPedido] = useState<ItemCardapio[]>([]);
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
                cardapioId:cardapioID,
            };
            currentOrder.push(itemAdd);
        }

        localStorage.setItem("pedido", JSON.stringify(currentOrder));

        router.push(`/pedido/pedido-form`);
    }


    return (
        <div className="">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10"> Cardápio</h1>

            <div className="grid grid-cols-4 gap-8">
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
                        <CardContent>{c.descricao}</CardContent>
                        <CardFooter className="flex justify-between"><p>R$: {c.preco},00</p>
                            <Button variant={"destructive"} onClick={() => handleOrder(c.id)} > Adicionar ao pedido</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>


        </div>

    );

}