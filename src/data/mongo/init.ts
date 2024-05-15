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
            return true;
                 
        } catch (error) {
            throw error;
        }

    } 



}

