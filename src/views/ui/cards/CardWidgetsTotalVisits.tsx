// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Box from "@mui/material/Box";
import Icon from "../../../@core/components/icon";
import {ReactNode} from "react";
import {ThemeColor} from "../../../@core/layouts/types";
import {Bar, BarChart, ResponsiveContainer} from "recharts";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

interface DataType {
  title: string
  sales: string
  trend: ReactNode
  color: ThemeColor
  trendNumber: string
}

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
const CardWidgetsTotalVisits = (props) => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    labels: ['Cricket'],
    stroke: { lineCap: 'round' },
    grid: {
      padding: {
        top: -10
      }
    },
    colors: [theme.palette.info.main],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.1,
        stops: [0, 90]
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 180,
        startAngle: -180,
        inverseOrder: true,
        hollow: { size: '62%' },
        track: { background: theme.palette.customColors.trackBg },
        dataLabels: {
          name: { offsetY: 26 },
          value: {
            offsetY: -14,
            fontWeight: 500,
            fontSize: '1.5rem',
            formatter: value => `${value}k`,
            color: theme.palette.text.primary
          },
          total: {
            show: true,
            label: '1200',
            fontWeight: 400,
            fontSize: '14px',
            color: theme.palette.text.secondary
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title={props.buySell}
        titleTypographyProps={{ textAlign: "center" }}
      />
      <ReactApexcharts type='radialBar' height={199} series={[78]} options={options} />
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
    </Card>
  )
}

export default CardWidgetsTotalVisits
