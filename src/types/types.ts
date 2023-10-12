
export type His = {
  txHash: string;
  tokenA:  string
  tokenB:  string
  typeTx: string;
  fromAddr: string;
  toAddr: string;
  price: string;
  volumeA: string;
  volumeB: string;
  dex: string;
  addr: string;
  status: string;
  title: string;
  err: string;
  times: string;
};

export type Args = {
    tokenA:  string
    tokenB:  string
    total:  number
    privateKeys: string[]
    froms: string[]
    toAddrs: string[]
    targetPrice: string
    swapType: "buy" | "sell"
    internalTimes: number
    singleAmountStart: string
    singleAmountEnd: string
    running: boolean
    task:  (index) => void
    results: () => any
}

export type State = {
  timerSwap: Args
  targetSwap: Args
  batchBuy: Args
  batchSell: Args
  batchInput: Args
  batchOutPut: Args
  nodes: string[]
}

export const defaultArgs: Args = {
  tokenA: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
  tokenB: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
  total: 0,
  privateKeys: ['ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
  froms: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
  toAddrs: [],
  targetPrice: '0.00',
  swapType: "buy",
  internalTimes: 3,
  singleAmountStart: '10.55',
  singleAmountEnd: '20.66',
  running: false,
  task: async () => {},
  results: () => []
};

export const defaultState: State = {
  timerSwap: { ...defaultArgs },
  targetSwap: { ...defaultArgs },
  batchBuy: { ...defaultArgs },
  batchSell: { ...defaultArgs, swapType: "sell" },
  batchInput: { ...defaultArgs },
  batchOutPut: { ...defaultArgs },
  nodes: [
    'http://127.0.0.1:8545',
    // 'https://binance.llamarpc.com',
    // 'https://bsc.rpc.blxrbdn.com',
    // 'https://bsc.blockpi.network/v1/rpc/public',
    // 'https://bsc.publicnode.com',
    // 'https://bsc-rpc.gateway.pokt.network',
    // 'https://bsc-dataseed2.defibit.io',
  ]
};
