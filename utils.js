
const { PagebackColorList, MenuColorList, MenuCloseColorList, BlueBtnColorList, BackpackColorList,
    SkipColorList, CheckMarkColorList, TipPointColorList, GoldBtnColorList, RedBtnColorList, PopupCloseColorList, BackpackFullColorList,
    PleaseTapBlankColorList,
} = require("./Color/Color.js");

const defaultConfig = {
    ui: {
        createCharacter: "false",
        serverName: "33",
        gameMode: "mainStory",
        manualInstance: "false",

    },
    game: {
        deathTime: 0,
        today: 0,
        reconnectionTime: 0,
        lv: 0,
        autoPotion: false,
        dailyInstance: false
    }
};

let specialConfig = {
    gameMode: null,
    initGameMode: null,
    lastModeChangeTime: new Date(),
};

const configFile = "/sdcard/LordNine/config.json";

const MenuItemRegionList = {
    "master": [857, 121, 20, 25],
    "weaponFeatures": [913, 114, 28, 29],
    "ability": [973, 118, 24, 31],
    "suit": [1030, 118, 31, 28],
    "horse": [1089, 119, 25, 24],
    "animal": [1147, 120, 31, 27],
    "propsLogin": [1205, 116, 30, 26],

    "trade": [852, 204, 33, 30],
    "equipment": [913, 207, 27, 28],
    "manufacture": [972, 206, 27, 27],
    "episode": [1032, 204, 24, 28],
    "mission": [1088, 205, 30, 30],
    "achievement": [1150, 206, 28, 26],
    "log": [1205, 202, 30, 37],

    "instance": [855, 294, 30, 31],
    "trialOfTower": [912, 295, 29, 28],
    "holyRelics": [972, 290, 30, 27],
    "mark": [1029, 296, 35, 27],
    "monsterKnowledge": [1092, 291, 24, 30],
    "friendship": [1146, 289, 31, 36],
    "boss": [1204, 289, 31, 35],

    "guild": [854, 376, 31, 37],
    "email": [1035, 552, 22, 22],
    "setting": [1149, 545, 28, 29]
};
const GroceryColorList = [
    ["#111112", [[12, 2, "#a9a892"], [20, 2, "#aba892"], [84, 6, "#a4a694"], [159, 3, "#a9a892"]]],
    ["#a9a892", [[11, 0, "#aca992"], [72, -4, "#a6a592"], [86, 6, "#a5a28b"], [144, 0, "#aca992"]]]
];
const HaltModeColorList = [
    ["#dccb96", [[1, 0, "#dccb96"], [5, 0, "#dbc996"], [8, 4, "#0e1116"], [5, 13, "#0d1015"]]],
    ["#dccb96", [[3, -2, "#dccb96"], [7, 2, "#0d1015"], [5, 12, "#0d1014"], [9, 16, "#a2946d"]]]
];

const HomeColorList = [
    ["#d3c28f", [[1, 2, "#cfbe8d"], [1, 5, "#d9c794"], [4, 2, "#dccb96"], [10, 2, "#d9c794"]]]
];
const BackpackPageColorList = [
    ["#fbfbfa", [[0, 4, "#fbfbfa"], [3, 6, "#ffffff"], [0, 7, "#fbfbfa"], [0, 10, "#fcfcfc"]]]
];

const ClickRandomly = ([startX, startY, w, h]) =>
{
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    click(x, y);
};
const CloseMenu = () =>
{

    const hasMenuClose = HasMenuClose();
    if (hasMenuClose)
    {
        RandomPress([1213, 25, 23, 24]);
    }
};
const CloseBackpack = () =>
{
    const hasBackpackClose = HasBackpackClose();
    if (hasBackpackClose)
    {
        RandomPress([1216, 110, 18, 19]);
    }
    const hasBackpackMenuClose = HasBackpackMenuClose();
    if (hasBackpackMenuClose)
    {
        RandomPress([1105, 44, 16, 18]);
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
    RandomPress([341, 615, 29, 19]);
    if (HasPopupClose([517, 310, 45, 57]))
    {
        swipe(360, 460, 470 + random(0, 30), 460, 200);
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
    if (HasPopupClose([517, 310, 45, 57]))
    {
        swipe(370, 460, 370 + random(0, 20), 470, 200);
        Sleep();
        RandomPress([537, 327, 19, 24]);
        return true;
    }
    return false;
};

const ClearPage = () =>
{
    for (let i = 0; i < 10; i++)
    {

    }
};

/**
 * @param {Array} colorArr
 * @param {Array} region
 * @param {Image} shot
 * @returns {Boolean}
 */
const FindMultiColors = (colorArr, region, shot) =>
{
    let hasColor = false;
    shot = shot || captureScreen();
    for (let i = 0; i < colorArr.length; i++)
    {
        let [color, position] = colorArr[i];
        hasColor = images.findMultiColors(shot, color, position, { region });
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
const FindTipPoint = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(TipPointColorList, region, shot); };
const FindGoldBtn = (region) => FindMultiColors(GoldBtnColorList, region);
const FindCheckMark = (region) => FindMultiColors(CheckMarkColorList, region);

const FindImgInList = (imgList, region, shot) =>
{
    shot = shot = shot || captureScreen();
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
const FindNumber = function (directory, region, shot)
{
    console.log("find number in directory: " + directory + " region: " + region);
    shot = shot || captureScreen();
    const numberArr = [];
    for (let i = 0; i < 10; i++)
    {
        let arr = [];
        for (let j = 0; j < 20; j++)
        {
            let img = ReadImg(`number/${directory}/${i}/${j}`);
            if (img == null) break;
            arr.push(img);
        }
        numberArr.push(arr);
    }
    let settleAccount = []; //settle account
    for (let i = 0; i < 10; i++)
    {
        let n = numberArr[i].length;
        for (let j = 0; j < n; j++)
        {
            let num = images.matchTemplate(shot, numberArr[i][j], { region: region });
            if (num.points.length > 0)
            {
                settleAccount.push({ num: i, points: num.points });
            }
        }

    }
    // //recycle
    numberArr.forEach(arr => arr.forEach(img => img.recycle()));
    // check if it is not a number
    if (settleAccount.length === 0) return null;
    //sort
    const sequence = [];
    settleAccount.forEach(item =>
    {
        item.points.forEach(point => sequence.push({ number: item.num, x: point.x }));
    });
    sequence.sort((a, b) => a.x - b.x);

    const filteredArr = sequence.filter((element, index) =>
    {
        if (index > 0 && Math.abs(element.x - sequence[index - 1].x) < 3)
        {
            return false; // 删除相邻元素x值小于3的情况
        }
        return true;
    });

    filteredArr.forEach((point, index, arr) => arr[index] = point.number);

    // log(sequence);
    const finalNumber = filteredArr.join("");
    console.log("find number: " + finalNumber);
    return parseInt(finalNumber);
};
const GetFormatedTimeString = function (sign)
{
    let s = sign || ":";
    const time = new Date();

    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return `${year}-${month}-${day} ${hour}${s}${minute}${s}${second}`;
};
const GetVerificationCode = () =>
{
    const url = "https://upload.chaojiying.net/Upload/Processing.php";
    const clip = images.clip(images.captureScreen(), 470, 297, 278, 86);

    // files.create("/sdcard/clip/");
    // const fileName = `${GetFormatedTimeString("_")}.png`;
    // images.save(clip, `/sdcard/clip/${fileName}`);
    // const img = files.read(`/sdcard/clip/${fileName}`);
    // const img = clip;
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
    // const result = http.request(url, {
    //     headers: {
    //         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     method: 'POST',
    //     contentType: "text/ html; charset=utf-8",
    //     body: data
    // });
    return result.body.json().pic_str;
};
const GetCaptureScreenPermission = () =>
{
    auto();
    threads.start(function () { images.requestScreenCapture(true); });
    threads.start(function ()
    {
        const hasOpen = textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(2000);
        if (hasOpen)
        {
            sleep(1000);
            hasOpen.click();
        }
    });
};
const HasPageback = () => FindMultiColors(PagebackColorList, [1216, 9, 41, 43]);

const HasMenu = () => FindMultiColors(MenuColorList, [1198, 13, 55, 47]);

const HasBackpack = () => FindMultiColors(BackpackColorList, [1143, 12, 40, 50]);
const HasBackpackClose = () => FindMultiColors(PopupCloseColorList, [1210, 101, 33, 35]);

const HasMenuClose = () => FindMultiColors(MenuCloseColorList, [1204, 17, 46, 45]);
const HasPopupClose = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(PopupCloseColorList, region, shot); };
const HasHome = () => FindMultiColors(HomeColorList, [38, 243, 35, 27]);
const HasOpenTheBackPage = (region) => FindMultiColors(BackpackPageColorList, region);
const HasBackpackMenuClose = () => FindMultiColors(PopupCloseColorList, [1094, 31, 39, 45]);
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
let moveObj = {
    clipCount: 0,
    movingClip: null
};

const IsMoving = () =>
{
    if (moveObj.clipCount == 0)
    {
        moveObj.movingClip = images.clip(captureScreen(), 180, 180, 40, 40);
    }
    if (moveObj.clipCount >= 20)
    {
        moveObj.clipCount = 0;
        const hasClip = FindImg(moveObj.movingClip, [180, 180, 40, 40]);
        if (!hasClip)
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    else
    {
        moveObj.clipCount++;
        return true;
    }

};
const IsBackpackFull = (shot) => FindMultiColors(BackpackFullColorList, [1144, 35, 39, 27], shot);
const IsInCity = () => FindMultiColors(GroceryColorList, [983, 422, 207, 64]);
const IsHaltMode = () => FindMultiColors(HaltModeColorList, [606, 643, 76, 62]);

const LaunchGame = () => app.launch("com.smilegate.lordnine.stove.google");
const LoadImgList = (url) =>
{
    const list = [];
    let img = null;
    for (let i = 0; i < 20; i++)
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
        alert("加载文件有误", "无照片文件");
    }
    return list;
};
const TapBlankToContinue = (region, shot) =>
{
    shot = shot || captureScreen();
    region = region || [573, 627, 130, 43]; //获得能力弹窗，请点击空白

    if (FindMultiColors(PleaseTapBlankColorList, [582, 529, 119, 32], shot))
    {
        console.log("点击空白...");
        RandomPress([461, 520, 309, 114]);
    }

    else if (FindMultiColors(PleaseTapBlankColorList, [588, 650, 109, 39], shot))
    {
        console.log("点击空白...");
        RandomPress([492, 498, 332, 142]);
    }
    else if (FindMultiColors(PleaseTapBlankColorList, region, shot))
    {
        console.log("点击空白...");
        RandomPress([461, 520, 309, 114]);
    }
    else if (FindMultiColors(PleaseTapBlankColorList, [572, 524, 134, 48], shot))
    {
        console.log("分解装备结束，点击空白");
        PressBlank();
    }
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
const PageBack = () => 
{
    const hasPageBack = HasPageback();
    if (hasPageBack)
    {
        RandomPress([1226, 19, 18, 23]);
    }
};

/**
 *
 *
 * @param {*} type "default all" "equipment" "props" "gold" "auto"
 * @return {*} 
 */
const OpenBackpack = (type) =>
{
    const hasBackpack = HasBackpack();
    const hasBackpackClose = HasBackpackClose();

    if (hasBackpackClose)
    {
        console.log("背包已经打开");
    }
    else if (hasBackpack != null && hasBackpackClose == null)
    {
        console.log("打开背包");
        RandomPress([1154, 22, 18, 27]);
        if (!WaitUntilBackOpen())
        {
            console.log("openbackpack ： 打开背包失败");
            return false;
        }
    }

    if (type == undefined)
    {
        console.log("open all");
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
            console.log("打开自动使用药水页面");
            RandomPress([1217, 383, 20, 17]);
        }
    }
    else if (type == "auto")
    {
        const isAutoPage = HasOpenTheBackPage([1186, 422, 18, 76]);
        if (!isAutoPage)
        {
            console.log("open auto page");
            RandomPress([1217, 450, 19, 19]);
        }
    }
    if (HasPopupClose([1203, 96, 41, 45]))
    {
        return true;
    }
    else
    {
        console.log("打开背包失败");
        return false;
    }
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

const RandomPress = ([startX, startY, w, h], delay) =>
{
    const time = random(20, 100);
    delay = delay || 1.5;
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    press(x, y, time);
    Sleep(delay);
};

const ReadImg = (name) => images.read(`./img/${name}.png`);

const RecycleImgList = (list) =>
{
    for (let i = 0; i < list.length; i++)
    {
        list[i].recycle();
    }
};

const WaitUntil = (func, frequence, loopTime) =>
{
    frequence = frequence || 1500;
    loopTime = loopTime || 30;
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
    if (IsInCity())
    {
        console.log("ReturnHome success: already in city");
        return true;
    }
    else if (HasHome())
    {
        RandomPress([45, 252, 22, 23]);
        Sleep(10);
        for (let i = 0; i < 10; i++)
        {
            if (IsInCity())
            {
                console.log("ReturnHome success: return home success");
                return true;
            }
            Sleep();
        }
    }
    else
    {
        console.log("ReturnHome failed");
        alert("回家失败", "返回首页失败");
    }
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
    const isCreate = files.createWithDirs(configFile);
    if (isCreate)
    {
        files.write(configFile, JSON.stringify(defaultConfig));
        return defaultConfig;
    }
    return JSON.parse(files.read(configFile));
};
const RewriteConfig = (attr, value) =>
{
    let config = ReadConfig();
    if (config[attr])
    {
        config[attr] = value;
        files.write(configFile, JSON.stringify(config));
        console.log("rewrite config: " + JSON.stringify(config));
    }
    else if (config[attr] == null)
    {
        alert("配置文件参数错误", "请检查配置文件参数");
    }
};
const RestartGame = (packageName, time) =>
{
    log("强制停止:" + packageName);

    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();
    let is_sure = textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled())
    {
        textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*확.*|.*인.*|.*OK.*|.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(packageName) + "应用已被关闭");
        sleep(1000);
        back();
    }
    home();
    time = time || random(60, 300);
    console.log("延迟时间：" + time);
    Sleep(time);
    app.launch(packageName);
};

const ExitHaltMode = () =>
{
    console.log("退出节电模式");
    RandomPress([628, 661, 29, 27]);
    Sleep();
    PageBack();
    Sleep();
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

const PullDownSkill = (pos) => { gesture(500, pos, [pos[0], pos[1] + 30]); Sleep(); };

/*
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
    console.log("enter npc success!" + type);
    return true;
};
const PressBlank = () => RandomPress([402, 240, 508, 244]);

const EnterMenuItemPage = (item) =>
{
    const hasOpenMenu = OpenMenu();
    if (!hasOpenMenu)
    {
        console.log("open menu failed.");
        return false;
    }
    RandomPress(MenuItemRegionList[item]);
    const hasEnterItemPage = WaitUntilPageBack();
    if (!hasEnterItemPage)
    {
        console.log("enter page failed");
        return false;
    }
    return true;
};


let DeathImgList = [];
DeathImgList = LoadImgList("special/death");

module.exports = {
    specialConfig, DeathImgList,
    CloseBackpack, CloseMenu, ClickSkip, ClickRandomly, ChangeHaltModeTime, ChangeRecoverPotionPercentToMax, ChangeRecoverPotionPercentToNormal,
    EnterMenuItemPage, ExitHaltMode,
    FindBlueBtn, FindTipPoint, FindImg, FindMultiColors, FindCheckMark, FindRedBtn, FindGoldBtn, FindImgInList, FindNumber,
    GetFormatedTimeString, GoToTheNPC, GetVerificationCode, GetCaptureScreenPermission,
    HasPageback, HasMenu, HollowPress, HasSkip, HasBackpackClose, HasBackpackMenuClose, HasPopupClose,
    IsMoving, IsBackpackFull, IsInCity, IsHaltMode,
    LoadImgList, LaunchGame,
    TapBlankToContinue,
    OpenMenu, OpenBackpack, OpenBackpackMenu,
    PageBack, PressBlank, PullDownSkill,
    RandomPress, ReadImg, ReturnHome, RestartGame, RecycleImgList, ReadConfig, RewriteConfig,
    Sleep,
    WaitUntil, WaitUntilMenu, WaitUntilPageBack, WaitUntilFindColor,
    SwipeSlowly,
};




