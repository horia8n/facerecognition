const jwt = require('jsonwebtoken');

const handleSignin = async (pgClient, bcrypt, req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect form submission');
    }
    return pgClient.query(`SELECT email, hash FROM login WHERE email = '${email}'`)
        .then(result => {
            return result.rows;
        })
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return pgClient.query(`SELECT * FROM users WHERE email = '${email}'`)
                    .then(result => result.rows)
                    .then(user => {
                        return user[0];
                    })
                    .catch(err => Promise.reject('unable to get user'))
            } else {
                Promise.reject('wrong credentials1')
            }
        })
        .catch(err => Promise.reject('wrong credentials2'));
};

const getAuthTokenId = (pgClient, req, res) => {
    const {authorization} = req.headers;
    pgClient.query(`SELECT id FROM auth WHERE token = '${authorization}'`)
        .then(result => result.rows)
        .then(data => {
            res.json({id: data[0].id});
        })
        .catch(err => {
                res.status(400).json('Unauthorized');
            }
        );
};

const signToken = (email) => {
    const jwtPayload = {email};
    return jwt.sign(jwtPayload, 'JWT_SECRET', {expiresIn: '2 days'});
};

const setToken = async (pgClient, token, id) => {
    const setToke = await
        pgClient.query(`SELECT * FROM auth WHERE token = '${token}'`)
            .then(result => result.rows)
            .then(async data => {
                if (data.length) {
                    return await pgClient.query(`UPDATE auth SET id = '${id}' WHERE token = '${token}'`)
                        .then(() => true);
                } else {
                    return await pgClient.query(`INSERT INTO auth (id, token) VALUES ('${id}', '${token}')`)
                        .then(() => true);
                }
            })
            .catch(err => {
                console.log('err', err);
            });
    return setToke;
};

const createSessions = (pgClient, user) => {
    const {email, id} = user;
    const token = signToken(email);
    return setToken(pgClient, token, id)
        .then((data) => {
            return {success: 'true', userId: id, token}
        })
        .catch(console.log);
};

const signinAuthentication = (pgClient, bcrypt) => (req, res) => {
    const {authorization} = req.headers;
    return authorization ?
        getAuthTokenId(pgClient, req, res) :
        handleSignin(pgClient, bcrypt, req, res)
            .then(data => {
                return data.id && data.email ?
                    createSessions(pgClient, data) :
                    Promise.reject(data);
            })
            .then(session => {
                return res.json(session)
            })
            .catch(err => res.status(400).json(err));
};

module.exports = {
    signinAuthentication: signinAuthentication
};

