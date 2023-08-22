import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },  
    department: {
        type: String,
        required: true,
    },
    matric_number: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    level: {
        type: String,
        required: true
    },
    genotype: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    stateOfOrigin: {
        type: String,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User