import jwt from 'jsonwebtoken'

const getVerified =  async (req, res) => {
  
  try {
    const token = req.headers.authorization.split(' ')[1] || null;

    if (!token) {
      console.log('if')
      return res.status(401).json({ message: 'Unauthorized: No token provided!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'enc'); //verifying token
    
    res.status(200).json({
      message: 'You have access to this protected route.',
      user: decoded   // again sending user data back
    });
    
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized: Invalid or expired token!' });
  }
}

export default getVerified;