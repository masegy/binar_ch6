const express = require("express");
const app = express();
const port = 3000;
const { user_game } = require("./models");

app.set("view engine", "ejs");
app.get("/register", function (req, res) {
  res.render("pages/register");
});
app.get("/", function (req, res) {
    res.render("pages/login");
  });
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
//get data
app.get("/user_game/:id", (req, res) => {
  user_game
    .findOne({
      where: { id: req.params.id },
    })
    .then((user_game) => {
      res.status(200).json(user_game);
    });
});
// GET all articles
app.get("/user_game", (req, res) => {
  user_game.findAll().then((user_game) => {
    res.status(200).json(user_game);
  });
});

// POST an user_game
app.post("/user_game", (req, res) => {
  user_game
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      approved: false,
    })
    .then((user_game) => {
      res.send("user_game berhasil dibuat");
    })
    .catch((err) => {
      res.status(422).json("Can't create user_game");
    });
});

app.post('/user_game/login', (req, res) => {
    // Insert Login Code Here
    let email = req.body.email;
    let password = req.body.password;
    res.send(`Username: ${email} Password: ${password}`);
  });

//update user game
app.put("/user_game/:id", (req, res) => {
  user_game
    .update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        approved: req.body.approved,
      },
      {
        where: { id: req.params.id },
      }
    )
    .then((user_game) => {
      res.status(201).json(user_game);
    })
    .catch((err) => {
      res.status(422).json("Can't create user_game");
    });
});

app.delete("/user_game/:id", (req, res) => {
  user_game
    .destroy({
      where: { id: req.params.id },
    })
    .then((user_game) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(422).json("Can't deleted user_game");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
