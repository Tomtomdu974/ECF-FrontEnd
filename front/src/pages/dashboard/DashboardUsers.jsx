import { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../../api/user';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Dashboard.css';

const DashboardUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const { user: currentUser } = useAuth();

    const loadUsers = () => {
        fetchUsers()
            .then((data) => setUsers(data))
            .catch((err) => setError(err?.message || "Impossible de charger les utilisateurs"));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleRoleChange = async (id, newRole) => {
        setError('');
        try {
            await updateUser(id, { role: newRole });
            loadUsers();
        } catch (err) {
            setError(err?.message || "La mise à jour du rôle a échoué");
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Supprimer définitivement cet utilisateur ?");
        if (!confirmed) return;

        setError('');
        try {
            await deleteUser(id);
            loadUsers();
        } catch (err) {
            setError(err?.message || "La suppression a échoué");
        }
    };

    return (
        <main className="admin-page">
            <h1>Gestion des utilisateurs</h1>

            {error && <p className="form-error">{error}</p>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.userName}</td>
                            <td>{u.email}</td>
                            <td>
                                <select
                                    value={u.role}
                                    disabled={u.id === currentUser.id}
                                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="detail-btn delete-btn"
                                    disabled={u.id === currentUser.id}
                                    onClick={() => handleDelete(u.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default DashboardUsers;