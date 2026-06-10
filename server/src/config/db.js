import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.error("Error connecting MONGODB", error)
        process.exit(1) // Exit with failure
    }
}