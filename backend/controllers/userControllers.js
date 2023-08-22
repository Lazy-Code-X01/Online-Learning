import asyncHandler from 'express-async-handler'
// import User from '../models/userModels.js'


//@desc    Register a new user
//route    POST /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, department, matric_number, email, phoneNumber, level, genotype, bloodGroup, dateOfBirth, religion, stateOfOrigin, lga, nationality, sex, address} = req.body

    // checking if user exists with email
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // checking if user exists with matric
    const userExistsMatric = await User.findOne({matric_number})
    if (userExistsMatric) {
        res.status(400)
        throw new Error('User already exists')
    }
    // checking if user exists with phone number
    const userExistsPhone = await User.findOne({phoneNumber})
    if (userExistsPhone) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user  = await User.create({
        firstName,
        lastName,
        department,
        matric_number,
        email,
        phoneNumber,
        level,
        genotype,
        bloodGroup,
        dateOfBirth,
        religion,
        stateOfOrigin,
        lga,
        nationality,
        sex,
        address
    })

    if (user) {
        
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department,
            matric_number: user.matric_number,
            email: user.email, 
            phoneNumber: user.phoneNumber, 
            level: user.level,
            genotype: user.genotype,
            bloodGroup: user.bloodGroup,
            dateOfBirth: user.dateOfBirth,
            religion: user.religion,
            stateOfOrigin: user.stateOfOrigin,
            lga: user.lga,
            nationality: user.nationality,
            sex: user.sex,
            address: user.address,
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//@desc    Get user data
//route    GET /api/users/profile
//@access  Private
//@desc    Get user data
//route    GET /api/users/profile
//@access  Private
//@desc    Get user data
//route    GET /api/users/profile
//@access  Private
const getUserDetails = asyncHandler(async (req, res) => {
    try {
      // Retrieve all users' details from the database
      const users = await User.find({}, 'firstName lastName department matric_number email phoneNumber');
  
      if (!users || users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
  
      res.json(users);
    } catch (err) {
      console.error('Error finding users:', err);
      res.status(500).json({ error: 'Error finding users' });
    }
});
  

export {
    registerUser,
    getUserDetails
}

// |