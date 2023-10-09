// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const TextFieldLayout = () => {
  return (
    // <Box noValidate component='form' autoComplete='off' sx={{ display: 'flex', flexWrap: 'wrap' }} maxWidth='600px'>
    //
    // </Box>
    <Box marginLeft='2rem'>
      <Box sx={{display: 'flex'}}>
        <Box  sx={{ flex: 3}}>
          <Box maxWidth='800px'>
            <TextField fullWidth label='目标token地址' id='outlined-full-width' sx={{ mb: 4 }} />
            <TextField fullWidth label='计价token地址' id='outlined-full-width' sx={{ mb: 4 }} />
          </Box>

          <Box>
            <TextField  label='随机数量范围开始 -> 计价token' id='outlined-full-width' sx={{ mb: 4 }} />
            <TextField  label='随机数量范围截至 -> 计价token' id='outlined-full-width' sx={{ mb: 4 }} />
            <TextField  label='间隔时间' id='outlined-full-width' sx={{ mb: 4 }} />
          </Box>
        </Box>

        <Box  sx={{ flex: 1, marginRight: '10rem'}}>
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


        </Box>
      </Box>

      <Box marginTop='3rem'>
        <TextField rows={5} fullWidth multiline label='交易地址 随机选取' defaultValue='Default Value' id='textarea-outlined-static' />
      </Box>

      <Box marginTop='3rem'>
        <TextField rows={10} fullWidth multiline label='执行日志' defaultValue='Default Value' id='textarea-outlined-static' />
      </Box>
    </Box>
  )
}

export default TextFieldLayout
