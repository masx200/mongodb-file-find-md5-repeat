# mongodb-file-find-md5-repeat

这个代码库是`百度网盘批量清理重复文件计划`的一部分。

从本地 `mongodb` 数据库中查找保存的文件信息中有 校验码 重复的文件

本地 `mongodb` 数据库中需要有一张表,有`md5`和`path`字段

`md5` : 文件的校验码

`path`:文件的路径

查找完成后输出文件信息

百度网盘批量清理重复文件计划

https://github.com/masx200/baidu-pan-delete-repeated-files

https://github.com/masx200/fetch-baidu-pan-files

https://github.com/masx200/fetch-file-list-to-mongodb

https://github.com/masx200/mongodb-file-find-md5-repeat

# 使用方法

# 安装

```shell
yarn add @masx200/mongodb-file-find-md5-repeat
```

## 安装 `node_modules`

```shell
yarn install
```

## 编译脚本

```shell
yarn build
```

## 运行脚本

```shell
yarn test
```

# 输出重复文件列表举例

```ts
type repeatfiles = [hash, path[]][];

type hash = string;
type path = string;
```

```json
[
    [
        "0002c8865pfdfa8e4cc4ddac9efa8fcb",
        [
            "/!我的图片-20190604/微博美图暴力切割-2020-01-05 225127/微博美图cosplay-暴力切割图片-2020-01-05 225127-8(1).rar_20200108075529/8/d056376101218de1175142244de798cb.webp",
            "/!我的图片-2020-02-10/手机相册微博图片图片合集-20200210/微博美图cosplay-暴力切割图片-2020-01-05/微博美图cosplay-暴力切割图片-2020-01-05 225127-8/8/d056376101218de1175142244de798cb.webp"
        ]
    ],
    [
        "000f76c4aj6c23bc48f02f6af0dbc9cc",
        [
            "/!我的图片-20190604/微博美图暴力切割-2020-01-05 225127/微博美图cosplay-暴力切割图片-2020-01-05 225127-2(1).rar_20200108075402/2/2ac7ee53012c33a37970042349d36a0d.webp",
            "/!我的图片-2020-02-10/手机相册微博图片图片合集-20200210/微博美图cosplay-暴力切割图片-2020-01-05/微博美图cosplay-暴力切割图片-2020-01-05 225127-2/2/2ac7ee53012c33a37970042349d36a0d.webp"
        ]
    ]
]
```
