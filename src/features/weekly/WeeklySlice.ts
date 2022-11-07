import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import moment from "moment"
const URL = "http://localhost:7789/api/tasks"

export interface TaskInterface {
    isCompleted: boolean
    task: string
    date: number
    _id?: string
}

interface StateInterface {
    loading: boolean
    tasks: {
        label:
            | "monday"
            | "tuesday"
            | "wednesday"
            | "thursday"
            | "friday"
            | "saturday"
            | "sunday"
        items: TaskInterface[]
    }[]
    currentDate: number
    error: string
}

export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (range: string) => {
        const response = await axios.get(`${URL}?range=${range}`)

        return response.data.schedule
    }
)

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (task: TaskInterface) => {
        const response = await axios.post(URL, task)
        return response.data.response
    }
)

type updateTaskInterface = {
    _id: string | undefined
    status: boolean
}

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (update: updateTaskInterface) => {
        const response = await axios.patch(URL, update)
        return response.data.response
    }
)

const initialState: StateInterface = {
    loading: false,
    tasks: [],
    error: "",
    currentDate: moment().unix(),
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addSyncTask: (state, action) => {
            const day = state.tasks.find(
                (task) => task.label === action.payload.day
            )
            day?.items.push(action.payload.task)
        },
        updateSyncTask: (state, action) => {
            state.tasks.forEach((task) => {
                task.items.forEach((item) => {
                    if (item._id === action.payload._id) {
                        item.isCompleted = !item.isCompleted
                    }
                })
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.loading = false
            state.tasks = action.payload
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "error"
        })
        builder.addCase(createTask.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(createTask.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "error"
        })
    },
})

export const { addSyncTask, updateSyncTask } = taskSlice.actions
export default taskSlice.reducer
