'use strict';
let path = require('path')
let fs = require('fs')


module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'simple-package'() {
            Editor.log('Hello World!');
        },
        open() {
            Editor.log('open panel!');
            Editor.Panel.open('simple-package');
        },
        'compress_res'() {
            let resUrl = path.join(Editor.projectPath, 'assets/res');
            this.walkDir(resUrl);
            Editor.log('----------assets/res compress cpmplete!-----------');
            let resourceUrl = path.join(Editor.projectPath, 'assets/resources');
            this.walkDir(resUrl);
            Editor.log('----------assets/resources compress cpmplete!-----------');
        },
    },

    walkDir: function (filePath) {
        fs.readdir(filePath, function (err, files) {
            if (err) {
                console.warn(err)
            } else {
                //遍历读取到的文件列表
                files.forEach(function (filename) {
                    //获取当前文件的绝对路径
                    var filedir = path.join(filePath, filename);
                    //根据文件路径获取文件信息，返回一个fs.Stats对象
                    fs.stat(filedir, function (eror, stats) {
                        if (eror) {
                            console.warn('获取文件stats失败');
                        } else {
                            var isFile = stats.isFile(); //是文件
                            var isDir = stats.isDirectory(); //是文件夹
                            if (isFile) {
                                const tinify = require("tinify");
                                tinify.key = "LHJ97aF1mFgkrFSxYLJt4tdDwhJ7rPky";
                                if (filedir.substring(filedir.length - 3) == 'png' || filedir.substring(filedir.length - 3) == 'jpg') {
                                    tinify.fromFile(filedir).toFile(filedir);
                                    Editor.log(filedir + " compress success!");
                                }
                            }
                            if (isDir) {
                                walkDir(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            }
                        }
                    })
                });
            }
        });
    }
};