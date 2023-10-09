import { useContext } from 'react'
import {TaskContext} from "../state/TaskContext";

export const useTimer = () => useContext(TaskContext)
