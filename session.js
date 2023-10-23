var session = {};

const getSession = () => {
    return session;
};

const setSession = (ses) => {
    session = ses;
}

module.exports = {getSession, setSession};