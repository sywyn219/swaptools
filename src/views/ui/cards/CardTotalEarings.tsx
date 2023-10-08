// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import {Bar, BarChart, ResponsiveContainer} from "recharts";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useTheme} from "@mui/material/styles";



const data: DataType[] = [
  {
    sales: '86,471',
    title: '买入',
    color: 'success',
    trendNumber: '15:20:36',
    trend: (
      <Box component='span' sx={{ color: 'success.main', '& svg': { verticalAlign: 'bottom' } }}>
        <Icon icon='mdi:chevron-up' />
      </Box>
    )
  },
  {
    sales: '86,471',
    title: '买入',
    color: 'success',
    trendNumber: '15:20:31',
    trend: (
      <Box component='span' sx={{ color: 'success.main', '& svg': { verticalAlign: 'bottom' } }}>
        <Icon icon='mdi:chevron-up' />
      </Box>
    )
  },
  {
    sales: '86,471',
    title: '买入',
    color: 'success',
    trendNumber: '15:20:31',
    trend: (
      <Box component='span' sx={{ color: 'success.main', '& svg': { verticalAlign: 'bottom' } }}>
        <Icon icon='mdi:chevron-up' />
      </Box>
    )
  },
  {
    sales: '86,471',
    title: '买入',
    color: 'success',
    trendNumber: '15:20:31',
    trend: (
      <Box component='span' sx={{ color: 'success.main', '& svg': { verticalAlign: 'bottom' } }}>
        <Icon icon='mdi:chevron-up' />
      </Box>
    )
  }
]

const CardTotalEarnings = () => {
  const theme = useTheme()
  return (
    <Card>
      <CardHeader
        title='买卖目标'
        titleTypographyProps={{ textAlign: "center" }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            $24,895
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
            <Icon icon='mdi:menu-up' fontSize='1.875rem' />
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
              10%
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 5 }}>
          从设定时开始价格到现在波动幅度
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              {data.map((row: DataType) => {
                return (
                  <TableRow
                    key={row.title}
                    sx={{
                      '&:last-of-type td': { border: 0, pb: 0 },
                      '& .MuiTableCell-root': {
                        '&:last-of-type': { pr: 0 },
                        '&:first-of-type': { pl: 0 },
                        py: theme => `${theme.spacing(2.75)} !important`
                      },
                      '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` }
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.8, color: `${row.color}.main` } }}
                      >
                        <Icon icon='mdi:circle' fontSize='1rem' />
                        <Typography sx={{ fontSize: '0.875rem' }}>{row.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.sales}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography sx={{ mr: 1.5, fontWeight: 600, fontSize: '0.875rem' }}>
                          {row.trendNumber}
                        </Typography>
                        {row.trend}
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default CardTotalEarnings
