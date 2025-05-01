import { config } from '@review/config';
import { winstonLogger } from '@iacobalexandrugeorgian/shared';
import client, { Channel} from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel = await connection.createChannel();
    log.info('Review server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'ReviewService createConnection() method error:', error);
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
