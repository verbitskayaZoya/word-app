
'use client'
import { useState, useEffect, useMemo } from 'react';
import { create, select, removeItems } from '/app/actions'
// import { Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

export default function Home() {
  const [pageNum, setPageNum] = useState(0)
  return (
    <div className= "flex flex-col items-center bg-gradient-to-br from-wa-bg-from to-wa-bg-to text-wa-text font-mono h-screen">
      <h1 className= "text-center mt-6 mb-4 italic font-bold text-xl " id="title"> My word app 🏋  </h1>
      <div className="w-11/12 flex justify-between mb-2 bg-wa-btn-bg h-10">
        <button className="border-r-2 w-1/3 border-wa-border hover:bg-wa-btn-bg-hover hover:font-bold text-wa-button-text"
              onClick={() => {
               setPageNum(0)
               }} > My cards </button>
        <button className="border-r-2 w-1/3 border-wa-border hover:bg-wa-btn-bg-hover hover:font-bold text-wa-button-text"
              onClick={() => {
               setPageNum(2)
               }} > Add a card </button>
        <button className="w-1/3 hover:bg-wa-btn-bg-hover hover:font-bold text-wa-button-text" 
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
              bg-wa-secondary-bg border border-wa-border mt-5 w-11/12 min-h-24 p-2 opacity-90 md:w-10/12" key={item.id} id={item.id}>
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
          className="border-2 border-wa-border w-11/12 rounded" 
          value = { wordInputValue }
          onChange = {e => setWordInputValue(e.target.value) } 
        />
        <textarea id="input-definition"
          placeholder="Type your example here" 
          className="border-2 border-wa-border w-11/12 h-20 rounded" 
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
          <button className="btn-primary mb-4  mt-4 animate-pulse" onClick={renderGame}> START GAME </button> 
        </div>) : null }
      {isClicked ? <Word arr = {data}/>  : null }
    </div>
  )
}

function Word({arr}) {
  const [index, setIndex] = useState(0)
  const [nameInputValue, setNameInputValue] = useState("")
  const [answer, setAnswer] = useState(0)
  const [data, setData] = useState(arr)
  const [answerValue, setAnswerValue] = useState("")
  const [content, setContent] = useState('')
  const [score, setScore] = useState(0)

const imagesNotGoodArr = [
    {name: "can-do-it.webp", alt: ""},
    {name: "just-do-it.webp", alt: ""},
    {name: "not-give-up.webp", alt: "'"}, 
  ]

const imagesGoodArr = [
  {name: "nice.webp", alt: ""},
  {name: "thumb.webp", alt: ""},
  {name: "viking-ok.webp", alt: "'"}, 
]


const imagesSuperArr  = [
  {name: "amazing.webp", alt: ""},
  {name: "fireworks.webp", alt: ""},
  {name: "terrific.webp", alt: "'"}, 
  {name: "vietnamese-wow.webp", alt: ""},
  {name: "viking-perfect.webp", alt: ""},
  {name: "wow.webp", alt: "'"}, 
]


  function check() {  
    setNameInputValue("")
    setAnswerValue(data[index].name)

    if(data[index].name === nameInputValue.toLowerCase()) {
      setAnswer(prevState => {
        if(prevState !== 2)  {
          setScore(score + 1)
          return 1
        } 
      })
      const result = () => {
        return data.filter((item) => {
          return item.name !== data[index].name
        })
      }
      setData(result())
    } else {
      setAnswer(2)
    }
}
 
const gameDisplay = useMemo(() => (
                    <>
                      {data[index] ? <p className="m-4"> {data[index].definition} </p> : null }
                      <input
                        type="text"
                        className="border-2 border-wa-border w-11/12 rounded mb-4" 
                        placeholder="type the word"
                        value = {nameInputValue}
                        onChange = {e => setNameInputValue(e.target.value) } 
                      />
                      <button className="btn-primary mb-4" 
                        onClick={() => {check()}}> Check 
                      </button> 
                    </>
                      ), [data, index, nameInputValue])

useEffect(() => {
  if (data.length > 0) {
    setIndex(Math.floor(Math.random() * data.length))
   }
}, [data]) 
                    
const [image, setImage] = useState("")

useEffect(() => {
  if(index === data.length) {
    setContent( <>
    <div className="m-6 text-xl"> Well done! Game is finished! Your score is {score} out of {arr.length}. </div>
       { score / arr.length > 0.95 ? setImage(imagesSuperArr[Math.floor(Math.random() * imagesSuperArr.length)].name) 
          : score / arr.length >= 0.6 ? setImage(imagesGoodArr[Math.floor(Math.random() * imagesGoodArr.length)].name)
          : setImage(imagesNotGoodArr[Math.floor(Math.random() * imagesNotGoodArr.length)].name)
       }

       <Image 
                src={`/images/${image}`}
                alt="good job"
                width={160}
                height={160}
                className="md:w-auto md:h-auto m-auto"
        />
            </>
     )
  } else if(answer === 1 ) {
   setContent( <p className="text-5xl text-center font-bold mt-8 text-wa-gold animate-bounce"> +1 </p> )
   const timer = setTimeout(() => {
      setContent ( gameDisplay )
      setAnswer(0)
    }, 1000)
    return () => clearTimeout(timer)
  } else if(data.length === 0) {
    setContent( <p> Well done! Game is finished </p> )
  } else {
    setContent( gameDisplay )
  }
}, [answer, data, index, gameDisplay])

  return (
    <div>
      {content}
      <div>
        {answer === 2 ?  <IncorrectAnswer answer={answerValue} /> : null}
      </div> 
    </div>
  )
}


function IncorrectAnswer({answer}) {
  return (
    <div>
      Not quite right. The answer is {answer.toUpperCase() }. 
    </div>
  )
}



