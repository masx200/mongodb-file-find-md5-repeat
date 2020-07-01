import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { promises as fspromises } from "fs";
import mongodb from "mongodb";
import prettier from "prettier";
import process from "process";
const logfile = path.resolve(__dirname, "../", `./output/data-${new Date().getTime()}.json`);
process.on("unhandledRejection", err => {
    throw err;
});
export default async function start(dbname, collectionname) {
    return new Promise(r => {
        MongoClient.connect("mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false", { useNewUrlParser: true, useUnifiedTopology: true }, async function (connectErr, client) {
            if (connectErr) {
                throw connectErr;
            }
            const coll = client.db(dbname).collection(collectionname);
            let readableCursor = coll.find(filter, { sort: sort });
            await handlecursor(readableCursor);
            await client.close();
            r(logfile);
        });
    });
}
const { MongoClient } = mongodb;
const filter = {};
const sort = {
    md5: 1
};
const alldatamap = new Map();
import fsextra from "fs-extra";
async function handlecursor(readableCursor) {
    await fsextra.ensureDir(path.dirname(logfile));
    await fspromises.writeFile(logfile, `[`);
    for await (let doc of readableCursor) {
        const { path, md5 } = doc;
        // console.log(md5, path);
        if (!md5 || !path) {
            throw new TypeError("数据库中没有找到需要的数据 md5 , path");
        }
        let md5sset = alldatamap.get(md5);
        if (!md5sset) {
            md5sset = new Set();
            alldatamap.set(md5, md5sset);
        }
        md5sset.add(path);
    }
    const mapiterator = alldatamap.entries();
    for await (let keyvalue of mapiterator) {
        const [md5key, pathsvalueset] = keyvalue;
        const paths = Array.from(pathsvalueset);
        if (paths.length > 1) {
            const data = JSON.stringify([md5key, paths], null, 4) + ",\n";
            console.log(data);
            await fspromises.appendFile(logfile, data);
        }
    }
    await fspromises.appendFile(logfile, `]`);
    const jsonstring = (await fspromises.readFile(logfile)).toString();
    const formattedstring = prettier.format(jsonstring, {
        parser: "json",
        tabWidth: 4
    });
    await fspromises.writeFile(logfile, formattedstring);
}
