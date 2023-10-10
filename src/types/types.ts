import {unstable_HistoryRouter} from "react-router-dom";

export type His = {
  txHash: string
  typeTx: string
  fromAddr: string
  toAddr:   string
  price: string
  volumeA: string
  volumeB: string
  dex: string
  addr: string
  status: string
  times: string
}

export type SwapTimeArgs = {
    tokenA:  string
    tokenB:  string
    total:  number
    results: His[]
    privateKeys: string[]
    froms: string[]
    internalTimes: number
    singleAmountStart: string
    singleAmountEnd: string
    running: boolean
    task: () => void
}

export type SwapTargetArgs = {
  tokenA:  string
  tokenB:  string
  results: His[]
  privateKeys: string[]
  targetPrice: string
  swapType: "buy" | "sell"
  singleAmountStart: string
  singleAmountEnd: string
  internalTimes: number
  running: boolean
  task: () => void
}

export type BatchBuySellArgs = {
  tokenA:  string
  tokenB:  string
  privateKeys: string[]
  results: His[]
  swapType: "buy" | "sell"
  amount: string
  running: boolean
  task: () => void
}

export type BatchTransferArgs = {
    fromKeys: string[]
    toAddrs: string[]
    amount: string
    results: His[]
    running: boolean
    task: () => void
}


export type State = {
  swapTime: SwapTimeArgs,
  swapTarget: SwapTargetArgs,
  buySell: BatchBuySellArgs,
  transfers: BatchTransferArgs
}

export const defaultState: State = {
    swapTime: {
      tokenA: '0x',
      tokenB: '0x',
      total: 0,
      results: [],
      privateKeys: [],
      froms: [],
      singleAmountStart: '0.00',
      singleAmountEnd: '0.00',
      internalTimes: 10,
      running: false,
      task: () =>{}
    },
    swapTarget: {
      tokenA: '0x',
      tokenB: '0x',
      results: [],
      privateKeys: [],
      targetPrice: '0.00',
      swapType: "buy",
      singleAmountStart: '0.00',
      singleAmountEnd: '0.00',
      internalTimes: 10,
      running: false,
      task: () => {}
    },
    buySell: {
      tokenA: '0x',
      tokenB: '0x',
      results: [],
      privateKeys: [],
      swapType: "buy",
      amount: '0.00',
      running: false,
      task: () => {}
    },
    transfers: {
      fromKeys: [],
      toAddrs: [],
      amount: '0.00',
      results: [],
      running: false,
      task: () => {}
    }
};
