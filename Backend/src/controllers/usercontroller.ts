import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../db/models/users';

class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password} = req.body;
      console.log(` Name: ${name}, Email: ${email}`);

      const saltRounds = 10; 
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
          name,
          email,
          passwordHash: hashedPassword,
          passwordSalt: salt,
          address: '',
          phoneNumber: '',
          enabled: true,
      });
      console.log(`User created successfully with ID: ${newUser.id}`);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
    console.error('Error creating user:', error); 
      res.status(500).json({ message: error });
    }
  }
}
export default new UserController();