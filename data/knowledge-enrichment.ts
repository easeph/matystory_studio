import { getKnowledgeBySlug, knowledgePoints } from "@/data/knowledge";
import type { KnowledgePoint, KnowledgeSource, PortraitAsset, StorySection } from "@/types";

function source(label: string, url?: string, note?: string): KnowledgeSource {
  return { label, url, note };
}

function portrait(
  title: string,
  imageUrl: string,
  sourcePageUrl: string,
  caption: string,
  credit: string,
  license: string
): PortraitAsset {
  return { title, imageUrl, sourcePageUrl, caption, credit, license };
}

function sections(background: string, figures: string, classroom: string): StorySection[] {
  return [
    { title: "历史背景", content: background },
    { title: "关键人物与细节", content: figures },
    { title: "回到课本", content: classroom }
  ];
}

const refs = {
  boyer: source("Boyer《数学史》"),
  katz: source("Katz《数学史通论》"),
  maor: source("Eli Maor《毕达哥拉斯定理》"),
  wang: source("汪晓勤《中学数学中的数学史》"),
  nrichNegative: source("NRICH: The History of Negative Numbers", "https://nrich.maths.org/5961"),
  mactutorPythagoras: source("MacTutor: Pythagoras", "https://mathshistory.st-andrews.ac.uk/Biographies/Pythagoras/"),
  mactutorFibonacci: source("MacTutor: Fibonacci", "https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/"),
  mactutorAryabhata: source("MacTutor: Aryabhata I", "https://mathshistory.st-andrews.ac.uk/Biographies/Aryabhata_I/"),
  britannicaKhwarizmi: source("Britannica: al-Khwarizmi", "https://www.britannica.com/biography/al-Khwarizmi"),
  commonsPythagoras: source("Wikimedia Commons: Pythagoras statue", "https://commons.wikimedia.org/wiki/File:Kapitolinischer_Pythagoras_adjusted.jpg"),
  commonsEuclid: source("Wikimedia Commons: Euclid", "https://commons.wikimedia.org/wiki/File:Euclid.jpg", "该图常见于《雅典学院》局部，也存在人物识别争议。"),
  commonsFibonacci: source("Wikimedia Commons: Fibonacci", "https://commons.wikimedia.org/wiki/File:Fibonacci.jpg"),
  commonsYangHui: source("Wikimedia Commons: Yang Hui portrait", "https://commons.wikimedia.org/wiki/File:Yang_Hu0.png"),
  commonsEratosthenes: source("Wikimedia Commons: Portrait of Eratosthenes", "https://commons.wikimedia.org/wiki/File:Portrait_of_Eratosthenes.png"),
  wikiNegative: source("Wikipedia: Negative number", "https://en.wikipedia.org/wiki/Negative_number"),
  wikiNineChapters: source("Wikipedia: 九章算术", "https://zh.wikipedia.org/wiki/%E4%B9%9D%E7%AB%A0%E7%AE%97%E8%A1%93"),
  wikiKhwarizmi: source("Wikipedia: 花剌子密", "https://zh.wikipedia.org/wiki/%E8%8A%B1%E5%89%8C%E5%AD%90%E5%AF%86"),
  wikiEratosthenes: source("Wikipedia: 埃拉托色尼", "https://zh.wikipedia.org/wiki/%E5%9F%83%E6%8B%89%E6%89%98%E8%89%B2%E5%B0%BC"),
  wikiEuclid: source("Wikipedia: 欧几里得", "https://zh.wikipedia.org/wiki/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97")
};

const portraits = {
  pythagoras: portrait(
    "毕达哥拉斯雕像",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Kapitolinischer_Pythagoras_adjusted.jpg",
    "https://commons.wikimedia.org/wiki/File:Kapitolinischer_Pythagoras_adjusted.jpg",
    "后世保存的毕达哥拉斯雕像照片，常用于数学史介绍材料。",
    "Wikimedia Commons / Public domain marked artwork reproduction",
    "公共领域或公共领域标记"
  ),
  euclid: portrait(
    "欧几里得常见图像",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Euclid.jpg",
    "https://commons.wikimedia.org/wiki/File:Euclid.jpg",
    "拉斐尔《雅典学院》中的常用细节图，传统上常被标注为欧几里得，但学界也有不同识别意见。",
    "Wikimedia Commons / Raphael detail",
    "公共领域"
  ),
  khwarizmi: portrait(
    "al-Khwarizmi 常见历史图像",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Mu%E1%B8%A5ammad_ibn_M%C5%ABs%C4%81_al-Khw%C4%81rizm%C4%AB.png",
    "https://commons.wikimedia.org/wiki/File:Mu%E1%B8%A5ammad_ibn_M%C5%ABs%C4%81_al-Khw%C4%81rizm%C4%AB.png",
    "基于纪念邮票细节传播的 al-Khwarizmi 常见图像。",
    "Wikimedia Commons",
    "以源页面标注为准"
  ),
  yanghui: portrait(
    "杨辉画像",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Yang_Hu0.png",
    "https://commons.wikimedia.org/wiki/File:Yang_Hu0.png",
    "晚明至清流传的杨辉画像版本，常被教材和数学史文章引用。",
    "Wikimedia Commons / Unknown author",
    "公共领域"
  ),
  fibonacci: portrait(
    "斐波那契版画肖像",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Fibonacci.jpg",
    "https://commons.wikimedia.org/wiki/File:Fibonacci.jpg",
    "19 世纪流传的斐波那契版画肖像，并非同时代写生，但属于常见公共史料图。",
    "Wikimedia Commons / Unknown 19th-century artist",
    "公共领域"
  ),
  eratosthenes: portrait(
    "埃拉托色尼后世画像",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Portrait_of_Eratosthenes.png",
    "https://commons.wikimedia.org/wiki/File:Portrait_of_Eratosthenes.png",
    "后世艺术家想象的埃拉托色尼画像，常见于地理史与数学史介绍中。",
    "Wikimedia Commons",
    "公共领域"
  ),
  aryabhata: portrait(
    "Aryabhata 常见历史画像",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Aryabhata.jpeg",
    "https://commons.wikimedia.org/wiki/File:Aryabhata.jpeg",
    "常见的 Aryabhata 历史肖像图版本，常用于数学史介绍。",
    "Wikimedia Commons",
    "公共领域"
  ),
  shanggao: portrait(
    "商高传统相关勾股图",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Chinese_pythagoras.jpg",
    "https://commons.m.wikimedia.org/wiki/File%3AChinese_pythagoras.jpg",
    "《周髀算经》系统中的勾股图版本，用来代表商高传统而非现代照片。",
    "Wikimedia Commons",
    "公共领域"
  )
};

const storyTemplates: Record<string, { storySections: StorySection[]; sources: KnowledgeSource[]; portrait?: PortraitAsset }> = {
  numbers: {
    storySections: sections(
      "这一组知识点主要围绕数系的扩展展开：从整数到分数，从正数到负数，再到把这些对象放在同一套运算规则里。它们的历史根子往往不是纯理论，而是记账、丈量、分配和债务处理。",
      "中国《九章算术》与刘徽注常在数系史里被反复提及，因为算筹体系较早容纳了正负区分；印度和阿拉伯传统则推动了数与算法的传播与统一。欧洲对负数的接受相对更慢，说明抽象概念的形成并不总是直线推进。",
      "回到课本，学习数与运算并不只是会算，而是在理解数学如何把生活中的方向、比例和重复关系压缩成统一规则。"
    ),
    sources: [refs.boyer, refs.katz, refs.nrichNegative, refs.wikiNegative, refs.wikiNineChapters]
  },
  power: {
    storySections: sections(
      "乘方并不是单纯的记号发明，它最早与面积和体积紧密相连。古代数学家常通过正方形和立方体来理解平方与立方，后来的指数记号才把重复乘法压缩成统一写法。",
      "欧几里得体系中的平方与立方具有鲜明的几何背景，而近代代数的记号化则让幂运算脱离具体图形，进入更一般的函数和增长问题。",
      "课本中的 a²、a³ 看似简短，背后其实是“重复乘法”和“几何量”被逐步统一的历史结果。"
    ),
    sources: [refs.boyer, refs.katz, refs.wikiEuclid],
    portrait: portraits.euclid
  },
  expression: {
    storySections: sections(
      "整式的加减与乘法、因式分解，反映了代数语言从自然语言叙述走向符号结构的历史。它们之所以重要，是因为数学开始不再只处理具体数字，而是处理关系本身。",
      "中国的天元术、宋元数学中的数表传统，以及伊斯兰和欧洲代数的符号化改革，都在帮助数学家更有效地整理同类项、识别结构和展开公式。",
      "回到课堂，真正重要的不是记多少技巧，而是训练“看见结构”的能力：哪些项能合并，哪些式子可分解，哪些表达只是形式不同但本质相同。"
    ),
    sources: [refs.boyer, refs.katz, refs.commonsYangHui],
    portrait: portraits.yanghui
  },
  linearEquation: {
    storySections: sections(
      "一元一次方程与二元一次方程组都源于现实问题中的未知量处理。古埃及、巴比伦、中国文献都出现过相关问题，但中世纪伊斯兰代数传统使这些问题第一次以较系统的算法形式整理出来。",
      "al-Khwarizmi 的工作之所以常被反复提及，是因为他把“还原”和“平衡”写成了可教学的步骤。中国《九章算术》中的方程术则说明，多未知量消元并不是近代才突然出现的想法。",
      "今天课本里的移项、代入和消元之所以重要，不只是为了解出一个数，更是在训练把现实条件转写成结构并逐步简化。"
    ),
    sources: [refs.britannicaKhwarizmi, refs.wikiKhwarizmi, refs.wikiNineChapters, refs.boyer],
    portrait: portraits.khwarizmi
  },
  geometryIntro: {
    storySections: sections(
      "点、线、面、角与基本图形分类，是几何语言的入口。它们来源于测地、建筑、作图和天文观测等实践，但在古希腊几何中被系统整理成定义、公设与命题网络。",
      "欧几里得《几何原本》之所以影响深远，不只是因为命题多，而是因为它展示了一套从定义出发组织空间知识的方法。后世几乎所有学校几何都在不同程度上继承了这种写法。",
      "课本中的基础图形看起来简单，真正的意义在于让学生开始用严格术语描述空间，而不只是凭直觉说“差不多像”。"
    ),
    sources: [refs.boyer, refs.katz, refs.wikiEuclid],
    portrait: portraits.euclid
  },
  parallel: {
    storySections: sections(
      "平行线、相交线和角关系看似是学校里的基础练习，历史上却是整个欧式几何的核心骨架之一。平行公设在近代还催生了非欧几何的出现。",
      "欧几里得传统把空间位置关系压缩成可检验的角关系，于是同位角、内错角、同旁内角不再只是算角度，而成为判断图形结构的语言。",
      "回到课本，这一节真正训练的是逻辑：由平行推出性质，由角关系反推平行，学会在条件和结论之间双向切换。"
    ),
    sources: [refs.boyer, refs.katz, refs.wikiEuclid],
    portrait: portraits.euclid
  },
  realNumbers: {
    storySections: sections(
      "实数的形成绕不开无理数的发现。正方形对角线与边长不可通约这一事实，迫使古人承认并非所有长度都能写成整数比。",
      "毕达哥拉斯学派与希帕索斯相关的传说虽然细节并不完全可靠，但古希腊几何最终发展出“不可通约量”的系统理论，这一点是确定的。欧几里得对比例与不可通约量的处理，为后来的实数观念奠定了背景。",
      "在今天的课本里，实数看似只是“有理数与无理数的总和”，但它真正解决的是连续量如何被稳定表达的问题。"
    ),
    sources: [refs.mactutorPythagoras, refs.boyer, refs.katz],
    portrait: portraits.pythagoras
  },
  coordinate: {
    storySections: sections(
      "坐标系与坐标变换让图形的位置和运动第一次能够直接写成数对变化。它的历史成熟与解析几何、地图测量、工程绘图和天文定位密切相关。",
      "笛卡尔通常被视为坐标方法的重要奠基者，但更广泛的背景是：数学家逐渐学会用代数表达图形。于是点、线、曲线不再只是画出来的对象，也可以被算出来。",
      "课本里判象限、平移点坐标这些练习，实际是在为函数图象、程序图形和现代建模打基础。"
    ),
    sources: [refs.boyer, refs.katz, source("MacTutor: O'Brien's Coordinate Geometry", "https://mathshistory.st-andrews.ac.uk/Extras/OBrien_Geometry/")]
  },
  inequality: {
    storySections: sections(
      "不等式比方程更贴近现实约束，因为很多实际问题关心的是“至少”“至多”“不能超过”。工期、采购、税收、库存和面积限制都天然适合用不等关系表达。",
      "历史上，不等关系长期存在于算题叙述之中，但在现代教材里被明确作为独立对象讲授，才让它的解集、区间和逻辑含义变得更加清晰。",
      "课本中最值得重视的，不只是会变形，而是形成“范围意识”，尤其是乘除负数时不等号翻转这一条最关键的规则。"
    ),
    sources: [refs.boyer, refs.katz, refs.wang]
  },
  statistics: {
    storySections: sections(
      "统计思维来自长期的数据记录实践。人口、赋税、天象、天气和商贸账本都推动人类把零散事实整理为可比较的信息。",
      "现代统计图和平均数、中位数、众数这些概念，是把原始数据转化成“可讨论结构”的工具。它们并不只服务于考试，而是现代社会判断证据的基础语言。",
      "回到课本，学会收集、整理和分析数据，真正的价值在于知道什么时候看总量，什么时候看分布，什么时候警惕极端值。"
    ),
    sources: [refs.boyer, refs.katz, refs.wang]
  },
  triangle: {
    storySections: sections(
      "三角形之所以成为几何核心对象，很大程度上源于它的稳定性。测地、建筑、桥梁和结构设计都不断强化了它在空间研究中的地位。",
      "全等和相似进一步让三角形成为证明、复制和测量的核心工具：前者强调“完全确定”，后者强调“按比例缩放”。这正是几何从直观走向逻辑的关键一环。",
      "今天课本中学习三角形、全等和相似，不仅是在学图形本身，更是在学如何用有限条件推断整体结构。"
    ),
    sources: [refs.boyer, refs.katz, refs.wang, refs.wikiEuclid],
    portrait: portraits.euclid
  },
  symmetry: {
    storySections: sections(
      "轴对称和旋转把几何从静态图形推进到变换视角。建筑装饰、剪纸、纹样和机械转动，都让对称与旋转成为人类最早熟悉的几何经验。",
      "现代几何的贡献，在于把这些直觉美感转化成严格规则：哪些长度不变，哪些角度不变，哪些对应点保持固定关系。",
      "课本中的作图与坐标变换，实际上是在帮助学生把“看起来对称或转动”变成“可验证的条件”。"
    ),
    sources: [refs.katz, refs.boyer, refs.wang]
  },
  fractionAlgebra: {
    storySections: sections(
      "分式和比例思维源于商业算术与测量问题。只要分母中带有变量，表达式就不再是静态数量，而带有“何时有意义”的条件。",
      "斐波那契的《算盘书》虽然不是分式概念的源头，却在传播印度—阿拉伯数字和商贸算术方面影响巨大，因此常在比例与分数史中被提及。",
      "这部分内容的真正重点，是让学生意识到：式子的形式变化背后还藏着定义域与条件限制。"
    ),
    sources: [refs.mactutorFibonacci, refs.commonsFibonacci, refs.katz],
    portrait: portraits.fibonacci
  },
  radicals: {
    storySections: sections(
      "二次根式延续了“不可整齐表示的长度”这一古老主题。平方、开方和根值近似一开始都与度量和天文计算紧密相连。",
      "Aryabhata 及印度数学传统之所以常被提及，是因为开方与三角表、天文计算和数值近似之间有很深的联系。虽然他们不使用今天的根号记法，但问题意识高度相通。",
      "回到课本，化简根式不是机械变形，而是在把复杂长度整理成更规范的表达结构。"
    ),
    sources: [refs.mactutorAryabhata, refs.boyer, refs.katz],
    portrait: portraits.aryabhata
  },
  pythagorean: {
    storySections: sections(
      "勾股定理是跨文明传播最广的数学关系之一。中国《周髀算经》的“勾三股四弦五”、巴比伦泥板中的整数三元组、希腊证明传统，都说明它不仅是一条公式，更是一条文明交流线索。",
      "毕达哥拉斯学派与这条定理关系密切，但中国商高传统、巴比伦算法传统同样重要。Eli Maor 专门写书讨论它，正因为它连接了数、形、证明和实际应用。",
      "课本中的面积证明、测距和应用题，正是在让学生体验这一定理为什么既能用于纯几何，也能用于工程和生活模型。"
    ),
    sources: [refs.maor, refs.mactutorPythagoras, refs.commonsPythagoras, refs.wang],
    portrait: portraits.shanggao
  },
  parallelogram: {
    storySections: sections(
      "平行四边形的研究揭示了“变形而不变本质”的几何思想。土地丈量和建筑平面中，斜形区域并不稀奇，但计算时往往要把它转成熟悉形状。",
      "数学家通过剪拼和平移说明面积保持不变，这种思维后来在向量、线性代数和图形变换中都非常关键。",
      "课本中的底乘高和对角线性质，看似基础，却在训练学生寻找不变量。"
    ),
    sources: [refs.boyer, refs.katz, refs.wang]
  },
  linearFunction: {
    storySections: sections(
      "一次函数是课堂里第一次系统处理“变化率”的对象。价格、路程、均匀增长和温度变化都能用近似线性关系描述。",
      "坐标系成熟后，变化第一次可以被稳定画成直线图象，这使代数式中的系数拥有了清晰图形意义：斜率描述变化快慢，截距描述初始状态。",
      "因此学习一次函数的关键，不是只会代数代值，而是学会在表、式、图之间自由切换。"
    ),
    sources: [refs.boyer, refs.katz, source("MacTutor: O'Brien's Coordinate Geometry", "https://mathshistory.st-andrews.ac.uk/Extras/OBrien_Geometry/")]
  },
  quadratic: {
    storySections: sections(
      "一元二次方程与二次函数都与平方结构密切相关。巴比伦算题、中国古代算法和阿拉伯代数传统都处理过二次问题，后来的符号代数和解析几何则把这些问题写得更统一。",
      "al-Khwarizmi 与配方法常常一起出现，因为他用几何补方的方式说明了如何把二次问题整理成熟悉结构；抛物线则把二次关系以图象形式清晰展示出来。",
      "回到课本，配方法、求根公式、顶点式和图象平移并不是彼此孤立的技巧，而是在展示平方关系如何同时进入方程与函数。"
    ),
    sources: [refs.britannicaKhwarizmi, refs.boyer, refs.katz],
    portrait: portraits.khwarizmi
  },
  circle: {
    storySections: sections(
      "圆是古代数学中最早被深入研究的图形之一。车轮、天体、弧度和周期都使它具有特殊地位，而圆周率、弦、切线与角关系也不断推动几何发展。",
      "埃拉托色尼测地球周长的故事非常著名，因为它说明圆周思想可以直接服务于大尺度测量。阿基米德、刘徽、祖冲之等人则分别从逼近和证明角度推动圆研究。",
      "课本中的圆心角、圆周角、切线和面积周长公式，看似分散，实际共同围绕“圆的对称与测量”展开。"
    ),
    sources: [refs.commonsEratosthenes, refs.wikiEratosthenes, refs.boyer, refs.katz],
    portrait: portraits.eratosthenes
  },
  probability: {
    storySections: sections(
      "概率并不是古代没有随机现象，而是古代很少把“可能性大小”本身视作数学对象。直到近代赌博、保险和风险分摊推动研究，概率才逐渐形成独立领域。",
      "现代课本里的古典概率模型已经非常简化，但保留了关键思想：单次结果可能不稳定，大量试验却会显现规律。",
      "这部分内容最重要的学习目标，是把“看起来更可能”转化成可列举、可计算、可比较的数学判断。"
    ),
    sources: [refs.boyer, refs.katz, refs.wang]
  },
  inverseProportion: {
    storySections: sections(
      "反比例函数常出现在乘积保持不变的情境中，例如单价与数量、速度与时间、压强与面积。它代表了一种与线性增长完全不同的变化逻辑。",
      "这类关系之所以重要，在于它让学生第一次看到：数学图象并不总是直线，变量之间也可以表现为“接近但不相交”的结构。",
      "回到课本，最重要的不是记住双曲线的样子，而是理解 y=k/x 中的 k 是整段关系的守恒量。"
    ),
    sources: [refs.boyer, refs.katz, refs.wang]
  },
  trigAndViews: {
    storySections: sections(
      "锐角三角函数与投影视图分别来自测量和工程表达。前者把角度问题转化成边长比，后者把三维物体转化成二维信息，两者都体现了数学对现实世界的编码能力。",
      "Aryabhata 与印度、阿拉伯三角学传统常被用来讲解正弦与表格计算的历史；工程制图传统则解释了为什么现代课堂要学习主视图、左视图和俯视图。",
      "课本中的定义和视图练习看似基础，背后却是“把不可直接观察或交流的对象转化成标准形式”的现代思想。"
    ),
    sources: [refs.mactutorAryabhata, refs.boyer, refs.katz],
    portrait: portraits.aryabhata
  }
};

const templateBySlug: Record<string, keyof typeof storyTemplates> = {
  "zhengshu-he-fushu": "numbers",
  "youli-shu": "numbers",
  "youli-shu-jiajian": "numbers",
  "youli-shu-chengchu": "numbers",
  "chengfang": "power",
  "zhengshi-jiajian": "expression",
  "zhengshi-chengfa-yinshifenjie": "expression",
  "yinshifenjie-fangfa": "expression",
  "yiyuanyici-fangcheng": "linearEquation",
  "eryuanyici-fangchengzu": "linearEquation",
  "jihe-tuxing-chubu": "geometryIntro",
  "xiangjiaoxian-yupingxingxian": "parallel",
  "pingxingxian-panading": "parallel",
  shishu: "realNumbers",
  "pingmian-zuobiao": "coordinate",
  "zuobiao-yidong": "coordinate",
  "budengshi-yu-budengshizu": "inequality",
  "shuju-shouji-zhengli-miaoshu": "statistics",
  "shuju-fenxi": "statistics",
  sanjiaoxing: "triangle",
  "quandeng-sanjiaoxing": "triangle",
  "quandeng-yingyong": "triangle",
  xiangsi: "triangle",
  zhouduichen: "symmetry",
  xuanzhuan: "symmetry",
  fenshi: "fractionAlgebra",
  ercigenshi: "radicals",
  "gougu-dingli": "pythagorean",
  "gougu-yingyong": "pythagorean",
  pingxingsibianxing: "parallelogram",
  "yici-hanshu": "linearFunction",
  "yiyuanyici-fangcheng-2": "quadratic",
  "erci-hanshu": "quadratic",
  "ercihanshu-yingyong": "quadratic",
  yuan: "circle",
  "yuan-xingzhi": "circle",
  "gailv-chubu": "probability",
  "fanbili-hanshu": "inverseProportion",
  "ruijiao-sanjiaohanshu": "trigAndViews",
  "touying-yu-shitu": "trigAndViews"
};

function defaultTemplate(point: KnowledgePoint): { storySections: StorySection[]; sources: KnowledgeSource[]; portrait?: PortraitAsset } {
  return {
    storySections: sections(
      `${point.title} 并不是突然写进教材的结论，它通常来自长期的测量、交易、作图、观测或分类实践。不同文明会围绕相似问题形成各自的算法与解释，最后再通过翻译、教育和教材整理进入现代课堂。`,
      “与这一知识点相关的历史往往不是”某一位天才瞬间发明”，而更像接力过程：有人先给出经验做法，有人把经验整理成算法，还有人再把它写进更严密的证明体系。”,
      “回到初中学习，这一节的价值不只在于会做题，更在于理解课本结论背后是怎样从真实问题抽象出数学结构。”
    ),
    sources: [refs.boyer, refs.katz, refs.wang]
  };
}

export function enrichKnowledgePoint(point: KnowledgePoint): KnowledgePoint {
  const key = templateBySlug[point.slug];
  const extra = key ? storyTemplates[key] : defaultTemplate(point);

  return {
    ...point,
    storySections: extra.storySections,
    sources: extra.sources,
    portrait: extra.portrait
  };
}

export function getEnrichedKnowledgeBySlug(slug: string) {
  const point = getKnowledgeBySlug(slug);
  return point ? enrichKnowledgePoint(point) : undefined;
}

export const enrichedKnowledgePoints = knowledgePoints.map(enrichKnowledgePoint);
