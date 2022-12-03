import { MongoClient } from 'mongodb'



const {
    MONGO_URI = 'mongodb+srv://express-api:t7SYpIvGRYUjBcGd@core-web-vitals.8re729y.mongodb.net/?retryWrites=true&w=majority',
} = process.env

export const client = new MongoClient( MONGO_URI )
export const db = client.db()
