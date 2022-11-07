import NavBar from "./components/NavBar"
import Weekly from "./features/weekly/Weekly"
import Label from "./components/Label"

function App() {
    return (
        <>
            <NavBar />
            <Label label="Weekly Schedule" />

            <Weekly />
        </>
    )
}

export default App
