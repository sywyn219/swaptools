import { useContext } from 'react'
import {TaskContext} from "../state/TaskContext";

export const useTask = () => useContext(TaskContext)
