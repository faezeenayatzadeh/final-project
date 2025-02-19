import Products from './Products/Products';

const App = () =>  {
    return (
       <Products />
    )
}

export default App

// useEffect(() => {
//     fetch('https://dummyjson.com/users')
//         .then(res => res.text())
//         .then(res => JSON.parse(res))
//         .then(res => console.log(res))
// }, []);