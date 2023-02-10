import React from 'react'
import Dice from './Dice'
import {nanoid} from "nanoid"
import reset from './img/reset.webp'

export default function App(){

    const [dice,setDice] = React.useState(newNums)
    const [gameStartedState, setGameStartedState] = React.useState(false)
    const [gameWon, setGameWon] = React.useState(false)
    const [rollCounter,setRollCounter] = React.useState(0)
    const [bestFinish, setBestFinish] =  React.useState(Number.MAX_VALUE)

    function newNums(){
        const  objectArray = []

        for(let i = 0; i < 10; i++){

             objectArray.push({id: nanoid(),number:Math.floor(Math.random() * 6) + 1, isHeld: false } )
                
        }
        return objectArray;
    }

    function rollDice(){
        setDice(prevState => prevState.map( dice => !dice.isHeld ? {...dice, number:Math.floor(Math.random() * 6) + 1} : {...dice}))
        setRollCounter( prevState => prevState + 1)
        
    }

    function toggleIsHeld(id){
        console.log(id);
        setGameStartedState(true)
        setDice( prevState => prevState.map( die => die.id === id ? {...die,  isHeld: !die.isHeld} : {...die}))
    }

    function restart(){
        
        setGameStartedState(false)
        setDice(newNums);
        setRollCounter(0)
        setGameWon(false)
        

    }

    //checks if all dice are held (green) and all the same number - if so, the game is won
    React.useEffect(() => {
        const allHeld= dice.every(die => die.isHeld)
        const allSame = dice.every(die => die.number === dice[0].number)
        
        if(allHeld && allSame){
            setGameWon(true)
            setBestFinish(prevState => prevState > rollCounter ? rollCounter :prevState)
            console.log("gamewon")
            
        }
    },[dice] )

    const diceElements = dice.map( die => <Dice number={die.number} 
                                                key={die.id}
                                                id={die.id}
                                                isHeld={die.isHeld} 
                                                toggleIsHeld={() => toggleIsHeld(die.id)}                   />)

    return (
        <div className='app'>

            <div className='app--diceArrayAndReset'>
                <div className='app--diceArray'> 
                    {diceElements}
                    
                </div>
                {gameStartedState ? <button className='app--reset'
                                             onClick={restart}>
                                             <img className='app--reset--img' src={reset} alt='reset'></img>
                                    </button> :

                                    <button className='app--reset2'
                                             onClick={restart}> 
                                             <img className='app--reset--img' src={reset} alt='reset'></img>
                                    </button>} 
            </div>
            

            {!gameWon && <button  className='app--roll'
                                onClick={rollDice}>Roll</button>}
           

            {gameWon && <h1 className='app-win'>You won!</h1>}

            <h3 className='app-currentRolls'>Current rolls: {rollCounter}</h3>

            <h3 className='app--bestFinish'>Best finish: {bestFinish < Number.MAX_VALUE ? bestFinish : "N/A"}</h3>
        
        </div>
    )
}