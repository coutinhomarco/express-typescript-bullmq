import { Request, Response } from 'express';
import { UserQueryService } from '../../services/user/user.query.service';

export class UserQueryController {
    static async listUsers(req: Request, res: Response) {
        try {
            const result = await UserQueryService.listUsers();
            res.status(result.status).json(result.data || { message: result.message });
        } catch (error) {
            res.status(500).json({ message: 'Failed to list users' });
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await UserQueryService.findUser(id);
            res.status(result.status).json(result.data || { message: result.message });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get user' });
        }
    }
}