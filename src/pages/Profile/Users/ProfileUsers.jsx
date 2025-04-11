import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";

const CreateUserForm = ({onSubmit, editUser, onReset}) => {
    const [form, setForm] = useState({
        email: editUser?.email || '',
        name: editUser?.name || '',
    })

    useEffect(() => {
        setForm(editUser ?? {name: '', email: ''})
    }, [editUser])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        console.log('log');
        
        e.preventDefault()
        if (editUser) {
            // update user
        } else {
            // create user
            fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form)
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.user) {
                    console.log('success');
                    onSubmit(res.user)
                } else {
                    console.log('error');
                }
            })
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create User</h2>
            <TextField value={form.email} label="Email" name="email" onChange={handleChange} />
            <TextField value={form.name} label="Name" name="name" onChange={handleChange} />
            <Button type="submit" variant='contained'>{editUser ? 'update' : 'create'}</Button>
            {editUser && 
                <Button
                    onClick={() => onReset()} 
                    type="reset" 
                    variant="outlined">Reset
                </Button>
            }
        </form>
    )
}


const ProfileUsers = () => {
    console.log('ProfileUsers');
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [editUser, setEditUser] = useState(null);

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
            {editUser && <Modal onClose={() => setEditUser(null)} />}
            <h2>Profile Users Page</h2>
            <CreateUserForm
                editUser={editUser}
                onSubmit={(user) => {
                    setUsers([...users, user])
                }} 
                onReset={() => setEditUser(null)}
            />
            <h2>Table</h2>
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
                    {loading ? <div>Loading...</div> : 
                        users
                            .filter(user => user.name.includes(search))
                            .map((user) => (
                                <tr key={user.id} style={{color: user.isAdmin ? 'green' : 'black'}}>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <button onClick={() => {setEditUser(user)}}>Edit</button>
                                        {!user.isAdmin && 
                                            (
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}>
                                                        Delete
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProfileUsers;