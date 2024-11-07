
'use client'
import { useState, useEffect } from 'react';
import { create, select, removeItems } from '/app/actions'
// import { Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid';


export default function Home() {

  return (
    <div className= "flex flex-col items-center ">
      <h1 className= "text-center mt-6" id="title"> My word app </h1>
      <Card />
    </div>
  )
}


function Card() {
  const [wordInputValue, setWordInputValue] = useState("")
  const [definitionInputValue, setDefinitionInputValue] = useState("")
  const [data, setData] = useState([])
  const id = uuidv4()

  const fetchData = async () => {
 
    try {
      const result = await select()
      setData(result)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) 
 
   return ( 
    <div>
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
          value = {definitionInputValue}
          onChange = {e => setDefinitionInputValue(e.target.value) } 
        />
        <button className="w-2/4 border-4 bg-sky-500 m" onClick = {() => { 
                create(id, wordInputValue, definitionInputValue) 
                setWordInputValue('')
                setDefinitionInputValue('')
                fetchData()
               }} > 
        Save </button> 
      </div>
    <div>
      {data && data.length > 0 ? (
        data.map((item) => {
         return (
            <div className="flex justify-between" key={item.id} id={item.id}>
                <p> {item.name} </p>
                <p> {item.definition} </p>
                <button onClick = {(e) => {
                  removeItems(e.target.parentElement.id ) 
                  fetchData()}
                  }> delete </button> 
            </div>
          )
        })
      ) : (
        <p> Loading .... </p>
        )
      }
    </div>
  </div>
    )
}