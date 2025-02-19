import { useEffect, useState } from 'react';
import Input from '../components/Input';

const Products = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setcategory] = useState('');

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();

    console.log({
        products, loading
    });

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(res => {
                setProducts(res.products)

                // TODO:
                setCategories([])
                setLoading(false)
            })
    }, []);

    const findCategoryById = (id) => {
        // TODO:
        return [].find(item => item.id === id)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!products) {
        return <div>No data</div>
    }

    const filteredProducts = products.filter(item => {
        return item.title.toLowerCase().includes(name.toLowerCase()) &&
                item.price >= price
    })

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
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                ))}
            </select>            
            {filteredProducts.map(item => <li key={item.id}>{item.title} {item.price}</li>)}
        </div>
    )
}

export default Products;