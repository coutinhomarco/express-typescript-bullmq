import { UserModel } from "../../models/user.model";
export interface UserData {
    username: string;
    email: string;
    password: string;
    role: string;
}

export async function isValidUserData(data: UserData): Promise<{status: number, message: string | undefined}> {
    const user = await UserModel.findUserByEmail(data.email);
    if (user) {
        return { status: 400, message: 'Email already in use' };
    }
    if (!data.username || !data.email || !data.password || !data.role) {
        return { status: 400, message: 'Missing required fields' };
    }
    return { status: 200, message: undefined };
}

export async function isValidUserDataForUpdate(id: number, data: Partial<UserData>): Promise<{status: number, message: string | undefined}> {
    if (Object.keys(data).length === 0) {
        return { status: 400, message: 'No update data provided' };
    }
    return { status: 200, message: undefined };
}

export async function isValidUserDelete(id: number): Promise<{status: number, message: string | undefined}> {
    const user = await UserModel.getUserById(id);
    if (!user) {
        return { status: 404, message: 'User not found' };
    }
    return { status: 200, message: undefined };
}