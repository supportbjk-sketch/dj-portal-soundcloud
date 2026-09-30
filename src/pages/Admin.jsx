import React, { useEffect, useState } from 'react';
import { getUsers, updateUserStatus } from '../lib/auth';

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleUpdateStatus = (userId, status) => {
    const updated = updateUserStatus(userId, status);
    setUsers(updated);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-8">Admin Panel</h2>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Daftar User</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-2">Username</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Role</th>
                <th className="py-3 px-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="py-3 px-2">{user.username}</td>
                  <td className="py-3 px-2">{user.email}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                      user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-200' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">{user.role}</td>
                  <td className="py-3 px-2">
                    {user.status !== 'approved' && (
                      <button onClick={() => handleUpdateStatus(user.id, 'approved')} className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:opacity-90">
                        Approve
                      </button>
                    )}
                    {user.status !== 'rejected' && (
                      <button onClick={() => handleUpdateStatus(user.id, 'rejected')} className="bg-red-600 text-white px-3 py-1 rounded hover:opacity-90">
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
