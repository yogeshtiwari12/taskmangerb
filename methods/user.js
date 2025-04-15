
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/user_models.js";


const jwtkey = "abcdefghijkdadaafbfasfsfjaf";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        if (!name || !email || !password) {
            res.status(400).json({ error: "Please provide all required fields" });
        }

        if(password.length<8){
            return res.status(400).json({ error: "Password should be at least 8 characters long" });
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ error: "User already exists with this email" });
        }
        const hashpassword = await argon2.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashpassword,
            role:"user"
        })
        await newUser.save();


        res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}



export const login = async (req, res) => {

    const { email, password } = req.body;
  
    try {
      if (password.length < 8) {
        return res.status(400).json({ message: "Password should be at least 8 characters long" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      
        if (user.role !== "admin"  && user.role !== "user") {
          console.log(user.role)
          return res.status(200).json({ message: `User with role ${role} is not found` });
        }
        
      const isMatch = await argon2.verify(user.password,password,);
      
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      jwt.sign({ id: user._id }, jwtkey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          return res.json({ message: "token Error", error: error.message });
        }
  
  
        res.cookie('token', token,{
          secure: true, // Set to true since Render uses HTTPS
          sameSite: 'None', // Allows cross-site cookies with HTTPS
          httpOnly: true,
        })
  
        res.json({
          message: 'Logged in successfully',
          role:user.role,
        })
      }
      )
      
    }
    catch (error) {
      return res.send("User login failed : " + error.message)
    }
}

export const valid_user = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        res.json({
            message: "User found",
             user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ error: "Server error", error: error.message });

    }

}

export const logout = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ message: 'Token not found' });
        }
        res.clearCookie('token',{
          secure: true, // Set to true since Render uses HTTPS
          sameSite: 'None', // Allows cross-site cookies with HTTPS
          httpOnly: true,
        });
        res.json({ message: 'Logged out successfully' });

    } catch (error) {
        return res.status(500).json({ message: "Error logging out", error: error.message });

    }
}


export const updatUser = async (req, res) => {
  try {
    const use = req.params.id;
    console.log(use)

    const updatedUser = await User.findByIdAndUpdate(use, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};