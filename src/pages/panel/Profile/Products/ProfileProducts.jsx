import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import Modal from "../../../../components/Modal/Modal";

const makeBorderStyleByError = (bool) => 
    ({
    border: '1px solid ' + (bool ? 'red' : 'black'),
    color: 'purple',
    borderRadius: 8,
    margin: '0 4px'
    });

const ProductFormManagement = ({ onSubmit, data, onCancel, hideCloseButton = false, cancelButtonText = 'Cancel' }) => {
    const isCreateMode = !data;

    const [error, setError] = useState({
        name: false,
        description: false,
        price: false,
        category: false,
        stock: false
    });

    const [form, setForm] = useState({
        name: data?.name || '',
        description: data?.description || '',
        price: data?.price || '',
        category: data?.category || '',
        stock: data?.stock || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            const priceValue = parseFloat(value);
            setError(prev => ({ ...prev, price: isNaN(priceValue) || priceValue <= 0 }));
        } else if (name === 'stock') {
            const stockValue = parseInt(value);
            setError(prev => ({ ...prev, stock: isNaN(stockValue) || stockValue < 0 }));
        } else if (name === 'name') {
            const numberRegex = /\d+/;
            setError(prev => ({ ...prev, name: numberRegex.test(value) }));
        } else {
            setError(prev => ({ ...prev, [name]: false }));
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isCreateMode ? 'POST' : 'PUT';
        const url = isCreateMode
            ? 'http://localhost:8000/api/products'
            : `http://localhost:8000/api/products/${data.id}`; 

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                if (res.product) {
                    onSubmit(res.product);
                } else {
                    console.log('خطا در ارسال اطلاعات محصول');
                }
            })
            .catch(err => console.error('Error:', err));
    };    
    const isSubmitDisabled =
    error.name || error.description || error.price || error.category || error.stock;


    return (
        <form onSubmit={handleSubmit}>
            <input
                style={makeBorderStyleByError(error.name)}
                value={form.name}
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
            />
    
            <input
                style={makeBorderStyleByError(error.description)}
                value={form.description}
                placeholder="Description"
                name="description"
                onChange={handleChange}
            />
    
            <input
                style={makeBorderStyleByError(error.price)}
                value={form.price}
                placeholder="Price"
                name="price"
                onChange={handleChange}
            />
    
            <input
                style={makeBorderStyleByError(error.category)}
                value={form.category}
                placeholder="Category"
                name="category"
                onChange={handleChange}
            />
    
            <input
                style={makeBorderStyleByError(error.stock)}
                value={form.stock}
                placeholder="Stock"
                name="stock"
                onChange={handleChange}
            />
    
            <button disabled={isSubmitDisabled} type="submit">
                {isCreateMode ? 'Create Product' : 'Update Product'}
            </button>
    
            {!hideCloseButton && 
                <button onClick={() => onCancel()}>
                    {cancelButtonText}
                </button>
            }
        </form>
    );
}
const ProfileProducts = () => {
    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:8000/api/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = (id) => {
        setLoading(true);
        fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    fetchProducts();
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (!user.isAdmin) {
        return <div>You are not authorized to access this page</div>;
    }

    return (
        <div>
            {deleteProduct &&
                <Modal
                    onClose={() => setDeleteProduct(false)}
                    onSubmit={() => {
                        handleDeleteProduct(deleteProduct.id);
                        setDeleteProduct(false);
                    }}
                    title="Delete Product"
                    description={`Are you sure you want to delete ${deleteProduct.name}?`}
                />
            }

            {openCreateProductModal &&
                <Modal
                    hideCloseButton={true}
                    hideSubmitButton={true}
                    title="Create Product"
                    description={
                        <ProductFormManagement
                            data={null}
                            onSubmit={(product) => {
                                setProducts([...products, product]);
                                setOpenCreateProductModal(false);
                            }}
                            onCancel={() => setOpenCreateProductModal(false)}
                            cancelButtonText="close modal"
                        />
                    }
                />
            }

            {editProduct &&
                <Modal
                    hideCloseButton={true}
                    hideSubmitButton={true}
                    title="Edit Product"
                    description={
                        <ProductFormManagement
                            data={editProduct}
                            onSubmit={() => {
                                fetchProducts();
                                setEditProduct(null);
                            }}
                            onCancel={() => setEditProduct(null)}
                            cancelButtonText="close modal"
                        />
                    }
                />
            }

            <h2>Profile Products Page</h2>
            <h2>Table</h2>
            <button onClick={() => setOpenCreateProductModal(true)}>Create Product</button>
            <br />
            <br />
            <span>Search</span>
            <br />
            <input
                type="text"
                placeholder="Search by name or category"
                onChange={(e) => setSearch(e.target.value)}
            />
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <div>Loading...</div> :
                        products
                            .filter(p =>
                                p.name.toLowerCase().includes(search.toLowerCase()) ||
                                p.category.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((product) => (
                                <tr key={product.id} >
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.stock}</td>
                                    <td>{new Date(product.createdAt).toLocaleString()}</td>
                                    <td>
                                                <button 
                                                    onClick={() => setEditProduct     (product)}>
           Edit
   </button>
                                            <button onClick={() => setDeleteProduct(product)}>Delete</button>   
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
};
export default ProfileProducts;

