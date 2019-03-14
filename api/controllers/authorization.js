const redisClient = require('./signin').redisClient;

const requireAuth = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json('Unauthorized');
    }
    return redisClient.get(authorization, (err, reply) => {
        console.log('reply', reply);
        if (err || !reply) {
            return res.status(401).json('Unauthorized')
        }
        console.log('you shell pass');
        return next();
    });
};

module.exports = {requireAuth: requireAuth};