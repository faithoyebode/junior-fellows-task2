import React from "react";
import styled from "styled-components";
import Cell from "./components/Cell";
import { gameState, minesFields, minesBet, minesCashout, minesNext } from "./api";
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

  const [boardState, setBoardState] = React.useState<string>(gameState.state);
  const handleStart = async () => {
    await minesBet();
  };

  return (
    <BoardContainer>
      Game will go here
      <div className="board">
        {minesFields.map((el, i) => (
            <Cell 
              key={i+1}
              id={el} 
              yellowText={yellowMessages[Math.floor(Math.random() * 8)]}
              boardState={boardState}
              setBoardState={setBoardState}
            /> 
        ))}
      </div>

      <button onClick={handleStart}>Start Game</button>
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
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

  
`;

export default Game;
