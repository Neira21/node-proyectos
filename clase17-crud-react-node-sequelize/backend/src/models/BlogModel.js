import db from '../db/database.js';
import { DataTypes, Sequelize } from 'sequelize';

const BlogModel = db.define('blogs', {
  title : {
    type: DataTypes.STRING
  },
  content : {
    type: DataTypes.TEXT
  } 
  }, {
    timestamps: true // Esta opción habilita automáticamente createdAt y updatedAt
  }
)

export default BlogModel