import express from 'express';
import db from '../db/models/index.js';
import { login } from '../firebase/utils/login.js';
import { signup } from '../firebase/utils/signup.js';
import { logout } from '../firebase/utils/logout.js';

const { user: User } = await db;

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    const { id, accessToken, refreshToken } = await signup(email, password);

    const newUser = await User.create({
      id,
      name,
      surname,
      email,
    });

    return res
      .cookie('_session', refreshToken, { maxAge: 900000, httpOnly: true })
      .status(201)
      .send({ user: newUser, accessToken });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const credentials = req.body;

  try {
    const { id, accessToken, refreshToken } = await login(credentials);

    await User.update({ isOnline: true }, { where: { id } });

    const updatedUser = await User.findOne({ where: { id } });

    return res
      .cookie('_session', refreshToken, { maxAge: 900000, httpOnly: true })
      .status(200)
      .send({ user: updatedUser, accessToken });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/logout', async (req, res) => {
  const { id } = req.body;
  try {
    await logout();

    await User.update({ isOnline: false }, { where: { id } });

    return res.clearCookie('_session').status(200).send(id);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
