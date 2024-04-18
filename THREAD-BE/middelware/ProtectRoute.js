import User from "../Model/User.js";
import jwt from 'jsonwebtoken';
const ProtectRoute = async (req , res , next) => {

    try {
        const token = req.cookies.jwt;

       
        if(!token){
            return res.status(401).json({message : "unauthorized user"})
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET)
        const user = await User.findById(decode.userId).select("-password")

         
        req.user = user;

        next();

    } catch (error) {
        console.error("Error in login check: " + error.message);
        res.status(500).json({" message protect Router" : error.message });
    }
}

export default ProtectRoute