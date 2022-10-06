import { createUserWithEmailAndPassword } from "firebase/auth";
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
  orderBy,
  limit,
  increment,
} from "firebase/firestore";
import { useState } from "react";

import { db, auth } from "../config/firebase";
import { FacturaBase, FacturaExt } from "../types/factura";
import { UserModel } from "../types/user";
import { Result, ResultExtend } from "../types/utils";

// Facturas API
export const updateSecuencia = async () => {
  let count = 0;
  try {
    const docRef = doc(db, "secuencia", "yxSPbk64CQDE8icNBqyJ");
    const actual = await getDoc(docRef);

    if (actual.exists()) {
      count = actual.data().factura_secuencia + 1;
      const result = await setDoc(docRef, {
        factura_secuencia: count,
      });
    }
  } catch (error) {
    console.log(error);
  }

  return count;
};

export const getFactura = async (id: string): Promise<FacturaBase> => {
  let factura: FacturaBase = {
    cedula: "",
    userId: "",
    receipt: 0,
    fecha: "",
    nombre: "",
    monto: 0,
    numeroPlaca: "",
    numeroRegistro: "",
  };
  try {
    const docRef = doc(db, "facturas", id);
    const querySnapshot = await getDoc(docRef);

    if (querySnapshot.exists()) {
      const data = querySnapshot.data();
      factura = {
        cedula: data.cedula,
        userId: data.userId,
        receipt: data.receipt,
        fecha: data.fecha,
        nombre: data.nombre,
        monto: data.monto,
        numeroPlaca: data.num_placa,
        numeroRegistro: data.num_registro,
      };
    }
  } catch (error: any) {}

  return factura;
};

export const getFacturas = async (filtro: string) => {
  let facturas: FacturaExt[] = [];

  let q;
  if (filtro === "") {
    q = query(collection(db, "facturas"), orderBy("receipt", "desc"));
  } else {
    q = query(
      collection(db, "facturas"),
      where("fecha", "==", filtro),
      orderBy("receipt", "desc")
    );
  }

  try {
    const querySnapshot = await getDocs(q);

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
  } catch (error) {
    console.log(error);
  }

  return facturas;
};

export const saveFactura = async (
  factura: FacturaBase
): Promise<ResultExtend> => {
  let result: ResultExtend = { type: false, message: "", collectionId: "" };

  try {
    const facturaNumber = await updateSecuencia();

    const docRef = await addDoc(collection(db, "facturas"), {
      userId: auth.currentUser?.uid,
      cedula: factura.cedula,
      receipt: facturaNumber,
      fecha: factura.fecha,
      nombre: factura.nombre,
      num_placa: factura.numeroPlaca,
      num_registro: factura.numeroRegistro,
      monto: factura.monto,
    });
    result = {
      type: true,
      message: "Factura guardad exitosamente.",
      collectionId: docRef.id,
    };
  } catch (error: any) {
    result = { type: false, message: error.message, collectionId: "" };
  }

  return result;
};

//Users API
export const AddUser = async (newUser: UserModel): Promise<Result> => {
  let result: Result = { type: false, message: "" };
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );

    await addDoc(collection(db, "users"), {
      userId: user.uid,
      email: newUser.email,
      name: newUser.name,
      rol: newUser.rol,
      enabled: newUser.enabled,
    });

    return (result = { type: true, message: "Usuario creado exitosamente." });
  } catch (error: any) {
    const errorMessage = `${error.message}`;
    console.log(error);
    return (result = { type: false, message: errorMessage });
  }
};

export const GetUsers = async () => {
  let users: UserModel[] = [];
  let q = query(collection(db, "users"));

  try {
    const querySnapshot = await getDocs(q);
    users = querySnapshot.docs.map(
      (doc) =>
        ({
          userId: doc.data().userId,
          email: doc.data().email,
          name: doc.data().name,
          password: "",
          rol: doc.data().rol,
          enabled: doc.data().enabled,
        } as UserModel)
    );
  } catch (error) {
    console.log(error);
  }

  return users;
};
