const { SwipeSlowly, StopScript, LoadImgList, FindImgInList, FindNumber, HasPopupClose, RandomPress, FindBlueBtn, baseUrl, ReadConfig } = require("./utils.js")

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
params.sender = "1234565"
updateOrderInfo(params)