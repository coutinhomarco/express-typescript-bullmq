import { commandQueue, commandQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { UserModel } from '../../models/user.model';
import { UserData, isValidUserData } from '../../utils/validations/user.validations';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secret: string = process.env.JWT_SECRET || 'very_secret_key_here';

export class UserCommandService {
    static async createUser(userData: UserData): Promise<ServiceResponse<UserData>> {
        try {
            if (!isValidUserData(userData)) {
                return { status: 400, message: 'Invalid user data' };
            }
            const user = await UserModel.findUserByEmail(userData.email);
            if (user) {
                return { status: 500, message: 'This email is already being used.' };
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            await commandQueue.add('createUser', userData);
            return { status: 201, message: 'User creation added to queue' };
        } catch (error) {
            return { status: 500, message: 'Error creating user' };
        }
    }

    static async updateUser(id: number, userData: Partial<UserData>): Promise<ServiceResponse<UserData>> {
        try {
            if (Object.keys(userData).some(key => userData[key as keyof UserData] === undefined)) {
                return { status: 400, message: 'Invalid data provided' };
            }
            const user = await UserModel.getUserById(id);
            if (!user) {
                return { status: 500, message: "This account doesn't exist." };
            }
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }
            await commandQueue.add('updateUser', { id, ...userData });
            return { status: 200, message: 'User updated successfully' };
        } catch (error) {
            return { status: 500, message: 'Error updating user' };
        }
    }

    static async deleteUser(id: number): Promise<ServiceResponse<void>> {
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return { status: 500, message: 'This account doesn\'t exist.' };
            }
            // const jobId = `deleteUser-${id}`;
            await commandQueue.add('deleteUser', { id });
            return { status: 202, message: 'User deleted added to queue' };
        } catch (error) {
            console.error('Error deleting user:', error);
            return { status: 500, message: 'Error deleting user' };
        }
    }

    static async loginUser(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
        try {
            const user = await UserModel.findUserByEmail(email);
            if (!user) {
                return { status: 404, message: 'User not found' };
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return { status: 401, message: 'Invalid credentials' };
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '6h' });
            return { status: 200, data: { token } };
        } catch (error) {
            return { status: 500, message: 'Error logging in user' };
        }
    }
}