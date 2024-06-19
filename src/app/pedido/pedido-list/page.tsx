"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pedido, StatusPedido } from "@/app/interface/Pedido";
import Swal from 'sweetalert2';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CiSettings } from "react-icons/ci";

export default function GerenciarPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        try {
            const response = await fetch('http://localhost:5284/api/pedidos');
            const data = await response.json();
            setPedidos(data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    const atualizarStatus = async (id: number, status: StatusPedido) => {
        try {
            const response = await fetch(`http://localhost:5284/api/pedidos/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(status)
            });

            if (response.ok) {
                Swal.fire('Sucesso!', 'Status do pedido atualizado com sucesso!', 'success');
                fetchPedidos();
            } else {
                Swal.fire('Erro!', 'Erro ao atualizar o status do pedido.', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            Swal.fire('Erro!', 'Erro ao atualizar o status do pedido.', 'error');
        }
    };

    const formatarData = (dataISO: any) => {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-10">Gerenciar Pedidos</h2>
            <div className="w-full max-w-screen-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Mesa</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidos.map(p => (
                            <TableRow key={p.id}>
                                <TableCell>{formatarData(p.dataPedido)}</TableCell>
                                <TableCell>{p.clienteId}</TableCell>
                                <TableCell>{p.numeroMesa}</TableCell>
                                <TableCell>{p.status}</TableCell>
                                <TableCell className="text-right">
                                    {/* Menu de ações */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><CiSettings size={25} /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Alterar status</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => atualizarStatus(p.id, StatusPedido.Cancelado)} disabled={p.status === StatusPedido.Cancelado || p.status === StatusPedido.Finalizado}>
                                                Cancelado
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => atualizarStatus(p.id, StatusPedido.Preparando)} disabled={p.status === StatusPedido.Cancelado || p.status === StatusPedido.Finalizado}>
                                                Preparando
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => atualizarStatus(p.id, StatusPedido.Finalizado)} disabled={p.status === StatusPedido.Cancelado || p.status === StatusPedido.Finalizado}>
                                                Finalizado
                                            </DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
