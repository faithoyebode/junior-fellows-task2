import React from "react";
import styled from "styled-components";
import Cell from "./components/Cell";
import { minesBet, minesCashout, minesNext } from "./api";
import { Gem } from "./assets";
import { Mine } from "./assets";
import gemAudio from "./assets/gem.mp3";
import mineAudio from "./assets/mine.mp3";


const Game = () => {
  return (
    <BoardContainer>
      Game will go here
      <div className="board">
        {[...new Array(25)].map((el, i) => (
            <Cell key={i} /> 
        ))}
      </div>
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
