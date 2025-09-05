import React from "react";
import { X } from "lucide-react";

const NotificationPopup = ({ setShow }) => {
  const notifications = [
    {
      id: 1,
      title: "New Listing Added",
      message: "Arjun just listed a MacBook Air for sale.",
      time: "2 mins ago",
    },
    {
      id: 2,
      title: "Price Drop Alert",
      message: "Your saved item 'iPhone 13' has dropped ₹5,000!",
      time: "15 mins ago",
    },
    {
      id: 3,
      title: "Message Received",
      message: "Rahul sent you a message about your listing.",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="absolute right-4 top-16 w-80 bg-white rounded-xl shadow-lg border p-4 z-50 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
        <X
          className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-500"
          onClick={() => setShow(false)}
        />
      </div>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer border transition"
            >
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.message}</p>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">
          No new notifications 🎉
        </p>
      )}

      {/* Footer */}
      <button
        onClick={() => alert("Opening Notifications Page...")}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition"
      >
        View All Notifications
      </button>
    </div>
  );
};

export default NotificationPopup;
