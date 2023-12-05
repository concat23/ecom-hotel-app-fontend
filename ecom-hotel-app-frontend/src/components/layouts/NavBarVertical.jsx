import React from 'react';

export const NavBarVertical = () => {
  const menuItems = [
    { id: 0, label: 'User Account', icon: 'account' },
    { id: 1, label: 'Dashboard', icon: 'dashboard' },
    { id: 2, label: 'Rooms', icon: 'hotel' },
    { id: 3, label: 'Reservations', icon: 'event' },
    { id: 4, label: 'Service', icon: 'service' },
    { id: 5, label: 'Log', icon: 'log' },
  ];

  return (
    <div className="navbar-vertical">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <a href={`#${item.label.toLowerCase()}`}>
              <span>{item.label}</span>
              {/* Add an icon component or use an external icon library */}
              <span className={`material-icons-outlined`}>{item.icon}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
