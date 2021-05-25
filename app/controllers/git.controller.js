module.exports = function (exec, fs) {
  var that = {};

  that.gitPull = (req, res) => {
    let arr = [];
    let path = null;
    let flag = false;
    if (req.body.push.changes[0].new.name == "master") {
      path = "/home/auto_deploy/master";
      flag = true;
    }
    if (req.body.push.changes[0].new.name == "dev") {
      path = "/home/auto_deploy/dev";
      flag = true;
    }

    arr = [
      `cd ${path}`,
      'if [ -d "' + req.body.repository.name + '" ]',
      "then",
      "#Exist directory",
      "cd " + req.body.repository.name.toLowerCase() + "",
      `git checkout ${req.body.push.changes[0].new.name}`,
      "git pull",
      "else",
      "#NotExist directory",
      `git clone https://${process.env.USER_REPO}:${process.env.PASS_REPO}@bitbucket.org/${req.body.repository.full_name}.git`,
      "cd " + req.body.repository.name.toLowerCase() + "",
      `git checkout ${req.body.push.changes[0].new.name}`,
      "fi",
    ];

    var file = fs.createWriteStream("develop.sh");
    file.on("error", function (err) {});
    arr.forEach(function (v) {
      file.write(v + "\n");
    });
    file.end();
    if (flag === true) {
      exec("sh /home/node_app/auto_deploy_2021/develop.sh");
    }
  };

  return that;
};
