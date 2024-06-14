export interface Cliente {
    id?: number,
    nome:string,
    cpf: string,
    telefone: string
    email: string,
    senha: string
    role?:string
}