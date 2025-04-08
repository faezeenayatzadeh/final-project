import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const CreateUserForm = () => {
    const [form, setForm] = useState({
        email: '',
        name: '',
    })

    console.log(form);
    
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    
    return (
        <form>
            <h2>Create User</h2>
            <TextField label="Email" name="email" onChange={handleChange} />
            <TextField label="Name" name="name" onChange={handleChange} />
            <Button type="submit">Create</Button>
        </form>
    )
}


const ProfileUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8000/api/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (id) => {
        setLoading(true)
        fetch(`http://localhost:8000/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                fetchUsers()
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    
    return (
        <div>
            <CreateUserForm />
            <h2>Profile Users</h2>
            <div>Search</div>
            <input type="text" placeholder="search" onChange={(e) => setSearch(e.target.value)}/>

            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>is admin</th>
                        <th>name</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <div>Loading...</div> : users.filter(user => user.name.includes(search)).map((user) => (
                        <tr key={user.id} style={{color: user.isAdmin ? 'green' : 'black'}}>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                            <td>{user.name}</td>
                            <td>
                                <button>Edit</button>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}>
                                        Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProfileUsers;