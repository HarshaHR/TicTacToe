import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

export const Home = (props) => {
    const history = useHistory();
    
    
    const [validaState, setvalidaState] = useState(false)

    let [gameType, setgameType] = useState('computer')
    let [twoPlayerMode, settwoPlayerMode] = useState(false)

    const startGame = () =>{

        if(twoPlayerMode){
            history.push('/game')
        }
        else{
            history.push('/computer')
        }
        console.log(gameType)
    }

    const setPlayerNameFunc = (event) =>{

        props.setPlayerName(event.target.value)
    }

    const setPlayerTwoNameFunc = (event) =>{
        props.setPlayerTwoName(event.target.value)
    }


    const handleChange = (e)=>{
        if(e.target.value == 'computer'){
            twoPlayerMode = false
            settwoPlayerMode(twoPlayerMode)
        }
        else{
            twoPlayerMode = true
            settwoPlayerMode(twoPlayerMode)
        }
    }

    return (
        <div className='container-fluid mt-5 pl-5'>
            <h6 className='my-3 d-flex justify-content-left w-100'>Choose Game Type</h6>
            <div className='d-flex align-items-center '>
                <div className="custom-control custom-radio mr-5">
                    <input className="custom-control-input" type="radio" value="computer" id="computer"
                    onChange={handleChange} name="gametype" checked />
                    <label className="custom-control-label" htmlFor="computer">Play Against Computer</label>
                </div>
                <div className="custom-control custom-radio">
                    <input className="custom-control-input" type="radio" value="twoplayer" id="twoplayer"
                    onChange={handleChange} name="gametype"/>
                    <label className="custom-control-label" htmlFor="twoplayer">Two Players (Offline)</label>
                </div>
            </div>
            <h6 className=' my-3 d-flex justify-content-left w-100'> Player One</h6>
            <div className='w-25 mt-4 mb-5'>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faUser} color='grey' />
                        </span>
                    </div>
                    <input type="text"
                    onChange={setPlayerNameFunc}
                    value={props.playerName} placeholder='Enter Player Name' className="form-control w-50" required />
               
                </div>
            </div>
            <div className={(twoPlayerMode?'d-block':'d-none')}>
                <h6 className=' my-3 d-flex justify-content-left w-100'> Player Two</h6>
                <div className='w-25 mt-4 mb-5'>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} color='grey' />
                            </span>
                        </div>
                        <input type="text"
                        onChange={setPlayerTwoNameFunc}
                        value={props.playerTwoName} placeholder='Enter Player Name' className="form-control w-50" required />
                
                    </div>
                </div>
            </div>

            
            <div className='row m-0 p-0 mt-5'>
                <button className='btn btn-primary font-weight-bold' disabled ={validaState}  onClick={startGame}>
                    Start Game
                    <FontAwesomeIcon className='ml-3 text-white' icon={faCaretRight} color='grey' />
                </button>
            </div>
        </div>
    )
}
