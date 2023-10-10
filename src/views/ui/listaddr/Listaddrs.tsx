// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

// ** Icon Imports
const ListWithSwitch = (props: any) => {
  return (
    <List subheader={<ListSubheader>{props.title}</ListSubheader>} >
      {props.addrs.map((item: string) => (
        <ListItemText key={item} primary={item} />
      ))}
    </List>
  )
}

export default ListWithSwitch
