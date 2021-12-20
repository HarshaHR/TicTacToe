import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

import './Game.css'


const Game = (props) => {
    const history = useHistory();

    if( props.playerName == '' || props.playerTwoName == ''){
        history.push('/')
    }

    const [player1Active, setplayer1Active] = useState(true)
    const [player2Active, setplayer2Active] = useState(false)
    const [playerOneMove, setplayerOneMove] = useState([])
    const [playerTwoMove, setplayerTwoMove] = useState([])

    const [gameMoves, setgameMoves] = useState([])

    let [totalCount, settotalCount] = useState(0)

    let [gameStatus, setgameStatus] = useState('Game Started')

    const [endGame, setEndGame] = useState(false)

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    

    const checkGameWinner = (playerMoveArray, playerName) =>{

        if(totalCount >= 9 ){
            gameStatus = ' Match Draw'
            setgameStatus(gameStatus)
            setEndGame(true)
        }
        else{
            if(playerMoveArray.length >= 3){
                for(let i = 0 ; i < winningConditions.length;i++){
    
                    let presentWinnerArray = winningConditions[i]
                    let playerString = JSON.stringify(playerMoveArray)
                    /*
                    if(playerString.includes(presentWinnerArray)){
                        gameStatus = playerName + ' won'
                        setgameStatus(gameStatus)
                        setEndGame(true)
                        break;
                    }
                    */
                    if(playerMoveArray.includes(presentWinnerArray[0]) && playerMoveArray.includes(presentWinnerArray[1]) && playerMoveArray.includes(presentWinnerArray[2]) ){
                        gameStatus = playerName + ' won'
                        setgameStatus(gameStatus)
                        setEndGame(true)
                        break;
                    }
                }
            }
        }        

    }
    const onElementClick = (event) =>{

        console.log(event.target.id)

        gameStatus = 'Game Inprogress'
        setgameStatus(gameStatus)

        totalCount = totalCount + 1
        settotalCount(totalCount)
        
        if( event.target.classList.contains('selectedBox')){
            return;
        }

        gameMoves.push(parseInt(event.target.id));
        setgameMoves(gameMoves)

        if(player1Active){
            playerOneMove.push( parseInt(event.target.id) )
            setplayerOneMove(playerOneMove)
            setplayer1Active(!player1Active)
            setplayer2Active(!player2Active)
            event.target.className += " selectedBox"

            const player1 = <FontAwesomeIcon icon={faCircle} />
            ReactDOM.render(player1, event.target)

            checkGameWinner(playerOneMove, props.playerName)

        }
        else{
            setplayer1Active(!player1Active)
            setplayer2Active(!player2Active)
            playerTwoMove.push( parseInt(event.target.id) )
            setplayerTwoMove(playerTwoMove)
            const player2 = <FontAwesomeIcon icon={faTimes} />
            ReactDOM.render(player2, event.target)
            event.target.className += " selectedBox"
            checkGameWinner(playerTwoMove, props.playerTwoName)
            

            


        }

     /*   setTimeout(() =>{
            let tempState = true;
            let computerMove = Math.floor(Math.random() * 8);
            while(tempState){
                if(!gameMoves.includes(computerMove)){

                    let clickElement = document.getElementById(computerMove);
                    clickElement.click()
                    tempState = false;
                }
            }
            let clickElement = document.getElementById(computerMove);
            clickElement.click()
            tempState = false;
        },1000) */
        
        
    }

    return (
        <div className='container-fluid mt-5'>
            <div className='row m-0 d-flex justify-content-center'>
                <div className='w-25 d-flex justify-cotent-start'>
                    Player 1 : <span className=' font-weight-bold ml-3'> {props.playerName}</span>
                </div>
                
            </div>
            <div className='row m-0 d-flex mb-5 mt-2 justify-content-center'>
                <div className='w-25 d-flex justify-cotent-start'>
                    Player 2 : <span className=' font-weight-bold ml-3'>{props.playerTwoName}</span>
                </div>
            </div>
            <div className='row m-0 d-flex justify-content-center'>
                <table className= {"table w-25 table-bordered " + (endGame ? 'endgame':'' )}>
                    <tbody>
                    <tr>
                        <td id='0' onClick={onElementClick}>
                           
                        </td>
                        <td id='1' onClick={onElementClick}>
                            
                        </td>
                        <td  id='2' onClick={onElementClick}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td  id='3' onClick={onElementClick}>
                            
                        </td>
                        <td  id='4' onClick={onElementClick}>
                            
                        </td>
                        <td  id='5' onClick={onElementClick}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td  id='6' onClick={onElementClick}></td>
                        <td  id='7' onClick={onElementClick}></td>
                        <td id='8'  onClick={onElementClick}></td>
                    </tr>    
                    </tbody> 
                </table>
            </div>
            <div className='row m-0 d-flex justify-content-center'>
                <div className={"w-25 py-4 font-weight-bold " + (endGame ? 'bg-success':' bg-light')}>
                
                    {gameStatus}
                </div>
            </div>
        </div>
    )
}

export default Game;