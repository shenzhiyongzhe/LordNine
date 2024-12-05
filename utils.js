
const { PagebackColorList, MenuColorList, MenuCloseColorList, BlueBtnColorList, BackpackColorList,
    SkipColorList, CheckMarkColorList, TipPointColorList, GoldBtnColorList, RedBtnColorList, PopupCloseColorList, BackpackFullColorList,
    QuestColorList, Auto_activeColorList, Auto_inactiveColorList,
    GreenBtnColorList, NoPotionColorList,
} = require("./Color/Color.js");
const { TipColorList, } = require("./Color/MainStoryColorList.js");


const defaultConfig = {
    gameMode: "mainStory",
    delayTime: random(0, 600),
    unlockTrade: false,
    accountSuspended: false,

    game: {
        "today": 0,
        "deathTime": 0,
        "reconnectionTime": 0,
        "serverName": 999,
        "name": '',
        "lv": 0,
        "autoPotion": false,
        "diamond": 0,
        "monthlyIncome": 0,
        "combatPower": 1000,
        "tradingTimes": 0,
        "changeGameSetting": false,
        "engraving_0": false,
        "engraving_1": false,
    },
    daily: {
        "dailyInstance": false,
        "acceptDailyMission": false,
        "hangUpSecretLab": false,

        "dailyShop": false,
        "friendshipShop": false,
        "guildDonation": false,
        "friendshipDonation": false,
    },
    equipments: {
        helmet: null,
        guard: null,
        pants: null,
        gloves: null,
        boots: null,
    }
};

let mirrorConfig = null;
let specialConfig = {
    gameMode: null,
    initGameMode: null,
    lastModeChangeTime: new Date(),
};

const configFile = "/sdcard/LordNine/config.json";



const BackpackPageColorList = [
    ["#fbfbfa", [[0, 4, "#fbfbfa"], [3, 6, "#ffffff"], [0, 7, "#fbfbfa"], [0, 10, "#fcfcfc"]]]
];
const BackpackDetailOnColorList = [
    ["#3e6759", [[6, -2, "#ffffff"], [8, 0, "#ffffff"], [14, 0, "#3f675a"], [43, 0, "#40685a"]]]
];
const popupCloseRegionList = [
    // [989, 54, 59, 52],//
    [795, 94, 40, 45],//购买药水弹窗
    [746, 98, 44, 46], //活动页面卡片弹窗
    [1130, 58, 58, 48], //活动页面窗口
    [1182, 51, 46, 45],//能力提升弹窗
    [1200, 96, 51, 48],//背包弹窗
    [1090, 32, 43, 43],//背包菜单
    [34, 100, 42, 46],//属性点弹窗
    [600, 103, 48, 50], //制作装备详细卡片
    [995, 55, 46, 50], //加入公会 弹窗页面
];
const tapBlankRegion = [
    [565, 596, 135, 50], //鉴定装备后，点击空白继续
    [570, 630, 150, 50], //获得新能力，点击空白弹窗
    [570, 520, 134, 50], //分解装备，点击空白
    [570, 640, 136, 50],//制作完成，点击空白
    [568, 514, 147, 62],
];
const ReadImg = (name) => images.read(`./img/${name}.png`);
const LoadImgList = (url, length) =>
{
    length = length || 20;
    const list = [];
    let img = null;
    for (let i = 0; i < length; i++)
    {
        img = ReadImg(`${url}/${i}`);
        if (img == null)
        {
            break;
        }
        list.push(img);
    }
    if (list.length == 0)
    {
        alert("加载文件失败", "路径：" + url + "无文件");
    }
    return list;
};

const tapBlankImgList = LoadImgList("icon/font/pleaseTapBlank");
const backpackTrashIcon = LoadImgList("backpack/trash");
const inCityIconImgList = LoadImgList("icon/inCity");
const menuCloseImgList = LoadImgList("icon/menuClose");
const popupCloseImgList = LoadImgList("icon/popupClose");

const mainStoryIconImgList = LoadImgList("icon/mainStoryIcon");
const transformIconImgList = LoadImgList("icon/transform");
const dailyMissionIconImgList = LoadImgList("icon/dailyMissionIcon");

const mapPlusIconImgList = LoadImgList("icon/mapPlus");
const haltModeBtnImgList = LoadImgList("icon/haltModeBtn");
const lockImgList = LoadImgList("icon/lock");

const CloseMenu = (shot) =>
{

    const hasMenuClose = HasMenuClose(shot);
    if (hasMenuClose)
    {
        console.log("关闭菜单");
        RandomPress([1213, 25, 23, 24]);
    }
};
const CloseBackpack = () =>
{
    const hasBackpackClose = HasBackpackClose();
    if (hasBackpackClose)
    {
        RandomPress([1216, 110, 18, 19]);
        console.log("关闭背包");
    }
    const hasBackpackMenuClose = HasBackpackMenuClose();
    if (hasBackpackMenuClose)
    {
        console.log("关闭背包菜单");
        RandomPress([1103, 46, 19, 16]);
    }
};
const ClosePopupWindows = (shot) =>
{
    let hasPopup = null;
    for (let i = 0; i < popupCloseRegionList.length; i++)
    {
        hasPopup = HasPopupClose(popupCloseRegionList[i], shot);
        if (hasPopup)
        {
            console.log("发现弹窗：" + i);
            RandomPress([hasPopup.x, hasPopup.y, 10, 10]);
            return true;
        }
    }
    for (let i = 0; i < popupCloseRegionList.length; i++)
    {
        hasPopup = FindImgInList(popupCloseImgList, popupCloseRegionList[i], shot);
        if (hasPopup)
        {
            console.log("发现弹窗：" + i);
            RandomPress([hasPopup.x, hasPopup.y, 10, 10]);
            return true;
        }
    }
};
const ClickSkip = () =>
{
    const hasSkip = HasSkip();
    if (hasSkip == "up")
    {
        RandomPress([1149, 18, 86, 23]);
        console.log("click skip on right up ");
        return true;
    }

    if (hasSkip == "bottom")
    {
        RandomPress([1160, 630, 40, 15]);
        console.log("click skip on bottom ");
        return true;
    }
    return false;
};
const ChangeRecoverPotionPercentToMax = () =>
{
    console.log("开始更改药水百分比为100%");
    if (!HasMenu())
    {
        console.log("没有发现菜单按钮，退出");
        return false;
    }
    Sleep();
    RandomPress([341, 615, 29, 19]);
    if (WaitUntil(() => HasPopupClose([517, 310, 45, 57])))
    {
        swipe(360, 455, 470 + random(0, 30), 455, 200);
        Sleep();
        RandomPress([537, 327, 19, 24]);
        return true;
    }
    return false;
};

const ChangeRecoverPotionPercentToNormal = () =>
{
    console.log("开始更改药水百分比为70%");
    if (!HasMenu())
    {
        console.log("没有发现菜单按钮，退出");
        return false;
    }
    RandomPress([341, 615, 29, 19]);
    if (WaitUntil(() => HasPopupClose([517, 310, 45, 57])))
    {
        RandomPress([390, 450, 20, 10]);
        RandomPress([537, 327, 19, 24]);
        return true;
    }
    return false;
};
const ClearPage = () =>
{
    let shot = captureScreen();
    if (HasMenu(shot) && HaveMainStoryIcon(shot) && HasHaltModeBtn(shot))
    {
        if (!HasMap(shot))
        {
            console.log("展开地图");
            RandomPress([45, 129, 24, 30]);
        }
        return true;
    }
    ClosePopupWindows(shot);
    CloseMenu(shot);
    PageBack(shot);
    TapBlankToContinue(shot);
    return false;
};
const OpenSetting = () =>
{
    let hasOpenedMenu = false;
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            if (OpenMenu())
            {
                hasOpenedMenu = true;
                break;
            }
        }
        else if (HasMenuClose())
        {
            hasOpenedMenu = true;
            break;
        }
        else
        {
            ClearPage();
            Sleep();
        }
    }
    if (!hasOpenedMenu)
    {
        console.log("打开菜单失败.退出");
        return false;
    }
    RandomPress([1150, 546, 27, 34]);
    if (WaitUntilPageBack())
    {
        return true;
    }
    else
    {
        return false;
    }
};
const ChangeGameSetting = () =>
{
    console.log("开始修改游戏画面设置");
    let isChangeSuccess = false;

    if (!OpenSetting())
    {
        console.log("进入设置页面失败，退出");
        return false;
    }
    //改变省电模式为不进入省电模式
    RandomPress([182, 77, 92, 26]); //游戏设置页
    RandomPress([631, 324, 115, 23]); //关闭省电
    RandomPress([1131, 205, 102, 24]); //取消接受队伍消息

    RandomPress([339, 75, 66, 24], 3); //环境设置页
    RandomPress([1133, 265, 102, 24]); //解析度低
    RandomPress([1127, 499, 103, 23]); //算绘低
    RandomPress([1128, 558, 106, 24]); //影格帧率30
    RandomPress([1136, 618, 99, 22]); //即使绘影
    const characterNumber = LoadImgList("icon/oneTimeCheck/characterNumber");
    for (let i = 0; i < 6; i++)
    {
        SwipeSlowly([640, 600, 10, 10], [640, 300, 10, 10], 1);
        if (FindImgInList(characterNumber, [241, 596, 194, 68]))
        {
            console.log("滑到底了");
            RandomPress([1127, 149, 103, 25]); //灯光品质 低
            RandomPress([1129, 210, 103, 21]); //关闭后期处理
            RandomPress([1126, 266, 107, 23]); //状态异常效果
            RandomPress([1139, 385, 89, 22]); //插件效果
            RandomPress([1135, 442, 90, 22]); //效果 低
            RandomPress([1126, 502, 111, 21]); //环境效果 关闭
            RandomPress([1131, 561, 103, 23]); //镜头晃动 关闭
            RandomPress([1125, 618, 110, 25]); //人物显示上限
            if (FindNumber("combatPower", [1161, 614, 38, 33]) == 10)
            {
                isChangeSuccess = true;
                console.log("更改设置成功");
                break;
            }
        }
    }
    PageBack();
    return isChangeSuccess;
};
const GetServerName = () =>
{
    if (!OpenSetting())
    {
        console.log("打开菜单失败");
        return false;
    }
    RandomPress([611, 77, 105, 25]);
    const serverNameList = [];
    for (let i = 0; i < 7; i++)
    {
        let img = LoadImgList(`icon/font/serverList/${i}`);
        serverNameList.push(img);
    }
    let serverName = null;
    const shot = captureScreen();
    for (let i = 0; i < 7; i++)
    {
        if (FindImgInList(serverNameList[i], [789, 199, 136, 55], shot))
        {
            serverName = i;
        }
    }
    if (serverName != null)
    {
        serverName = serverName + 1;
    }
    else
    {
        serverName = -1;
    }
    serverNameList.forEach(list => list.forEach(img => img.recycle()));
    const serverNumber = FindNumber("combatPower", [873, 203, 43, 45]);
    PageBack();
    return `${serverName}区${serverNumber}`;
};
const DeathImgList = LoadImgList("special/death");
const DeathCheck = (shot) =>
{
    shot = shot || captureScreen();
    let deathBtn = null;
    if (FindBlueBtn([539, 420, 205, 67], shot) || FindBlueBtn([539, 590, 207, 70], shot))
    {
        for (let i = 0; i < DeathImgList.length; i++)
        {
            deathBtn = FindImg(DeathImgList[i], [596, 423, 84, 59], shot);
            if (deathBtn)
            {
                console.log("角色死亡");
                return deathBtn;
            }
            deathBtn = FindImg(DeathImgList[i], [527, 584, 217, 85], shot);
            if (deathBtn) 
            {
                console.log("角色死亡! 失去能力点");
                return deathBtn;
            }
        }
    }
    return false;
};
/**
 * @param {Array} colorArr
 * @param {Array} region
 * @param {Image} shot
 * @returns {Boolean}
 */
const FindMultiColors = (colorArr, region, shot, threshold) =>
{
    let hasColor = false;
    shot = shot || captureScreen();
    threshold = threshold || 4;
    for (let i = 0; i < colorArr.length; i++)
    {
        let [color, position] = colorArr[i];
        hasColor = images.findMultiColors(shot, color, position, { region, threshold });
        if (hasColor)
        {
            // console.log("find multicolors: " + hasColor + "index: " + i);
            break;
        };
    }
    return hasColor;
};
const FindImg = (img, region, shot) =>
{
    shot = shot || captureScreen();
    return images.findImage(shot, img, { region });
};
const FindBlueBtn = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(BlueBtnColorList, region, shot); };

const FindRedBtn = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(RedBtnColorList, region, shot); };
const FindTipPoint = (region, shot) =>
{
    shot = shot || captureScreen();
    return FindMultiColors(TipPointColorList, region, shot, 10);
};
const FindGoldBtn = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(GoldBtnColorList, region, shot); };
const FindGreenBtn = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(GreenBtnColorList, region, shot); };
const FindCheckMark = (region) => FindMultiColors(CheckMarkColorList, region);

const FindImgInList = (imgList, region, shot) =>
{
    shot = shot || captureScreen();
    let hasImg = false;
    for (let i = 0; i < imgList.length; i++)
    {
        hasImg = FindImg(imgList[i], region, shot);
        if (hasImg)
        {
            return hasImg;
        }
    }
    return false;
};
const FindNumber = (directory, region, shot) =>
{
    shot = shot || captureScreen();
    const numberImgList = [];
    for (let i = 0; i < 11; i++)
    {
        let arr = [];
        for (let j = 0; j < 20; j++)
        {
            let img = ReadImg(`number/${directory}/${i}/${j}`);
            if (img == null) break;
            arr.push(img);
        }
        numberImgList.push(arr);
    }
    let recogNumberList = []; //识别数字的集合
    for (let i = 0; i < 10; i++)
    {
        let n = numberImgList[i].length;
        for (let j = 0; j < n; j++)
        {
            let num = images.matchTemplate(shot, numberImgList[i][j], { region: region, threshold: 0.92 });
            if (num.points.length > 0)
            {
                // recogNumberList.push({ num: i, points: num.points, threshold: num.matches[0].similarity });
                for (let k = 0; k < num.points.length; k++)
                {
                    recogNumberList.push({ number: i, point: num.points[k], similarty: num.matches[k].similarity });
                }
                // console.log("num:" + JSON.stringify(num));
            }
        }
    }
    numberImgList.forEach(arr => arr.forEach(img => img.recycle()));

    if (recogNumberList.length === 0) return null;

    // console.log("识别所有数字集合:" + JSON.stringify(recogNumberList));

    //数据初步处理：去掉相同x坐标
    const sameXValues = {};
    let sequence = recogNumberList.filter(item => 
    {
        if (!sameXValues[item.point.x])
        {
            sameXValues[item.point.x] = true;
            return true;
        }
        else
        {
            return false;
        }
        // item.points.forEach(point => sequence.push({ number: item.num, x: point.x, threshold: item.threshold }));
    });

    //数据初步处理：数字排序
    sequence.sort((a, b) => a.point.x - b.point.x);



    // 过滤相邻数字,去相似度高的
    const filter_adjacent = sequence.filter((element, index) =>
    {
        if (index > 0 && (element.point.x - sequence[index - 1].point.x) < 3)
        {
            // console.log("element" + JSON.stringify(element));
            return false;
        }
        return true;
    });
    //校验是否识别错误
    for (let i = 1; i < filter_adjacent.length; i++)
    {
        let distance = filter_adjacent[i].point.x - filter_adjacent[i - 1].point.x;
        if (distance > 16)
        {
            console.log(JSON.stringify(filter_adjacent, null, 2));
            console.log("识别数字错误，返回0");
            return 0;
        }
    }

    //过滤坐标信息 
    for (let i = 0; i < filter_adjacent.length; i++)
    {
        filter_adjacent[i] = filter_adjacent[i].number;
    }
    if (filter_adjacent.length == 0)
    {
        console.log("未识别到数字，返回null");
        return null;
    }
    const finalNumber = filter_adjacent.join("");
    // console.log("识别数字为: " + finalNumber);

    return parseFloat(finalNumber);
};
const FindFloatNumber = (directory, region, shot) =>
{
    shot = shot || captureScreen();
    const numberImgList = [];
    for (let i = 0; i < 11; i++)
    {
        let arr = [];
        for (let j = 0; j < 20; j++)
        {
            let img = ReadImg(`number/${directory}/${i}/${j}`);
            if (img == null) break;
            arr.push(img);
        }
        numberImgList.push(arr);
    }
    let recogNumberList = []; //识别数字的集合
    for (let i = 0; i < 11; i++)
    {
        let n = numberImgList[i].length;
        for (let j = 0; j < n; j++)
        {
            let num = images.matchTemplate(shot, numberImgList[i][j], { region: region, threshold: 0.92 });
            if (num.points.length > 0)
            {
                // recogNumberList.push({ num: i, points: num.points, threshold: num.matches[0].similarity });
                for (let k = 0; k < num.points.length; k++)
                {
                    recogNumberList.push({ number: i, point: num.points[k], similarty: num.matches[k].similarity });
                }
                // console.log("num:" + JSON.stringify(num));
            }
        }
    }
    numberImgList.forEach(arr => arr.forEach(img => img.recycle()));

    if (recogNumberList.length === 0) return null;

    // console.log("识别所有数字集合:" + JSON.stringify(recogNumberList));

    //数据初步处理：去掉相同x坐标
    const sameXValues = {};
    let sequence = recogNumberList.filter(item => 
    {
        if (!sameXValues[item.point.x])
        {
            sameXValues[item.point.x] = true;
            return true;
        }
        else
        {
            return false;
        }
        // item.points.forEach(point => sequence.push({ number: item.num, x: point.x, threshold: item.threshold }));
    });

    //数据初步处理：数字排序
    sequence.sort((a, b) => a.point.x - b.point.x);

    // console.log("去除相同数字及排序后结果: " + JSON.stringify(sequence));

    //剔除相邻小数点
    let filter_decimal_adjacent = sequence.filter((element, index, arr) =>
    {
        if (element.number == 10)
        {
            let prevElement = arr[index - 1];
            if (prevElement && prevElement.number == 10)
            {
                if (element.point.x - prevElement.point.x < 3)
                {
                    return false;
                }
            }
            return true;
        }
        return true;
    });
    // console.log("筛选相邻小数点后的结果: " + JSON.stringify(filter_decimal_adjacent));

    //剔除多余小数点
    let hasDecimal = false;
    for (let i = 0; i < filter_decimal_adjacent.length; i++)
    {
        if (filter_decimal_adjacent[i].number == 10)
        {
            hasDecimal = true;
        }
    }
    // console.log("@是否有小数：" + hasDecimal);
    if (hasDecimal)
    {
        filter_decimal_adjacent = filter_decimal_adjacent.filter((item, index, arr) =>
        {
            if (item.number == 10)
            {
                let prev = arr[index - 1];
                let next = arr[index + 1];
                if (prev && next)
                {
                    let prevDiff = item.point.x - prev.point.x;
                    let nextDiff = next.point.x - item.point.x;
                    if (prevDiff > 2 && nextDiff > 2)
                    {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return true;
        });

        //过滤相似度低的小数点
        const decimals = filter_decimal_adjacent.filter(item => item.number === 10);

        // 如果存在多个num为0的元素，则找到similarity最大的一个
        let maxSimilarityDecimals;
        if (decimals.length > 1)
        {
            maxSimilarityDecimals = decimals.reduce((max, current) =>
                (current.similarity > max.similarity ? current : max), decimals[0]);
        } else if (decimals.length === 1)
        {
            // 只有一个num为0的元素时直接取它
            maxSimilarityDecimals = decimals[0];
        }
        filter_decimal_adjacent = filter_decimal_adjacent.filter(item =>
            item.number !== 10 || (item.number === 10 && item === maxSimilarityDecimals));
        // console.log("删除多余的不相邻的小数点：" + JSON.stringify(filter_decimal_adjacent));
    }

    // 进一步过滤相邻数字,去相似度高的
    const filter_adjacent = filter_decimal_adjacent.filter((element, index) =>
    {
        if (index > 0 && (element.point.x - filter_decimal_adjacent[index - 1].point.x) < 2)
        {
            // console.log("element" + JSON.stringify(element));
            return false;
        }
        return true;
    });
    // console.log("进一步过滤相邻数字：" + JSON.stringify(filter_adjacent));

    //校验是否识别错误
    for (let i = 1; i < filter_adjacent.length; i++)
    {
        let distance = filter_adjacent[i].point.x - filter_adjacent[i - 1].point.x;
        if (distance > 10)
        {
            console.log(JSON.stringify(filter_adjacent, null, 2));
            console.log("识别数字错误，返回0");
            return 0;
        }
    }

    //过滤坐标信息 将10数字改为小数点
    for (let i = 0; i < filter_adjacent.length; i++)
    {
        if (filter_adjacent[i].number == 10)
        {
            filter_adjacent[i] = ".";
        }
        else
        {
            filter_adjacent[i] = filter_adjacent[i].number;
        }
    }
    if (filter_adjacent.length == 0)
    {
        console.log("未识别到数字，返回null");
        return null;
    }
    const finalNumber = filter_adjacent.join("");
    // console.log("识别数字为: " + finalNumber);

    return parseFloat(finalNumber);
};
const MatchTemplateList = (imgList, region, shot) =>
{
    shot = shot || captureScreen();
    const pointsArr = [];
    for (let i = 0; i < imgList.length; i++)
    {
        let mathes = images.matchTemplate(shot, imgList[i], { region, max: 9 });
        if (mathes)
        {
            if (mathes.points.length > 0)
            {
                pointsArr.push(mathes.points);
            }
        }
    }
    //过滤重复项
    let filterArr = [];
    pointsArr.map(points => points.map(point => filterArr.push(point)));
    filterArr.sort((a, b) => a.y - b.y);
    filterArr = filterArr.filter((point, index, arr) =>
    {
        if (index >= 1)
        {
            if (point.y - arr[index - 1].y < 50)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        else return true;
    });
    return filterArr;
};
const FormatDateTime = (date, format) =>
{
    format = format || "_";
    const year = date.getFullYear(); // 年份，例如 2023
    const month = date.getMonth() + 1; // 月份，0-11，0 表示一月，11 表示十二月
    const day = date.getDate(); // 日期，1-31
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}${format}${month}${format}${day}${format}${hour}${format}${minute}`;
};

const GetDateTime = () => FormatDateTime(new Date());
const GetVerificationCode = () =>
{
    const url = "https://upload.chaojiying.net/Upload/Processing.php";
    const clip = images.clip(images.captureScreen(), 470, 297, 278, 86);
    const img = images.toBase64(clip);
    const data =
    {
        user: "btx159632",
        pass: "Snhc2024",
        softid: "6909c4f85873ab3fd2011a6c72e4ed5b",
        codetype: "1902",
        // userfile: img
        file_base64: img
    };
    const result = http.post(url, data);

    return result.body.json().pic_str;
};

const HasPageback = (shot) => { shot = shot || captureScreen(); return FindMultiColors(PagebackColorList, [1216, 9, 41, 43], shot); };

const HasBackpack = () => FindMultiColors(BackpackColorList, [1143, 12, 40, 50]);
const HasBackpackClose = () => FindMultiColors(PopupCloseColorList, [1210, 101, 33, 35]);

const HasMenuClose = (shot) =>
{
    shot = shot || captureScreen();
    if (FindMultiColors(MenuCloseColorList, [1204, 17, 46, 45], shot))
    {
        return true;
    }
    else if (FindImgInList(menuCloseImgList, [1194, 11, 62, 56], shot))
    {
        return true;
    }
    else
    {
        return false;
    }
};
const HasPopupClose = (region, shot) =>
{
    shot = shot || captureScreen();
    let hasPopup;
    hasPopup = FindMultiColors(PopupCloseColorList, region, shot);
    if (hasPopup)
    {
        return hasPopup;
    }
    hasPopup = FindImgInList(popupCloseImgList, region, shot);
    if (hasPopup)
    {
        return hasPopup;
    }
    else
    {
        return false;
    }
};

const HasMenu = (shot) => { shot = shot || captureScreen(); return FindMultiColors(MenuColorList, [1198, 13, 55, 47], shot); };
const HasHaltModeBtn = (shot) => { shot = shot || captureScreen(); return FindImgInList(haltModeBtnImgList, [45, 402, 25, 32], shot); };
const FinishedMissionColorList = [
    ["#e8e8e7", [[10, -1, "#f0f0ef"], [3, 3, "#dbdbda"], [16, 2, "#eaeae9"], [23, 9, "#fcfcfc"]]],
    ["#3e3d3d", [[3, 7, "#eaeae9"], [13, 4, "#f0f0f0"], [20, 6, "#fdfdfd"], [24, 10, "#f6f6f6"]]],
    ["#fbfbfa", [[3, 0, "#fbfbfa"], [14, 1, "#fefefd"], [21, 5, "#fcfcfc"], [24, 8, "#fafafa"]]],
    ["#fdfdfd", [[2, 0, "#fdfdfd"], [13, 4, "#fdfdfd"], [20, 8, "#fcfcfc"], [21, 9, "#fafafa"]]],
    ["#fcfcfc", [[2, 0, "#fcfcfc"], [0, 6, "#ffffff"], [3, 6, "#ffffff"], [14, 1, "#f5f5f4"]]]
];
const accomplishImgList = LoadImgList("icon/font/accomplete");
const HaveFinished = (region, shot) =>
{
    shot = shot || captureScreen();
    let haveFinish = FindMultiColors(FinishedMissionColorList, region, shot);
    if (haveFinish)
    {
        return haveFinish;
    }
    haveFinish = FindImgInList(accomplishImgList, region, shot);
    if (haveFinish)
    {
        return haveFinish;
    }
    return false;
};
const HaveMainStoryIcon = (shot) =>
{
    shot = shot || captureScreen();

    if (FindImgInList(mainStoryIconImgList, [1197, 117, 55, 55], shot))
    {
        return true;
    }
    return false;
};
const HasTransformIcon = (shot, region) =>
{
    shot = shot || captureScreen();
    region = region || [1138, 113, 41, 48];
    return FindImgInList(transformIconImgList, region, shot);
};
const HaveDailyMissionIcon = (shot) =>
{
    shot = shot || captureScreen();
    return FindImgInList(dailyMissionIconImgList, [856, 181, 47, 232], shot);

};

const HasMap = (shot) =>
{
    shot = shot || captureScreen();
    return FindImgInList(mapPlusIconImgList, [91, 243, 33, 38], shot);
};
const HasOpenTheBackPage = (region) => FindMultiColors(BackpackPageColorList, region);
const HasBackpackMenuClose = () => HasPopupClose([1090, 31, 45, 45]);

const HasSkip = () =>
{
    const shot = captureScreen();
    const rightUp = FindMultiColors(SkipColorList, [1207, 14, 40, 36], shot);
    const rightBottom = FindMultiColors(SkipColorList, [1215, 626, 30, 26], shot);
    if (rightUp)
    {
        return "up";
    }
    else if (rightBottom)
    {
        return "bottom";
    }
    return false;
};
const HollowPress = (hollowRegion) =>
{
    const [x, y, w, h] = hollowRegion;
    let x1 = random() * 1000 + 140;
    let y1 = random() * 620 + 70;
    for (let i = 0; i < 100; i++)
    {
        x1 = random() * 1000 + 140;
        y1 = random() * 620 + 70;
        if ((x1 < x || x1 > x + w) && (y1 < y || y1 > y + h))
        {
            break;
        }
    }
    log(`RandomHollow ${x1}, ${y1}`);
    press(x1, y1, random(16, 256));
    Sleep();
};
const auto_activeImgList = LoadImgList("icon/auto/auto_active");
const auto_inactiveImgList = LoadImgList("icon/auto/auto_inactive");
const auto_questImgList = LoadImgList("icon/auto/quest");
const autoRecogRegion = [1127, 423, 61, 45];
const IsAuto_active = (shot) =>
{
    shot = shot || captureScreen();
    if (FindMultiColors(Auto_activeColorList, autoRecogRegion))
    {
        return true;
    }
    else if (FindImgInList(auto_activeImgList, autoRecogRegion))
    {
        return true;
    }
    return false;
};

const IsAuto_inactive = (shot) =>
{
    shot = shot || captureScreen();
    if (FindMultiColors(Auto_inactiveColorList, autoRecogRegion))
    {
        return true;
    }
    else if (FindImgInList(auto_inactiveImgList, autoRecogRegion))
    {
        return true;
    }
    return false;
};
const IsInQuest = (shot) =>
{
    shot = shot || captureScreen();
    if (FindMultiColors(QuestColorList, autoRecogRegion) || FindImgInList(auto_questImgList, autoRecogRegion))
    {
        return true;
    }
    return false;
};
const ClickAuto = () => RandomPress([1135, 434, 31, 26]);
const PressToAuto = () =>
{
    if (IsAuto_inactive())
    {
        const delayTime = random(1, 15);
        console.log("延迟" + delayTime + "s点击auto");
        Sleep(delayTime);
        ClickAuto();
        return true;
    }
    if (IsAuto_active())
    {
        return true;
    }
};
let moveObj = {
    clipCount: 0,
    movingClip: null
};
const IsMoving = () =>
{
    let isMoving = true;
    if (moveObj.clipCount == 0)
    {
        moveObj.movingClip = images.clip(captureScreen(), 180, 180, 40, 40);
    }

    moveObj.clipCount++;

    if (moveObj.clipCount > 5)
    {
        moveObj.clipCount = 0;
        const hasClip = FindImg(moveObj.movingClip, [180, 180, 40, 40]);
        if (!hasClip)
        {
            isMoving = true;
        }
        else
        {
            console.log("@...没有移动");
            isMoving = false;
        }
    }
    return isMoving;

};
const IsBackpackFull = (shot) => { shot = shot || captureScreen(); return FindMultiColors(BackpackFullColorList, [1144, 35, 39, 27], shot); };

const noPotionImgList = LoadImgList("special/noPotion");
const IsNoPotion = (shot, region) =>
{
    shot = shot || captureScreen();
    region = region || [325, 636, 55, 60];
    if (FindMultiColors(NoPotionColorList, region, shot) || FindImgInList(noPotionImgList, region, shot))
    {
        return true;
    }
    return false;
};
const IsInCity = () => FindImgInList(inCityIconImgList, [979, 416, 71, 72]);
const haltModeImgList = LoadImgList("icon/haltMode");
const IsHaltMode = (shot) =>
{
    shot = shot || captureScreen();
    return FindImgInList(haltModeImgList, [680, 112, 65, 48], shot) && !HasMenu(shot) && !HasHaltModeBtn();
};
const EnterHaltMode = () =>
{
    for (let i = 0; i < 5; i++)
    {
        if (HasHaltModeBtn())
        {
            let randomTime = random(3, 10);
            console.log("延迟进入省电模式：" + randomTime);
            Sleep(randomTime);
            RandomPress([49, 405, 14, 24], 5);
            if (IsHaltMode())
            {
                return true;
            }
        }
        Sleep(5);
    }
    return false;
};
const ExitHaltMode = () =>
{
    console.log("退出节电模式");
    for (let i = 0; i < 3; i++)
    {
        SwipeSlowly([556, 366, 5, 10], [1050, 366, 5, 10], 2);
        Sleep(6);
        if (HasMenu())
        {
            return true;
        }
    }
    console.log("退出节电模式失败");
    return false;
};
const LaunchGame = () => app.launch("com.smilegate.lordnine.stove.google");

const HaveToTapBlank = (region, shot) => { shot = shot || captureScreen(); return FindImgInList(tapBlankImgList, region); };
const TapBlankToContinue = (shot) =>
{
    shot = shot || captureScreen();
    let hadTapBlank;
    for (let i = 0; i < tapBlankRegion.length; i++)
    {
        hadTapBlank = HaveToTapBlank(tapBlankRegion[i], shot);
        if (hadTapBlank)
        {
            console.log("发现需要点击空白处。");
            PressBlank();
            return true;
        }
    }
    return false;
};

const OpenMenu = () =>
{
    const hasMenu = HasMenu();
    if (hasMenu)
    {
        RandomPress([1211, 21, 32, 30]);
        if (WaitUntilMenuOpen())
        {
            return true;
        }
        return false;
    }
    else if (HasMenuClose())
    {
        return true;
    }
    return false;
};

const PageBack = (shot) => 
{
    shot = shot || captureScreen();
    const hasPageBack = HasPageback(shot);
    if (hasPageBack)
    {
        console.log("返回");
        RandomPress([1226, 19, 18, 23]);
    }
};

const BackpackExceptionCheck = () =>
{
    const potionOffImgList = LoadImgList("backpack/backpackException/potionOff");
    if (FindImgInList(potionOffImgList, [338, 643, 40, 50]))
    {
        console.log("发现药水被设置关闭，点击打开");
        RandomPress([346, 619, 20, 20]);
        if (WaitUntil(() => HasPopupClose([519, 315, 55, 47])))
        {
            RandomPress([185, 382, 14, 13]);
            RandomPress([379, 450, 33, 23]);
            RandomPress([534, 326, 22, 24]); //close
            RandomPress([1215, 607, 21, 24]); //unfold
        }
    }
    const foldImgList = LoadImgList("backpack/backpackException/fold");
    if (FindImgInList(foldImgList, [1225, 609, 31, 43]))
    {
        console.log("点击展开装备页");
        RandomPress([1213, 606, 23, 24], 2);
    }
    const secondColorList = [
        ["#dfc78b", [[0, 5, "#cbb57e"], [10, 0, "#cbb57e"], [10, 3, "#d6bf85"], [10, 7, "#e6ce8f"]]],
        ["#c7b27a", [[0, 3, "#ccb67e"], [0, 9, "#cbb57e"], [10, 1, "#d4bd83"], [10, 9, "#ccb67e"]]]
    ];

    if (FindMultiColors(secondColorList, [658, 522, 35, 36], captureScreen(), 12))
    {
        console.log("点错到第二预选装备，切换第一套");
        RandomPress([594, 525, 26, 33]);
    }
    RecycleImgList(potionOffImgList);
    RecycleImgList(foldImgList);

};
/**
 *
 *
 * @param {*} type "default all" "equipment" "props" "gold" "auto"
 * @return {*} 
 */
const OpenBackpack = (type, sort) =>
{
    for (let i = 0; i < 30; i++)
    {
        if (FindImgInList(backpackTrashIcon, [975, 646, 55, 57]))
        {
            break;
        }
        else if (HasBackpack())
        {
            RandomPress([1154, 23, 20, 26]);
        }
        else if (IsHaltMode())
        {
            ExitHaltMode();
        }
        else
        {
            ClearPage();
        }

        sleep(648);
    }
    if (!HasPopupClose([1203, 96, 41, 45]))
    {
        console.log("打开背包失败");
        return false;
    }
    BackpackExceptionCheck();
    sort = sort || false;
    if (FindMultiColors(BackpackDetailOnColorList, [1121, 98, 76, 41]))
    {
        console.log("背包整理打开了，点击关闭");
        RandomPress([1138, 113, 46, 14]);
    }
    if (type == undefined)
    {
        console.log("打开所有");
    }

    if (type == "equipment")
    {
        const isEquipmentPage = HasOpenTheBackPage([1187, 217, 22, 79]);
        if (!isEquipmentPage)
        {
            console.log("打开装备页面");
            RandomPress([1212, 238, 29, 40]);
        }
    }
    else if (type == "props")
    {
        const isPropsPage = HasOpenTheBackPage([1185, 285, 21, 81]);
        if (!isPropsPage)
        {
            console.log("打开道具页面");
            RandomPress([1212, 303, 29, 47]);
        }
    }
    else if (type == "gold")
    {
        const isGoldPage = HasOpenTheBackPage([1183, 351, 27, 83]);
        if (!isGoldPage)
        {
            console.log("打开金币钻石资产详情页");
            RandomPress([1217, 383, 20, 17]);
        }
    }
    else if (type == "auto")
    {
        const isAutoPage = HasOpenTheBackPage([1186, 422, 18, 76]);
        if (!isAutoPage)
        {
            console.log("打开自动药水页面");
            RandomPress([1217, 450, 19, 19]);
        }
    }
    if (sort)
    {
        console.log("点击整理");
        RandomPress([1097, 667, 16, 19]);
    }
    return true;
};
const OpenBackpackMenu = (type) =>
{
    console.log("Open backpack menu");
    if (HasBackpackMenuClose())
    {
        console.log("already opened backpack menu");
    }
    else
    {
        const hasMenuClose = HasMenuClose();
        const hasMenu = HasMenu();
        if (hasMenuClose)
        {
            RandomPress([914, 210, 26, 23]);
            Sleep(2);
        }
        else if (hasMenu)
        {
            OpenMenu();
            const hadOpenMenu = WaitUntilMenuOpen();
            if (!hadOpenMenu)
            {
                console.log("open menu faild");
                return false;
            }
            RandomPress([914, 210, 26, 23]);
            Sleep(2);
        }
    }

    if (HasBackpackMenuClose())
    {
        switch (type)
        {
            case "identify":
                RandomPress([273, 46, 38, 17]);
                break;
            case "strengthen":
                RandomPress([409, 43, 36, 21]);
                break;
            case "recast":
                RandomPress([540, 45, 38, 20]);
                break;
            default:
                break;
        }
        return true;
    }
    return false;
};
const Sleep = (time) => { time = time || 1.5; sleep(time * 1000); };

/**
 * 随机点击
 *
 * @param {*} [startX, startY, w, h]
 * @param {*} delay 单位秒
 */
const RandomPress = ([startX, startY, w, h], delay) =>
{
    const time = random(20, 100);
    delay = delay || 1.5;
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    press(x, y, time);
    Sleep(delay);
};


const RecycleImgList = (list) => list.forEach(img => img.recycle());


/**
 * 
 * @param {*} func 执行函数
 * @param {*} frequence 执行频率，单位毫秒
 * @param {*} loopTime  循环次数
 * @returns 
 */
const WaitUntil = (func, frequence, loopTime) =>
{
    frequence = frequence || 1000;
    loopTime = loopTime || 20;
    for (let i = 0; i < loopTime; i++)
    {
        if (func())
        {
            return true;
        }
        sleep(frequence);
    }
    return false;
};

const WaitUntilMenu = () => WaitUntil(HasMenu);

const WaitUntilPageBack = () => WaitUntil(HasPageback);

const WaitUntilBackOpen = () => WaitUntil(HasBackpackClose);

const WaitUntilMenuOpen = () => WaitUntil(HasMenuClose);

const WaitUntilFindColor = (colorList, region, time) =>
{
    time = time || 60;
    for (let i = 0; i < time; i++)
    {
        if (FindMultiColors(colorList, region))
        {
            return true;
        }
        Sleep();
    }
    return false;
};
const ReturnHome = () =>
{
    for (let i = 0; i < 100; i++)
    {
        if (IsInCity())
        {
            console.log("已经在主城，回主城成功。");
            return true;
        }
        else if (HasHaltModeBtn())
        {
            RandomPress([45, 252, 22, 23]);
            if (FindBlueBtn([657, 443, 197, 66]))
            {
                console.log("离开副本，回家");
                RandomPress([678, 458, 157, 33]);
            }
            Sleep(12);
            WaitUntilMenu();
            for (let i = 0; i < 10; i++)
            {
                if (IsInCity())
                {
                    console.log("回城成功");
                    return true;
                }
                Sleep();
            }
        }
        else
        {
            ClearPage();
        }
        sleep(1000);
    }
    return false;
};
const SwipeSlowly = (startRegion, endRegion, sec) =>
{
    const [x1, y1, w1, h1] = startRegion;
    const startX = Math.round(Math.random() * w1 + x1);
    const startY = Math.round(Math.random() * h1 + y1);
    const [x2, y2, w2, h2] = endRegion;
    const endX = Math.round(Math.random() * w2 + x2);
    const endY = Math.round(Math.random() * h2 + y2);
    gesture(sec * 1000, [startX, startY], [endX, endY]);
    Sleep();
};
const ReadConfig = () =>
{
    if (!mirrorConfig)
    {
        console.log("fn: 读取配置");
        let config = null;
        const isCreate = files.createWithDirs(configFile);
        if (isCreate)
        {
            files.write(configFile, JSON.stringify(defaultConfig, null, 2));
            config = defaultConfig;
        }
        else
        {
            try
            {
                config = files.read(configFile);
                if (Object.keys(config).length === 0)
                {
                    console.log('JSON文件为空，重新生成默认配置文件');
                    files.write(configFile, JSON.stringify(defaultConfig, null, 2));
                    config = defaultConfig;
                } else
                {
                    config = JSON.parse(config);
                }
            } catch (error)
            {
                console.log("读取文件失败：" + error);
                files.write(configFile, JSON.stringify(defaultConfig, null, 2));
                config = defaultConfig;
            }
        }
        mirrorConfig = config;
    }
    return mirrorConfig;

};
const dealFile = "/sdcard/LordNine/dealRecord.json";
const dailyDiamondRecord = "/sdcard/LordNine/dailyDiamondRecord.json";
const tradeRecord = "/sdcard/LordNine/tradeRecord.json"
const emptyObj = {};
const ReadJsonFile = (path) =>
{
    const isCreate = files.createWithDirs(path);
    if (isCreate)
    {
        files.write(path, JSON.stringify(emptyObj));
        return emptyObj;
    }
    else
    {
        try
        {
            const jsonRecord = files.read(path);
            if (Object.keys(jsonRecord).length === 0)
            {
                console.log('JSON文件为空，重新生成默认配置文件');
                files.write(path, JSON.stringify(emptyObj));
                return emptyObj;
            } else
            {
                return JSON.parse(jsonRecord);
            }
        } catch (error)
        {
            console.log("读取文件失败：" + error);
            files.write(path, JSON.stringify(emptyObj));
            return emptyObj;
        }
    }
};
const RewriteJsonFile = (path, obj) => files.write(path, JSON.stringify(obj));

const ReadDealRecord = () => ReadJsonFile(dealFile);
const ReadDailyDiamondRecord = () => ReadJsonFile(dailyDiamondRecord);
const ReadTradeRecord = () => ReadJsonFile(tradeRecord)

const ReadAccountFile = () =>
{
    if (files.exists("/sdcard/disposition.txt"))
    {
        const accountString = files.read("/sdcard/disposition.txt");
        const accountArray = accountString.split("---");
        if (accountArray.length == 4)
        {
            return accountArray;
        }
        else
        {
            alert("账号信息有误，读取文件失败");
        }
    }
    else
    {
        alert("读取账号信息失败", "无账号信息");
    }
};

const UpdateTradeRecord = (obj) => RewriteJsonFile(tradeRecord, obj)
const RewriteConfig = (config) =>
{
    console.log("fn: 更新配置");
    mirrorConfig = config;
    files.write(configFile, JSON.stringify(config, null, 2));
};
const RestartGame = (packageName, time) =>
{
    log("强制停止:" + packageName);
    const appName = app.getAppName(packageName);
    app.openAppSetting(packageName);
    text(appName).waitFor();
    let is_sure = textMatches(/.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*/).findOne();
    if (is_sure.enabled())
    {
        textMatches(/.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*/).findOne().click();
        textMatches(/.*확.*|.*인.*|.*OK.*|.*确.*|.*定.*/).findOne().click();
        log(appName + "应用已被关闭");
        sleep(1000);
        back();
    }
    home();
    time = time || random(60, 300);
    console.log("延迟时间：" + time);
    Sleep(time);
    app.launch(packageName);
};



const ChangeHaltModeTime = () =>
{
    console.log("start change halt mode time");
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("open menu failed");
        CloseBackpack();
        PageBack();
        let hasOpenMenu_1 = OpenMenu();
        if (!hasOpenMenu_1)
        {
            return false;
        }
    }
    RandomPress([1151, 549, 24, 30]);
    WaitUntilPageBack();
    RandomPress([174, 74, 107, 27]);
    RandomPress([631, 324, 115, 23]);
    PageBack();
};

/**
 * 下拉技能，自动释放
 *
 * @param {*} pos [x, y]
 */

const PullDownSkill = (pos) => { gesture(500, pos, [pos[0] + random(0, 5), pos[1] + 30 + random(0, 5)]); Sleep(); };

/** 
* @param {*} type "grocery" "skill" "equipment" "friend" "exchange" "mount" "stockroom"
*/
const GoToTheNPC = (type) =>
{
    if (!IsInCity())
    {
        ReturnHome();
    }
    switch (type)
    {
        case "grocery":
            RandomPress([993, 433, 44, 44]);
            break;
        case "skill":
            RandomPress([1066, 433, 45, 43]);
            break;
        case "equipment":
            RandomPress([1139, 432, 48, 44]);
            break;
        case "friend":
            RandomPress([1214, 433, 43, 42]);
            break;
        case "exchange":
            RandomPress([996, 508, 41, 39]);
            break;
        case "mount":
            RandomPress([1068, 507, 43, 43]);
            break;
        case "stockroom":
            RandomPress([1141, 508, 44, 42]);
            break;
        default:
            alert("错误", "没有这个NPC");
            break;
    }
    Sleep(5);
    const hasEnter = WaitUntilPageBack();
    if (!hasEnter)
    {
        console.log("enter npc failed!");
        return false;
    }
    console.log("已到达npc：" + type);
    return true;
};
const BuySkillBook = (totalBuy) =>
{
    totalBuy = totalBuy || false;
    const skillBookImgList = LoadImgList("backpack/skillBook");
    const unableToUseImgList = LoadImgList("backpack/unableToUse");
    const config = ReadConfig();
    let maxSkillBook = 2;
    if (!config.game["lv"])
    {
        maxSkillBook = 2;
    }
    else if (config.game["lv"] > 33 && config.game["lv"] < 45)
    {
        maxSkillBook = 3;
    }
    else if (config.game["lv"] >= 45)
    {
        maxSkillBook = 7;
    }
    if (totalBuy == true)
    {
        maxSkillBook = 3;
    }
    console.log("最大购买技能书种类：" + maxSkillBook);
    for (let i = 0; i < maxSkillBook; i++)
    {
        let hasSkillBook = FindImgInList(skillBookImgList, [72, 69 + i * 79, 82, 92]);
        let isUnable = FindImgInList(unableToUseImgList, [66, 65 + i * 79, 48, 51]);
        if (hasSkillBook)
        {
            if (isUnable)
            {
                console.log("无法使用此技能书");
            }
            else
            {
                RandomPress([165, 89 + i * 79, 139, 47]);
                if (FindBlueBtn([645, 544, 179, 58]))
                {
                    RandomPress([664, 558, 142, 30]);
                    console.log("购买技能书成功");
                }
            }

        }
        Sleep();
    }
    console.log("没有可以购买的技能书了");
    PageBack();
    ClearPage();
};
const PressBlank = () => RandomPress([434, 55, 467, 155]);

const IsLocked = (region, shot) =>
{
    shot = shot || captureScreen();
    return FindImgInList(lockImgList, region, shot);
};

const MenuItemRegionList = {
    "master": [0, 0],
    "weaponFeatures": [0, 1],
    "ability": [0, 2],
    "suit": [0, 3],
    "horse": [0, 4],
    "animal": [0, 5],
    "propsLogin": [0, 6],

    "trade": [1, 0],
    "equipment": [1, 1],
    "manufacture": [1, 2],
    "episode": [1, 3],
    "mission": [1, 4],
    "achievement": [1, 5],
    "log": [1, 6],

    "instance": [2, 0],
    "trialOfTower": [2, 1],
    "holyRelics": [2, 2],
    "mark": [2, 3],
    "monsterKnowledge": [2, 4],
    "friendlinessLevel": [2, 5],
    "boss": [2, 6],

    "guild": [3, 0],
    "rank": [3, 1],
    "pvp": [3, 2],
    "relationship": [3, 3],
    "transferZone": [3, 4],
};
/**
 * 
 * @param {*} item  "master" "weaponFeatures" "ability" "suit" "horse" "animal" "propsLogin"
    
      "trade" "equipment" "manufacture" "episode" "mission" "achievement" "log"
     
     "instance" "trialOfTower" "holyRelics" "mark" "monsterKnowledge" "friendlinessLevel" "boss"
     
     "guild" "rank" "relationship" "transferZone"
    
   
 * @returns true or false
 */
const EnterMenuItemPage = (item) =>
{
    let hasOpenedMenu = false;
    for (let i = 0; i < 10; i++)
    {
        if (HasMenu())
        {
            if (OpenMenu())
            {
                hasOpenedMenu = true;
                break;
            }
        }
        else if (HasMenuClose())
        {
            hasOpenedMenu = true;
            break;
        }
        else
        {
            ClearPage();
            Sleep();
        }

    }
    if (!hasOpenedMenu)
    {
        console.log("打开菜单失败.退出");
        return false;
    }
    //检查是否解锁该功能
    const lockRegion = [MenuItemRegionList[item][1] * 58 + 870, MenuItemRegionList[item][0] * 88 + 130, 30, 30];
    const hasLocked = IsLocked(lockRegion);
    if (hasLocked)
    {
        console.log("未解锁：" + item);
        return false;
    }

    const clickRegion = [MenuItemRegionList[item][1] * 58 + 850, MenuItemRegionList[item][0] * 88 + 115, 30, 30];
    RandomPress(clickRegion);

    let hasEnterItemPage;
    if (item == "equipment")
    {
        hasEnterItemPage = WaitUntil(HasBackpackMenuClose);
    }
    else if (item == "guild")
    {
        for (let i = 0; i < 10; i++)
        {
            if (HasPageback())
            {
                hasEnterItemPage = true;
                break;
            }
            TapBlankToContinue();
            RandomPress([442, 399, 452, 205]);
            Sleep();
        }
    }
    else
    {
        hasEnterItemPage = WaitUntilPageBack();
    }
    if (!hasEnterItemPage)
    {
        console.log("进入页面失败，退出");
        return false;
    }
    Sleep(1);
    return true;
};
const GetCharacterLv = () =>
{
    console.log("获取玩家等级，默认为法杖等级");
    EnterMenuItemPage("weaponFeatures");
    let lv = FindNumber("lv", [208, 166, 50, 52]);
    console.log("玩家等级为：" + lv);
    PageBack();
    if (!HasMenu())
    {
        ClearPage();
    }
    return lv;
};

const ArrowImgList = {
    "up": LoadImgList("icon/arrow/up"),
    "right": LoadImgList("icon/arrow/right"),
    "down": LoadImgList("icon/arrow/down"),
    "left": LoadImgList("icon/arrow/left"),
};
const HasTip = () => FindMultiColors(TipColorList, [19, 17, 1238, 688]);
const TapTip = () =>
{
    const hasTip = HasTip();
    if (hasTip)
    {
        console.log("提示: " + hasTip);
        TapArrow();
    }
};
let tapTipIndex = 0;

const CommonTipList = [
    [720, 387, 96, 22], //药水 100
    [705, 578, 58, 26], //药水 确认
    [907, 132, 35, 34],//游戏开始的第一个tip
    [807, 142, 21, 29],//游戏开始的第一个紫色问好
    [1212, 23, 26, 28], //菜单
    [1149, 116, 26, 29], //核萌
];
const TapArrow = () =>
{
    const region = [0, 0, 1280, 720];
    const shot = captureScreen();
    let hadFindArrow = false;
    for (let key in ArrowImgList)
    {
        let hasArrow = FindImgInList(ArrowImgList[key], region, shot);
        if (hasArrow)
        {
            hadFindArrow = true;
            console.log("箭头方向: " + key + " " + "位置：" + hasArrow);
            const position = hasArrow;
            if (key == "up")
            {
                RandomPress([position.x - 5, position.y - 48, 10, 30]);
            }
            else if (key == "down")
            {
                RandomPress([position.x, position.y + 20, 10, 10]);
            }
            else if (key == "left")
            {
                RandomPress([position.x - 20, position.y, 10, 10]);
            }
            else if (key == "right")
            {
                RandomPress([position.x + 10, position.y, 30, 10]);
            }
        }
    }
    if (!hadFindArrow)
    {
        console.log("未发现箭头。");
        if (tapTipIndex < CommonTipList.length)
        {
            RandomPress(CommonTipList[tapTipIndex]);
            tapTipIndex++;
        }
        else
        {
            RandomPress([720, 387, 96, 22]);
            tapTipIndex = 0;
        }
        console.log("按顺序点击常见卡点提示,当前索引为：" + tapTipIndex);
    }
    return hadFindArrow;
};

const StopScript = () => java.lang.System.exit(0);

module.exports = {
    specialConfig,
    BuySkillBook,
    CloseBackpack, CloseMenu, ClickSkip, ChangeHaltModeTime, ChangeRecoverPotionPercentToMax, ChangeRecoverPotionPercentToNormal, ClearPage, ChangeGameSetting, ClickAuto,
    DeathCheck,
    EnterMenuItemPage, ExitHaltMode, EnterHaltMode,
    FindBlueBtn, FindTipPoint, FindImg, FindMultiColors, FindCheckMark, FindRedBtn, FindGoldBtn, FindGreenBtn, FindImgInList, FindNumber, FindFloatNumber,
    GoToTheNPC, GetVerificationCode, GetCharacterLv, GetDateTime, GetServerName,
    HasPageback, HasMenu, HasMenuClose, HollowPress, HasSkip, HasBackpackClose, HasBackpackMenuClose, HasPopupClose, HasTip, HaveMainStoryIcon, HasTransformIcon, HaveDailyMissionIcon,
    HaveFinished, HasMap, HaveToTapBlank,
    IsMoving, IsBackpackFull, IsInCity, IsHaltMode, IsLocked, IsInQuest, IsAuto_active, IsAuto_inactive, IsNoPotion,
    LoadImgList, LaunchGame,
    MatchTemplateList,
    TapBlankToContinue, TapTip,
    OpenMenu, OpenBackpack, OpenBackpackMenu,
    PageBack, PressBlank, PullDownSkill, PressToAuto,
    RandomPress, ReadImg, ReturnHome, RestartGame, RecycleImgList, ReadConfig, RewriteConfig, ReadDealRecord, ReadAccountFile, ReadDailyDiamondRecord, ReadTradeRecord,
    UpdateTradeRecord,
    Sleep, SwipeSlowly, StopScript,
    WaitUntil, WaitUntilMenu, WaitUntilPageBack, WaitUntilFindColor,
};

