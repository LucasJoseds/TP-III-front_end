"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({children}:{children:ReactNode}){

    const router = useRouter();

    useEffect(() => {
      const checkIfAuthenticated = async () => {
        const isAuthenticated = !!localStorage.getItem('token');
  
        // Se estiver autenticado, permitir renderizar o conteúdo protegido
        if (!isAuthenticated) {
          // Se não estiver autenticado, redirecionar para a página de login
          router.push('/autenticar');
        }
      };
  
      checkIfAuthenticated();
    }, []); // Executar apenas uma vez no carregamento do componente
  
    return <>{children}</>;
  
}