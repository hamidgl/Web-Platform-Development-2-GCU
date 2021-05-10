const nedb = require("nedb");

class healthtracker {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to training.db" + dbFilePath);
    } else {
      this.db = new nedb();
      console.log("db connected in training.db");
    }
  }

  init() {
    this.db.find({}, (err, data) => {
      if (data && data.length) {
        data.forEach((post) => {
          //console.log("post ===", post);
          this.db.insert(post);
        });
      }
    });

    // console.log("document hamid inserted");

    // this.db.insert({
    //   goal: "hit 85 on dead left",
    //   contents: "managed to run 5k in half day",
    //   date: "2021-4/2",
    //   distance: "5",
    //   durations: "30 minute",
    //   published: new Date().toISOString().split("T")[0],
    //   username: "hamid",
    //   completed: "yes"
    // });
    console.log("document hamid inserted into the db");
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
      this.db.find({}, function (err, entries) {
        if (err) {
          reject(err);
          console.log("promise in getAllEntries rejected.");
        } else {
          resolve(entries);
          console.log("function all() return", entries);
        }
      });
    });
  }

  getHamidEntries() {
    return new Promise((resolve, reject) => {
      this.db.find({ author: "Hamid" }, function (err, entries) {
        if (err) {
          reject(err);
        } else {
          resolve(entries);
          console.log("function getHamidEntries() returns: ", entries);
        }
      });
    });
  }

  addEntry(author, goal, contents, date, calories, durations, completed) {
    var entry = {
      author: author,
      goal: goal,
      contents: contents,
      calories: calories,
      date: date,
      completed: completed,
      durations: durations,
      published: new Date().toISOString().split("T")[0],
    };
    console.log("entry has been cerated and added to the db", entry);

    this.db.insert(entry, function (err, doc) {
      if (err) {
        //reject(err);
        console.log("error inserted doc into db", goal);
      } else {
        //resolve(entries)
        console.log("doc inserted int db", doc);
      }
    });
  }

  deleteEntry(id) {
    // this.db.deleteEntry(req.params.id)
    console.log("delete id ====", id);
    this.db.remove({ _id: id }, function (err, rem) {
      if (err) {
        console.log("error deleting entry", err);
      } else {
        console.log(rem, "entries deleted");
      }
    });
  }

  updateEntry(author, contents, goal, durations, date, calories, completed) {
    this.db.update(
      { author: author },
      {
        $set: {
          contents: contents,
          completed: completed,
          goal: goal,
          durations: durations,
          calories: calories,
          date: date,
        },
      },
      {},
      function (err, numUp) {
        if (err) {
          console.log("error updating doc from db", err);
        } else {
          console.log(numUp, "document(s) updated");
        }
      }
    );
  }

  getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({'author': authorName}, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            });
        })        
    }

  getCompletedGoals() {
    return new promise((resolve, reject) => {
      this.db.find({ finished: "yes" }, function (err, comGoals) {
        if (err) {
          reject(err);
        } else {
          resolve(comGoals);
          console.log("function getEntriesBtUser() returns:", comGoals);
        }
      });
    });
  }

  getUncompletedGoals() {
    return new promise((resolve, reject) => {
      this.db.find({ completed: "no" }, function (err, UncomGoals) {
        if (err) {
          reject(err);
        } else {
          resolve(UncomGoals);
          console.log("function getEntriesBtUser() returns:", UncomGoals);
        }
      });
    });
  }
}

module.exports = healthtracker;
