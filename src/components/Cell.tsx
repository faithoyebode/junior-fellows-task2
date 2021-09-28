import React from 'react';
import styled from "styled-components";
import { minesNext, gameState } from '../api';
import { Gem, Mine } from "../assets";
import gemAudio from "../assets/gem.mp3";
import mineAudio from "../assets/mine.mp3";

interface CellProps{
    yellowText: string,
    id: number,
    boardState: string,
    setBoardState: (boardState: string) => void
}
const Cell = ({ 
    yellowText, 
    id,
    boardState,
    setBoardState,
}: CellProps): React.ReactElement => {

    const [clicked, setClicked] = React.useState<boolean>(false);
    const gemSound = new Audio(gemAudio);
    const mineSound = new Audio(mineAudio);

    const handleClick= async () => {
        if(boardState === "busted"){
            return;
        }

        if(!clicked){
            await minesNext(id);
            setClicked(true);
            if(gameState.mines.includes(id)){
                setBoardState("busted");
                mineSound.play();    
            }else{
                gemSound.play();    
            }
        }
    }

    return (
        <CellBox 
            onClick={handleClick}
            status={gameState.mines.includes(id)} 
            className={`${clicked && 'show'} ${boardState === "busted" && !clicked && 'busted'}`}
        >
            {
                gameState.mines.includes(id) === true ? (
                    <div className="mine">
                        <Mine width="auto" height="100%" />
                    </div>
                ): (
                    <div className="gem">
                        <Gem width="auto" height="100%" />
                    </div>
                )
            }
          <div className="yellow-tip">
            <p>{yellowText}</p> 
          </div>
        </CellBox>
    )
}

const CellBox = styled.div<{status: boolean}>`

    background-color: #0f212E;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .gem, .mine{
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transform: translate(-50%, -50%);
      height: 50%;
      transition: all 0.5s ease;
      z-ndex: 5;
    }

    .yellow-tip{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: black;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px;

      p{
        font-size: 10px;
        font-weight: bold;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.5s ease-in 0.3s;
      }

      &::after{
        content: " ";
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: yellow;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 5px;        
        z-index: -1;
        transition: all 0.3s ease-in;
        transform: translateX(-100%);
      }
    }

    &:hover{
      

      .yellow-tip{

        p{
          opacity: 1;
          transform: translateY(0);
        }

        &:after{
          opacity: 1;
          transform: translateX(0);
          animation: mymove 5s 1s infinite;
        }
      }
    }

    &.show{
        background-color: ${props => props.status ? '#fd013e82': '#09fd0282'};  

        .gem{
            opacity: 1;
            height: 80%;
            width: 80%;
        }
        .mine{
            opacity: 1;
            height: 80%;
            width: 80%; 
            animation: pump 0.8s 0.2s ease infinite;

        }

        .yellow-tip{
            display: none;
        }
    }

    &.busted{
        background-color: ${props => props.status ? '#fd013e40': '#09fd0240'};  
         
        .gem, .mine{
            opacity: 0.6;
            height: 40%;
            width: 40%;
        }

        &:hover{
            .yellow-tip{
                display: none;
            }
        }
    }

    @keyframes mymove {
        0% {
          background-color: red;
        }
        20% {
          background-color: magenta;
        }
        40% {
          background-color: orange;
        }
        60% {
          background-color: teal;
        }
        80% {
          background-color: brown;
        }
        100% {
          background-color: yellow;
        }
    }

    @keyframes pump {
        0% {
            width: 65%;
        }
        50% {
            width: 80%;
        }
        100% {
            width: 65%;
        }
    }
`;

export default Cell;
