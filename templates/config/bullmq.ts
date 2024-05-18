import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { UserCommandService } from '../api/services/user/user.command.service';
import { UserModel } from '../api/models/user.model';

const connection = new IORedis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
});

export const commandQueue = new Queue('commandQueue', { connection });
export const queryQueue = new Queue('queryQueue', { connection });

export const commandQueueEvents = new QueueEvents('commandQueue', { connection });
export const queryQueueEvents = new QueueEvents('queryQueue', { connection });

export const commandWorker = new Worker('commandQueue', async job => {
    try {
        console.log(`Processing command job ${job.name} with data ${JSON.stringify(job.data)}`);
        switch (job.name) {
            case 'createUser':
                await UserModel.createUser(job.data);
                break;
            case 'updateUser':
                await UserModel.updateUser(job.data.id, job.data);
                break;
            case 'deleteUser':
                await UserModel.deleteUser(job.data.id);
                break;
            case 'loginUser':
                await UserCommandService.loginUser(job.data.email, job.data.password);
                break;
            // Add more command jobs here
            default:
                console.log(`Unknown command job: ${job.name}`);
        }
        console.log(`Command job ${job.name} processed successfully`);
    } catch (error) {
        console.error(`Error processing command job ${job.name}:`, error);
    }
}, { connection });

commandWorker.on('completed', job => {
    console.log(`Job completed with result ${job.returnvalue}`);
});

commandWorker.on('failed', (job, err) => {
    console.error(`Job failed with error ${err}`);
    console.log(`Job data: ${JSON.stringify(job?.data)}`);
});

export const queryWorker = new Worker('queryQueue', async job => {
    console.log(`Processing query job ${job.name} with data ${JSON.stringify(job.data)}`);
    try {
        switch (job.name) {
            case 'listUsers':
                return await UserModel.getAllUsers();
            case 'getUser':
                return await UserModel.getUserById(job.data.id);
            // Add more query jobs here
            default:
                console.log(`Unknown query job: ${job.name}`);
        }
    } catch (error) {
        console.log(`Error processing query job ${job.name}:`, error);
    }
}, { connection });