import { config } from '@users/config';
import { winstonLogger } from '@iacobalexandrugeorgian/shared';
import client, { Channel } from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'usersQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel = await connection.createChannel();
    log.info('Users server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'UsersService createConnection() method error:', error);
    return undefined;
  }
}

function closeConnection(channel: any, connection: any): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection } ;
