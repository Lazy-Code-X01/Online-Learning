import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import generateToken from '../utils/generateToken.js'


//@desc    Register a new admin
//route    POST /apSi/admin
//@access  Public
const registerAdmin = asyncHandler(async (req, res) => {
    const {firstName, lastName, password, email} = req.body

    // checking if admin exists with email
    const adminExists = await Admin.findOne({email})
    if (adminExists) {
        res.status(400)
        throw new Error('Admin already exists')
    }

    const admin  = await Admin.create({
        firstName,
        lastName,
        email,
        password,
    })

    if (admin) {
        
        res.status(201).json({
            _id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            password: admin.password, 
            email: admin.email,
        })

        // Update the loginTimes array with the current timestamp
        admin.loginTimes.push(new Date());
        await admin.save();
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//@desc    Auth user/set token
//route    POST /api/admin/auth
//@access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const admin = await Admin.findOne({email})

    if (admin && (await admin.matchPassword(password))) {

        // Update the loginTimes array with the current timestamp
        admin.loginTimes.push(new Date());
        await admin.save();

        generateToken(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

//@desc    Logout  user
//route    POST /api/admin/logout
//@access  Public
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "Admin Logged out"})
})

const getLoginTimes = asyncHandler(async (req, res) => {
    const { adminId } = req.params;

    const admin = await Admin.findById(adminId);

    if (admin) {
        res.json(admin.loginTimes);
    } else {
        res.status(404).json({ message: 'Admin not found' });
    }
});



export {
  registerAdmin,
  authUser,
  logoutAdmin,
  getLoginTimes,
}