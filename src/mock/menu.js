const menuList = [
    {
        id: 0,
        title: '家常素菜',
        image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928950225/602938963ca6412aad773c8ce02ff551.png',
        list: [
            {
                id: 1,
                title: '蒜蓉西兰花',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928970225/8b2893fd195f4b87920731aaa6619636.png',
                ingredients: ['西兰花 1 颗', '大蒜 5 瓣', '食用油 1 勺', '盐 少许'],
                steps: ['西兰花切小朵焯水备用', '蒜切碎，小火爆香', '下西兰花翻炒均匀', '加盐调味出锅']
            },
            {
                id: 2,
                title: '醋溜土豆丝',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928960225/cbc518f9a41e4203914a3f8ef0680951.png',
                ingredients: ['土豆 2 个', '青椒 半个', '干辣椒 适量', '米醋 1 勺', '盐 少许'],
                steps: ['土豆切细丝泡水去淀粉', '热油爆香干辣椒', '下土豆丝和青椒翻炒', '沿锅边淋醋，加盐出锅']
            },
            {
                id: 3,
                title: '蒜蓉生菜',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60929480225/6bbd7b4cf8174e64b7b667f7183eae58.png',
                ingredients: ['生菜 一把', '大蒜 4 瓣', '蚝油 1 勺', '盐 少许'],
                steps: ['生菜洗净控干水分', '蒜切碎，小火爆香', '下生菜快速翻炒至断生', '加蚝油和少量盐调味']
            }
        ]
    },
    {
        id: 1,
        title: '家常荤菜',
        image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60927980225/cc48310243d54a4094eb86437d5986f2.png',
        list: [
            {
                id: 1,
                title: '宫保鸡丁',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928730225/056f20cce71f47ae9fa328838db35857.png',
                ingredients: ['鸡胸肉 300g', '花生米 一小把', '黄瓜 半根', '干辣椒 适量', '花椒 少许', '郫县豆瓣 1 勺'],
                steps: ['鸡胸肉切丁腌制 10 分钟', '炒熟花生米备用', '爆香花椒和干辣椒，下鸡丁翻炒', '加入黄瓜丁、调味汁，最后下花生米翻炒均匀']
            },
            {
                id: 2,
                title: '红烧肉',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928010225/58358a234155491690789786efa32828.png',
                ingredients: ['五花肉 500g', '冰糖 适量', '生抽 2 勺', '老抽 半勺', '料酒 1 勺', '姜片 几片'],
                steps: ['五花肉焯水后切块', '小火炒糖色，下五花肉翻炒上色', '加入姜片、料酒、生抽老抽和热水', '小火焖 40 分钟，收汁即可']
            },
            {
                id: 3,
                title: '黑椒牛柳',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60927990225/e49f93b72f14402cb6751434ac5292f3.png',
                ingredients: ['牛里脊 300g', '青红椒 各半个', '洋葱 半个', '黑胡椒碎 适量', '生抽 1 勺'],
                steps: ['牛肉切条加黑胡椒和淀粉腌制', '快速炒香洋葱和青红椒', '大火滑炒牛柳至变色', '加生抽和少许盐调味']
            }
        ]
    },
    {
        id: 2,
        title: '海鲜料理',
        image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60927950225/e1b2750da4fd49fb9bae91d22530f500.png',
        list: [
            {
                id: 1,
                title: '蒜蓉虾',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928600225/f4eb891aefd544d583e27a6482e11879.png',
                ingredients: ['基围虾', '蒜 ', '青、红辣椒','生抽、耗油、盐、糖'],
                steps: ['虾剪须去虾线洗净沥干', '大蒜剁成蒜蓉备用', '热油下虾翻炒变色捞起', '下蒜蓉、辣椒再下虾翻炒均匀出锅']
            },
        ]
    },
    {
        id: 3,
        title: '蛋奶豆制品',
        image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928510225/f7ab223c9530467199882613149570a0.png',
        list: [
            {
                id: 1,
                title: '西红柿炒鸡蛋',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928130225/d38f53e5faa6413f87bf090bcfd5b5c9.png',
                ingredients: ['鸡蛋 3 个', '西红柿 2 个', '葱花 少许', '盐 少许', '糖 少许'],
                steps: ['鸡蛋打散煎熟盛出', '西红柿切块下锅炒出汁', '倒回鸡蛋翻炒均匀', '加盐和少量糖调味']
            },
            {
                id: 2,
                title: '家常麻婆豆腐',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60927960225/144cdf37d4164c9ba9942f38c11a1a82.png',
                ingredients: ['北豆腐 1 块', '猪肉末 100g', '郫县豆瓣 1 勺', '花椒粉 少许'],
                steps: ['豆腐切小块焯水备用', '炒香肉末和豆瓣酱', '加入豆腐和适量清水，小火煮 5 分钟', '出锅前撒花椒粉']
            }
        ]
    },
    {
        id: 4,
        title: '主食/杂粮',
        image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928140225/ad988b4ac6ba4875b497cdb69c7d99ec.png',
        list: [
            {
                id: 1,
                title: '蛋炒饭',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60927940225/6b60d2f3372f4b40959748edd9c9b02b.png',
                ingredients: ['隔夜米饭 一碗', '鸡蛋 2 个', '胡萝卜丁 少许', '青豆 少许', '葱花 少许'],
                steps: ['鸡蛋炒散盛出', '下胡萝卜丁和青豆翻炒', '加入米饭打散炒匀', '倒回鸡蛋，加盐和葱花翻炒均匀']
            },
            {
                id: 2,
                title: '红薯南瓜粥',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928000225/62c8acdd51a24744bb520baf02ab2d05.png',
                ingredients: ['大米 一小杯', '红薯 半个', '南瓜 一小块'],
                steps: ['大米淘洗，红薯南瓜切小块', '所有食材一起下锅，加足量清水', '大火煮开后转小火煮 30 分钟']
            }
        ]
    },
    {
        id: 5,
        title: '早餐/速手菜',
        image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928150225/3541405ebb65400b975a63aef1961d51.png',
        list: [
            {
                id: 1,
                title: '手抓饼鸡蛋卷',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928040225/2c92f078ad304d6b875844d63e739244.png',
                ingredients: ['手抓饼 1 张', '鸡蛋 1 个', '生菜 适量', '火腿片 1 片'],
                steps: ['平底锅煎手抓饼至两面金黄', '在锅中摊鸡蛋，再放上手抓饼', '卷入生菜和火腿，切段即可']
            },
            {
                id: 2,
                title: '酸奶水果燕麦杯',
                image: 'https://4seller-res.meiyunji.net/europe-erp/3/ebay/20260225/0/60928020225/2dfb15152ff04302b320a443490f97a0.png',
                ingredients: ['原味酸奶 1 杯', '燕麦片 适量', '时令水果 适量'],
                steps: ['杯中依次铺一层酸奶、一层燕麦', '再放一层水果，重复叠加', '放冰箱冷藏一会口感更好']
            }
        ]
    }
]

export { menuList }