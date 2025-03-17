import { useEffect } from "react";

// complete this page, add table or list to render users data
const ProfileUsers = () => {

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:8000/api/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data);
        }
        fetchUsers();
    }, []);
    
    return (
        <div>
            <h1>Profile Users</h1>
        </div>
    )
}

export default ProfileUsers;