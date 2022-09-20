export interface NewFactura {
    userId: string,
    receipt: number,
    cedula: string,
    fecha: string,
    nombre: string,
    monto: number,
    numeroPlaca: string,
    numeroRegistro: string,
}

export interface FacturasList extends NewFactura {
    collectionId: string;
}