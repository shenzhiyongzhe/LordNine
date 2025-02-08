const { SwipeSlowly, StopScript, LoadImgList, FindImgInList } = require("./utils.js")


const a = LoadImgList("page/trade/goods/XiShanChangXue")
const b = FindImgInList(a, [296, 294, 106, 102])
console.log(b);