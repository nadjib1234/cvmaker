const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");
const studentRouter = require('./routers/student.router'); // Adjusted path to the routerapp.use(cors());
const teacherRouter = require('./routers/teacher.router');
const programRouter = require('./routers/programe.router');
const regisrationRouter = require('./routers/registration.router');
const classRouter = require('./routers/class.router');
const categorieRouter = require('./routers/categorie.router');
const groupeRouter = require('./routers/groupe.router');
const GSRouter = require('./routers/studentgroupe.router');

const connexionRouter = require('./routers/connexion.router');
const userRouter = require('./routers/user.router');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: false, limit: "15mb" }));



app.use(function (req, res, next) {
    req.headers["content-type"] = "application/json";
    next();
});
app.get("/DADAMBackend/api", (req, res) => {
    res.send({ message: "Hello from server!" });
});


app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);
app.use('/program', programRouter);
app.use('/registration', regisrationRouter);
app.use('/class', classRouter);
app.use('/categorie', categorieRouter);
app.use('/groupe', groupeRouter);
app.use('/gs', GSRouter);
app.use('/connexion', connexionRouter);
app.use('/user', userRouter);

db.sequelize.sync().then(() => {
    const PORT = process.env.PORT || 8323;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});


