import {useState } from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import Search from './Search';
import Address from './Address';
import {cities} from '../constants/address'

const Header = () => {
    const [city, setCity] = useState(cities[0].id);
    return (
        <header>
             <label for="cities">شهر خود را انتخاب کنید:</label>
             <select id="cities" onChange={e => setCity(e.target.value)}>
                {cities.map(city => {
                    return <option value={city.id}>{city.label}</option>
                })}
             </select>
            <Search placeholder={<div>جستجو در <Text color='red'>دیجی کالا</Text></div>} />
            <Address city={city} />
        </header>
    )
}

export default Header;