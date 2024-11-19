
'use client'
import { useState, useEffect } from 'react';
import { create, select, removeItems } from '/app/actions'
// import { Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid';



export default function Home() {

  return (
    <div className= "flex flex-col items-center bg-[#fdf4ec] text-[#140800] ">
      <h1 className= "text-center mt-6 mb-4" id="title"> My word app </h1>
      <Card />
      <PlayGame />
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
      <div className="flex flex-col items-center gap-y-2 w-screen">
        <input  
          id="input-word" 
          type="text" 
          placeholder="Type your word here" 
          className="border-2 border-black w-11/12 rounded bg-[#fff3eb]" 
          value = { wordInputValue }
          onChange = {e => setWordInputValue(e.target.value) } 
        />
        <textarea id="input-definition"
          placeholder="Type your example here" 
          className="border-2 border-black w-11/12 h-20 rounded" 
          value = {definitionInputValue}
          onChange = {e => setDefinitionInputValue(e.target.value) } 
        /> 
        <button className="border-2 p-2 rounded bg-[#2a9d8f] border-[#264653] w-11/12" onClick = {() => { 
                if(wordInputValue === "" || definitionInputValue === "") {
                  alert("Make sure your word and example are entered")
                } else {
                  create(id, wordInputValue.toLowerCase(), definitionInputValue.toLowerCase()) 
                }
                setWordInputValue('')
                setDefinitionInputValue('')
                fetchData()
               }} > 
        Save </button> 
      </div>
    <div className="flex flex-col items-center">
      {data && data.length > 0 ? (
        data.map((item) => {
         return (
            <div className="grid grid-rows-2 grid-cols-2 rounded-md bg-[#efd595] border mt-5 border-[#264653] w-11/12 p-3 " key={item.id} id={item.id}>
                <p> {item.name} </p>
                <p className="grid-rows-subgrid row-start-3"> {item.definition} </p>
                <button className="grid-cols-subgrid col-end-4" onClick = {(e) => {
                  removeItems(e.target.parentElement.id ) 
                  fetchData()}
                  }>  ❌ </button> 
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

function PlayGame() {
  const [isClicked, setIsClicked] = useState(false)

  function renderInstructions() {
    setIsClicked(true)
  }

  return (
    <div className="w-screen flex flex-col items-center">
      <button className="mt-8 p-2 border-2 rounded bg-[#2a9d8f] border-[#264653] w-11/12 mx-auto" onClick={renderInstructions} > Play a game </button>
      {isClicked ? <GameExplanation /> : ''}
    </div>
  )
}


function GameExplanation() {
  const [data, setData] = useState([])
  const [isClicked, setIsClicked] = useState(false)
 

  function renderGame() {
    if(data.length > 0) {
      setIsClicked(true)
    }
  }
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
        <p> You will get a definition, type the word </p>
        <p> To start your game, click START GAME button </p>
      </div>
      <button className="w-2/4 border-4 bg-sky-500 m" onClick={renderGame}> START GAME </button>
        {isClicked ? <Word arr = {data}/> : '' }
    </div>
  )
}

function Word({arr}) {

 const  [index, setIndex] = useState(0)
  const [nameInputValue, setNameInputValue] = useState("")
  const [answer, setAnswer] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const [data, setData] = useState(arr)
  const [answerValue, setAnswerValue] = useState('')


  function check() {  
    setIsVisible(true)
   setAnswerValue(data[index].name)
    if(data[index].name === nameInputValue.toLowerCase()) {
      setAnswer(true)
      const result = () => {
       return data.filter((item) => {
        return item.name !== data[index].name
       })
      }
       setData(result()   )
    } else {
        setAnswer(false)
      } 
  }
 
  return (
    <div>
      {data.length == 0 ?  (
        <div> Well done! Game is finished </div>
      )  : (
      <>
      <div>  { nameInputValue == "" ? data[index].definition : null } </div>
      <input
      type="text"
      placeholder="type the word"
      value = {nameInputValue}
      onChange = {e => setNameInputValue(e.target.value) } 
      />
   
      <button onClick={() => {
            check() }}> check </button>
      <div>
        {!isVisible ? " " : answer ? < CorrectAnswer /> : <IncorrectAnswer answer={answerValue} />}
        {isVisible ? <button className="w-2/4 border-4 bg-sky-500 m" onClick={() => {
                                setIndex(Math.floor(Math.random() * (data.length) ))
                                setIsVisible(false) 
                                setNameInputValue("")
        }}> Next </button> : " "}
      </div> 
      </>
    )}
    </div>
  )
}

function CorrectAnswer() {
  return (
    <div>
      Correct, great job!
    </div>
  )
}

function IncorrectAnswer({answer}) {
  return (
    <div>
      Not quite right. The answer is {answer.toUpperCase()}. 
    </div>
  )
}



