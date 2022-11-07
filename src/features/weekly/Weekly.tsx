import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Card from "../../components/Card"
import { getTasks } from "./WeeklySlice"
import styles from "./Weekly.module.css"

const Weekly = () => {
    const { tasks, currentDate } = useAppSelector((state) => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(currentDate)
        dispatch(getTasks("weekly"))
    }, [dispatch, currentDate])

    const cards = tasks.map((item, index) => (
        <Card key={index} label={item.label} items={item.items} />
    ))

    return (
        <>
            <main className={styles.container}>{cards}</main>
        </>
    )
}

export default Weekly
