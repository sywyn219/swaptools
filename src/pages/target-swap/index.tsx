// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'

const TargetSwap = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Awesome 🙌'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>This is your second page.</Typography>
            <Icon icon="fluent-mdl2:sell" vFlip={true} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TargetSwap
