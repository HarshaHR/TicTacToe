import React, {useState} from "react";
import { Route, withRouter } from "react-router-dom";
import { Home } from "./Home";
import Game from "./Game";
import Info from "./Info";
import ComputerGame from "./ComputerGame";

const MainComponent = () => {

    const [playerName, setPlayerName] = useState('')
    const [playerTwoName, setPlayerTwoName] = useState('')
    return (
        <div>
            <Route exact path="/" render={(props) => (
                <Home  playerName = {playerName} setPlayerName = {setPlayerName}
                playerTwoName = {playerTwoName} setPlayerTwoName={setPlayerTwoName} />
            )}>

            </Route>
            <Route exact path="/game" render={(props) => (
                <Game playerName = {playerName} setPlayerName = {setPlayerName}
                playerTwoName = {playerTwoName} setPlayerTwoName={setPlayerTwoName} />
            )}/>
            <Route exact path="/info" component={Info} />
            <Route exact path="/computer" render={(props) => (
                <ComputerGame playerName = {playerName} setPlayerName = {setPlayerName}
                />
            )}/>
        </div>
    )
}

export default withRouter(MainComponent);
