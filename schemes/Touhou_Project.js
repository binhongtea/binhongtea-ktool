schemes['Touhou_Project'] = {
    //三个学科 其中第一个是主学科 后两个是相关学科
    subj: ['东方project', '上海アリス幻樂団', '黃昏边境'],
    //至少1个有关第一个学科的 字面上可以解释为物理结构的词
    stru: ['红魔馆', '人间之里', '雾之湖', '太阳花田', '妖怪之山', '博丽神社','幻想乡','香霖堂','啤酒','白玉楼','西行妖','畜生道','有顶天','迷途竹林','永远亭','隙间','铃奈庵','守矢神社','命莲寺','三途川','辉针城','地灵殿','月之都','雾雨魔法店','是非曲直厅','圣辇船'],
    //至少9个有关第一个学科的名人名言
    cele: [
        ['西行寺 幽幽子', '麻雀的小碎骨很多所以不是很好吃呢~'],
        ['雾雨 魔理沙', '弹幕就是火力。'],
        ['蕾米莉亚·斯卡蕾特', '你能记得到今天为止自己吃过的面包的数量吗？'],
        ['上白泽 慧音', '今夜，就用你们的历史来做满汉全席了！'],
        ['琪露诺', '俺是最强的。'],
        ['八雲 紫', '有两种方法可以编写无错误的程序；只有第三种方法有效。'],
        ['露米娅', '是——这样吗——'],
        ['雾雨 魔理沙', '但是我拒绝！'],
        ['ZUN', '希腊奶'],
        ['ZUN', '害人终害己'],
        ['灵乌路 空', '魔法使什么的都已经过时了，现在是核能的时代！'],
        ['铃仙·优昙华院·因幡', '“就算自己想要笔直的走，在别人看来也是歪歪扭扭的。'],
        ['比那名居 天子', '以天制大地，以地除要枢，照映出人类绯色之内心！'],
        ['纯狐', '“不共戴天之敌，嫦娥啊。你在看着吗！？'],
    ],
    //至少3个有关第一个学科的思想（主义）
    prin: ['神灵', '符卡', '幻想'],
    //至少3个有关第一个学科的性质
    prop: ['同人', '二次元', 'STG'],
    //至少6个有关第一个学科的概念
    conc: ['恋符「Master Spark」', '灵符「梦想封印」', '博丽大结界', '冻符「Perfect Freeze」', '幻世「The World」', 'QED「495年的波纹」', '「反魂蝶 -八分咲-」', '结界「生与死的境界」', '人鬼「未来永劫斩」','蠢符「Little Bug」','东方天空璋','东方凭依华','东方绀珠传','东方深秘录','东方辉针城','东方心绮楼','东方神灵庙','东方文花帖','东方非想天则','东方星莲船','东方地灵殿','东方绯想天','东方风神录','东方花映塚','东方萃梦想','东方永夜抄','东方妖妖梦','东方红魔乡','东方怪绮谈','东方幻想乡','东方梦时空','东方封魔录'],
    init: function () {
        shuffle(this.stru);
        shuffle(this.cele);
        shuffle(this.prin);
        shuffle(this.prop);
        shuffle(this.conc);
    }
}