const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        "/*",
        proxy({
            target: "https://na1.api.riotgames.com",
            changeOrigin: true
        })
    );
}
