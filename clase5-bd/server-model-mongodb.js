import { createApp } from "./app.js";
import { MovieModel } from "./models/mongodb.js";

createApp({movieModel: MovieModel})