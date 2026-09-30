# 舞萌 DX 自制谱教程

这个自制谱是由我个人整理的简洁版，省略了很多信息。这里我也推荐各位参考 [MMFC 自制谱文档](https://mmfc.top/collection/maimai-charting)，提供了更详细和全面的内容。

## 工具

目前比较流行的制谱工具有：

- [Majdata View&Edit](https://github.com/LingFeng-bbben/MajdataView)，此工具自 2025 年 2 月停止更新，支持 PRiSM 版本前的所有语法。
- [Majdata View&Edit X](https://github.com/re-poem/MajdataViewX)，次世代制谱器，支持经过扩展的 [MajSimai](https://docs.majdata.net/majsimai/) 语法。
- [Majdata View&Edit Alpha](https://github.com/Jian04/MajdataViewAlpha)，加入了大量实验性功能的 Majdata V&E 改版。
- Visual Maimai，提供高度可视化的制谱器。

笔者没有用过 VM（而且 VM 大概也比较好懂），因此以下内容以 Majdata Edit 为基准。

## 创建谱面

一张谱面至少需要包含音乐、封面和谱面文件。以 Majdata 为例，也就是需要三个文件：`track.mp3`、`bg.jpg/bg.png`，以及 `maidata.txt` 。如果你想加上视频背景，也可以加入 `pv.mp4` 。

启动 MajEdit ，选择 `文件 - 新建` ，选中你准备好的 `track.mp3` 进行谱面初始化。

选择 `编辑 - 谱面信息` ，完善谱面信息内容。点 OK 保存。

在 MajEdit 左侧可以选择当前谱面的难度。默认是 EASY，在写谱之前请确认谱面的难度。

新谱面需要先确定 BPM 和偏移。BPM 的写法是在右侧谱面文件编辑器中以圆括号+数字的形式给出，例如 `(220)`。如果不知道曲子的具体 BPM，你可以先定一个大致的数，然后写一长串 4 分音，根据听感进行微调直到四分音能够完全对上拍子即可（也就是节拍器的原理）。

## 编辑谱面

- [本站关于 Simai 的介绍](maimai_simai.md)
- [MMFC 文档关于 Simai 的介绍](https://mmfc.top/collection/maimai-charting/simai-language)

## 分享谱面

你可以将谱面上传到 [Majdata Net](https://majdata.net/)，然后分享对应谱面的链接。你也可以在这里寻找其他人制作的谱面。

## 游玩谱面

你可以将谱面导入 [Majdata Play](https://docs.majdata.net/majdataplay/install) 或 [AstroDX](https://github.com/2394425147/astrodx) 进行游玩。具体的导入方法请看对应工具的文档。

## 学习资料

- [BV1Tq4y1f73d 星星判定与跳区原理](https://www.bilibili.com/video/BV1Tq4y1f73d)
- [BV1HT42167Qb 无理的基本介绍](https://www.bilibili.com/video/BV1HT42167Qb)