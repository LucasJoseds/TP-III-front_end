"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import  Link   from "next/link"


export default function Login() {

    return (

        <form >
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>

                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" placeholder="Informe seu e-mail" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="senha">Senha</Label>
                            <Input id="senha" type="password" placeholder="informe sua senha" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Button className="w-full"type="submit" variant="destructive">Entrar</Button>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Link href="/cliente/cliente-form" className={buttonVariants({variant:'outline'})} >Cadastre-se</Link>
                        </div>
                    </div>
                </CardFooter>

            </Card>
        </form>
    );

}