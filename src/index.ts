import express from "express";
import cors from "cors";
import * as fs from "fs";
import random from "random";
import xml from "xml";

const app = express();
const port = process.env.PORT || 9000;

const textFile: Buffer = fs.readFileSync("./text.json");
const textList: string[] = JSON.parse(textFile.toString("utf8"));

app.use(cors());

app.get("/api/text", (req, res) => {
    const total = textList.length;
    const text = textList[random.int(0, total - 1)];

    console.log(
        "[Api]",
        req.method.toUpperCase(),
        "|",
        200,
        "|",
        req.originalUrl,
        "|",
        text
    );

    res.charset = "utf-8";
    res.setHeader("X-Author", "ZHKSB Group.");

    const name: string = req.query.key ? String(req.query.key) : "text";

    switch (req.query.type) {
        case undefined:
        case "string":
        case "text":
        case "str":
        default:
            res.contentType("text/plain");
            res.send(text);
            break;
        case "json":
            res.contentType("application/json");
            res.send({
                [name]: text,
            });
            break;
        case "jsonp":
            res.contentType("application/json");
            res.send(
                "jsonp(" +
                    JSON.stringify({
                        [name]: text,
                    }) +
                    ")"
            );
            break;
        case "html":
            res.contentType("text/html");
            res.send(
                `<html lang="zh-cn"><head><meta charset="utf-8"/><title>ZHKSB API</title></head><body><p>${text}</p></body>`
            );
            break;
        case "xml":
            res.contentType("application/xml");
            res.send(
                xml({
                    [name]: text,
                })
            );
            break;
    }
    res.end();
});

app.listen(port, () => {
    console.log("[Express]", "Start app at port " + port);
});
