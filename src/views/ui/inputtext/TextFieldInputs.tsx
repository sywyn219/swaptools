// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useTimer} from "../../../hooks/useTimer";
import {useTheme} from "@mui/material/styles";

const TextFieldLayout = () => {

  const theme = useTheme();

  const { state, dispatch } = useTimer();

  const START_TIMER = 'START_TIMER';
  const STOP_TIMER = 'STOP_TIMER';

  const startTimer = () => {
    dispatch({ type: START_TIMER,  task: () => console.log('Task executed')  });
  };

  const stopTimer = () => {
    dispatch({ type: STOP_TIMER });
  };

  const taskSwap = () => {
    state.swapTime
  }

  const handleTokenA = (e) => {
    console.log("---->",e.target.value);
  }

  const handleTokenB = (e) => {
    console.log("---->",e.target.value);
  }

  const handleStartNumber = (e) => {

  }
  const handleEndNumber = (e) => {

  }

  const handleInternal = (e) => {
  }

  const handlePrivateKey = (e) => {
  }

  const handleStart = () => {

  }

  const handleStop = () => {

  }

  const forms = ["111","222"];
  const handleAddrs = () => {
    return forms.reduceRight((accumulator, currentValue) => {
      return accumulator + currentValue +'\n';
    }, '')
  }

  return (
    <Box marginLeft='2rem'>
      <Box sx={{display: 'flex'}}>
        <Box  sx={{ flex: 3}}>
          <Box maxWidth='800px'>
            <TextField fullWidth label='目标token地址' id='outlined-full-width' value={state.swapTime.tokenA} sx={{ mb: 4 }}
                       onChange={handleTokenA} />
            <TextField fullWidth label='计价token地址' id='outlined-full-width' value={state.swapTime.tokenB} sx={{ mb: 4 }}
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

          <Box marginTop='3rem'>
            <TextField rows={5} sx={{'& input': { color: 'green' }}} disabled variant='filled' fullWidth multiline label='交易地址 随机选取' defaultValue='Default Value' id='textarea-outlined-static'
              value = {handleAddrs()}/>
          </Box>

        </Box>

        <Box  sx={{ flex: 2, marginLeft: '3rem', marginRight: '1rem'}}>

          <Button variant='contained' fullWidth>开始</Button>

          <Box marginTop='2rem'>
            <Button variant='contained' color='secondary' fullWidth>
              停止
            </Button>
          </Box>

          <Box marginTop='2rem'>
            <Button variant='contained' color='success' fullWidth>
              导入私钥
            </Button>
          </Box>

          <Box marginTop='4.5rem'>
            <TextField rows={5} fullWidth multiline label='地址私钥' defaultValue='Default Value' id='textarea-outlined-static' />
          </Box>
        </Box>

      </Box>

      <Box marginTop='3rem' marginRight="1rem" >
        <TextField variant='filled' disabled rows={10} fullWidth multiline label='执行日志' defaultValue='Default Value' id='textarea-outlined-static' />
      </Box>
    </Box>
  )
}

export default TextFieldLayout
