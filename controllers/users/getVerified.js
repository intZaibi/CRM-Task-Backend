import jwt from 'jsonwebtoken'


export default async (req, res) => {
    const decoded = await verifyUserToken(req);
    
    if(decoded){
      return res.status(200).json({
        message: 'You have access to this protected route.',
        user: decoded   // again sending user data back
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token!' });
    }
}

export const verifyUserToken = async (req) => {
  try {
    const token = req.cookies.authToken || null;

    if (!token) {
      console.log('No token provided!')
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'enc'); //verifying token
    
    return decoded; // Storing user data in req object
    
  } catch (error) {
    console.log("error verify: ", error)
    return null;
  }
}
