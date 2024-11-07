
'use client'
import Image from "next/image";
import { useState, useEffect } from 'react';
import { create, select, removeItems } from '/app/actions'
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
 
      < CardsDisplay />

    </div>
  )
}



function CardsDisplay() {
const [data, setData] = useState([])

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
    <div>
      {data && data.length > 0 ? (
        data.map((item) => {
         return (
            <div className="flex justify-between" key={item.id} id={item.id}>
                <p> {item.name} </p>
                <p> {item.definition} </p>
                <button onClick = {(e) => removeItems(e.target.parentElement.id ) }> delete </button> 
            </div>
          )
        })
      ) : (
        <p> Loading .... </p>
        )
      }
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