import User from '../../models/usersSchema.js';
import bcrypt from 'bcrypt' 

const createUser =  async (req, res) => {
  try {
        const { name, email, phone, password } = req.body;
        console.log(name, email, password, phone)
        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'Name, email, password, and phone are required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User
        const newUser = new User({ name, email, phone, password: hashedPassword });
  
        // Save the User to the database
        const savedUser = await newUser.save();
  
        res.status(201).json(savedUser);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export default createUser;