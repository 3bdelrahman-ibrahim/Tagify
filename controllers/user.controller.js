import User from '../models/user.model.js';
import { renderUserTemplate } from '../views/user.view.js';
import { createError } from '../utils/error.util.js';

export const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser.toPublicJSON());
  } catch (err) {
    next(createError(400, 'Error creating user', err));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(req.query);
    res.status(200).json(users.map(user => user.toPublicJSON()));
  } catch (err) {
    next(createError(500, 'Error fetching users', err));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json(user.toPublicJSON());
  } catch (err) {
    next(createError(500, 'Error fetching user', err));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json(user.toPublicJSON());
  } catch (err) {
    next(createError(400, 'Error updating user', err));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(createError(500, 'Error deleting user', err));
  }
};

export const renderUserView = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send(renderErrorTemplate('User not found'));
    }
    res.send(renderUserTemplate(user));
  } catch (err) {
    next(createError(500, 'Error rendering user view', err));
  }
};