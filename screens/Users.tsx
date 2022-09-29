import { UsersProps, Routes } from "../types/navigation";
import { UserExt } from "../types/user";
import app, { db, auth } from "../config/firebase";
import { useEffect, useState } from "react";

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

export default function Users({ navigation }: UsersProps) {
  const [users, setUsers] = useState<UserExt | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = async () => {
      //   const q = query(collection(db, "users"));
      //   try {
      //     const docs = await getDocs(q);
      //     console.log(docs);
      //   } catch (error) {
      //     console.log(error);
      //   }
      //   const datos = await getAuth.
      //   setFactura(datos);
    };

    unsubscribe();
  }, [users]);

  return <></>;
}
