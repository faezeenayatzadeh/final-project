import Header from "./Header/Header";
import Products from './Products/Products'

const Footer = () => {
    return (
        <footer style={{padding: '20px', color: 'white', backgroundColor: 'blue'}}>
            فوتر سایت
        </footer>
    )
}

const App = () =>  {
    return (
        <div>
            <Header />
            <main>
                <Products />
            </main>
            <Footer />
        </div>
    )
}

export default App