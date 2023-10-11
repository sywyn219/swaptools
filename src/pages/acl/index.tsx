import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

const scores = [
  { server: 'https://binance.llamarpc.com', score: true },
  { server: 'https://bsc.rpc.blxrbdn.com', score: true },
  { server: 'wss://bsc.publicnode.com', score: false },
  { server: 'https://bsc.blockpi.network/v1/rpc/public', score: true },
  { server: 'https://bsc.publicnode.com', score: false },
  { server: 'https://bsc-rpc.gateway.pokt.network', score: true },
  { server: 'https://bsc-dataseed2.defibit.io', score: false },
];

const Acl = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>RPC Server Address</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score, index) => (
            <TableRow key={index}>
              <TableCell>{score.server}</TableCell>
              <TableCell>
                {score.score ? (
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
    </TableContainer>
  );
};

export default Acl;
