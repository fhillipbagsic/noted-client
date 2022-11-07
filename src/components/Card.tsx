import moment from "moment"
import React, { useState } from "react"
import { useAppDispatch } from "../app/hooks"
import {
    addSyncTask,
    createTask,
    TaskInterface,
    updateSyncTask,
    updateTask,
} from "../features/weekly/WeeklySlice"
import styles from "./Card.module.css"

type CardProps = {
    label:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
    items: TaskInterface[]
}

enum week {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
}

const Card = ({ label, items }: CardProps) => {
    const dispatch = useAppDispatch()
    const [newTask, setNewTask] = useState("")
    const cannotUpload = newTask === ""

    function uploadTask() {
        const date = moment().startOf("isoWeek").add(week[label], "day").unix()
        dispatch(
            createTask({
                date,
                task: newTask,
                isCompleted: false,
            })
        )
        dispatch(
            addSyncTask({
                day: label,
                task: {
                    date,
                    task: newTask,
                    isCompleted: false,
                },
            })
        )
        setNewTask("")
    }

    function updateTaskStatus(
        event: React.ChangeEvent<HTMLInputElement>,
        item: TaskInterface
    ) {
        dispatch(updateTask({ _id: item._id, status: !item.isCompleted }))
        dispatch(updateSyncTask({ _id: item._id }))
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.card_label}>{label}</h3>
            <span className={styles.divider} />

            <div className={styles.items}>
                {items.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <input
                            id="status"
                            className={styles.checkbox}
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => updateTaskStatus(e, item)}
                            // checked={item.isCompleted}
                        />
                        <label
                            htmlFor="status"
                            className={item.isCompleted ? styles.completed : ""}
                        >
                            {item.task}
                        </label>
                    </div>
                ))}
                <div className={styles.new_task}>
                    <input
                        value={newTask}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewTask(e.target.value)
                        }
                        className={styles.input}
                        placeholder="Add a task..."
                        required
                    />
                    <button
                        className={styles.add}
                        onClick={uploadTask}
                        disabled={cannotUpload}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
