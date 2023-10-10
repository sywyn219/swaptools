// ** MUI Imports
import Grid from '@mui/material/Grid'
import {useTimer} from "../../hooks/useTimer";
import TextFieldInputs from "../../views/ui/inputtext/TextFieldInputs";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";


const TimeSwap = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='定时交易 🙌'></CardHeader>
          <TextFieldInputs />
        </Card>
      </Grid>
    </Grid>
  )
}

export default TimeSwap
