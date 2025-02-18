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

const updateOrderInfo = (params) =>
{
    try
    {
        console.log("更新订单信息" + JSON.stringify(params));
        const res = http.post(`${baseUrl}order/create`, params)
        console.log("发送订单返回结果: " + res.body.string());
    } catch (error)
    {
        console.log("更新订单错误：" + error);
    }
}

const helmet = [
    "SaiLaTeMaoZi", "HuiGuangPoXiaoMaoZi", "SaiLaTeTouJin", "SaiLeBiSiTouJin"
]
const tops = [
    "SaiLaTeChangPao", "HuiGuangPoXiaoChangPao", "HuiGuangPoXiaoBeiXin", "SaiLeBiSiBeiXin", "HuiGuangPoXiaoKuiJia", "SaiLeBiSiKuiJia", "SaiLaTeKuiJia"
]
const underClothes = [
    "HuiGuangPoXiaoBuKuZi", "SaiLeBiSiBuKuZi", "SaiLaTeBuKuZi", "HuiGuangPoXiaoPiKu", "SaiLeBiSiPiKu"
]
const gloves = [
    "HuiGuangPoXiaoShouTao", "HeiSeJingJiHuShou", "SaiLeBiSiHuShou", "HuiGuangPoXiaoShouJia", "SaiLeBiSiShouJia"
]
const shoes = [
    "HeiSeJingJiDuanXue", "HuiGuangPoXiaoDuanXue", "SaiLeBiSiDuanXue", "SaiLaTeDuanXue"
]

const basePath = "page/trade/goods/"
// const imgList = LoadImgList(`${basePath}shoes/${shoes[0]}_0`)

// const regionList = [
//     [261, 172, 156, 145],
// ]

// for (let i = 0; i < regionList.length; i++)
// {
//     console.log(FindImgInList(imgList, regionList[i]));
// }
const ReadAccountFile = () =>
{
    if (files.exists("/sdcard/local_information/machine_information.json"))
    {
        const file = files.read("/sdcard/local_information/machine_information.json")
        const accountInfo = JSON.parse(file)
        const { id, instance, account, password, auxiliary_mailbox } = accountInfo
        if (id && instance && account && password && auxiliary_mailbox)
        {
            return accountInfo;
        }
        else
        {
            alert("账号信息有误", "请检查账号文件内容是否正常")
            StopScript()
        }
    }
    else
    {
        alert("读取账号信息失败", "无账号信息");
        StopScript()
    }
};

const autoColorLists = [
    ["#fff1d8", [[1, 4, "#fff3d8"], [2, 7, "#ffeccd"], [7, 3, "#ffefcd"], [31, 4, "#fffae9"]]],
    ["#ffefd2", [[1, 2, "#fff3d8"], [2, 4, "#fff4d6"], [7, 0, "#ffefcd"], [18, 0, "#ffebc5"]]]
]

// const week = [random(1, 7), GetRandom() > 50 ? random(1, 7) : 0, GetRandom() > 50 ? random(1, 7) : 0]
// console.log(week);
// console.log(new Date().getDay());
// const date = new Date();
// const options = {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: "numeric",
//     timeZone: 'Asia/Shanghai'
// };
// console.log(date.toLocaleDateString('zh-CN', options)); // 包含星期、年、月、日，并使用上海时区

let probabilityPool = Array.from({ length: 100 }, (_, index) => index);
let eventList = Array.from({ length: 30 }, (_, index) => index);
const getProbability = (length) =>
{
    const arr = []
    for (let i = 0; i < eventList.length; i++)
    {

    }
    return arr;
}
console.log(getProbability(2));
console.log(probabilityPool.length);