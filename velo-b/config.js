module.exports = {
    env: process.env.NODE_ENV || 'prod', // dev | prod
    useProxy: process.env.USE_PROXY === 'false',
}
