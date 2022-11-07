import React from "react"
import styles from "./Label.module.css"

type LabelProps = {
    label: string
}

const Label = ({ label }: LabelProps) => {
    return (
        <header className={styles.header}>
            <span className={styles.line} />
            <h2>{label}</h2>
            <span className={styles.line} />
        </header>
    )
}

export default Label
