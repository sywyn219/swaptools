import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useDropzone} from "react-dropzone";
import {useTask} from "../hooks/useTask";
import {ethers} from "ethers";
import {checkAndClearArray, getTimes, mergeArrays, removeEmptyStrings} from "../util/arr";

function isString(value: any): value is string {
  return typeof value === 'string';
}

// @ts-ignore
export const FileImport = () => {

  const { state, dispatch } = useTask();

  async function iterateArray(arr: any[]): Promise<string[]> {
    try {
      // 迭代数组并进行操作
      const result = await Promise.all(arr.map(async (item) => {
        console.log("--->",item);
        const wallet = new ethers.Wallet(item);
        const addr = await wallet.getAddress();
        if (!ethers.isAddress(addr)) {
          throw new Error(item);
        }
        return addr;
      }));

      return result;

    } catch (error: any) {
      const his = {
        title: "error",
        err: "私钥错误 "+ error.value,
        times: getTimes()
      }

      const results = checkAndClearArray(state.timerSwap.results,20, his)
      console.log("results------>",results)

      dispatch({type: 'SET_TIMER_SWAP', args: {...state.timerSwap,froms:[], privateKeys: [],running: false, results: results,task: ()=>{}}})

      return [];
    }
  }

  // @ts-ignore
  const handleFileDrop =  (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      // @ts-ignore
      const content = event.target.result;

      if (!isString(content)) {
        return
      }

      const strs = content.split('\n');
      const str = removeEmptyStrings(strs);
      const addrs = await Promise.all(await iterateArray(str));

      if (addrs.length > 0) {
        const his = {
          title: "success",
          status: "导入私钥成功" + " 数量 "+ addrs.length,
          times: getTimes()
        }

        const results = checkAndClearArray(state.timerSwap.results,20, his)

        const fromAddrs = mergeArrays(state.timerSwap.froms, addrs)
        const fromKeys = mergeArrays(state.timerSwap.privateKeys, str)


        dispatch({type: 'SET_TIMER_SWAP', args: {...state.timerSwap, froms: fromAddrs,privateKeys: fromKeys,
            running: false, results: results, task: ()=>{}}})
      }
    };

    reader.readAsText(file);
  }

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: handleFileDrop
  })

  return <Box {...getRootProps({ className: 'dropzone' })} marginTop='2rem'>
            <input {...getInputProps()} />
              <Button variant='contained' color='success' fullWidth onClick={e => e.preventDefault()}>
              导入私钥
            </Button>
        </Box>
}
