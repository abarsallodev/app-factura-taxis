import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { FacturasList } from "../types/factura"


export const getFacturas = async () => {
    const listado: FacturasList[] = [];

    const querySnapshot = await getDocs(collection(db, "facturas"));

    return querySnapshot;
}