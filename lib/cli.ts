#!/usr/bin/env node
import process from "process";
import start from "./index.js";
import parseargs from "@masx200/mini-cli-args-parser";
const argsobj = parseargs(process.argv.slice(2));
const { db, collect, mongourl } = argsobj;

const mongodburl =
    mongourl ||
    "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

if (db && collect) {
    console.log({ db, collect });
    start(db, collect, mongodburl);
} else {
    console.error(
        "从本地 `mongodb` 数据库中查找保存的文件信息中有 `md5` 重复的文件"
    );
    console.error("示例:");
    console.error(`node ./lib/cli.js --db=baidupan --collect=panfile`);

    console.error("输入的参数有误!");
    process.exit(1);
}
