import { FacturaExt } from "./factura";
export interface Result {
    type: boolean;
    message: string;
}

export interface ResultExtend extends Result {
    factura: FacturaExt | undefined
}