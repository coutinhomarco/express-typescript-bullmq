import { Request, Response } from 'express';
import { UserCommandService } from '../../services/user/user.command.service';
interface UserPayload {
    userId: number;
    role: string;
}

interface RequestWithUser extends Request {
    user?: UserPayload;
}
export class UserCommandController {
    static async createUser(req: Request, res: Response) {
        const userData = req.body;
        const result = await UserCommandService.createUser(userData);
        res.status(result.status).json({ message: result.message });
    }

    static async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const result = await UserCommandService.updateUser(id, userData);
        res.status(result.status).json({ message: result.message });
    }

    static async deleteUser(req: RequestWithUser , res: Response) {
        // const role = req?.user?.role
        // if (role !== 'admin') {
        //     res.status(401).json({ message: 'Unauthorized' });
        //     return;
        // }
        const id = parseInt(req.params.id);
        const result = await UserCommandService.deleteUser(id);
        res.status(result.status).json({ message: result.message });
    }

    static async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await UserCommandService.loginUser(email, password);
        res.status(result.status).json({ message: result.message, data: result.data });
    }
}