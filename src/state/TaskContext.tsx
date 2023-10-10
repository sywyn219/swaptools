
import {createContext, Dispatch, useReducer, useEffect, ReactNode} from 'react';
import {Args, defaultState, State} from "../types/types";


type Action =
  | { type: 'SET_TIMER_SWAP'; args: Args }
  | { type: 'SET_TARGET_SWAP'; args: Args }
  | { type: 'SET_BATCH_BUY'; args: Args }
  | { type: 'SET_BATCH_SELL'; args: Args }
  | { type: 'SET_BATCH_INPUT'; args: Args }
  | { type: 'SET_BATCH_OUTPUT'; args: Args };

const defaultDispatch: React.Dispatch<Action> = () => {};

const defaultProvider = {
  state: defaultState,
  dispatch: defaultDispatch,
};

const TaskContext = createContext<{ state: State; dispatch: Dispatch<Action> }>(defaultProvider);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TIMER_SWAP':
      return { ...state, timerSwap: action.args };
    case 'SET_TARGET_SWAP':
      return { ...state, targetSwap: action.args };
    case 'SET_BATCH_BUY':
      return { ...state, batchBuy: action.args };
    case 'SET_BATCH_SELL':
      return { ...state, batchSell: action.args };
    case 'SET_BATCH_INPUT':
      return { ...state, batchInput: action.args };
    case 'SET_BATCH_OUTPUT':
      return { ...state, batchOutPut: action.args };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode
}
const TaskProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(stateReducer, defaultState);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (state.timerSwap.running) {
      intervalId = setInterval(() => {
        state.timerSwap.task();
        dispatch({ type: 'SET_TIMER_SWAP', args: {...state.timerSwap, total: state.timerSwap.total + 1 }});
      }, 200);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [state]);

  return <TaskContext.Provider value={{ state, dispatch }}> {children} </TaskContext.Provider>
}

export {TaskContext, TaskProvider}
