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
} from "firebase/firestore";
import { useState } from "react";

import { db, auth } from "../config/firebase";
import { FacturaExt } from "../types/factura";
import { UserModel } from "../types/user";
import { Result } from "../types/utils";


// Facturas API
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

//Users API
export const AddUser = async (newUser: UserModel) => {
  let result: Result = { type: false, message: '' }
  try {
    console.log(newUser)
    const { user } = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );

    const docRef = await addDoc(collection(db, "users"), {
      userId: user.uid,
      email: newUser.email,
      name: newUser.name,
      rol: newUser.rol,
      enabled: newUser.enabled,
    });

    result = { type: true, message: 'Usuario creado exitosamente.' }
  } catch (error) {
    const errorMessage = `${error.message}`;
    console.log(error)
    result = { type: false, message: errorMessage }
  }
}

export const GetUsers = async () => {
  let users: UserModel[] = [];
  let q = query(collection(db, "users"));

  try {
    const querySnapshot = await getDocs(q);
    users = querySnapshot.docs.map(
      (doc) =>
      (
        {
          userId: doc.data().userId,
          email: doc.data().email,
          name: doc.data().name,
          password: '',
          rol: doc.data().rol,
          enabled: doc.data().enabled,
        } as UserModel
      )
    );
  } catch (error) {
    console.log(error);
  }

  return users;
};