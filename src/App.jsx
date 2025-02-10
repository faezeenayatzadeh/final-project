import Header from "./Header/Header";

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
                محتوای اصلی سایت
            </main>
            <Footer />
        </div>
    )
}

export default App