// ** MUI Imports

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import {auto} from "@popperjs/core";
import Listaddrs from "../listaddr/Listaddrs";

import {FileImport} from "../../../commpoent/FileImport";
import {useTask} from "../../../hooks/useTask";
import {ethers} from "ethers";
import {
  addressZero,
  checkAndClearArray, compareStrings,
  getTimes,
  isInteger,
  isNumber,
  mergeArrays,
  removeEmptyStrings
} from "../../../util/arr";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import {tokenAbi} from "../../../util/tokenAbi";
const TextFieldLayout = () => {

  const { state, dispatch } = useTask();


  async function iterateArray(arr: any[]): Promise<string[]> {
        // 迭代数组并进行操作
        const result = await Promise.all(arr.map(async (item) => {
        const wallet = new ethers.Wallet(item);
        const addr = await wallet.getAddress();
        if (!ethers.isAddress(addr) || addr === addressZero) {
          console.log("errr------>",item)
          throw new Error(item);
        }
        return addr;
      }));

      return result;
  }

  // @ts-ignore
  const changePrivateKey = async (e) => {

    const strs = e.target.value.split('\n');
    const str = removeEmptyStrings(strs);
    try {
      const addrs = await Promise.all(await iterateArray(str));

      if (addrs.length > 0) {
        const his = {
          title: "success",
          status: "输入私钥成功" + " 数量 "+ addrs.length,
          times: getTimes()
        }

        const fromAddrs = mergeArrays(state.timerSwap.froms, addrs)
        const fromKeys = mergeArrays(state.timerSwap.privateKeys, str)

        const results = checkAndClearArray(state.timerSwap.results,20, his)
        dispatch({type: 'SET_TIMER_SWAP', args: {...state.timerSwap, froms: fromAddrs, privateKeys: fromKeys,
            running: false, results: results, task: ()=>{}}})
      }

    } catch (error: any) {
      const his = {
        title: "error",
        err: "私钥错误 "+ error.value,
        times: getTimes()
      }

      const results = checkAndClearArray(state.timerSwap.results,20, his)

      dispatch({type: 'SET_TIMER_SWAP', args: {...state.timerSwap,froms: [], privateKeys: [], running: false, results: results,task: ()=>{}}})

      return [];
    }

  }

  // @ts-ignore
  const handleTokenA = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: () =>{}, tokenA: e.target.value }});
  }

  // @ts-ignore
  const handleTokenB = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: () =>{}, tokenB: e.target.value }});
  }

  const startTimer = async () => {
    const err = checkArgs()
    if (err !== null) {
      const his = {
        title: "error",
        err: err
      }
      const results = checkAndClearArray(state.timerSwap.results, 20, his)
      dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, results: results, running: false, task: ()=>{} }});
      return
    }

    const provider = ethers.getDefaultProvider("https://binance.llamarpc.com")
    const walletP = new ethers.Wallet(state.timerSwap.privateKeys[0]);
    const wallet = walletP.connect(provider)

    const token = new ethers.Contract(state.timerSwap.tokenA, tokenAbi, wallet);

    console.log("decimals-->", await token.decimals())

    return

    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: true, task: () =>{} }});
  };

  const stopTimer = () => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: ()=>{} }});
  };

  const checkArgs = () => {
    if (!isNumber(state.timerSwap.singleAmountStart) || !isNumber(state.timerSwap.singleAmountEnd)) {
      return "随机范围必须是数字"
    }
    if (compareStrings(state.timerSwap.singleAmountEnd,state.timerSwap.singleAmountStart) < 0) {
      return "随机范围end必须大于或者等于start"
    }
    if (!ethers.isAddress(state.timerSwap.tokenA) || state.timerSwap.tokenA === addressZero ||
      !ethers.isAddress(state.timerSwap.tokenB) || state.timerSwap.tokenB === addressZero ) {
      return "token地址错误"
    }
    if (!isInteger(state.timerSwap.internalTimes.toString())) {
      return "间隔时间必须是整数"
    }
    if (state.timerSwap.privateKeys.length === 0) {
      return "必须配置地址私钥"
    }
    return null
  }

  // @ts-ignore
  const handleStartNumber = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, singleAmountStart: e.target.value, running: false, task: ()=>{} }});
  }
  // @ts-ignore
  const handleEndNumber = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, singleAmountEnd: e.target.value, running: false, task: ()=>{} }});
  }

  // @ts-ignore
  const handleInternal = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, internalTimes: e.target.value, running: false, task: ()=>{} }});
  }

  return (
    <Box marginLeft='2rem'>
      <Box sx={{display: 'flex'}}>
        <Box  sx={{ flex: 3}}>
          <Box maxWidth='800px'>
            <TextField fullWidth label='目标token地址' id='outlined-full-width' value={state.timerSwap.tokenA} sx={{ mb: 4 }}
                       onChange={handleTokenA} />
            <TextField fullWidth label='计价token地址' id='outlined-full-width' value={state.timerSwap.tokenB} sx={{ mb: 4 }}
                       onChange={handleTokenB} />
          </Box>

          <Box>
            <TextField  label='随机数量范围开始 -> 计价token'
                onChange={handleStartNumber} value={state.timerSwap.singleAmountStart} sx={{ width: '12rem' }} />
            <TextField  label='随机数量范围截至 -> 计价token'
                onChange={handleEndNumber} value={state.timerSwap.singleAmountEnd} sx={{ width: '12rem' }} />
            <TextField  label='间隔时间秒'
                onChange={handleInternal} value={state.timerSwap.internalTimes} sx={{ width: '12rem' }} />
          </Box>

          <Box paddingLeft='1rem' marginTop='3rem' height="9.2rem" sx={{border: 1, borderColor: 'primary.main', overflowY: auto}}>
            <Listaddrs title="地址随机选择" addrs={state.timerSwap.froms} />
          </Box>

        </Box>

        <Box  sx={{ flex: 2, marginLeft: '3rem', marginRight: '1rem'}}>

          <Button variant='contained' fullWidth disabled={state.timerSwap.running} onClick={startTimer}>开始</Button>

          <Box marginTop='2rem'>
            <Button variant='contained' color='secondary' fullWidth disabled={!state.timerSwap.running} onClick={stopTimer}>
              停止
            </Button>
          </Box>

          <FileImport />

          <Box marginTop='3.6rem'>
            <TextField rows={5} fullWidth multiline label='地址私钥' id='textarea-outlined-static'
              value={state.timerSwap.privateKeys.join("\n")+"\n"} onChange={changePrivateKey}/>
          </Box>
        </Box>

      </Box>

      <Box marginTop='3rem' marginRight="1rem" minHeight='15rem' maxHeight="20rem" sx={{border: 1, borderColor: 'primary.main', overflowY: auto}}>
        {state.timerSwap.results.map((item, index) =>{
          const msg = Object.values(item)
            .filter((value) => value !== "" && value !== undefined)
            .join(" ");
          return  <Alert key={index} severity={item.title}>
            <AlertTitle>{item.title}</AlertTitle>
            {msg} — <strong>check it out!</strong>
          </Alert>
        })}
      </Box>
    </Box>
  )
}

export default TextFieldLayout
