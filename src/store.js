import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

const initialState = {
  loterraContractAddress: "terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0",
  loterraPoolAddress: "terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta",
  allWinners: [],
  allPlayers: [],
  config: {},
  allCombinations: []
};

const reducer = (state, action) => {
  switch(action.type) {
    case "setAllWinners":
      return {
        ...state,
        allWinners: action.message
      }
    case "setAllPlayers":
      return {
        ...state,
        allPlayers: action.message
      }
    case "setConfig":
      return {
        ...state,
        config: action.message
      }
    case "setAllCombinations":
      return {
        ...state,
        allCombinations: action.message
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const StoreProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);