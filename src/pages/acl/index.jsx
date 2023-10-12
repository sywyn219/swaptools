/* tslint:disable */

import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import {useTask} from "../../hooks/useTask";
import {ethers} from "ethers";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


const Acl = () => {
  const { state, dispatch } = useTask();

  const [latencies, setLatencies] = useState([]);

  const [myNode, setMyNode] = useState('');

  const [isPromise,setPromise] = useState(false)

  const addLatencies = (latency) => {
    setLatencies(prevData => {
      const results = [...prevData, latency]
      const uniqueArray = results.filter((item, index, self) => {
        return self.findIndex(obj => obj.server === item.server) === index;
      });
      return uniqueArray.sort((n1 ,n2) => n1.latency > n2.latency)
    });
  }
  const testLatencies = async (url) => {
    let nodeState
    if (url !== '') {
      nodeState = [...state.nodes, url];
    } else {
      nodeState = state.nodes
    }

    setPromise(false)

    await Promise.all(nodeState.map(async (server) => {
      const start = Date.now();

      let score;
      let latency = 0;
      let height = 0;
      try {
        const provider = ethers.getDefaultProvider(server)
        height = await provider.getBlockNumber()
        latency = Date.now() - start;
        score = true
        addLatencies({server, height, latency, score});
      } catch (e) {
      }
    }))

    setPromise(true)
  }
  useEffect(() => {
    testLatencies('');
  }, []);

  useEffect(() => {
    if (latencies.length > 0 && isPromise) {
      dispatch({type: "SET_NODES",args: latencies.map(node => node.server)})
    }
  }, [isPromise]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>节点</TableCell>
            <TableCell>区块高度</TableCell>
            <TableCell>延迟</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {latencies.map((node, index) => (
            <TableRow key={index}>
              <TableCell>{node.server}</TableCell>
              <TableCell>{node.height}</TableCell>
              <TableCell>{node.latency+'ms'}</TableCell>
              <TableCell>
                {node.score ? (
                  <IconButton color="success">
                    <Check />
                  </IconButton>
                ) : (
                  <IconButton color="error">
                    <Close />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box marginTop='5rem'>
        <TextField fullWidth label='节点' id='outlined-full-width' value={myNode} sx={{ mb: 4}} onChange={(e) => setMyNode(e.target.value)}/>
        <Button variant='contained' color='success' fullWidth onClick={() => testLatencies(myNode)}>
          添加节点
        </Button>
      </Box>

    </TableContainer>
  );
};

export default Acl;
