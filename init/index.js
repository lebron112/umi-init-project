
const { exec } = require('child_process');
const path = require('path');
const readline = require('readline');
const fs = require('fs');
const dependencies = require('./dependencies');
const styles = require('./styles');

const staticPath = path.join(process.cwd());
const readlineJob = (txt, fn) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: txt,
  })
  rl.prompt();
  rl.on('line', (line) => {
    const res = line.trim();
    fn(res, rl);
  }).on('close', () => {
    process.exit(0);
  });
};

const build = (bash, msg) => new Promise(res => {
  const job = exec(bash, { cwd: staticPath });
  logInfo('yellow', bash);
  job.stdout.on('data', (data) => {
    console.info(`stdout: ${data}`);
  });

  job.on('close', (code) => {
    msg && logInfo('blue', msg);
    res();
  });
});

const logInfo = (color, ...arg) => {
  console.info(`${styles[color][0]}%s${styles[color][1]}`, ...arg);
};

const init = async () => {
  // await buildTar();
  const dependenciesList = dependencies.join(' ');
  const gitignoreFile = path.join(process.cwd(), './.gitignore');
  fs.appendFileSync(gitignoreFile, '\n/init/*');

  logInfo('cyan', '开始下载umi 依赖');
  await build('npm i', '✔️   umi 依赖下载完毕');
  logInfo('cyan', '开始下载自定义 依赖');
  await build('npm i -S ' + dependenciesList, '✔️   前端项目依赖下载完毕~');
  await build('rm -rf ./.git/', '');
  await build('git init', '');
  await build('git add .', '');
  await build('git commit  -m "first commit" ', '');
  readlineJob('add git repository address (or exit ctrl + c)>', async (str, rl) => {
    if (str) {
      await build(`git remote add origin ${str}`, '');
      logInfo('green', '构建完毕， 运行 npm run start 启动项目');
      process.exit();
    }
  });
};

const buildTar = async () => {
  await build('tar -zcvf app.tar.gz ' +
    '--exclude=node_modules ' +
    '--exclude=package-lock.json ' +
    '--exclude=.vscode ' +
    '--exclude=.git ' +
    '--exclude=.idea' +
    ' .', '打包完毕');
};
init();