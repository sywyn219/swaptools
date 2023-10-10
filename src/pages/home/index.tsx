// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardWebsiteStatistics from "../../views/ui/cards/CardWebsiteStatistics";
import CardTotalEarings from "../../views/ui/cards/CardTotalEarings";
import CardWidgetsTotalVisits from "../../views/ui/cards/CardWidgetsTotalVisits";

const Home = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <CardWebsiteStatistics />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardTotalEarings />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardWidgetsTotalVisits buySell="批量买入" />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardWidgetsTotalVisits buySell="批量卖出" />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardWidgetsTotalVisits buySell="批量归集" />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardWidgetsTotalVisits buySell="批量转出" />
      </Grid>
    </Grid>
  )
}

export default Home
