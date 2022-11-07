import React from "react"
import styles from "./NavBar.module.css"
import logo from "../assets/logo.png"
import { AiFillGithub } from "react-icons/ai"

const NavBar = () => {
    return (
        <nav>
            <div className={styles.brand}>
                <img src={logo} alt="logo" />
                <div>
                    <h1>noted</h1>
                    <h5>level up your note taking</h5>
                </div>
            </div>

            <AiFillGithub size={30} />
        </nav>
    )
}

export default NavBar
