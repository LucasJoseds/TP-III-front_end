"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pedido, StatusPedido } from "@/app/interface/Pedido";
import Swal from 'sweetalert2';

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

    return (
        <div>
            <h1 className="text-center text-4xl my-8">Gerenciar Pedidos</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">ID</th>
                            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Cliente</th>
                            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Mesa</th>
                            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Status</th>
                            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {pedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td className="w-1/6 py-3 px-4">{pedido.id}</td>
                                <td className="w-1/6 py-3 px-4">{pedido.clienteId}</td>
                                <td className="w-1/6 py-3 px-4">{pedido.numeroMesa}</td>
                                <td className="w-1/6 py-3 px-4">{pedido.status}</td>
                                <td className="w-1/6 py-3 px-4">
                                    <Button onClick={() => atualizarStatus(pedido.id, StatusPedido.Cancelado)}>Cancelar</Button>
                                    <Button onClick={() => atualizarStatus(pedido.id, StatusPedido.Preparando)}>Preparando</Button>
                                    <Button onClick={() => atualizarStatus(pedido.id, StatusPedido.Entregue)}>Entregue</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
