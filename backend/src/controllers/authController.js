import jwt from 'jsonwebtoken';
import { DB } from '../services/dataStore.js';
import { config } from '../config/index.js';

export const login = (req, res) => {
  const { email, role, phone } = req.body;
  const userRole = (role || 'USER').toUpperCase();
  const existingUser = DB.users.find((u) => u.email === email || (phone && u.phone === phone));

  const user = existingUser || {
    id: `usr_${Date.now()}`,
    name: email ? email.split('@')[0] : 'Dhruv Patel',
    email: email || 'dhruv.patel@roadresq.in',
    phone: phone || '+91 98765 43210',
    role: userRole,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  };

  if (!existingUser) {
    DB.users.push(user);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user,
    message: 'Authentication successful',
  });
};

export const register = (req, res) => {
  const { name, email, phone, role } = req.body;
  const userRole = (role || 'USER').toUpperCase();

  const newUser = {
    id: `usr_${Date.now()}`,
    name: name || 'Dhruv Patel',
    email: email || 'dhruv.patel@roadresq.in',
    phone: phone || '+91 98765 43210',
    role: userRole,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
  };

  DB.users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    token,
    user: newUser,
    message: 'User registered successfully',
  });
};

export const getMe = (req, res) => {
  const userId = req.user?.id || 'usr_main';
  const user = DB.users.find((u) => u.id === userId) || DB.users[0];
  const userVehicles = DB.vehicles.filter((v) => v.userId === user.id);

  res.json({
    success: true,
    user: {
      ...user,
      vehicles: userVehicles,
    },
  });
};

export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
