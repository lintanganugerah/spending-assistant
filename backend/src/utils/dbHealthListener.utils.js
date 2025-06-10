const {
  rateLimiterRedis,
  guestRedis,
  userAuthenticatedRedis,
} = require("@database/redis/redis.database");

const dbClients = {
  redis: {
    rateLimiter: rateLimiterRedis,
    guest: guestRedis,
    userCache: userAuthenticatedRedis,
  },
  // anotherDB: {
  //   main: dbClient,
  // },
};

const dbStatus = {};

for (const [dbType, clients] of Object.entries(dbClients)) {
  for (const [name] of Object.entries(clients)) {
    const fullKey = `${dbType}.${name}`;
    dbStatus[fullKey] = {
      connected: false,
      uptimeStart: null,
      downtimeStart: new Date(),
    };
  }
}

const updateStatus = (key, isConnected) => {
  const time = new Date();
  const db = dbStatus[key];

  if (isConnected && !db.connected) {
    db.connected = true;
    db.uptimeStart = time;
    db.downtimeStart = null;
  }

  if (!isConnected && db.connected) {
    db.connected = false;
    db.uptimeStart = null;
    db.downtimeStart = time;
  }
};

const attachListeners = (dbType, name, client) => {
  const key = `${dbType}.${name}`;

  if (dbType === "redis") {
    client.on("connect", () => {
      console.log(`✅ Redis (${name}) connected`);
      updateStatus(key, true);
    });

    client.on("end", () => {
      console.warn(`🔌 Redis (${name}) disconnected`);
      updateStatus(key, false);
    });

    client.on("reconnecting", () => {
      console.warn(`⚠️ Redis (${name}) reconnecting...`);
    });

    client.on("error", (err) => {
      console.error(`❌ Redis (${name}) error:`, err.message);
      updateStatus(key, false);
    });
  }

  // Extendable:
  else if (dbType === "postgres") {
    client.on("connect", () => {
      console.log(`✅ Postgres (${name}) connected`);
      updateStatus(key, true);
    });

    client.on("error", (err) => {
      console.error(`❌ Postgres (${name}) error:`, err.message);
      updateStatus(key, false);
    });
  }
};

const listenerHealthSetup = async () => {
  return new Promise((resolve) => {
    let readyCount = 0;
    const allClients = [];

    for (const [dbType, clients] of Object.entries(dbClients)) {
      for (const [name, client] of Object.entries(clients)) {
        allClients.push({ dbType, name, client });
      }
    }

    allClients.forEach(({ dbType, name, client }) => {
      attachListeners(dbType, name, client);
      client.once("connect", () => {
        readyCount++;
        if (readyCount === allClients.length) {
          resolve();
        }
      });
    });
  });
};

function getDbStatus() {
  const timeNow = new Date();
  const statusReturned = {};

  for (const [key, value] of Object.entries(dbStatus)) {
    const dbStatusTime = value.connected
      ? value.uptimeStart
      : value.downtimeStart;

    statusReturned[key] = {
      connected: value.connected,
      since: dbStatusTime.toLocaleString(),
      duration: `${Math.floor((timeNow - dbStatusTime) / 1000)} seconds`,
    };
  }

  return statusReturned;
}

function isHealthy() {
  return Object.values(dbStatus).every((status) => status.connected === true);
}

module.exports = {
  getDbStatus,
  isHealthy,
  listenerHealthSetup,
};
