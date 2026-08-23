import type { request } from "express"

declare global {
    namespace Express {
        interface Request{
            userId?: string
        }
    }
}

export {}