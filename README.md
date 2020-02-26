# pan-file-find-md5-repeat

从本地 `mongodb` 数据库中查找保存的文件信息中有 `md5` 重复的文件

本地 `mongodb` 数据库中需要有一张表,有`md5`和`path`字段

`md5` : 文件的校验码

`path`:文件的路径

查找完成后输出文件信息到`output`目录下
