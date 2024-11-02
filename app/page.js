
'use client'
import Image from "next/image";
import { useState } from 'react';
import { create } from '/app/actions'


export default function Home() {
const [title, setTitle] = useState()
const [card, setCard] = useState(false)

function addCard() {
  setCard(true)                                        
}

    return (
      <div className= "flex flex-col items-center ">
        <h1 className= "text-center mt-6" id="title"> My word app </h1>
        <button className="w-2/4 border-4 bg-sky-500 m " onClick={addCard}> Add words </button>
        <div id="card-container">
          {card ? < Card />  : ''} 
        </div> 
        <button className="w-2/4 border-4 bg-sky-500 m " onClick = {displayCards} > Show my cards </button>
        < CardsDisplay />
    </div>
    )
  }


  function Card() {
    const [wordInputValue, setWordInputValue] = useState("")
    const [definitionInputValue, setDefinitionInputValue] = useState("")


    return (
      <div>
      <input id="input-word" 
        type="text" 
        placeholder="Type your word here" 
        className="border-2 border-black" 
        value = { wordInputValue }
        onChange = {e => setWordInputValue(e.target.value) } 
       />
       <input id="input-word" 
        type="text" 
        placeholder="Type your example here" 
        className="border-2 border-black" 
        value = { definitionInputValue }
        onChange = {e => setDefinitionInputValue(e.target.value) } 
       />
     <button className="w-2/4 border-4 bg-sky-500 m" onClick = {() => create(wordInputValue, definitionInputValue)} > Save </button> 
     </div>
     )
  }


function CardsDisplay() {

async function displayCards() {
  const res = await fetch('http://localhost:3000/api/add-pet', {
    headers: {
      // 'Content-Type': 'application/json',
      // 'API-Key': process.env.DATA_API_KEY,
    },
  })
   data = await res.json()
  console.log(data)
}


  // return data.pets.rows
  return (
    <div>
      <div> Hello </div>
    </div>
  )

}
 
async function displayCards() {
  const res = await fetch('http://localhost:3000/api/add-pet', {
    headers: {
      // 'Content-Type': 'application/json',
      // 'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
  console.log(await data.cards.rows[0])
}