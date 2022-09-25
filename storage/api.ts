import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
} from "firebase/firestore";

import { db, auth } from "../config/firebase";
import { FacturaExt } from "../types/factura";

export const getFacturas = async () => {
  let facturas: FacturaExt[];
  const querySnapshot = await getDocs(collection(db, "facturas"));

  facturas = querySnapshot.docs.map(
    (doc) =>
    ({
      collectionId: doc.id,
      userId: auth.currentUser?.uid,
      cedula: doc.data().cedula,
      receipt: doc.data().receipt,
      fecha: doc.data().fecha,
      nombre: doc.data().nombre,
      numeroPlaca: doc.data().num_placa,
      numeroRegistro: doc.data().num_registro,
      monto: doc.data().monto,
    } as FacturaExt)
  );
  return facturas;
};
