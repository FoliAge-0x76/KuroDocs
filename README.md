# KuroDocs

你好，这里是暗黑文档 KuroDocs。

## KuroDocs 是什么

KuroDocs（暗黑文档）是由我个人搭建和维护的公开在线文档，包含的内容为我本人在涉猎的各个领域（主要是ACGN方向）整理的内容，供需要的观众进行查阅和参考。

KuroDocs 基于 [MkDocs](https://github.com/mkdocs/mkdocs) 部署。

## 信息框

页面支持类似维基百科的右侧浮动信息框。模板定义在 `docs/templates/infobox.html` 中，每个信息框最多预设 6 组键值对；页面只需要调用宏并传入命名参数：

```jinja
{{ infobox(
	title="标题",
	image="images/example.png",
	image_caption="图片说明",
	image_alt="图片替代文本",
	image_scale=80,
	image_2="images/example-2.png",
	image_caption_2="第二张图片说明",
	image_alt_2="第二张图片替代文本",
	image_scale_2=70,
	field_1_name="键名",
	field_1_value="键值",
	field_2_name="另一个键名",
	field_2_value="另一个键值"
) }}
```

字段参数固定为 `field_1_name` 到 `field_6_name` 及对应的 `field_1_value` 到 `field_6_value`。图片参数支持 `image` 和 `image_2` 两张图片，它们会并排显示；对应的说明、替代文本和缩放参数分别为 `image_caption`、`image_alt`、`image_scale` 以及 `image_caption_2`、`image_alt_2`、`image_scale_2`。缩放参数使用百分比数字，范围为 `1` 到 `100`，例如 `image_scale=80` 表示图片显示为图片栏宽度的 80%；不传时默认为 `100`。不传某一组参数就不会生成该行；不传图片就不会生成图片区域。值可以传普通文本，也可以传 HTML 链接。

如果需要修改所有信息框的 HTML 结构，只需编辑 `docs/templates/infobox.html`，页面调用方式不变。启用模板需要先安装依赖：`pip install -r requirements.txt`。桌面端信息框浮动在右侧，窄屏幕上会自动恢复为正文宽度；样式由 `docs/css/infobox.css` 统一控制。