module.exports = {
    postgresConnection: {
        connectionString : process.env.DATABASE_URL,
        ssl : true
    }
};