import {createContext, Dispatch, useReducer, useEffect, ReactNode} from 'react';
import {defaultState, State} from "../types/types";



type Action =
  | { type: 'START_TIMER'; task: () => void }
  | { type: 'STOP_TIMER' }
  | { type: 'SET_TOTAL'; total: number };

const defaultDispatch: React.Dispatch<Action> = () => {};

const defaultProvider = {
  state: defaultState,
  dispatch: defaultDispatch,
};

const TaskContext = createContext<{ state: State; dispatch: Dispatch<Action> }>(defaultProvider);

const START_TIMER = 'START_TIMER';
const STOP_TIMER = 'STOP_TIMER';
const SET_TOTAL = 'SET_TOTAL';

function timerReducer(state: State, action: Action): State {
  switch (action.type) {
    case START_TIMER:
      return { ...state, swapTime: {...state.swapTime,running: true, task: action.task}};
    case STOP_TIMER:
      return { ...state,  swapTime: {...state.swapTime,running: false, task: ()=>{}}};
    case SET_TOTAL:
      return {...state, swapTime: {...state.swapTime, total: action.total}};
    default:
      throw new Error();
  }
}

type Props = {
  children: ReactNode
}
const TimerProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(timerReducer, defaultState);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (state.swapTime.running) {
      intervalId = setInterval(() => {
        state.swapTime.task();
        dispatch({ type: SET_TOTAL, total: state.swapTime.total + 1 });
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

export {TaskContext, TimerProvider}
