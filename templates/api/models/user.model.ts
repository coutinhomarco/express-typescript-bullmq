import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserModel {
    static async getAllUsers() {
        return await prisma.user.findMany();
    }

    static async getUserById(id: number) {
        return await prisma.user.findUnique({
            where: { id }
        });
    }

    static async createUser(userData: { username: string; email: string; password: string; role: string }) {
        return await prisma.user.create({
            data: userData
        });
    }

    static async updateUser(id: number, userData: { username?: string; email?: string; password?: string; role?: string }) {
        return await prisma.user.update({
            where: { id },
            data: userData
        });
    }

    static async deleteUser(id: number) {
        return await prisma.user.delete({
            where: { id }
        });
    }

    static async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }
}