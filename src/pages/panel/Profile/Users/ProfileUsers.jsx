import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import Modal from "../../../../components/Modal/Modal";

const UserFormManagement = ({onSubmit, data, onCancel, hideCloseButton = false, cancelButtonText = 'Cancel'}) => {
    const isCreateMode = !data;

    const [form, setForm] = useState({
        email: data?.email || '',
        name: data?.name || '',
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        console.log('log');
        
        e.preventDefault()
        if (isCreateMode) {
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
        } else {
            // update user
             // create user
             fetch('http://localhost:8000/api/users/'+ data.id, {
                method: 'PUT',
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
            <input value={form.email} placeholder="Email" name="email" onChange={handleChange} />
            <input value={form.name} placeholder="Name" name="name" onChange={handleChange} />
            <button type="submit">{isCreateMode ? 'create' : 'update'}</button>
            {!hideCloseButton && 
                <button
                    onClick={() => onCancel()} 
                >{cancelButtonText}
                </button>
            }
        </form>
    )
}


const ProfileUsers = () => {
    const {user} = useContext(UserContext);
    console.log(user);
    
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
    const [deleteUser, setDeleteUser] = useState(null);

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

    if (!user.isAdmin) {
        return <div>You are not authorized to access this page</div>
    }

    return (
        <div>
            {deleteUser && 
                <Modal 
                    onClose={() => setDeleteUser(false)} 
                    onSubmit={() => {
                        handleDeleteUser(deleteUser.id)
                        setDeleteUser(false)
                    }} 
                    title="Delete User" 
                    description={`Are you sure you want to delete ${deleteUser.name}?`}
                />
            }
            {openCreateUserModal && 
                <Modal 
                    hideCloseButton={true}
                    hideSubmitButton={true}
                    // onClose={() => setCreateUserModal(false)} 
                    // onSubmit={() => {}} 
                    title="Create User" 
                    description={
                        <UserFormManagement 
                            data={null}
                            onSubmit={(user) => {
                                setUsers([...users, user])
                                setOpenCreateUserModal(false)
                            }} 
                            onCancel={() => setOpenCreateUserModal(false)} 
                            cancelButtonText="close modal"
                        />
                    }
                />
            }
            {editUser && 
                <Modal 
                    hideCloseButton={true}
                    hideSubmitButton={true}
                    // onClose={() => setEditUser(null)} 
                    // onSubmit={() => {}} 
                    title="Edit User" 
                    description={
                        <UserFormManagement 
                            data={editUser}
                            onSubmit={() => {
                                fetchUsers()
                                setEditUser(null)
                            }} 
                            onCancel={() => setEditUser(null)} 
                            cancelButtonText="close modal"
                    />
                    }
                />
            }
            <h2>Profile Users Page</h2>
            {/* <CreateUserForm
                editUser={editUser}
                onSubmit={(user) => {
                    setUsers([...users, user])
                }} 
                onReset={() => setEditUser(null)}
            /> */}
            <h2>Table</h2>
            <button onClick={() => setOpenCreateUserModal(true)}>Create User</button>
            <br />
            <br />
            <span>Search</span>
            <br />
            <input type="text" placeholder="by name & email" onChange={(e) => setSearch(e.target.value)}/>
            <br />
            <br />
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
                            .filter(user => user.name.includes(search) || user.email.includes(search))
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
                                                    onClick={() => setDeleteUser(user)}>
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