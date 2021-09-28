import React from "react";
import styled from "styled-components";
import _ from "lodash";
import Cell from "./components/Cell";
import { 
  gameState as apiGameState, 
  minesBet, 
  minesFields,
  wait,
  CasinoGameMines
} from "./api";
import { Gem } from "./assets";
import { Mine } from "./assets";
import gemAudio from "./assets/gem.mp3";
import mineAudio from "./assets/mine.mp3";

const Game = () => {

  const yellowMessages = [
    "Where could it be?",
    "Try your luck!",
    "Feeling lucky?",
    "Be careful!",
    "Winners are grinners",
    "Does lightning strike twice?",
    "Up your chances",
    "Determine your destiny"
  ];

  const [gameState, setGameState] = React.useState<CasinoGameMines>(apiGameState);
  //const [minesFields, setMinesFields] = React.useState<Array<number>>(apiMinesFields);
  const [revealedTiles, setRevealedTiles] = React.useState<Array<number>>([]);


  const handleStart = async () => {
    await wait();
    const newRoundTiles = _.shuffle(minesFields);
    setGameState({
      ...gameState,
      mines: newRoundTiles.slice(0, 5),
      revealedTiles: [],
      state: "progress"
    });
  };

  const handleBusted = async () => {
    setGameState({
      ...gameState,
      state: "idle"
    });
  };

  // React.useEffect(async () => {
  //   await minesBet();
  // }, [boardState]);

  return (
    <BoardContainer status={gameState.state}>
      Game will go here
      <div className="board">
        {minesFields.map((el, i) => (
            <Cell 
              key={i+1}
              id={el} 
              yellowText={yellowMessages[Math.floor(Math.random() * 8)]}
              gameState={gameState}
              setGameState={setGameState}
            /> 
        ))}
      </div>

      <div className="overlay">
        {
          gameState.state === "idle" && (
            <div className="start">
              <h3>Time to start!</h3>
              <button onClick={handleStart}>Start Game</button>
            </div>
          )
        }
        
        {
          gameState.state === "busted" && (
            <div className="fail">
              <h3>Uh - Oh!</h3>
              <p>Better luck next time.</p>
              <button onClick={handleBusted}>Try Again!</button>
            </div>
          )
        }
      </div>

    </BoardContainer>
  );
};

const BoardContainer = styled.div<{status: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;

  .board{
    display: grid;
    grid-template-rows: repeat(5, 80px);
    grid-template-columns: repeat(5, 80px);
    gap: 10px;
    background-color: #304553;
    width: auto;
    height: auto;
    padding: 30px;
  }

  .overlay{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: red;
    display: flex;
    display: ${props => props.status === "idle" || props.status === "busted" ? 'flex' : 'none'};  
    align-items: center;
    justify-content: center;

    h3{
      font-size: 48px;
    }
  }
`;

export default Game;
