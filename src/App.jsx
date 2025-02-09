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


// const Header = () => {
//     const cities = ['تهران', 'یزد', 'شیراز', 'مشهد']
//     const [city, setCity] = useState('تهران');

//     return (
//         <header>
//             <Search placeholder={<div>جستجو در <Text color='red'>دیجی کالا</Text></div>} />

//             <label for="cities">شهر خود را انتخاب کنید:</label>
//             <select id="cities" onChange={(e) => setCity(e.target.value)}>
//                 <option value="تهران">تهران</option>
//                 <option value="یزد">یزد</option>
//                 <option value="شیراز">شیراز</option>
//                 <option value="مشهد">مشهد</option>
//             </select>
            
//             <Address city={city} />
//         </header>
//     )
// }