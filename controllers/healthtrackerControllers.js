//const { response } = require("express");
const userDao = require("../models/userModel.js");
const healthtrackerDAO = require("../models/healthtrackerModel");
const db = new healthtrackerDAO("training.db");

db.init();

exports.profile_page = function (req, res) {
  res.render("profile", {
    title: "Health Tracker",
  });
};

exports.home_page = function (req, res) {
  res.render("home", {
    videos: [
      {
        package: "Beginner package",
        title: "Build tribute page,",
        src: "https://www.youtube.com/embed/gC_L9qAHVJ8",
      },
      {
        package: "Beginner package",
        title: "Build tribute page,",
        src: "https://www.youtube.com/embed/gC_L9qAHVJ8",
      },
      {
        package: "Beginner package",
        title: "Build tribute page,",
        src: "https://www.youtube.com/embed/gC_L9qAHVJ8",
      },
      {
      }
    ],
  });
};

exports.contact_page = function (req, res) {
  res.render("contact", {
    title: "Health tracker",
  });
};

exports.entries_list = function (req, res) {
  db.getAllEntries("Static entry")
    .then((entries) => {
      res.render("entries", {
        title: "Health tracking",
        entries,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error");
    });
};

exports.show_user_entries = function (req, res) {
  console.log("filtering content by username", req.params.author);

  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Health tracker",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("error handling the user post", err);
    });
};

exports.exercise_page = function (req, res) {
  res.render("exercise", {
    videos: [
      {
        Level: "First Level",
        package: "Beginner package",
        title: "Build tribute page,",
        src: "https://www.youtube.com/embed/L_xrDAtykMI",
      },
      {
        Level: "First Level",
        package: "Beginner package",
        title: "Body work ",
        src: "https://www.youtube.com/embed/GLy2rYHwUqY",
      },
      {
        Level: "First Level",
        package: "Beginner package",
        title: "Body workout ",
        src: "https://www.youtube.com/embed/GS_z6FG_jqE",
      },
      {
        title: "Body workout ",
        src: "https://www.youtube.com/embed/L_xrDAtykMI",
      },
      {
        title: "Body workout ",
        src: "https://www.youtube.com/embed/gsydT0nWY6I",
      },
      {
        title: "Body workout ",
        src: "https://www.youtube.com/embed/NLF4DkaI4Qg",
      },
      {
        Level: "Second Level",
        package: "Intermediate Package",
        title: "Body Yoga- Deep Stretch ",
        src: "https://www.youtube.com/embed/GLy2rYHwUqY",
      },
      {
        Level: "Second Level",
        package: "Intermediate Package",
        title: "Body Yoga- Deep Stretch ",
        src: "https://www.youtube.com/embed/F-nQ_KJgfCY",
      },
      {
        Level: "Second Level",
        package: "Intermediate Package",
        title: "Exercise for Strong lower back ",
        src: "https://www.youtube.com/embed/cVnIAfmEox0",
      },
      {
        title: "Body workout ",
        src: "https://www.youtube.com/embed/NLF4DkaI4Qg",
      },
      {
        title: "Body Yoga- Deep Stretch ",
        src: "https://www.youtube.com/embed/GLy2rYHwUqY",
      },
      {
        title: "Body Yoga- Deep Stretch ",
        src: "https://www.youtube.com/embed/F-nQ_KJgfCY",
      },
      {
        Level: "Third Level",
        package: "Advance Package",
        title: "Exercise for Strong lower back ",
        src: "https://www.youtube.com/embed/cVnIAfmEox0",
      },
      {
        Level: "Third Level",
        package: "Advance Package",
        title: "Body Yoga- Deep Stretch ",
        src: "https://www.youtube.com/embed/F-nQ_KJgfCY",
      },
      {
        Level: "Third Level",
        package: "Advance Package",
        title: "Exercise for Strong lower back ",
        src: "https://www.youtube.com/embed/cVnIAfmEox0",
      },
    ],
  });
};

exports.post_goal_entry = function (req, res) {
  console.log("processing post new_entry controller function...");
  db.addEntry(
    req.body.author,
    req.body.goal,
    req.body.contents,
    req.body.date,
    req.body.calories,
    req.body.durations,
    req.body.completed
  );
  res.redirect("/entries");
};

exports.show_goal_entries = function (req, res) {
  res.render("goalEntry", {
    title: "Health Tracker",
  });
};

exports.delete_entry = function (req, res) {
  console.log("id in delete_entry", req.params.id);
  db.deleteEntry(req.params.id);
  res.redirect("/entries");
  //  res.send('<h1>Delete entry called.</h1>');
};

//-----------------------------login------------------------------------------

exports.show_register_page = function (req, res) {
  res.render("register", {
    title: "Health Tracker",
  });
};
exports.show_login_page = function (req, res) {
  res.render("login", {
    title: "Health Tracker",
  });
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;
  console.log("register", user, "password", password);
  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.status(401).send(`User exists: ${user}`);
      return;
    }
    userDao.create(user, password);
    res.redirect("login");
  });
};

exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Health Tracker",
        user: req.user,
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.hamid_entries = function (req, res) {
  res.send("<h1>Processing Peter's Entries, see terminal</h1>");
  db.getHamidEntries();
};

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.subject || !req.body.contents) {
    res.status(400).send("Entries must have a title and content.");
    return;
  }
  db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/");
};

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Health Tracker",
    user: req.user,
  });
};

exports.authorize = function (redirect) {
  return passport.authenticate("/local", { failureRedirect: redirect });
};

exports.post_login = function (req, res) {
  try {
    console.log("Login ====>>>>>>>>");
    res.redirect("/");
  } catch (error) {
    console.log("Login error ====>>>>>>>>", error);
  }
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect("login");
};

// exports.show_new_entries = function (req, res) {
//   res.render("newEntry", {
//     title: "Health Tracker",
//     user: req.user.user,
//   });
// };

exports.authorize = function (redirect) {
  return passport.authenticate("/local", { failureRedirect: redirect });
};

//  passport.deserializeUser(function(id, cb) {
//   dao.lookup(id, function (err, user) {
//       if (err) { return cb(err); }
//       cb(null, user);
//   });
// });

//----------------------------End of login-------------------------------------------

exports.show_update = function (req, res) {
  res.render("updateEntry", {
    title: "Health Tracker",
  });
};

exports.show_delete = function (req, res) {
  res.render("deleteEntry", {
    title: "Health Tracker",
  });
};

exports.run_update = function (req, res) {
  db.updateEntry(
    req.body.author,
    req.body.goal,
    req.body.contents,
    req.body.date,
    req.body.calories,
    req.body.durations,
    req.body.completed
  );
  res.redirect("/entries");
};

// exports.show_user_entries = function (req, res) {
//   // console.log("filtering username", req.params.author);

//   let user = req.params.author;
//   db.getEntriesByUser(user)
//     .then((entries) => {
//       res.render("entries", {
//         title: "Health Tracker",
//         entries: entries,
//         id: "45667",
//       });
//     })
//     .catch((err) => {
//       console.log("error handling the username post", err);
//     });
// };

exports.completed_goals = function (req, res) {
  db.getCompletedGoals()
    .then((comGoals) => {
      res.render("completed", {
        title: "completed Goals",
        completed: comGoals,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.uncompleted_goals = function (req, res) {
  db.getUncompletedGoals()
    .then((UncomGoals) => {
      res.render("uncompleted", {
        title: "Uncompleted Goals",
        uncompleted: UncomGoals,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.server_error = function (err, req, res, next) {
  res.status(500);
  res.type("text/plan");
  res.send("Internal server error (500)");
};
