
'use client'
import { useState, useEffect } from 'react';
import { create, select, removeItems } from '/app/actions'
// import { Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid';



export default function Home() {
  const [pageNum, setPageNum] = useState(0)
  return (
    <div className= "flex flex-col items-center bg-gradient-to-br from-[#fdf4ec] to-[#ffc592] text-[#140800] font-mono h-screen">
      <h1 className= "text-center mt-6 mb-4 italic font-bold text-xl " id="title"> My word app 🏋  </h1>
      <div className="w-11/12 flex justify-between mb-2 bg-[#2a9d8f] h-10">
        <button className="border-r-2 w-1/3 border-[#264653] hover:bg-[#33C1B1] hover:font-bold"
              onClick={() => {
               setPageNum(0)
               }} > My cards </button>
        <button className="border-r-2 w-1/3 border-[#264653] hover:bg-[#33C1B1] hover:font-bold"
              onClick={() => {
               setPageNum(2)
               }} > Add a card </button>
        <button className="w-1/3 hover:bg-[#33C1B1] hover:font-bold" 
              onClick={() => { setPageNum(1)
               }} > Play a game </button>
      </div>      
      {pageNum === 0 ? <DisplayCards /> : ''}
      {pageNum === 1 ? <GameExplanation /> : ''}
      {pageNum === 2 ? <AddCard /> : ''}
    </div>
  )
}


function DisplayCards() {
  const [data, setData] = useState([])

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
    <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 grid-flow-row ">
      {data && data.length > 0 ? (
        data.map((item) => {
         return (
            <div className="grid grid-rows-2 grid-cols-2 rounded-md 
              bg-[#efd595] border border-[#264653] mt-5 w-11/12 min-h-24 p-2 opacity-90 md:w-10/12" key={item.id} id={item.id}>
                <p className='font-bold'> {item.name} </p>
                <p className="grid grid-rows-subgrid row-start-2 col-span-2"> {item.definition} </p>
                <button className="grid grid-cols-subgrid col-start-3" onClick = {(e) => {
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
  )
}


function AddCard() {
  const [wordInputValue, setWordInputValue] = useState("")
  const [definitionInputValue, setDefinitionInputValue] = useState("")
  const id = uuidv4()

  return ( 
      <div className="flex flex-col items-center gap-y-2 w-screen">
        <input  
          id="input-word" 
          type="text" 
          placeholder="Type your word here" 
          className="border-2 border-black w-11/12 rounded" 
          value = { wordInputValue }
          onChange = {e => setWordInputValue(e.target.value) } 
        />
        <textarea id="input-definition"
          placeholder="Type your example here" 
          className="border-2 border-black w-11/12 h-20 rounded" 
          value = {definitionInputValue}
          onChange = {e => setDefinitionInputValue(e.target.value) } 
        /> 
        <button className="btn-primary"
         onClick = {() => { 
                if(wordInputValue === "" || definitionInputValue === "") {
                  alert("Make sure your word and example are entered")
                } else {
                  create(id, wordInputValue.toLowerCase(), definitionInputValue.toLowerCase()) 
                }
                setWordInputValue('')
                setDefinitionInputValue('')
                // fetchData()
               }} > 
        Save </button> 
      </div>
  )
}


function GameExplanation() {
  const [data, setData] = useState([])
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
 

  function renderGame() {
    if(data.length > 0) {
      setIsClicked(true)
      setIsVisible(false)
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
      {isVisible ? (
        <div className="m-2"> 
          <p className="mt-2"> You will get a definition, type the word </p>
          <p className="mb-2"> To start your game, click START GAME button </p>
          <button className="btn-primary mb-4" onClick={renderGame}> START GAME </button> 
        </div>) : null }
      {isClicked ? <Word arr = {data}/>  : null }
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
  


  useEffect(() => {
      if (data.length > 0) {
        // console.log(`data.length from the effect ${data.length}`)
        setIndex(Math.floor(Math.random() * data.length));
      }
  }, [data]) // Run this effect when isVisible or data changes

  function check() {  
    setIsVisible(true)
    setNameInputValue("")
    setAnswerValue(data[index].name)
    if(data[index].name === nameInputValue.toLowerCase()) {
      setAnswer(true)
      const result = () => {
       return data.filter((item) => {
        return item.name !== data[index].name
       })
      }
       setData(result()   )
      //  setIndex(Math.floor(Math.random() * data.length))
    } else {
      setAnswer(false)
    } 
 
  }
 
  return (
    <div>
      {data.length == 0 ?  (
        <div> Well done! Game is finished </div>
        )  : index == data.length ? "Choosing ..." : (
          <>
          <div> {data[index].definition} </div>
          <input
            type="text"
            className="border-2 border-black w-11/12 rounded mb-2" 
            placeholder="type the word"
            value = {nameInputValue}
            onChange = {e => setNameInputValue(e.target.value) } 
          />
          <button className="btn-primary mb-4" 
            onClick={() => {check()}}> Check 
          </button>
          <div>
            {!isVisible ? " " : answer ? < CorrectAnswer /> : <IncorrectAnswer answer={answerValue} />}
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



