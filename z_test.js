const { SwipeSlowly, StopScript, LoadImgList, FindImgInList, FindNumber, HasPopupClose, RandomPress, FindBlueBtn, baseUrl, ReadConfig, PressToAuto, GetRandom, updateDeviceData } = require("./utils.js")

const regions = [
    [394, 229, 97, 62],
    [391, 330, 103, 61],
    [391, 429, 104, 60],
    [386, 525, 116, 69]
]

// for (let i = 0; i < regions.length; i++)
// {
//     console.log(FindNumber('goodsPrice', regions[i]));
// }
// const basePath = "page/trade/goods/"
// const img = LoadImgList(`${basePath}shoes/SaiLaTeChangXue_0`)
// console.log(FindImgInList(img, [995, 152, 81, 90]));
// console.log(HasPopupClose([961, 189, 43, 51]));

const setSoldPrice = (num) =>
{
    const position = [
        [594, 510, 39, 25],

        [520, 340, 30, 30],
        [590, 340, 30, 30],
        [660, 340, 30, 30],

        [520, 400, 30, 30],
        [590, 400, 30, 30],
        [660, 400, 30, 30],

        [520, 450, 30, 30],
        [590, 450, 30, 30],
        [660, 450, 30, 30],
    ]
    let digitsArray = num.toString().split('').map(Number);
    RandomPress([670, 511, 20, 23]) //clear
    for (let i = 0; i < digitsArray.length; i++)
    {
        RandomPress(position[digitsArray[i]])
    }
    if (FindBlueBtn([639, 547, 172, 64]))
    {
        RandomPress([665, 564, 121, 28])
    }
}

const config = ReadConfig()
const purchaseInfo = { "equipmentType": "underClothes", "equipmentName": "賽拉特皮褲", "englishName": "SaiLaTePiKu", "identified": false, "purchasePrice": 72, "soldPrice": 406 }

const params = {
    id: `7B07C9AFC5414B54-1739258199697`,
    recipient: config.game.vm,
    serverName: config.game.serverName,
    equipmentType: purchaseInfo.equipmentType,
    equipmentName: purchaseInfo.equipmentName,
    englishName: purchaseInfo.englishName,
    identified: purchaseInfo.identified,
    purchasePrice: purchaseInfo.purchasePrice,
    soldPrice: purchaseInfo.soldPrice,
    state: "已上架"
}

const sendOrder = (params) =>
{
    try
    {
        const res = http.post(`${baseUrl}order/create`, params)
        console.log("发送订单返回结果: " + res.body.string());
    } catch (error)
    {
        console.log("发送订单数据错误：" + error);
    }
}
// sendOrder(params);
const getOrderList = () =>
{
    try
    {
        const config = ReadConfig()
        const serverName = config.game.serverName;
        const res = http.post(`${baseUrl}order/findAll`, { serverName, state: "已上架" })

        const body = JSON.parse(res.body.string());
        if (body.code == 0)
        {
            console.log("获取订单信息成功");
            const list = body.result;
            if (list)
            {
                return list;
            }
        }
        return []

    } catch (error)
    {
        console.log(error);
        return [];
    }

}
// const list = getOrderList()

// let { equipmentName, englishName, equipmentType, identified, soldPrice } = list[0]
// console.log(`${equipmentName}-${englishName}-${equipmentType}-${identified}-${soldPrice}`);
// console.log(new Date("2025-02-11T03:32:32.000Z"));

const shopList = {
    "helmet": [
        { name: "賽勒畢斯頭盔", englishName: "SaiLeBiSiTouKui", identified: false, },
        { name: "賽拉特帽子", englishName: "SaiLaTeMaoZi", identified: false, },
        { name: "灰光破曉帽子", englishName: "HuiGuangPoXiaoMaoZi", identified: false, },
        { name: "賽拉特頭巾", englishName: "SaiLaTeTouJin", identified: false, },
        { name: "賽勒畢斯頭巾", englishName: "SaiLeBiSiTouJin", identified: false, },
    ],

    "tops": [
        { name: "賽拉特背心", englishName: "SaiLaTeBeiXin", identified: false, },
        { name: "賽拉特長袍", englishName: "SaiLaTeChangPao", identified: false, },
        { name: "灰光破曉長袍", englishName: "HuiGuangPoXiaoChangPao", identified: false, },
        { name: "灰光破曉背心", englishName: "HuiGuangPoXiaoBeiXin", identified: false, },

        { name: "賽勒畢斯背心", englishName: "SaiLeBiSiBeiXin", identified: false, },
        { name: "灰光破曉盔甲", englishName: "HuiGuangPoXiaoKuiJia", identified: false, },
        { name: "賽勒畢斯盔甲", englishName: "SaiLeBiSiKuiJia", identified: false, },
        { name: "賽拉特盔甲", englishName: "SaiLaTeKuiJia", identified: false, },

    ],

    "underClothes": [
        { name: "賽拉特皮褲", englishName: "SaiLaTePiKu", identified: false, },
        { name: "灰光破曉布褲子", englishName: "HuiGuangPoXiaoBuKuZi", identified: false, },
        { name: "賽勒畢斯布褲子", englishName: "SaiLeBiSiBuKuZi", identified: false, },

        { name: "賽拉特布褲子", englishName: "SaiLaTeBuKuZi", identified: false, },
        { name: "灰光破曉皮褲", englishName: "HuiGuangPoXiaoPiKu", identified: false, },
        { name: "賽勒畢斯皮褲", englishName: "SaiLeBiSiPiKu", identified: false, },
    ],

    "gloves": [
        { name: "灰光破曉護手", englishName: "HuiGuangPoXiaoHuShou", identified: false, },
        { name: "灰光破曉手套", englishName: "HuiGuangPoXiaoShouTao", identified: false, },
        { name: "黑色荊棘護手", englishName: "HeiSeJingJiHuShou", identified: false, },

        { name: "賽勒畢斯護手", englishName: "SaiLeBiSiHuShou", identified: false, },
        { name: "灰光破曉手甲", englishName: "HuiGuangPoXiaoShouJia", identified: false, },
        { name: "賽勒畢斯手甲", englishName: "SaiLeBiSiShouJia", identified: false, },
    ],

    "shoes": [
        { name: "賽拉特長靴", englishName: "SaiLaTeChangXue", identified: false, },
        { name: "黑色荊棘短靴", englishName: "HeiSeJingJiDuanXue", identified: false, },
        { name: "灰光破曉短靴", englishName: "HuiGuangPoXiaoDuanXue", identified: false, },

        { name: "賽勒畢斯短靴", englishName: "SaiLeBiSiDuanXue", identified: false, },
        { name: "賽拉特短靴", englishName: "SaiLaTeDuanXue", identified: false, },
    ],
}
let imgList = null;
for (let key in shopList)
{
    for (let item of shopList[key])
    {
        imgList = LoadImgList(`page/trade/goods/${key}/${item.englishName}_${item.identified ? 1 : 0}`)

    }
}