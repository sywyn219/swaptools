
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
  err: string
  times: string
}

export type Args = {
    tokenA:  string
    tokenB:  string
    total:  number
    results: His[]
    privateKeys: string[]
    froms: string[]
    toAddrs: string[]
    targetPrice: string
    swapType: "buy" | "sell"
    internalTimes: number
    singleAmountStart: string
    singleAmountEnd: string
    running: boolean
    task: () => void
}

export type State = {
  timerSwap: Args
  targetSwap: Args
  batchBuy: Args
  batchSell: Args
  batchInput: Args
  batchOutPut: Args
}

export const defaultArgs: Args = {
  tokenA: '0x',
  tokenB: '0x',
  total: 0,
  results: [],
  privateKeys: [],
  froms: [],
  toAddrs: [],
  targetPrice: '0.00',
  swapType: "buy",
  internalTimes: 10,
  singleAmountStart: '0.00',
  singleAmountEnd: '0.00',
  running: false,
  task: () => {}
};

export const defaultState: State = {
  timerSwap: { ...defaultArgs },
  targetSwap: { ...defaultArgs },
  batchBuy: { ...defaultArgs },
  batchSell: { ...defaultArgs, swapType: "sell" },
  batchInput: { ...defaultArgs },
  batchOutPut: { ...defaultArgs }
};
