module.exports = {
    env: process.env.NODE_ENV || 'dev', // dev | prod
    useProxy: process.env.USE_PROXY === 'true',
}
