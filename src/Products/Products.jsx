import { useEffect, useState } from 'react';

const CATEGORY_LAPTOP_ID =  'laptop'
const CATEGORY_LAPTOP_LABEL = "لپ تاپ"
const CATEGORY_MOBILE_ID = "mobile"
const CATEGORY_MOBILE_LABEL = "موبایل"
const CATEGORY_CAMERA_ID = "camera"
const CATEGORY_CAMERA_LABEL = "دوربین"

const CATEGORY_FOOD_ID = "food"
const CATEGORY_FOOD_LABEL = "غذا"

const CATEGORIES = [
    {id: CATEGORY_LAPTOP_ID, label: CATEGORY_LAPTOP_LABEL},
    {id: CATEGORY_MOBILE_ID, label: CATEGORY_MOBILE_LABEL},
    {id: CATEGORY_CAMERA_ID, label: CATEGORY_CAMERA_LABEL},
    {id: CATEGORY_FOOD_ID, label: CATEGORY_FOOD_LABEL},
]

const arrayOfProducts = [
    {
        id: 1,
        name: "مک بوک پرو",
        price: 1500,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 2,
        name: "مک بوک پرو دو",
        price: 800,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 3,
        name: "مک بوک ایر",
        price: 2000,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 4,
        name: "موبایل ایفون شش",
        price: 900,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 5,
        name: "موبایل ایفون پونزده پرو",
        price: 2500,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 6,
        name: "موبایل شیائومی",
        price: 1000,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 7,
        name: "لپ تاپ ایسوس",
        price: 3000,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 8,
        name: "لپ تاپ خیلی گرون",
        price: 3000,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 9,
        name: "موبایل سامسونگ",
        price: 3000,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 10,
        name: "دوربین کانون",
        price: 1200,
        category: CATEGORY_CAMERA_ID
    },
    {
        id: 11,
        name: "دوربین فوجی",
        price: 1300,
        category: CATEGORY_CAMERA_ID
    }
]


const Input = (props) => (
        <input
            style={{border: '1px solid red', padding: '10px', borderRadius: '5px'}}
            {...props}
        />
    )

const Products = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(100);
    const [category, setcategory] = useState('');

    const findCategoryById = (id) => {
        return CATEGORIES.find(item => item.id === id)
    }

    const filteredProducts = arrayOfProducts.filter((item) => 
        item.name.includes(name) && 
        item.price > price &&
        item.category.includes(category)
    )

    useEffect(() => {
        setPrice('');
        setName('');
    }, [category])

    return (
        <div>
            <Input
                value={name}
                placeholder='نام'
                type="text"
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                value={price}
                style={{border: '1px solid red', padding: '10px', borderRadius: '5px'}}
                placeholder='قیمت'
                type="number"
                onChange={(e) => setPrice(e.target.value)}
            />
            <select onChange={e => {
                setcategory(e.target.value)
                }}>
                {CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                ))}
            </select>
            <button onClick={() => setcategory(CATEGORY_FOOD_ID)}>ریست کردن غذا</button>
            <ul>
                {filteredProducts.map(item => <li key={item.id}>{item.name}: {item.price} {findCategoryById(item.category).label}</li>)}
            </ul>
        </div>
    )
}

export default Products;
