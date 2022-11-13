import { environment } from "src/environments/environment";

const BASE_URL: string = environment.BASE_URL;

export const ENDPOINTS = {   
    getProductos: (): string => {
        return `${BASE_URL}Producto/GetAll`;
    },
    registerProductos: (): string => {
        return `${BASE_URL}Producto/Create`;
    },
    updateProductos  : (): string => {
        return `${BASE_URL}Producto/Update`;
    },
    getByIdProductos : (id: number): string => {
        return `${BASE_URL}Producto/GetById/${id}`;
    },
    deleteByIdProductos : (id: number): string => {
        return `${BASE_URL}Producto/Delete?id=${id}`;
    },
    getClientes: (): string => {
        return `${BASE_URL}Cliente/GetAll`;
    },
    registerClientes: (): string => {
        return `${BASE_URL}Cliente/Create`;
    },
    updateClientes  : (): string => {
        return `${BASE_URL}Cliente/Update`;
    },
    getByIdClientes : (id: number): string => {
        return `${BASE_URL}Cliente/GetById/${id}`;
    },
    deleteByIdCliente : (id: number): string => {
        return `${BASE_URL}Cliente/Delete?id=${id}`;
    }
}