import { queryQueue, queryQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { UserData } from '../../utils/validations/user.validations';

export class UserQueryService {
    static async listUsers(): Promise<ServiceResponse<UserData[]>> {
        const job = await queryQueue.add('listUsers', {});
        const result = await job.waitUntilFinished(queryQueueEvents);
        return { status: 200, data: result };
    }

    static async findUser(id: number): Promise<ServiceResponse<UserData>> {
        if (!id) {
            return { status: 400, message: 'Invalid user ID' };
        }
        const job = await queryQueue.add('getUser', { id });
        const result = await job.waitUntilFinished(queryQueueEvents);
        if (!result) {
            return { status: 404, message: 'User not found' };
        }
        return { status: 200, data: result };
    }
}