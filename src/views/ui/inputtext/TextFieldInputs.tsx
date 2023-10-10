// ** MUI Imports
import { useState,useCallback } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useTheme} from "@mui/material/styles";

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import {auto} from "@popperjs/core";
import Listaddrs from "../listaddr/Listaddrs";

import { useDropzone } from 'react-dropzone'
import {FileImport} from "../../../commpoent/FileImport";
import {useTask} from "../../../hooks/useTask";
import {ethers} from "ethers";

const TextFieldLayout = () => {

  const [fileContent, setFileContent] = useState('');

  const theme = useTheme();

  const { state, dispatch } = useTask();


  // @ts-ignore
  const handleTokenA = (e) => {
    if (ethers.isAddress(e.target.value)) {
      const results = state.timerSwap.results;
      results.join("地址不正确")
      dispatch({type: 'SET_TIMER_SWAP', args: {...state.timerSwap, results: results}});
    }
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: () =>{}, tokenA: e.target.value }});
  }

  // @ts-ignore
  const handleTokenB = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: () =>{}, tokenB: e.target.value }});
  }

  const startTimer = () => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: true, task: () =>{} }});
  };

  const stopTimer = () => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false}});
  };

  const handleStartNumber = (e) => {

  }
  const handleEndNumber = (e) => {

  }

  const handleInternal = (e) => {
  }

  const changePrivateKey = (e) => {
  }

  const handleStart = () => {

  }

  const handleStop = () => {

  }

  const handlePrivateKeys = () => {
    return state.timerSwap.privateKeys.join('\n');
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
            <TextField  label='随机数量范围开始 -> 计价token' id='outlined-full-width' sx={{ mb: 4 }}
                onChange={handleStartNumber} />
            <TextField  label='随机数量范围截至 -> 计价token' id='outlined-full-width' sx={{ mb: 4 }}
                onChange={handleEndNumber} />
            <TextField  label='间隔时间' id='outlined-full-width' sx={{ mb: 4 }}
                onChange={handleInternal} />
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

          <FileImport parseContent = {(c) => setFileContent(fileContent + c)}/>

          <Box marginTop='4.5rem'>
            <TextField rows={5} fullWidth multiline label='地址私钥' defaultValue='Default Value' id='textarea-outlined-static'
              value={fileContent}/>
          </Box>
        </Box>

      </Box>

      <Box marginTop='3rem' marginRight="1rem" minHeight='15rem' maxHeight="20rem" sx={{border: 1, borderColor: 'primary.main', overflowY: auto}}>
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity='warning'>
          <AlertTitle>Warning</AlertTitle>
          This is an warning alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity='info'>
          <AlertTitle>Info</AlertTitle>
          This is an info alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          This is an success alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          This is an success alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          This is an success alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          This is an success alert — <strong>check it out!</strong>
        </Alert>
      </Box>
    </Box>
  )
}

export default TextFieldLayout
