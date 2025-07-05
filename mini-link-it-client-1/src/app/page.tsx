'use client'

import Form from "./component/Form";
import firebaseConfig from "./firebase/firebaseconfig";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

export default function Home() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#a5d8ff] to-[#d0bfff] min-h-screen flex items-center justify-center">
      <Form/>
    </div>
  );
}
