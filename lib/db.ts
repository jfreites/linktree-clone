import { PrismaClient } from '@prisma/client'

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}


export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db
}
// This is a workaround to avoid the "PrismaClient was already instanciated" error