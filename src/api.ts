// following API - this is how to not write an API
import _ from "lodash";

type State = "idle" | "progress" | "cashout" | "busted";

export type CasinoGameMines = {
  minesCount: number;
  mines: number[];
  revealedTiles: number[];
  state: State;
};

export const wait = () =>
  new Promise<void>(resolve => setTimeout(resolve, Math.random() * 500 + 200));

export const gameState: CasinoGameMines = {
  minesCount: 5,
  mines: [],
  revealedTiles: [],
  state: "idle"
};

export const minesFields = _.range(0, 25); //return array from 0 to 24

export const minesBet = async () => {
  await wait();

  const newRoundTiles = _.shuffle(minesFields); //returns an array of shuffled values
  gameState.mines = newRoundTiles.slice(0, 5); //returns the first five elements of the shuffled array
  gameState.revealedTiles = [];

  return getGameState("progress");
};

export const minesNext = async (tileToReveal: number) => {
  await wait();

  gameState.revealedTiles.push(tileToReveal);

  if (gameState.mines.includes(tileToReveal)) {
    return getGameState("busted");
  }

  return getGameState("progress");
};

const getGameState = (state: State) => {
  gameState.state = state;

  // if (state === "progress") {
  //   return { ...gameState, mines: [] };
  // }

  return gameState;
};

export const minesCashout = async () => {
  await wait();

  return getGameState("cashout");
};
