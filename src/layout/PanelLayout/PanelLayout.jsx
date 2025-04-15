import { Outlet } from "react-router-dom"

const PanelLayout = () => {
    return (
        <div>
            <header>header</header>
            <main>
                <Outlet />
            </main>
            <footer>footer</footer>
        </div>
    )
}

export default PanelLayout