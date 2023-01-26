export default {
    root: process.cwd() + '/src',
    publicDir: process.cwd() + '/public',
    resolve: {
        alias: {
            '~bootstrap': process.cwd() + '/node_modules/bootstrap',
        }
    },
    server: {
        port: 8080,
        hot: true
    }
}