module.exports = function (app, exec, fs) {
  const git = require("../controllers/git.controller.js")(exec, fs);

  app.post('/webhook', git.gitPull);

}
