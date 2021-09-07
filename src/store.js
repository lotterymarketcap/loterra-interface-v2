import React, { createContext, useContext, useReducer, useCallback } from 'react';
import {StdFee, MsgExecuteContract,LCDClient, WasmAPI, BankAPI} from "@terra-money/terra.js";

const StoreContext = createContext();

const initialState = {
  loterraContractAddress: "terra1q2k29wwcz055q4ftx4eucsq6tg9wtulprjg75w",
  loterraContractAddressCw20: "terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr",
  loterraPoolAddress: "terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta",
  loterraStakingAddress: "terra1342fp86c3z3q0lksq92lncjxpkfl9hujwh6xfn",
  alteredContractAddress:"terra15tztd7v9cmv0rhyh37g843j8vfuzp8kw0k5lqv",
  loterraLPAddress: "terra1t4xype7nzjxrzttuwuyh9sglwaaeszr8l78u6e",
  loterraStakingLPAddress: "terra1pyuxghcv2azsa2rz3gwa2xfgwrqxm8s5cwz5un",
  allWinners: [],
  tokenInfo: {},
  allPlayers: [],
  allProposals: [],
  allNativeCoins: [],
  staking: {},
  wallet: {},
  LotaBalance: {},
  LPBalance:{},
  config: {},
  currentLotteryId: 0,
  holderPercentageFee: 0,
  allCombinations: [],
  allHolder: {},
  holderClaims: [],
  holderAccruedRewards:0,
  LPHolderAccruedRewards: 0,
  combination: "",
  modal: false,
  daoFunds: 0,
  lcd_client: new LCDClient({
    URL: "https://lcd.terra.dev/",
    chainID: "columbus-4",
  }),
  blockHeight: 0
};

const reducer = (state, action) => {
  switch(action.type) {
    case "setBlockHeight":
      return {
        ...state,
        blockHeight: action.message
      }
    case "setModal":
      return {
        ...state,
        modal: action.message
      }
      case "setCurrentLotteryId":
        return {
          ...state,
          currentLotteryId: action.message
        }
      case "setHolderPercentageFee":
        return {
          ...state,
          holderPercentageFee: action.message
        }
    case "setDaoFunds":
      return {
        ...state,
        daoFunds: action.message
      }
    case "setStaking":
      return {
        ...state,
        staking: action.message
      }
    case "setTokenInfo":
      return {
        ...state,
        tokenInfo: action.message
      }
    case "setAllWinners":
      return {
        ...state,
        allWinners: action.message
      }
    case "setWallet":
      return {
        ...state,
        wallet: action.message
      }
    case "setHolderAccruedRewards":
      return {
        ...state,
        holderAccruedRewards: action.message
      }
    case "setLPHolderAccruedRewards":
      return {
        ...state,
        LPHolderAccruedRewards: action.message
      }
    case "setAllPlayers":
      return {
        ...state,
        allPlayers: action.message
      }
    case "setAllProposals":
      return {
        ...state,
        allProposals: action.message
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
    case "setAllHolder":
      return {
        ...state,
        allHolder: action.message
      }
    case "setHolderClaims":
      return {
        ...state,
        holderClaims: action.message
      }
    case "setAllNativeCoins":
      return {
        ...state,
        allNativeCoins: action.message
      }
      case "setLotaBalance":
      return {
        ...state,
        LotaBalance: action.message
      }
    case "setCombination":
      return {
        ...state,
        combination: action.message
      }
    case "setLPBalance":
      return {
        ...state,
        LPBalance: action.message
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
