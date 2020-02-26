import prettier from "prettier";
const logfile = `./output/data-${new Date().getTime()}.json`;
import { promises as fspromises } from "fs";
import mongodb from "mongodb";
import process from "process";
const dbname = "pan_masx20";
const collectionname = "panfile";
process.on("unhandledRejection", err => {
    throw err;
});
const { MongoClient } = mongodb;
const filter = {};
const sort = {
    md5: 1
};
const alldatamap = new Map<string, Set<string>>();
MongoClient.connect(
    "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function(connectErr, client) {
        if (connectErr) {
            throw connectErr;
        }
        const coll = client.db(dbname).collection(collectionname);
        let readableCursor = coll.find(filter, { sort: sort });
        handlecursor(readableCursor);
    }
);
async function handlecursor(readableCursor: mongodb.Cursor<any>) {
    await fspromises.writeFile(logfile, `[`);
    for await (let doc of readableCursor) {
        const { path, md5 } = doc;

        console.log(md5, path);
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
    process.exit();
}
