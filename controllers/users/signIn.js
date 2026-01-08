import User from '../../models/usersSchema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 

const signIn =  async (req, res) => {
  try {
        const { email, password } = req.body;
  
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        // Generate JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "enc",
        { expiresIn: '1d' }
      );
  
      // Set token as an HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true, // Prevents client-side scripts from accessing the cookie
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json({
        message: 'Login successful!',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {

        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid User ID.' });
        }
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export default signIn;
