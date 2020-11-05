module.exports = {
    devServer: {
        proxy: {
            "/user": {
                target: "127.0.0.1:7001",
                changeOrigin: true,
                ws: true,
                secure: false,
                pathReweite: {
                    '^/user': ''
                }
            }
        }
    }
}