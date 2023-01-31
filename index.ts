import 'express-async-errors'
import './utils/db'
import express, {static as expressStatic, urlencoded} from "express";
import methodOverride from "method-override";
import {engine} from "express-handlebars";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import {handleError} from "./utils/errors";
import {homeRouter} from "./routers/home";
import {warriorRouter} from "./routers/warrior";
import {arenaRouter} from "./routers/arena";
import {hallOfFameRouter} from "./routers/hall-of-fame";

const app = express()

app.use(methodOverride('_method'))
app.use(urlencoded({
    extended: true,

}));
app.use(expressStatic('public'))
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers
}))
app.set('view engine', '.hbs')

app.use('/', homeRouter);
app.use('/warrior', warriorRouter)
app.use('/arena', arenaRouter)
app.use('/hall-of-fame', hallOfFameRouter)
app.use(handleError)


app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000')
})