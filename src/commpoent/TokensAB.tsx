import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useTask} from "../hooks/useTask";

const TokensAB = (props: any) => {

  const { state, dispatch } = useTask();

  // @ts-ignore
  const handleTokenA = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: () =>{}, tokenA: e.target.value }});
  }

  // @ts-ignore
  const handleTokenB = (e) => {
    dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, running: false, task: () =>{}, tokenB: e.target.value }});
  }

  return <Box maxWidth='800px'>
            <TextField fullWidth label='目标token地址' id='outlined-full-width' value={props.value} sx={{ mb: 4 }}
              onChange={handleTokenA} />
            <TextField fullWidth label='计价token地址' id='outlined-full-width' value={props.value} sx={{ mb: 4 }}
              onChange={handleTokenB} />
        </Box>
}
