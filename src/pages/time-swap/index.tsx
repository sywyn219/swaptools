// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {useEffect, useState} from "react";
import {useSettings} from "../../@core/hooks/useSettings";

const TimeSwap = () => {
  const { results, setResults } = useSettings()
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1)
      setResults({...results,total: results.timeSwap.total + 1});
      console.log("count--->",count)
    }, delay)
    return () => clearInterval(timer)
  }, [delay])

  const handelDelayChange = e => setDelay(+e.target.value)

  return (
    <Grid container spacing={6}>
      <h1>Hook 版本定时器</h1>
      {/*<Input onChange={handelDelayChange} defaultValue={delay} />*/}
      <div>
        Count: {count} Delay: {delay}ms
      </div>
    </Grid>
  )
}

export default TimeSwap
