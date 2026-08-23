import "dotenv/config";
export const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";


export class appError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }
}