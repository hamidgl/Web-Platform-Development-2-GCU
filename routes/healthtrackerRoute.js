const express = require("express");
const router = express.Router();
const controller = require("../controllers/healthtrackerControllers");
const auth = require("../auth/auth");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.get("/", ensureLoggedIn("/login"),controller.home_page);

router.get("/entries",ensureLoggedIn("/login"), controller.entries_list);

router.get("/goal",ensureLoggedIn("/login"), controller.show_goal_entries);

router.post("/goal", ensureLoggedIn("/login"),controller.post_goal_entry);

router.get("/delete/:id", ensureLoggedIn("/login"),controller.delete_entry);

router.post("/update",ensureLoggedIn("/login"), controller.run_update);

router.get("/updatePage", ensureLoggedIn("/login"),controller.show_update);

router.get("/posts/:author",ensureLoggedIn("/login"), controller.show_user_entries);

//router.get("filter/:author", controller.filter_user_entries)

router.get("/exercise", ensureLoggedIn("/login"),controller.exercise_page);

router.get("/profile", ensureLoggedIn("/login"),controller.profile_page);

router.get("/completed", ensureLoggedIn("/login"),controller.completed_goals);

router.get("/uncompleted", ensureLoggedIn("/login"),controller.uncompleted_goals);

router.get("/contact", ensureLoggedIn("/login"),controller.contact_page);

//---------------------Loin--------------------------//
router.get("/login", controller.show_login_page);

router.get("/posts:author", controller.show_user_entries);

router.get("/register", controller.show_register_page);

router.post("/register", controller.post_new_user);

router.post("/login", auth.authorize("/login"), controller.post_login);

router.get("/logout", controller.logout);

router.get("/new", ensureLoggedIn("/login"), controller.show_new_entries);

router.post("/new", ensureLoggedIn("/login"), controller.post_new_entry);

//error handling
router.use(function (req, res) {
  res.status(404);
  res.redirect("/404.html");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plan");
  res.send("Internal server error (500)");
});

module.exports = router;
