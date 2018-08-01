// 主程序
var vschess = {
	// 当前版本号
	version: "#VERSION#",

	// 版本时间戳
	timestamp: "#TIMESTAMP#",

	// 默认局面，使用 16x16 方式存储数据，虽然浪费空间，但是便于运算，效率较高
	// situation[0] 表示的是当前走棋方，1 为红方，2 为黑方
	// situation[1] 表示的是当前回合数
	// 其余部分 0 表示棋盘外面，1 表示该位置没有棋子
	// 棋子标识采用 16 进制方式计算，如 21 为十六进制的 15，1 表示红方，与 situation[0] 对应，5 表示帅（将）
	// 1:车 2:马 3:相（象） 4:仕（士） 5:帅（将） 6:炮 7:兵（卒）
	situation: [
		1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0,33,34,35,36,37,36,35,34,33, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1,38, 1, 1, 1, 1, 1,38, 1, 0, 0, 0, 0,
		0, 0, 0,39, 1,39, 1,39, 1,39, 1,39, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0,23, 1,23, 1,23, 1,23, 1,23, 0, 0, 0, 0,
		0, 0, 0, 1,22, 1, 1, 1, 1, 1,22, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0,17,18,19,20,21,20,19,18,17, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	],

	// 九宫格
	castle: [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	],

	// 九宫格索引
	castleR: [166, 167, 168, 182, 183, 184, 198, 199, 200], // 帅
	castleB: [ 54,  55,  56,  70,  71,  72,  86,  87,  88], // 将

	// 帅(将)的步长
	kingDelta: [-16, -1, 1, 16],

	// 仕(士)的步长
	advisorDelta: [-17, -15, 15, 17],

	// 马的步长，以帅(将)的步长作为马腿
	knightDelta: [[-33, -31], [-18, 14], [-14, 18], [31, 33]],

	// 被马将军的步长，以仕(士)的步长作为马腿
	knightCheckDelta: [[-33, -18], [-31, -14], [14, 31], [18, 33]],

	// 棋盘转换为局面，就是不同格式之间的映射，下同
	b2s: [
		 51,  52,  53,  54,  55,  56,  57,  58,  59,
		 67,  68,  69,  70,  71,  72,  73,  74,  75,
		 83,  84,  85,  86,  87,  88,  89,  90,  91,
		 99, 100, 101, 102, 103, 104, 105, 106, 107,
		115, 116, 117, 118, 119, 120, 121, 122, 123,
		131, 132, 133, 134, 135, 136, 137, 138, 139,
		147, 148, 149, 150, 151, 152, 153, 154, 155,
		163, 164, 165, 166, 167, 168, 169, 170, 171,
		179, 180, 181, 182, 183, 184, 185, 186, 187,
		195, 196, 197, 198, 199, 200, 201, 202, 203
	],

	// 局面转换为棋盘
	s2b: [
		0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0, 0,
		0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0, 0,
		0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0, 0,
		0, 0, 0,  0,  1,  2,  3,  4,  5,  6,  7,  8, 0, 0, 0, 0,
		0, 0, 0,  9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 0, 0, 0,
		0, 0, 0, 18, 19, 20, 21, 22, 23, 24, 25, 26, 0, 0, 0, 0,
		0, 0, 0, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0, 0, 0, 0,
		0, 0, 0, 36, 37, 38, 39, 40, 41, 42, 43, 44, 0, 0, 0, 0,
		0, 0, 0, 45, 46, 47, 48, 49, 50, 51, 52, 53, 0, 0, 0, 0,
		0, 0, 0, 54, 55, 56, 57, 58, 59, 60, 61, 62, 0, 0, 0, 0,
		0, 0, 0, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0, 0, 0, 0,
		0, 0, 0, 72, 73, 74, 75, 76, 77, 78, 79, 80, 0, 0, 0, 0,
		0, 0, 0, 81, 82, 83, 84, 85, 86, 87, 88, 89, 0, 0, 0, 0,
		0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0, 0,
		0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0, 0,
		0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0, 0, 0
	],

	// 棋盘转换为 ICCS
	b2i: [
		"a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9",
		"a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8",
		"a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7",
		"a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6",
		"a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5",
		"a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4",
		"a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3",
		"a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2",
		"a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1",
		"a0", "b0", "c0", "d0", "e0", "f0", "g0", "h0", "i0"
	],

	// ICCS 转换为棋盘
	i2b: {
		a9:  0, b9:  1, c9:  2, d9:  3, e9:  4, f9:  5, g9:  6, h9:  7, i9:  8,
		a8:  9, b8: 10, c8: 11, d8: 12, e8: 13, f8: 14, g8: 15, h8: 16, i8: 17,
		a7: 18, b7: 19, c7: 20, d7: 21, e7: 22, f7: 23, g7: 24, h7: 25, i7: 26,
		a6: 27, b6: 28, c6: 29, d6: 30, e6: 31, f6: 32, g6: 33, h6: 34, i6: 35,
		a5: 36, b5: 37, c5: 38, d5: 39, e5: 40, f5: 41, g5: 42, h5: 43, i5: 44,
		a4: 45, b4: 46, c4: 47, d4: 48, e4: 49, f4: 50, g4: 51, h4: 52, i4: 53,
		a3: 54, b3: 55, c3: 56, d3: 57, e3: 58, f3: 59, g3: 60, h3: 61, i3: 62,
		a2: 63, b2: 64, c2: 65, d2: 66, e2: 67, f2: 68, g2: 69, h2: 70, i2: 71,
		a1: 72, b1: 73, c1: 74, d1: 75, e1: 76, f1: 77, g1: 78, h1: 79, i1: 80,
		a0: 81, b0: 82, c0: 83, d0: 84, e0: 85, f0: 86, g0: 87, h0: 88, i0: 89
	},

	// 局面转换为 ICCS
	s2i: [
		0, 0, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0,
		0, 0, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0,
		0, 0, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0,
		0, 0, 0, "a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9", 0, 0, 0, 0,
		0, 0, 0, "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8", 0, 0, 0, 0,
		0, 0, 0, "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7", 0, 0, 0, 0,
		0, 0, 0, "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6", 0, 0, 0, 0,
		0, 0, 0, "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5", 0, 0, 0, 0,
		0, 0, 0, "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", 0, 0, 0, 0,
		0, 0, 0, "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", 0, 0, 0, 0,
		0, 0, 0, "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", 0, 0, 0, 0,
		0, 0, 0, "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", 0, 0, 0, 0,
		0, 0, 0, "a0", "b0", "c0", "d0", "e0", "f0", "g0", "h0", "i0", 0, 0, 0, 0,
		0, 0, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0,
		0, 0, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0,
		0, 0, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0
	],

	// ICCS 转换为局面
	i2s: {
		a9:  51, b9:  52, c9:  53, d9:  54, e9:  55, f9:  56, g9:  57, h9:  58, i9:  59,
		a8:  67, b8:  68, c8:  69, d8:  70, e8:  71, f8:  72, g8:  73, h8:  74, i8:  75,
		a7:  83, b7:  84, c7:  85, d7:  86, e7:  87, f7:  88, g7:  89, h7:  90, i7:  91,
		a6:  99, b6: 100, c6: 101, d6: 102, e6: 103, f6: 104, g6: 105, h6: 106, i6: 107,
		a5: 115, b5: 116, c5: 117, d5: 118, e5: 119, f5: 120, g5: 121, h5: 122, i5: 123,
		a4: 131, b4: 132, c4: 133, d4: 134, e4: 135, f4: 136, g4: 137, h4: 138, i4: 139,
		a3: 147, b3: 148, c3: 149, d3: 150, e3: 151, f3: 152, g3: 153, h3: 154, i3: 155,
		a2: 163, b2: 164, c2: 165, d2: 166, e2: 167, f2: 168, g2: 169, h2: 170, i2: 171,
		a1: 179, b1: 180, c1: 181, d1: 182, e1: 183, f1: 184, g1: 185, h1: 186, i1: 187,
		a0: 195, b0: 196, c0: 197, d0: 198, e0: 199, f0: 200, g0: 201, h0: 202, i0: 203
	},

	// 棋子标识转换为 Fen 字符
	n2f: "*****************RNBAKCP*********rnbakcp".split(""),

	// Fen 字符转换为棋子标识
	f2n: { R: 17, N: 18, H: 18, B: 19, E: 19, A: 20, K: 21, C: 22, P: 23, r: 33, n: 34, h: 34, b: 35, e: 35, a: 36, k: 37, c: 38, p: 39, "*": 1 },

	// 棋盘方向映射
	turn: [
		[
			 0,  1,  2,  3,  4,  5,  6,  7,  8,
			 9, 10, 11, 12, 13, 14, 15, 16, 17,
			18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29, 30, 31, 32, 33, 34, 35,
			36, 37, 38, 39, 40, 41, 42, 43, 44,
			45, 46, 47, 48, 49, 50, 51, 52, 53,
			54, 55, 56, 57, 58, 59, 60, 61, 62,
			63, 64, 65, 66, 67, 68, 69, 70, 71,
			72, 73, 74, 75, 76, 77, 78, 79, 80,
			81, 82, 83, 84, 85, 86, 87, 88, 89
		],
		[
			 8,  7,  6,  5,  4,  3,  2,  1,  0,
			17, 16, 15, 14, 13, 12, 11, 10,  9,
			26, 25, 24, 23, 22, 21, 20, 19, 18,
			35, 34, 33, 32, 31, 30, 29, 28, 27,
			44, 43, 42, 41, 40, 39, 38, 37, 36,
			53, 52, 51, 50, 49, 48, 47, 46, 45,
			62, 61, 60, 59, 58, 57, 56, 55, 54,
			71, 70, 69, 68, 67, 66, 65, 64, 63,
			80, 79, 78, 77, 76, 75, 74, 73, 72,
			89, 88, 87, 86, 85, 84, 83, 82, 81
		],
		[
			81, 82, 83, 84, 85, 86, 87, 88, 89,
			72, 73, 74, 75, 76, 77, 78, 79, 80,
			63, 64, 65, 66, 67, 68, 69, 70, 71,
			54, 55, 56, 57, 58, 59, 60, 61, 62,
			45, 46, 47, 48, 49, 50, 51, 52, 53,
			36, 37, 38, 39, 40, 41, 42, 43, 44,
			27, 28, 29, 30, 31, 32, 33, 34, 35,
			18, 19, 20, 21, 22, 23, 24, 25, 26,
			 9, 10, 11, 12, 13, 14, 15, 16, 17,
			 0,  1,  2,  3,  4,  5,  6,  7,  8
		],
		[
			89, 88, 87, 86, 85, 84, 83, 82, 81,
			80, 79, 78, 77, 76, 75, 74, 73, 72,
			71, 70, 69, 68, 67, 66, 65, 64, 63,
			62, 61, 60, 59, 58, 57, 56, 55, 54,
			53, 52, 51, 50, 49, 48, 47, 46, 45,
			44, 43, 42, 41, 40, 39, 38, 37, 36,
			35, 34, 33, 32, 31, 30, 29, 28, 27,
			26, 25, 24, 23, 22, 21, 20, 19, 18,
			17, 16, 15, 14, 13, 12, 11, 10,  9,
			 8,  7,  6,  5,  4,  3,  2,  1,  0
		]
	],

	// Placeholder 支持情况
	placeholder: "placeholder" in document.createElement("input"),

	// 已创建棋盘对象列表
	chessList: [],

	// 标签列表
	tabList: "comment info share export edit config".split(" "),

	// 钩子列表
	callbackList: "beforeClickAnimate afterClickAnimate loadFinish selectPiece unSelectPiece afterStartFen afterAnimate".split(" "),

	// 默认 Fen 串
	defaultFen: "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",

	// 空白 Fen 串
	blankFen: "9/9/9/9/9/9/9/9/9/9 w - - 0 1",

	// 全局样式是否已加载完成的标记
	globalLoaded: false,

	// 全局样式加载完成后的回调
	globalLoadedCallback: [],

	// 声音列表
	soundList: "click bomb eat move check lose illegal".split(" "),

	// 音效组件缓存
	soundObject: {},

	// 风格音效是否已加载的标记，保证每个风格的音效只加载一次
	soundInit: {},

	// 风格样式是否已加载的标记，保证每个风格的样式只加载一次
	styleInit: {},

	// 风格样式是否已加载完成的标记
	styleLoaded: {},

	// 风格样式加载完成后的回调
	styleLoadedCallback: {},

	// 布局样式是否已加载的标记，保证每个布局的样式只加载一次
	layoutInit: {},

	// 布局样式是否已加载完成的标记
	layoutLoaded: {},

	// 布局样式加载完成后的回调
	layoutLoadedCallback: {},

	// 伪线程延时，20 为宜
	threadTimeout: 20,

	// 大棋谱生成东萍和鹏飞格式节点数临界点
	bigBookCritical: 10000,

	// 页面 Device Pixel Ratio
	dpr: window.devicePixelRatio || 1,

	// 棋谱信息项目列表
	info: {
		name: {
			title		: "棋局标题",
			event		: "赛事名称",
			red			: "红方名称",
			redteam		: "红方团体",
			redname		: "红方姓名",
			redeng		: "红方英文名",
			redlevel	: "红方等级",
			redrating	: "红方等级分",
			redtime		: "红方用时",
			black		: "黑方名称",
			blackteam	: "黑方团体",
			blackname	: "黑方姓名",
			blackeng	: "黑方英文名",
			blacklevel	: "黑方等级",
			blackrating	: "黑方等级分",
			blacktime	: "黑方用时",
			ecco		: "开局编号",
			open		: "布局类型",
			variation	: "变例类型",
			result		: "对局结果",
			remark		: "评注人员",
			author		: "棋谱作者",
			group		: "赛事组别",
			date		: "比赛日期",
			place		: "比赛地点",
			round		: "比赛轮次",
			table		: "比赛台次",
			judge		: "执台裁判",
			record		: "棋谱记录员"
		},
		pfc: {
			date		: "create-time"
		},
		DhtmlXQ: {},
		DHJHtmlXQ: {
			title		: 10,
			event		: 11,
			date		: 13,
			place		: 14,
			round		: 15,
			table		: 16,
			red			: 17,
			redname		: 18,
			redlevel	: 19,
			redrating	: 20,
			black		: 21,
			blackname	: 22,
			blacklevel	: 23,
			blackrating	: 24,
			result		: 28,
			redtime		: 29,
			blacktime	: 30,
			open		: 36,
			variation	: 37,
			author		: 41,
			remark		: 40,
			record		: 42
		},
		pgn: {
			place		: "Site",
			open		: "Opening",
			ecco		: "ECCO"
		}
	},

	// 可自动识别的棋谱信息项目列表
	autoInfo: "ecco open variation result".split(" "),

	// 可导出棋谱格式列表
	exportFormatList: {
		PGN_Chinese : "中文 PGN 格式",
		PGN_WXF : "WXF PGN 格式",
		PGN_ICCS : "ICCS PGN 格式",
		PengFei: "鹏飞 PFC 格式",
		DhtmlXQ: "东萍 DhtmlXQ UBB 格式",
		DHJHtmlXQ: "广东象棋网 DHJHtmlXQ 格式",
		Text : "文本 TXT 格式",
		QQ : "ＱＱ CHE 格式",
		TextBoard: "文字棋盘"
	},

	// 必须为起始局面才可以导出的棋谱格式列表
	exportFormatListIfNeedStart: "QQ".split(" "),

	// ECCO 编号目录
	eccoDir: {
		A: "其他开局 上仕局 边马局 边炮局 巡河炮局 过河炮局 兵底炮局 金钩炮局 边兵局  飞相局 顺相局 列相局 飞相对进左马 飞相对进右马 飞相进三兵对进右马 飞相进七兵对进右马    飞相对左士角炮 飞相对右士角炮 飞相进左马对右士角炮 飞相左边马对右士角炮 飞相横车对右士角炮 飞相进三兵对右士角炮 飞相进七兵对右士角炮 飞相对左中炮 飞相转屏风马对左中炮 飞相对右中炮 飞相对左过宫炮 飞相进右马对左过宫炮 飞相进右马对左过宫炮#红直车对黑进７卒 飞相进右马对左过宫炮#红直车边炮对黑进７卒 飞相进右马对左过宫炮#互进七兵 飞相对右过宫炮 飞相对进７卒 飞相进左马对进７卒 飞相互进七兵局 飞相对进３卒 起马局 起马对进７卒 起马转边炮对进７卒 起马转仕角炮对进７卒 起马转中炮对进７卒 起马互进七兵局     仕角炮局 仕角炮对进左马 仕角炮对右中炮 仕角炮转反宫马对右中炮 仕角炮对进７卒      过宫炮局 过宫炮对进左马 过宫炮对横车 过宫炮对左中炮 过宫炮直车对左中炮 过宫炮直车对左中炮横车".split(" "),
		B: "中炮局 中炮对进右马 中炮对进右马先上士 中炮对鸳鸯炮 中炮对右三步虎 中炮对进左马 中炮对龟背炮 中炮对左炮封车   中炮对单提马 中炮对士角炮转单提马 中炮对单提马横车 中炮巡河炮对单提马横车 中炮进七兵对单提马横车      中炮对左三步虎 中炮边相对左三步虎骑河车 中炮右横车对左三步虎 中炮巡河炮对左三步虎 中炮过河炮对左三步虎 中炮两头蛇对左三步虎     中炮对反宫马后补左马 中炮对反宫马 中炮急进左马对反宫马 中炮过河车对反宫马 中炮右横车对反宫马 中炮巡河炮对反宫马 五八炮对反宫马    五六炮对反宫马 五六炮左正马对反宫马 五六炮左正马对反宫马#黑右直车 五六炮左正马对反宫马#黑右直车边炮 五六炮左正马对反宫马#黑右直车边炮进７卒 五六炮左边马对反宫马     五七炮对反宫马 五七炮对反宫马左直车 五七炮对反宫马左横车 五七炮对反宫马右直车 五七炮互进三兵对反宫马 五七炮互进三兵对反宫马#黑右炮过河 五七炮互进三兵对反宫马#红弃双兵对黑右炮过河".split(" "),
		C: "中炮对屏风马 中炮七路马对屏风马 中炮七路马对屏风马#红左马盘河 中炮七路马对屏风马#红进中兵 中炮七路马对屏风马#红进中兵对黑双炮过河 中炮左边马对屏风马 中炮左边马对屏风马#红左横车    中炮右横车对屏风马 中炮右横车对屏风马#红左马盘河 中炮右横车对屏风马#红巡河炮 中炮右横车对屏风马#红边炮 中炮右横车对屏风马#红进中兵 中炮巡河车对屏风马#红不进左马 中炮巡河车对屏风马#红进左马 中炮过河车对屏风马 中炮过河车七路马对屏风马 中炮过河车左边马对屏风马 中炮过河车七路马对屏风马两头蛇 中炮过河车七路马对屏风马两头蛇#红左横车 中炮过河车七路马对屏风马两头蛇#红左横车对黑高右炮 中炮过河车七路马对屏风马两头蛇#红左横车兑三兵对黑高右炮 中炮过河车七路马对屏风马两头蛇#红左横车兑七兵对黑高右炮 中炮过河车七路马对屏风马两头蛇#红左横车兑双兵对黑高右炮     中炮过河车互进七兵对屏风马 中炮过河车互进七兵对屏风马上士 中炮过河车互进七兵对屏风马飞象 中炮过河车互进七兵对屏风马右横车 中炮过河车互进七兵对屏风马右炮过河 中炮过河车互进七兵对屏风马左马盘河 中炮过河车互进七兵对屏风马左马盘河#红七路马 中炮过河车互进七兵对屏风马左马盘河#红七路马对黑飞右象 中炮过河车互进七兵对屏风马左马盘河#红七路马高左炮对黑飞右象 中炮过河车互进七兵对屏风马左马盘河#红边炮对黑飞右象 中炮过河车互进七兵对屏风马平炮兑车 中炮过河车互进七兵对屏风马平炮兑车#黑退边炮 中炮过河车互进七兵对屏风马平炮兑车#红七路马对黑退边炮 中炮过河车互进七兵对屏风马平炮兑车#红七路马对黑退边炮上右士 中炮过河车互进七兵对屏风马平炮兑车#红左马盘河对黑退边炮上右士 中炮过河车互进七兵对屏风马平炮兑车#红左边炮对黑退边炮上右士 中炮过河车互进七兵对屏风马平炮兑车#红左边炮对黑退边炮上右士右直车 中炮过河车互进七兵对屏风马平炮兑车#红左边马对黑退边炮 中炮过河车互进七兵对屏风马平炮兑车#红仕角炮对黑退边炮 中炮过河车互进七兵对屏风马平炮兑车#红进中兵对黑退边炮 五六炮对屏风马 五六炮左边马对屏风马 五六炮左边马对屏风马#黑进７卒右直车 五六炮左边马对屏风马#黑进７卒右直车右炮过河 五六炮过河车对屏风马 五六炮过河车对屏风马#黑进７卒右直车 五六炮过河车对屏风马#黑两头蛇    五七炮对屏风马 五七炮对屏风马进７卒 五七炮对屏风马进７卒#黑右直车 五七炮对屏风马进７卒#红左直车对黑右直车 五七炮对屏风马进７卒#红左直车对黑右直车左炮过河 五七炮对屏风马进７卒#红左直车对黑右直车右炮巡河 五七炮对屏风马进７卒#红左直车对黑右直车右炮过河 五七炮对屏风马进７卒#黑右炮巡河 五七炮互进七兵对屏风马  五七炮对屏风马进３卒 五七炮对屏风马进３卒右马外盘河 五七炮互进三兵对屏风马边卒右马外盘河 五七炮互进三兵对屏风马边卒右马外盘河#红左横车 五七炮互进三兵对屏风马边卒右马外盘河#红左横车对黑飞左象 五七炮互进三兵对屏风马边卒右马外盘河#红左横车右马盘河对黑飞左象 五七炮互进三兵对屏风马边卒右马外盘河#红左横车右车巡河对黑飞左象 五七炮互进三兵对屏风马边卒右马外盘河#红左横车对黑飞右象 五七炮互进三兵对屏风马边卒右马外盘河#红左横车对黑兑边卒  中炮巡河炮对屏风马 中炮巡河炮对屏风马#黑飞左象 中炮巡河炮对屏风马#黑飞左象右横车 中炮巡河炮对屏风马#黑飞左象左炮巡河 中炮巡河炮对屏风马#黑飞右象 中炮巡河炮对屏风马#红左马盘河对黑左马外盘河 中炮巡河炮缓开车对屏风马左马外盘河#红右横车    五八炮对屏风马 五八炮互进三兵对屏风马 五八炮互进三兵对屏风马#红左正马 五八炮互进三兵对屏风马#红左边马 五八炮互进三兵对屏风马#红左边马对黑上士 五八炮互进三兵对屏风马#红左边马对黑兑７卒 五八炮互进三兵对屏风马#红左边马对黑边卒 五八炮互进三兵对屏风马#红左边马平炮压马对黑边卒 五八炮互进三兵对屏风马#红平炮压马 五九炮对屏风马".split(" "),
		D: "顺炮缓开车对其他 顺炮缓开车对横车 顺炮缓开车对直车 顺炮横车对缓开车 顺炮横车对直车 顺炮横车对直车巡河     顺炮直车对缓开车 顺炮直车对缓开车#黑左横车 顺炮直车对缓开车#黑右横车 顺炮直车对缓开车#黑兑直车 顺炮直车对缓开车#黑过河炮 顺炮直车对缓开车#黑边炮     顺炮直车对横车 顺炮直车对横车#红先上仕 顺炮直车对横车#红左边马 顺炮直车对横车#红巡河车 顺炮直车对横车#红过河车 顺炮直车对横车#红仕角炮 顺炮直车对横车#红进三兵 顺炮直车对横车#红进七兵 顺炮直车对横车#红两头蛇 顺炮直车对横车#红两头蛇对黑双横车 中炮不进三兵对左炮封车转列炮 中炮进三兵对左炮封车转列炮 中炮进三兵对左炮封车转列炮#红右马盘河 中炮进三兵对左炮封车转列炮#红七路马 中炮进三兵对左炮封车转列炮#红左边马 中炮进三兵对左炮封车转列炮#红进炮打马 中炮进三兵对左炮封车转列炮#红两头蛇    中炮对左三步虎转列炮 中炮进中兵对左三步虎骑河车转列炮 中炮对左三步虎转列炮#红左直车 中炮对左三步虎转列炮#红两头蛇       中炮对列炮 中炮对后补列炮 中炮右直车对后补列炮 中炮过河车对后补列炮 中炮左直车对后补列炮 中炮双直车对后补列炮".split(" "),
		E: "仙人指路局 仙人指路对飞象 仙人指路进右马对飞象 仙人指路对中炮 仙人指路对仕角炮或过宫炮 仙人指路对金钩炮 仙人指路对进右马 仙人指路互进右马局 两头蛇对进右马 两头蛇对进右马转卒底炮 仙人指路对卒底炮 仙人指路飞相对卒底炮 仙人指路转右中炮对卒底炮 仙人指路转左中炮对卒底炮 仙人指路转左中炮对卒底炮飞右象 仙人指路转左中炮对卒底炮飞右象#红右边马 仙人指路转左中炮对卒底炮飞右象#互进边马 仙人指路转左中炮对卒底炮转顺炮   仙人指路转左中炮对卒底炮飞左象 仙人指路转左中炮对卒底炮飞左象#红先上仕 仙人指路转左中炮对卒底炮飞左象#红进左马 仙人指路转左中炮对卒底炮飞左象#红进左马对黑右横车 仙人指路转左中炮对卒底炮飞左象#红左直车对黑右横车 仙人指路转左中炮对卒底炮飞左象#红左直车右马盘河对黑右横车上士 仙人指路转左中炮对卒底炮飞左象#红左直车右马盘河对黑右横车过河 仙人指路转左中炮对卒底炮飞左象#红左直车右马盘河对黑右横车边卒   仙人指路转左中炮对卒底炮飞左象#黑进７卒 仙人指路转左中炮对卒底炮飞左象#黑连进７卒 仙人指路转左中炮对卒底炮飞左象#红左直车右边马对黑连进７卒拐角马 仙人指路转左中炮对卒底炮飞左象#红左直车右边马对黑连进7卒右横车 仙人指路转左中炮对卒底炮飞左象#红左直车右边马上仕对黑连进７卒右横车 仙人指路转左中炮对卒底炮飞左象#红巡河车右边马对黑连进７卒右横车 仙人指路转左中炮对卒底炮飞左象#红双直车右边马对黑连进７卒右横车 仙人指路转左中炮对卒底炮飞左象#红右边马 仙人指路转左中炮对卒底炮飞左象#红炮打中卒  对兵局 对兵进右马局 对兵互进右马局 对兵互进右马局#红飞相 对兵互进右马局#红横车 对兵互进右马局#红边炮 对兵转兵底炮 对兵转兵底炮对右中炮 对兵转兵底炮对左中炮".split(" ")
	},

	// 编辑局面开始按钮列表
	editStartList: ["editStartButton", "editNodeStartButton", "editBeginButton", "editBlankButton", "editOpenButton"],

	// 编辑局面组件列表
	editModuleList: ["editEndButton", "editCancelButton", "editTips", "editTextarea", "editTextareaPlaceholder", "editPieceArea", "editBoard", "recommendClass", "recommendList", "editEditStartText", "editEditStartRound", "editEditStartPlayer"],

	// 粘贴棋谱组件列表
	editNodeModuleList: ["editNodeEndButton", "editNodeCancelButton", "editNodeTextarea", "editNodeTextareaPlaceholder"],

	// 状态参数语义化
	code: {
		// 棋子单击事件是否响应状态，0(0x00) 双方不响应，1(0x01) 仅黑方响应，2(0x10) 仅红方响应，3(0x11) 双方响应
		clickResponse: { none: 0, black: 1, red: 2, both: 3 },

		// 棋盘方向，0(0x00) 不翻转，1(0x01) 左右翻转，2(0x10) 上下，3(0x11) 对角旋转（左右+上下）
		turn: { none: 0, mirror: 1, reverse: 2, round: 3 }
	}
};

// 自身路径
vs.selfPath = (function(){
	var currentElement = document.documentElement;

	while (currentElement.tagName.toLowerCase() !== "script") {
		currentElement = currentElement.lastChild;
	}

	return currentElement.src;
})();

// 默认路径为本程序的路径
vs.defaultPath = vs.selfPath.substring(0, vs.selfPath.lastIndexOf("/") + 1);

// 程序默认参数
vs.defaultOptions = {
	// 自定义棋谱
	chessData: false,

	// 默认风格
	style: "default",

	// 默认布局
	layout: "default",

	// 默认全局样式
	globalCSS: vs.defaultPath + "global.css",

	// 默认棋盘初始化时展示的局面索引
	currentStep: 0,

	// 音效开关
	sound: true,

	// 默认音效
	soundStyle: "default",

	// 默认音量
	volume: 100,

	// 自定义音效路径，空字符串表示程序自动识别，如需自定义请参考官方文档
	soundPath: "",

	// IE6 自定义棋子图片路径，如需自定义请参考官方文档
	IE6Compatible_CustomPieceUrl: false,

	// 选择解析器，默认为自动选择
	parseType: "auto",

	// 默认棋盘方向，0(0x00) 不翻转，1(0x01) 左右翻转，2(0x10) 上下翻转，3(0x11) 对角旋转
	// 亦可以使用 vschess.code.turn：none 不翻转，mirror 左右翻转，reverse 上下翻转，round 对角旋转
	turn: vs.code.turn.none,

	// 默认棋子单击事件是否响应状态，0(0x00) 双方不响应，1(0x01) 仅黑方响应，2(0x10) 仅红方响应，3(0x11) 双方响应
	// 亦可以使用 vschess.code.clickResponse：none 双方不响应，black 仅黑方响应，red 仅红方响应，both 双方响应
	clickResponse: vs.code.clickResponse.both,

	// 默认走子动画时间，单位毫秒
	animationTime: 200,

	// 默认播放间隔时间，单位百毫秒（0.1秒）
	playGap: 5,

	// 默认着法格式
	moveFormat: "chinese",

	// 单击事件名称，兼顾 PC 端和移动端
	click: (function(){
		var UA = navigator.userAgent.toLowerCase(), click = "touchend";
		!~UA.indexOf("android") && !~UA.indexOf("iph") && !~UA.indexOf("ipad") && (click = "click");
		return click;
	})(),

	// 快进快退局面数
	quickStepOffset: 10,

	// 默认展开的标签
	defaultTab: "comment",

	// UBB 分享标签名称
	ubbTagName: "vschess",

	// 走子提示
	moveTips: true,

	// 保存提示
	saveTips: false,

	// 棋子随机旋转
	pieceRotate: false,

	// 禁止重复长打
	banRepeatLongThreat: true,

	// 禁止重复一将一杀
	banRepeatLongKill: false,

	// 违例提示
	illegalTips: true,

	// 起始局面提示信息
	startTips: [
		"蓝色的着法含有变着",
		"标有星号的着法含有注解",
		"支持东萍、鹏飞等多种格式",
		"单击“复制”复制当前局面",
		'<a href="https://chess.appchizi.com/" target="_blank">微思象棋播放器 V' + vs.version + "</a>",
		'<a href="https://margin.top/" target="_blank">Margin.Top &copy; 版权所有</a>'
	],

	// 中文着法文字
	ChineseChar: {
		Piece	 : "车马相仕帅炮兵车马象士将炮卒",
		Number	 : "一二三四五六七八九１２３４５６７８９",
		PawnIndex: "一二三四五一二三四五",
		Text	 : "前中后进退平"
	},

	// 云服务 API 地址
	cloudApi: {
		startFen: "https://chess.appchizi.com/api/cloud/startfen",
		saveBook: "https://chess.appchizi.com/api/cloud/savebook",
		saveBookForShare: "https://chess.appchizi.com/api/cloud/book/save"
	},

	// 默认推荐起始局面列表
	recommendList: [
		{ name: "常用开局", fenList: [
			{ name: "空白棋盘", "fen": "9/9/9/9/9/9/9/9/9/9 w - - 0 1" },
			{ name: "只有帅将", "fen": "5k3/9/9/9/9/9/9/9/9/3K5 w - - 0 1" },
			{ name: "标准开局", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让左马", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/R1BAKABNR w - - 0 1" },
			{ name: "黑让左马", "fen": "rnbakab1r/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让右马", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKAB1R w - - 0 1" },
			{ name: "黑让右马", "fen": "r1bakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让双马", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/R1BAKAB1R w - - 0 1" },
			{ name: "黑让双马", "fen": "r1bakab1r/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让双仕", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNB1K1BNR w - - 0 1" },
			{ name: "黑让双士", "fen": "rnb1k1bnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让双相", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RN1AKA1NR w - - 0 1" },
			{ name: "黑让双象", "fen": "rn1aka1nr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让仕相", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RN2K2NR w - - 0 1" },
			{ name: "黑让士象", "fen": "rn2k2nr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让五兵", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/9/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "黑让五卒", "fen": "rnbakabnr/9/1c5c1/9/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" },
			{ name: "红让九子", "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/9/1C5C1/9/RN2K2NR w - - 0 1" },
			{ name: "黑让九子", "fen": "rn2k2nr/9/1c5c1/9/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1" }
		]}
	]
};

// 默认帮助信息
vs.defaultOptions.help  = '<h1>微思象棋播放器 V' + vs.version + ' 帮助信息</h1>';
vs.defaultOptions.help += '<hr />';
vs.defaultOptions.help += '<h2>1.&ensp;&ensp;单击“播放”按钮，可以自动播放棋局；播放过程中，单击“暂停”按钮，棋局停止自动播放。</h2>';
vs.defaultOptions.help += '<h2>2.&ensp;&ensp;单击“前进”、“后退”按钮，每次变化1步；单击“快进”、“快退”按钮，每次变化#quickStepOffsetRound#个回合，即#quickStepOffset#步。</h2>';
vs.defaultOptions.help += '<h2>3.&ensp;&ensp;单击“复制”按钮，可以复制当前局面。</h2>';
vs.defaultOptions.help += '<h2>4.&ensp;&ensp;复制局面后，可以直接在专业象棋软件中粘贴使用。</h2>';
vs.defaultOptions.help += '<h2>5.&ensp;&ensp;分析局面时，建议将局面复制到专业象棋软件中进行分析。</h2>';
vs.defaultOptions.help += '<h2>6.&ensp;&ensp;可以直接在棋盘上走棋，便于分析局面。</h2>';
vs.defaultOptions.help += '<h2>7.&ensp;&ensp;在着法列表中可以调整变招顺序或删除着法。</h2>';
vs.defaultOptions.help += '<h2>8.&ensp;&ensp;注释修改后直接在注释区外面任意处单击即可生效。</h2>';
vs.defaultOptions.help += '<h2>9.&ensp;&ensp;编辑局面会失去当前棋谱，请注意保存。</h2>';
vs.defaultOptions.help += '<h2>10.&ensp;编辑局面标签中，可以直接打开电脑中的棋谱，也可以直接将棋谱文件拖拽到本棋盘上。</h2>';
vs.defaultOptions.help += '<h2>11.&ensp;支持东萍、鹏飞、象棋世家、标准PGN、中国游戏中心、QQ象棋等格式，其他格式程序也会尝试自动识别。</h2>';
vs.defaultOptions.help += '<h2>12.&ensp;棋盘选项中，可以控制棋盘方向、播放速度、走子声音等。</h2>';
vs.defaultOptions.help += '<h2>13.&ensp;棋谱分享功能生成的论坛 UBB 代码，可以在支持该代码的论坛中使用。<a href="https://chess.appchizi.com/" target="_blank">【查看都有哪些论坛支持该代码】</a></h2>';
vs.defaultOptions.help += '<hr />';
vs.defaultOptions.help += '<h2><a href="https://chess.appchizi.com/" target="_blank">微思象棋播放器 V' + vs.version + '</a> <a href="https://margin.top/" target="_blank">Margin.Top &copy; 版权所有</a></h2>';
