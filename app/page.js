
'use client'
import { useState, useEffect, useMemo } from 'react';
import { create, select, removeItems } from '/app/actions'
// import { Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

export default function Home() {
  const [pageNum, setPageNum] = useState(0)
  return (
    <div className= "flex flex-col items-center font-mono h-screen">
      <ThemeColorUpdater />
      <h1 className= "text-center mt-6 mb-4 italic font-bold text-xl " id="title"> My word app 🏋  </h1>
      <div className="w-11/12 flex justify-between mb-2 h-10">
        <button className="btn-nav border-r border-wa-border"
              onClick={() => {
               setPageNum(0)
               }} > My cards </button>
        <button className="btn-nav border-r border-wa-border"
              onClick={() => {
               setPageNum(2)
               }} > Add a card </button>
        <button className="btn-nav" 
              onClick={() => { setPageNum(1)
               }} > Play a game </button>
      </div>      
      {pageNum === 0 ? <DisplayCards /> : ''}
      {pageNum === 1 ? <GameExplanation /> : ''}
      {pageNum === 2 ? <AddCard /> : ''}
    </div>
  )
}


const ThemeColorUpdater = () => {
  
  useEffect(() => {  
    const updateThemeColor = () => {
      const themeColorMeta = document.getElementById('theme-color-meta');
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', bg);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateThemeColor();

    mediaQuery.addEventListener('change', updateThemeColor);

    return () => {
      mediaQuery.removeEventListener('change', updateThemeColor);
    };
  }, []);

  return null; 
};


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
    <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row justify-items-center">
      {data && data.length > 0 ? (
        data.map((item) => {
          if (item.imageurl === null) {
            item.imageurl = "/apple-touch-icon.png";
          }
         return (
            <div className="grid grid-rows-1 grid-cols-2 rounded-md 
              bg-wa-card-bg border border-wa-border my-2 w-11/12 min-h-24 p-2 opacity-90 md:w-10/12" key={item.id} id={item.id}>
                <p className='font-bold pb-1'> {item.name} </p>
                <p className="grid grid-rows-subgrid row-start-2 col-span-3"> {item.definition} </p>
                <button className="grid grid-cols-subgrid col-start-3" onClick = {(e) => {
                  removeItems(e.target.parentElement.id ) 
                  fetchData()}
                  }>  ❌ </button> 
                <Image
                  src={item.imageurl}
                  alt="A cat's body language"
                  width={300}
                  height={300}
                  className="md:w-auto md:h-auto m-auto"
              />
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
  const [imageURLValue, setImageURLValue] = useState("")
  const id = uuidv4()

  return ( 
      <div className="flex flex-col items-center gap-y-2 w-screen">
        <input  
          id="input-word" 
          type="text" 
          placeholder="Type your word here" 
          className="wa-input" 
          value = { wordInputValue }
          onChange = {e => setWordInputValue(e.target.value) } 
        />
        <textarea id="input-definition"
          placeholder="Type your example here" 
          className="wa-input h-20" 
          value = {definitionInputValue}
          onChange = {e => setDefinitionInputValue(e.target.value) } 
        /> 
        <button className="btn-primary"> Find image </button>
        <div> Images </div>
        <p> OR if you don't fancy images, paste your image url below: </p>
        <input
          type="text"
          className="wa-input"
          placeholder="Paste your image url here"
          value={imageURLValue}
          onChange={(e) => setImageURLValue(e.target.value)}
        />
        <button className="btn-primary"
         onClick = {() => { 
                if(wordInputValue === "" || definitionInputValue === "") {
                  alert("Make sure your word and example are entered")
                } else {
                  create(id, wordInputValue.toLowerCase(), definitionInputValue, imageURLValue) 
                }
                setWordInputValue('')
                setDefinitionInputValue('')
                setImageURLValue("")
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
    <div className="w-full">
      {isVisible ? (
        <div className="m-4"> 
          <p className="mt-2 mx-2"> You will get a definition, type the word. </p>
          <p className="mb-2 mx-2"> Only if your answer is correct, your score will increase by +1 </p>
          <button className="btn-primary animate-pulse w-full" onClick={renderGame}> START GAME </button> 
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
    {name: "not-give-up.webp", alt: ""}, 
  ]

const imagesGoodArr = [
  {name: "nice.webp", alt: ""},
  {name: "thumb.webp", alt: ""},
  {name: "viking-ok.webp", alt: ""}, 
]


const imagesSuperArr  = [
  {name: "amazing.webp", alt: ""},
  {name: "fireworks.webp", alt: ""},
  {name: "terrific.webp", alt: ""}, 
  {name: "vietnamese-wow.webp", alt: ""},
  {name: "viking-perfect.webp", alt: ""},
  {name: "wow.webp", alt: ""}, 
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
                    <div className="w-full text-center">
                      {data[index] ? <p className="mx-2 my-4 w-full"> {data[index].definition} </p> : null }
                      <input
                        type="text"
                        className="wa-input mb-4" 
                        placeholder="type the word"
                        value = {nameInputValue}
                        onChange = {e => setNameInputValue(e.target.value) } 
                      />
                      <button className="btn-primary" 
                        onClick={() => {check()}}> Check 
                      </button> 
                    </div>
                      ), [data, index, nameInputValue])

useEffect(() => {
  if (data.length > 0) {
    setIndex(Math.floor(Math.random() * data.length))
   }
}, [data]) 
                    
const [image, setImage] = useState("")

useEffect(() => {
  if(data.length === 0) {
    if(score/arr.length > 0.95) {
      setImage(imagesSuperArr[Math.floor(Math.random() * imagesSuperArr.length)].name) 
    } else if(score/arr.length >= 0.6) {
      setImage(imagesGoodArr[Math.floor(Math.random() * imagesGoodArr.length)].name)
    } else {
      setImage(imagesNotGoodArr[Math.floor(Math.random() * imagesNotGoodArr.length)].name)
    }
  }
}, [data])

useEffect(() => {
  setContent( <>
    <div className="m-6 text-xl text-center font-bold"> Game is finished! 
      Your score is {score} out of {arr.length}. 
    </div>
    <Image 
      src={`/images/${image}`}
      alt="good job"
      width={300}
      height={300}
      className="md:w-auto md:h-auto m-auto"
      unoptimized
    />
</>
)
}, [image])



useEffect(() => {
   if(answer === 1 && data.length !== 0) {
    setContent( <p className="text-5xl text-center font-bold mt-8 text-wa-gold animate-bounce"> +1 
                </p> 
              )
    const timer = setTimeout(() => {
      setContent ( gameDisplay )
      setAnswer(0)
    }, 1000)
    return () => clearTimeout(timer)
  } else {
    setContent( gameDisplay )
  }
}, [answer, gameDisplay])

  return (
    <div className="w-full">
      {content}
      <div>
        {answer === 2 ?  <IncorrectAnswer answer={answerValue} /> : null}
      </div> 
    </div>
  )
}


function IncorrectAnswer({answer}) {
  return (
    <div className="text-center m-2">
      Not quite right! The answer is <span className="wa-gold-bg"> {answer}</span>
    </div>
  )
}

// function GetImages() {
//   const [data, setData] = useState("empty")
//   console.log("I'm clicked")
//   useEffect(() => {
//     const fetchPhotos = async () => {
//       await fetch("https://api.unsplash.com/search/photos?query=cat", {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'L2rGU_fttEGdmlpbUbpJSlDZNs66OlV5rq3uzBXgK-c'
//         }
//       })
//       const res = await response.json() 
//       setData(res)
//       console.log(data)
//     }
//   })
//   console.log(data)
// }


function GetImages () {
  const [data, setData] = useState(null); // Initialize state to null
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  const fetchPhotos = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
          const response = await fetch("https://api.unsplash.com/search/photos?query=cat",
            {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Client-ID L2rGU_fttEGdmlpbUbpJSlDZNs66OlV5rq3uzBXgK-c' 
              }
          }
        )
        

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const res = await response.json();
          setData(res.results); // Assuming you want the results array
      } catch (error) {
          setError(error.message); // Set error message if fetch fails
      } finally {
          setLoading(false); // Set loading to false when done
      }
  };

  return (
      <div>
          <button onClick={fetchPhotos}>Get Images</button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && (
              <div>
                  {data.map((image) => (
                      <img key={image.id} src={image.urls.small} alt={image.description} />
                  ))}
              </div>
          )}
      </div>
  );
};

