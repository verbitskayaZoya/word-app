
'use client'
import Image from "next/image";
import { useState } from 'react';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export default function Home() {
const [title, setTitle] = useState()
const [card, setCard] = useState(false)
 

async function addCard() {
  setCard(true)                                        
}

    return (
      <div className= "flex flex-col items-center ">
        <h1 className= "text-center mt-6" id="title"> My word app </h1>
        <button className="w-2/4 border-4 bg-sky-500 m " onClick={addCard}> Add words </button>
        <div id="card-container">
          {card ? < Card />  : ''} 
        </div> 
    </div>
    )
  }


  function Card() {
    const [wordInputValue, setWordInputValue] = useState("")

    async function saveCard() {
      try {
        console.log(wordInputValue)
        // if (!petName || !ownerName) throw new Error('Pet and owner names required');
        await sql`INSERT INTO Cards (Name, Definition) VALUES (${wordInputValue}, ${wordInputValue});`;
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
      }
     
  }

    return (
      <div>
      <input id="input-word" 
        type="text" 
        placeholder="Type your word here" 
        className="border-2 border-black" 
        value = { wordInputValue }
        onChange = {e => setWordInputValue(e.target.value) } 
       />
     <button className="w-2/4 border-4 bg-sky-500 m" onClick = {saveCard}> Save </button> 
     </div>
     )
  }




 
