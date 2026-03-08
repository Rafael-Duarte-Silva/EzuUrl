import cassandra from "cassandra-driver";

export const cassandraClient = new cassandra.Client({
    contactPoints: ["127.0.0.1"],
    localDataCenter: "datacenter1",
    keyspace: "url_shortener",
});

export async function connectCassandra(): Promise<void> {
    try {
        await cassandraClient.connect();
        console.log("Connected to Cassandra");
    } catch (error) {
        console.error("Error connecting:", error);
    }
}

export async function disconnectCassandra(): Promise<void> {
    await cassandraClient.shutdown();
    console.log("Connection closed.");
}

