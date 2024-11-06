
'use client'
import Image from "next/image";
import { useState, useEffect } from 'react';
import { create, select } from '/app/actions'
import { Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid';


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
      {/* <button className="w-2/4 border-4 bg-sky-500 m " onClick = {displayCards} > Show my cards </button> */}
     <Suspense fallback={<Loading />} >
      < CardsDisplay />
    </Suspense>
    </div>
  )
}

export function Loading() {
  return "Loading ...."
}

function CardsDisplay() {
const [data, setData] = useState([{name: "", definition: "" }])
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await select()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, []) 
  
   return (
    <div key= {data.map((card) => {card.id} ) }>
      {data.map((card) => <div key= {uuidv4() }> {card.name} </div> ) }
      {data.map((card) => <div key= {uuidv4() }> {card.definition} </div> ) }
    </div> 
   )
   
  }





function Card() {
  const [wordInputValue, setWordInputValue] = useState("")
  const [definitionInputValue, setDefinitionInputValue] = useState("")
  const id = uuidv4()

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
   <button className="w-2/4 border-4 bg-sky-500 m" onClick = {() => create(id, wordInputValue, definitionInputValue) } > Save </button> 
   </div>
   )
}