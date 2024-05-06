import mongoose from "mongoose";


interface connectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    
    static async connect ( options: connectionOptions ) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect( mongoUrl, {
                dbName,
            })

            console.log('Mongo connected')


        } catch (error) {
            console.log('Mongo connection error')
            throw error;
        }

    } 



}

