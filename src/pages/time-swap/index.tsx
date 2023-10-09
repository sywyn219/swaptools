// ** MUI Imports
import Grid from '@mui/material/Grid'
import {useTimer} from "../../hooks/useTimer";
import TextFieldInputs from "../../views/ui/inputtext/TextFieldInputs";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";


const TimeSwap = () => {

  const { state, dispatch } = useTimer();

  const START_TIMER = 'START_TIMER';
  const STOP_TIMER = 'STOP_TIMER';

  const startTimer = () => {
    dispatch({ type: START_TIMER,  task: () => console.log('Task executed')  });
  };

const stopTimer = () => {
  dispatch({ type: STOP_TIMER });
};

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
