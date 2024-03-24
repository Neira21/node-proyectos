import { createApp } from "./app.js";
import { MovieModel } from "./models/mysql.js";

createApp({movieModel: MovieModel})