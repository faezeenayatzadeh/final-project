import {useState} from 'react';

const arrayOfProducts = [
    {
        id: 1,
        name: "مک بوک پرو",
        price: 1500
    },
    {
        id: 2,
        name: "مک بوک پرو دو",
        price: 800
    },
    {
        id: 3,
        name: "مک بوک ایر",
        price: 2000
    },
    {
        id: 4,
        name: "موبایل ایفون شش",
        price: 900
    },
    {
        id: 5,
        name: "موبایل ایفون پونزده پرو",
        price: 2500
    },
    {
        id: 6,
        name: "موبایل شیائومی",
        price: 1000
    },
    {
        id: 7,
        name: "لپ تاپ ایسوس",
        price: 3000
    },
    {
        id: 7,
        name: "لپ تاپ خیلی گرون",
        price: 3000
    },
    {
        id: 8,
        name: "موبایل سامسونگ",
        price: 3000
    }
]

const Products = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(100);

    return (
        <div>
            <input
                placeholder='نام'
                type="text"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder='قیمت'
                type="number"
                onChange={(e) => setPrice(e.target.value)}
            />
            <ul>
                {
                arrayOfProducts
                    .filter(item => 
                        item.name.includes(name) && item.price > price
                    )
                    .map(item => <li>{item.name}: {item.price}</li>)
                }
            </ul>
        </div>
    )
}

export default Products;
