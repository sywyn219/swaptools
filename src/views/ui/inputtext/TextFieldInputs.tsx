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
  checkAndClearArray, compareStrings, getRandBuySell, getRandElement, getRandomDecimalInRange, getRandPath,
  getTimes,
  isInteger,
  isNumber,
  mergeArrays,
  removeEmptyStrings, sleep
} from "../../../util/arr";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import {pancakeV2test, swapAbi, tokenAbi} from "../../../util/tokenAbi";
import {useEffect, useState, useRef} from "react";
const TextFieldLayout = () => {

  const { state, dispatch } = useTask();
  const [isStart, setStart] = useState(state.timerSwap.running);

  const [results,setResults] = useState([])

  // @ts-ignore
  const addResults = (re) => {
    setResults( prevData => {
      return checkAndClearArray(prevData, 20 ,re)
    })
  }

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
        addResults({
          title: "success",
          status: "输入私钥成功" + " 数量 "+ addrs.length,
          times: getTimes()
        })
        const fromAddrs = mergeArrays(state.timerSwap.froms, addrs)
        const fromKeys = mergeArrays(state.timerSwap.privateKeys, str)
        dispatch({type: 'SET_TIMER_SWAP', args: {...state.timerSwap, froms: fromAddrs, privateKeys: fromKeys}})
      }

    } catch (error: any) {
      addResults({
        title: "error",
        err: "私钥错误 "+ error.value,
        times: getTimes()
      })
      dispatch({type: 'SET_TIMER_SWAP', args: {...state.timerSwap,froms: [], privateKeys: []}})
      return [];
    }

    setStart(false)
  }

  // @ts-ignore
  const handleTokenA = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap,tokenA: e.target.value }});
    setStart(false)
  }

  // @ts-ignore
  const handleTokenB = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, tokenB: e.target.value }});

    setStart(false)
  }


  const taskFn = async (index) => {
    try {
      const provider = ethers.getDefaultProvider(state.nodes[index])
      const key = getRandElement(state.timerSwap.privateKeys);

      const walletP = new ethers.Wallet(key);
      const wallet = walletP.connect(provider)

      const addr = await wallet.getAddress()

      const swap = new ethers.Contract(pancakeV2test, swapAbi, wallet);


      const tokenB = new ethers.Contract(state.timerSwap.tokenB, tokenAbi, wallet);
      const tokenA = new ethers.Contract(state.timerSwap.tokenA, tokenAbi, wallet);
      const decimalsB = await tokenB.decimals();
      const va = getRandomDecimalInRange(state.timerSwap.singleAmountStart,state.timerSwap.singleAmountEnd);
      const amtIn = ethers.parseUnits(va,decimalsB);

      const pathBuy = [state.timerSwap.tokenB,state.timerSwap.tokenA];
      const pathSell = [state.timerSwap.tokenA,state.timerSwap.tokenB];

      const buyOrSell = getRandBuySell();

      const valueOut = await swap.getAmountsOut(amtIn, pathBuy);

      let path = pathBuy
      let token = tokenB
      let amt = amtIn
      //sell
      if (buyOrSell == 1) {
        path = pathSell;
        token = tokenA;
        amt = valueOut[1];
      }
      const approveAmt = await token.allowance(addr, pancakeV2test);

      if (amt > approveAmt) {
        const tx = await token.approve(pancakeV2test,addr,ethers.parseUnits("10000000000",18));

        addResults({
          title: "info",
          status: "授权交易发送,等待授权交易成功",
          txHash: tx.txHash,
        })
        await tx.await(1);
      }
      const tx = await swap.swapExactTokensForTokensSupportingFeeOnTransferTokens(amt,0, path,addr,169709899400)
      console.log("tx--swapExactTokensForTokensSupportingFeeOnTransferTokens->",tx.hash)

      addResults({
        title: "info",
        status: "交易发送成功",
        typeTx: buyOrSell === 1 ? "卖出" : "买入",
        volumeB: "交易量 "+va,
        txHash: "交易hash "+tx.hash,
        tokenA: state.timerSwap.tokenA,
        tokenB: state.timerSwap.tokenB,
        times: getTimes(),
      })
    }catch (e) {
      addResults({
        title: "error",
        err: e.value
      })
      index++;
      if (index >= state.nodes.length) {
        return
      }else {
        await sleep(1000);
        taskFn(index)
      }
    }
  }


  useEffect(() => {
    if (isStart) {
      const err = checkArgs()
      if (err !== null) {
        addResults({
          title: "error",
          err: err.value
        })
        return
      }
      addResults({
        title: "success",
        status: "交易开始",
      })
      dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: true, results: () => results, task: taskFn}});
    }else {
      dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: () => {}}});
    }

  },[isStart])

  const startTimer = () => {
    setStart(true)
  };

  const stopTimer = () => {
    setStart(false)
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
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, singleAmountStart: e.target.value,}});
    setStart(false)
  }
  // @ts-ignore
  const handleEndNumber = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, singleAmountEnd: e.target.value}});
    setStart(false)
  }

  // @ts-ignore
  const handleInternal = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, internalTimes: e.target.value}});
    setStart(false)
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

          <Button variant='contained' fullWidth disabled={state.timerSwap.running} onClick={startTimer}>
            开始
          </Button>

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
        {results.map((item, index) =>{
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
