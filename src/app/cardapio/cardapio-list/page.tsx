import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cardapio } from "../../interface/Cardapio";
import { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


async function getCardapio(): Promise<Cardapio[]> {

    const result = await fetch('http://localhost:5284/api/cardapio/listar-todos', {
        method: 'GET'
    });


    return result.json()
}

export default async function CardapioList() {

    noStore();
    const cardapios = await getCardapio();

    return (
        <div className="">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10"> Cardápio</h1>

            <div className="grid grid-cols-3 gap-8">
                {cardapios.map(c => (
                    <Card key={c.id}>
                        <CardHeader className="flex-row gap-4 intems-center">
                            <Avatar>
                                <AvatarImage src="/img/comida.png" />
                                <AvatarFallback>
                                    {c.nome?.slice(0,2)}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle>{c.nome}</CardTitle>
                        </CardHeader>
                        <CardContent>{c.descricao}</CardContent>
                        <CardFooter className="flex justify-between"><p>R$: {c.preco},00</p>
                        <Button>Pedir</Button>
                        </CardFooter>
                        
                    </Card>
                ))}
            </div>

        </div>

    );

}