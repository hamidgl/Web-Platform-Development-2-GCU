// const userDao = require("./userModel.js");
const nedb = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//dao.init();

class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to training.db" + dbFilePath);
    } else {
      this.db = new nedb();
      console.log("db connected in training.db");
    }
  }

  // for the demo the password is the bcrypt of the user name
  // init() {
  // this.db.insert({
  //   user: "Hamid",
  //   password: "$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C",
  // });
  //console.log('user record inserted in init');

  // this.db.insert({
  //   user: "Hawa",
  //   password: "$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S",
  // });
  //console.log('user record inserted in init');
  //   return this;
  // }
  create(username, password) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        user: username,
        password: hash,
      };
      //console.log('user entry is: ', entry);

      that.db.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user: ", username);
        }
      });
    });
  }
  lookup(user, cb) {
    this.db.find({ user: user }, function (err, entries) {
      if (err) {
        return cb(null, null);
      } else {
        if (entries.length == 0) {
          return cb(null, null);
        }
        return cb(null, entries[0]);
      }
    });
  }
}
const dao = new UserDAO("users.db");
module.exports = dao;
