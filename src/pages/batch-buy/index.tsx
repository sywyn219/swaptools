// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'

import { useEffect, useRef, useCallback } from 'react'

const BatchBuy = () => {
  const workerRef = useRef<Worker>()

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../webwork/work.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`)
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage(100000)
  }, [])

  return (
    <>
      <p>Do work in a WebWorker!</p>
      <button onClick={handleWork}>Calculate PI</button>
    </>
  )
}

export default BatchBuy
