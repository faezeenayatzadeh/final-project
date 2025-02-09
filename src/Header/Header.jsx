import Button from '../components/Button';
import Text from '../components/Text';

const Search = (props) => {
    return (
        <div>
            <img />
            <span>{props.placeholder}</span>
            <input />
            <img />
        </div>
    )
}

const Address = (props) => {
    return (
        <Button color='green'>
            <img />
            <span>ارسال به {props.city}</span>
            <img />
        </Button>
    )
}

const Header = () => {
    const city = 'تهران'
    return (
        <header>
            <Search placeholder={<div>جستجو در <Text color='red'>دیجی کالا</Text></div>} />
            <Address city={city} />
        </header>
    )
}

export default Header;