import path from 'path'
import express, { json } from 'express'
import dotenv from "dotenv"
dotenv.config()

import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

import {notFound, errorHandler} from './middleware/userMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"

const port  = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({ origin: 'http://localhost:3000' }));
// Configure CORS
app.use(
    cors({
      origin: true, // This will dynamically set the allowed origin based on the request's origin
      credentials: true, // Allow cookies and other credentials in cross-origin requests
    })
);
  


app.use(cookieParser())
  
// app.use("/api/users", userRoutes) // LATER WHEN DOING TESTING EX EVERYTHING ABOUT USERS
app.use("/api/admin", adminRoutes)

// if (process.env.NODE_ENV === 'production'p) {
//     const _dirname = path.resolve()
//     app.use(express.static(path.join(__dirname, 'frontend/dist')))
//     app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'dashboard', 'dist', 'index.html')))
// }else{
//     app.get("/", (req, res)=> res.send("Server is ready"))
// }

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))