import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faInfo } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();

    const transitHome = () =>{
        history.push('/')
    }

    const transitInfo = () =>{
        history.push('/info')
    }

    return (
        <>
            <header className='d-flex py-4 bg-dark justify-content-center align-items-center'> 
                    <h2 className='text-white font-weight-bold'>X Tic Tac Toe</h2>
            </header>
            <div className='d-flex h-100 bg-light py-3'>
                <span className='ml-3 mr-5' onClick={transitHome} style={{cursor:'pointer'}}>
                    <FontAwesomeIcon icon={faHome} size='2x' color='grey' />
                </span>
                <span className='mr-5'onClick={transitInfo} style={{cursor:'pointer'}}>
                    <FontAwesomeIcon icon={faInfo}  size='2x' color='grey' />
                </span>
            </div>
        </>
    )
}

export default Header;