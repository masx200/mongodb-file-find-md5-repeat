#!/usr/bin/env node
import process from "process";
import start from "./index.js";
import { parseargs } from "./parse-args.js";
const argsobj = parseargs(process.argv.slice(2));
const { db, collect } = argsobj;

if (db && collect) {
    console.log({ db, collect });
    start(db, collect);
} else {
    console.error(
        "从本地 `mongodb` 数据库中查找保存的文件信息中有 `md5` 重复的文件"
    );
    console.error("示例:");
    console.error(`node ./lib/cli.js --db=pan_masx20 --collect=panfile`);

    console.error("输入的参数有误!");
    process.exit(1);
}
