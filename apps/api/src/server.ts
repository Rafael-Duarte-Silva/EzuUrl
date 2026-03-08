import "dotenv/config";
import config from "./config/config";
import app from "./app";
import { connectCassandra } from "./db/cassandra.database";
import { connectRedis } from "./db/redis.database";

async function bootstrap() {
    await connectCassandra();
    await connectRedis();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

bootstrap();
