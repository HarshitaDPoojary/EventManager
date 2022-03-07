const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/service.config.js');
const mongoose = require('mongoose');

const eventRoutes = require('./routes/event.js');
const { errorHandler, errorConverter } = require('./middlewares/errorHandler')

process.env.TZ = "Asia/Calcutta";

mongoose.Promise = global.Promise;

//connection
mongoose.connect(config.url, {
    useNewUrlParser: true, useCreateIndex: true
}).then(() => {
    console.log("connected");
}).catch(err => {
    console.log(err);
    process.exit();
});

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/event', eventRoutes);

app.use(errorConverter);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});