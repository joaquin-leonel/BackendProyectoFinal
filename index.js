const express = require('express');

const apiRoutes = require('./routes');
const app = express();

const PORT = process.env.PORT || 8080;

app.use('/', apiRoutes);

const conectedServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

conectedServer.on(`error`, e => console.log(e.message));
