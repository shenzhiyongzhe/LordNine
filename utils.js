const { PagebackColorList, MenuColorList, MenuCloseColorList, BlueBtnColorList, BackpackCloseColorList, BackpackColorList,
    SkipColorList, CheckMarkColorList, BlackScreenColorList, TipPointColorList,
} = require("./Color/Color.js");

const defaultConfig = {
    ui: {
        serverName: "33",

    },
    game: {

    }
};
const configFile = "/sdcard/LordNine/config.json";

const GroceryColorList = [
    ["#111112", [[12, 2, "#a9a892"], [20, 2, "#aba892"], [84, 6, "#a4a694"], [159, 3, "#a9a892"]]],
    ["#a9a892", [[11, 0, "#aca992"], [72, -4, "#a6a592"], [86, 6, "#a5a28b"], [144, 0, "#aca992"]]]
];
const HaltModeColorList = [
    ["#b9a97e", [[7, 1, "#bcac7f"], [16, -1, "#dccb96"], [23, 0, "#d6c492"], [17, -18, "#dccb96"]]]
];

const Sleep = (time) => { time = time || 1.5; sleep(time * 1000); };

const RandomPress = ([startX, startY, w, h]) =>
{
    const time = random(16, 256);
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    press(x, y, time);
    Sleep();
};
const ClickRandomly = ([startX, startY, w, h]) =>
{
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    click(x, y);
};
const ReadImg = (name) => images.read(`./img/${name}.png`);
const FindImg = (img, region, shot) =>
{
    shot = shot || captureScreen();
    return images.findImage(shot, img, { region });
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
        if (hasColor) break;
    }
    return hasColor;
};

const HasPageback = () => FindMultiColors(PagebackColorList, [1216, 9, 41, 43]);

const HasMenu = () => FindMultiColors(MenuColorList, [1198, 13, 55, 47]);

const HasBackpack = () => FindMultiColors(BackpackColorList, [1143, 12, 40, 50]);
const HasBackpackClose = () => FindMultiColors(BackpackCloseColorList, [1210, 101, 33, 35]);

const PageBack = () =>
{
    const hasPageBack = HasPageback();
    if (hasPageBack)
    {
        RandomPress([1226, 19, 18, 23]);
    }
};

const OpenMenu = () =>
{
    const hasMenu = HasMenu();
    if (hasMenu)
    {
        RandomPress([1211, 21, 32, 30]);
        return true;
    }
    return false;
};
const CloseMenu = () =>
{

    const hasMenuClose = FindMultiColors(MenuCloseColorList, [1204, 17, 46, 45]);
    if (hasMenuClose)
    {
        RandomPress([1213, 25, 23, 24]);
    }
};
const WaitUntilBackOpen = () =>
{
    for (let i = 0; i < 20; i++)
    {
        if (HasBackpackClose())
        {
            return true;
        }
        Sleep(0.5);
    }
    return false;
};
const BackpackPageColorList = [
    ["#fbfbfa", [[0, 4, "#fbfbfa"], [3, 6, "#ffffff"], [0, 7, "#fbfbfa"], [0, 10, "#fcfcfc"]]]
];
const HasOpenTheBackPage = (region) => FindMultiColors(BackpackPageColorList, region);
const OpenBackpack = (type) =>
{
    const hasBackpack = HasBackpack();
    const hasBackpackClose = HasBackpackClose();

    if (hasBackpackClose)
    {
        console.log("backpack has already opened");
    }
    else if (hasBackpack && hasBackpackClose == null)
    {
        console.log("open backpack");
        RandomPress([1154, 22, 18, 27]);
        if (!WaitUntilBackOpen())
        {
            console.log("backpack did not open!");
            return false;
        }
    }

    if (type == undefined)
    {
        console.log("open all");
        return true;
    }
    if (type == "equipment")
    {
        const isEquipmentPage = HasOpenTheBackPage([1187, 217, 22, 79]);
        if (!isEquipmentPage)
        {
            console.log("open equipment page");
            RandomPress([1212, 238, 29, 40]);
        }
        return true;

    }
    else if (type == "props")
    {
        const isPropsPage = HasOpenTheBackPage([1185, 285, 21, 81]);
        if (!isPropsPage)
        {
            console.log("open props");
            RandomPress([1212, 303, 29, 47]);
        }
        return true;

    }
    else if (type == "gold")
    {
        const isGoldPage = HasOpenTheBackPage([1183, 351, 27, 83]);
        if (isGoldPage)
        {
            console.log("open gold page");
            RandomPress([1217, 383, 20, 17]);
        }
        return true;
    }
    else if (type == "auto")
    {
        const isAutoPage = HasOpenTheBackPage([1186, 422, 18, 76]);
        if (isAutoPage)
        {
            console.log("open auto page");
            RandomPress([1217, 450, 19, 19]);
        }
        return true;
    }
    console.log("open backpack failed !");
    return false;
};
const HasBackpackMenuClose = () => FindMultiColors(BackpackCloseColorList, [1094, 31, 39, 45]);
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
const FindBlueBtn = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(BlueBtnColorList, region, shot); };

const FindTipPoint = (region, shot) => { shot = shot || captureScreen(); return FindMultiColors(TipPointColorList, region, shot); };

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

const WaitUntilMenu = () =>
{
    for (let i = 0; i < 16; i++)
    {
        let hasMenu = HasMenu();
        if (hasMenu)
        {
            Sleep(1);
            return true;
        }
        Sleep(1);
    }
    return false;
};

const WaitUntilPageBack = () =>
{
    for (let i = 0; i < 10; i++)
    {
        let hasPageBack = HasPageback();
        if (hasPageBack)
        {
            Sleep(1);
            return true;
        }
        Sleep();
    }
    return false;
};

const IsInCity = () => FindMultiColors(GroceryColorList, [983, 422, 207, 64]);
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
    }
    else
    {
        alert("配置文件参数错误", "请检查配置文件参数");
    }
};
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
const FindCheckMark = (region) => FindMultiColors(CheckMarkColorList, region);
const FindBlackScreen = (region) => FindMultiColors(BlackScreenColorList, region);

const IsHaltMode = () => FindMultiColors(HaltModeColorList, [622, 652, 43, 48]);

const ExitHaltMode = () =>
{
    RandomPress([628, 661, 29, 27]);
    Sleep(3);
    PageBack();
    Sleep();
};
/**
 * 下拉技能，自动释放
 *
 * @param {*} pos [x, y]
 */
const PullDownSkill = (pos) => gesture(1000, pos, [pos[0], pos[1] + 30]);

module.exports = {
    FindBlueBtn, FindTipPoint, FindImg, FindMultiColors, FindCheckMark, FindBlackScreen,
    HasPageback, HasMenu, HollowPress, HasSkip, ClickSkip,
    OpenMenu, OpenBackpack, CloseBackpack, CloseMenu, HasBackpackClose, HasBackpackMenuClose,
    PageBack,
    RandomPress, ReadImg, ClickRandomly,
    Sleep,
    WaitUntilMenu, WaitUntilPageBack,
    IsInCity, SwipeSlowly,
    ReadConfig, RewriteConfig, IsHaltMode, ExitHaltMode, PullDownSkill,
};



