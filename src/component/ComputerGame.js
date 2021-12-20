import React, {useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

import './Game.css'


const ComputerGame = (props) => {
    const history = useHistory();

    if( props.playerName == ''){
        history.push('/')
    }
    const [player1Active, setplayer1Active] = useState(true)
    const [player2Active, setplayer2Active] = useState(false)
    const [playerOneMove, setplayerOneMove] = useState([])
    const [playerTwoMove, setplayerTwoMove] = useState([])

    const [gameMoves, setgameMoves] = useState([])

    let [totalCount, settotalCount] = useState(0)

    let [gameStatus, setgameStatus] = useState('Game Started')

    let [endGame, setEndGame] = useState(false)

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
                    if(playerMoveArray.includes(presentWinnerArray[0]) && playerMoveArray.includes(presentWinnerArray[1]) && playerMoveArray.includes(presentWinnerArray[2]) ){
                        gameStatus = playerName + ' won'
                        setgameStatus(gameStatus)
                        endGame = true
                        setEndGame(endGame)
                        break;
                    }
                }
            }
        }        

    }

    const computerMoveSimulate = () =>{

        setTimeout(() =>{
            console.log("Result",endGame)
            if(!endGame){
                totalCount = totalCount + 1
                settotalCount(totalCount)

                let tempState = true;
                let selectedMove = -1;
                while(tempState){
                    let computerMove = Math.floor(Math.random() * 8);
                    selectedMove = computerMove;
                    if(!gameMoves.includes(computerMove)){
                        
                        break;
                    }
                }
                let clickElement = document.getElementById(selectedMove);

                console.log("Computer Move",selectedMove)
                setgameMoves(prevMoves => ([...prevMoves,selectedMove]));


                setplayer1Active(!player1Active)
                setplayer2Active(!player2Active)
                playerTwoMove.push( parseInt(selectedMove) )
                setplayerTwoMove(playerTwoMove)
                const player2 = <FontAwesomeIcon icon={faTimes} />
                ReactDOM.render(player2, clickElement)
                clickElement.className += " selectedBox"
                checkGameWinner(playerTwoMove, "Computer")

            }
        },500)
            
            
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

        console.log(gameMoves)
        gameMoves.push(parseInt(event.target.id));
        setgameMoves(gameMoves)

        playerOneMove.push( parseInt(event.target.id) )
        setplayerOneMove(playerOneMove)
        setplayer1Active(!player1Active)
        setplayer2Active(!player2Active)
        event.target.className += " selectedBox"
        console.log("player1 #1")
        const player1 = <FontAwesomeIcon icon={faCircle} />
        ReactDOM.render(player1, event.target)
        checkGameWinner(playerOneMove, props.playerName)
        
        if(!endGame){
            computerMoveSimulate()
        }
        else{return}
        

    }

    return (
        <div className='container-fluid mt-5'>
            <div className='row m-0 mb-5 d-flex justify-content-center'>
                <div className='w-25 d-flex justify-cotent-start'>
                    Player 1 : <span className=' font-weight-bold ml-3'> {props.playerName}</span>
                </div>
                
            </div>
            <div className='row m-0 d-flex justify-content-center'>
                <table className= {"table w-25 table-bordered " + (endGame ? 'endgame':'' )}>
                    <tbody>
                    <tr>
                        <td id='0' className='py-4' onClick={onElementClick}>
                           
                        </td>
                        <td id='1' className='py-4' onClick={onElementClick}>
                            
                        </td>
                        <td  id='2' className='py-4' onClick={onElementClick}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td  id='3' className='py-4' onClick={onElementClick}>
                            
                        </td>
                        <td  id='4' className='py-4' onClick={onElementClick}>
                            
                        </td>
                        <td  id='5' className='py-4' onClick={onElementClick}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td  id='6' className='py-4' onClick={onElementClick}></td>
                        <td  id='7' className='py-4' onClick={onElementClick}></td>
                        <td id='8' className='py-4' onClick={onElementClick}></td>
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

export default ComputerGame;