import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  console.log('🔔 Signup payload:', req.body);

  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    return res
      .status(201)
      .json({ message: 'User created', userId: user._id });
  } catch (err) {
    console.error('🚨 signupController error:', err);

    // Duplicate key (11000) → username ou email já existente
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res
        .status(409)
        .json({ message: `O ${field} “${err.keyValue[field]}” já existe.` });
    }

    // Erros de validação do Mongoose
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: `Validation failed: ${err.message}` });
    }

    // Erro genérico
    return res
      .status(500)
      .json({ message: 'Erro interno no servidor.' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error('🚨 loginController error:', err);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
