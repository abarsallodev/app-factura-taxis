export interface FacturaBase {
    userId: string,
    receipt: number,
    cedula: string,
    fecha: string,
    nombre: string,
    monto: number,
    numeroPlaca: string,
    numeroRegistro: string,
}

export interface FacturaExt extends FacturaBase {
    collectionId: string;
}