import React from "react";

const UsersTable = () => {
  const users = [
    {
      id: 1,
      name: "Rohit Kumar",
      listings: 12,
      bought: 5,
      sold: 3,
      rented: 4,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      listings: 8,
      bought: 3,
      sold: 1,
      rented: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Mehta",
      listings: 5,
      bought: 2,
      sold: 1,
      rented: 0,
      status: "Blocked",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition mt-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4 border">User Name</th>
            <th className="py-2 px-4 border">Listings</th>
            <th className="py-2 px-4 border">Bought</th>
            <th className="py-2 px-4 border">Sold</th>
            <th className="py-2 px-4 border">Rented</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={idx}
              className="text-center hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.listings}</td>
              <td className="py-2 px-4 border">{user.bought}</td>
              <td className="py-2 px-4 border">{user.sold}</td>
              <td className="py-2 px-4 border">{user.rented}</td>
              <td
                className={`py-2 px-4 border font-semibold ${
                  user.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.status}
              </td>
              <td className="py-2 px-4 border">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                  View
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
