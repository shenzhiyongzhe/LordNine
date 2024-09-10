const { FindMultiColors, FindImg, RandomPress, Sleep, ReadImg, ClickRandomly } = require("./utils.js");

const DeathPopupColorList = [
    ["#224149", [[2, 0, "#fce7bc"], [17, -4, "#224249"], [21, 0, "#fae5bc"], [20, -8, "#fbe6bc"]]],
    ["#fce7bc", [[0, 3, "#fce7bc"], [8, 2, "#f6e1b9"], [29, -4, "#ffe9be"], [29, 1, "#ffe9be"]]]
];
const BossTitleColorList = [
    ["#fc2d01", [[17, -1, "#fd2d00"], [31, -7, "#ff2d00"], [31, 5, "#fd2d00"], [47, -1, "#fd2d00"]]],
    // []
];
const DeathCheck = () =>
{
    if (FindMultiColors(DeathPopupColorList, [617, 439, 46, 26]))
    {
        console.log("Death Check: character is dead!");
        RandomPress([570, 437, 147, 31]);
        return true;
    }
    return false;
};
const lostTitleCount = 0;
const IsBossDead = () =>
{
    const bossTitle = FindMultiColors(BossTitleColorList, [899, 151, 114, 27]);
    if (bossTitle)
    {
        console.log("Lost Boss Title!");
        lostTitleCount++;
        console.log("lost title count: " + lostTitleCount);
        if (lostTitleCount > 20)
        {

            return true;
        }
    }
    return false;
};

const FindBlock = () =>
{
    const shot = captureScreen();
    const redRange = [180, 255];
};

//229,572
const SwipeUp = (sec) => gesture(sec * 1000, [229, 550], [229, 450]);
const SwipeDown = (sec) => gesture(sec * 1000, [229, 600], [229, 680]);
const SwipeLeft = (sec) => gesture(sec * 1000, [200, 572], [100, 572]);
const SwipeRight = (sec) => gesture(sec * 1000, [250, 572], [350, 572]);

const bossHPColorList = [
    ["#901919", [[0, 2, "#991b1b"], [0, 6, "#7d1414"], [3, 6, "#8d1818"], [4, 3, "#971b1a"]]]
];
const GetBossHP = () =>
{
    const hp = FindMultiColors(bossHPColorList, [517, 62, 90, 29]);
    if (!hp)
    {
        return 0;
    }
    console.log("boss hp: " + hp);
};
const IsHalfHP = () =>
{

};
const GetOutRect = (rect) =>
{

    const atLeft = rect.x < 640;
    const atUp = rect.y < 360;

    if (atUp && atLeft)
    {
        SwipeDown(4);
    }
    else if (atUp && !atLeft)
    {
        SwipeDown(4);
    }
    else if (!atUp && atLeft)
    {
        SwipeUp(4);
    }
    if (!atUp && !atLeft)
    {
        SwipeUp(4);
    }
};


const IsMoving = () =>
{
    const clip = images.clip(captureScreen(), 183, 193, 30, 23);
    Sleep(0.4);
    const isMove = FindImg(clip, [183, 193, 30, 23]);
    if (isMove)
    {
        return false;
    }
    else
    {
        return true;
    }
};



let time = 0;
// while (isAttackBoss)
// {
//     time++;
//     console.log("time: " + time);
//     SwipeLeft(2.8);
//     Sleep(1);
//     SwipeUp(2.8);
//     Sleep(1);
//     SwipeRight(2.8);
//     Sleep(1);
//     SwipeDown(2.8);
//     Sleep(1);
//     if (time > 12 && time < 24)
//     {
//         ClickRandomly([1088, 436, 26, 17]);
//         console.log("switch enemy...");
//         Sleep(0.1);
//     }

// }
const bossConfig = [
    []
];
const AttackingBoss = (number) =>
{
    SwipeLeft(3);
    let isDead = false;
    let isBossDead = false;
    while (isDead == false || isBossDead == false)
    {
        isDead = DeathCheck();
        isBossDead = IsBossDead();
        time++;
        console.log("time: " + time);
        SwipeLeft(3.5);
        Sleep(1);
        SwipeDown(3.5);
        Sleep(1);
        SwipeRight(3.5);
        Sleep(1);
        SwipeUp(3.5);
        Sleep(1);
        if (time > 12 && time < 24)
        {
            ClickRandomly([1088, 436, 26, 17]);
            console.log("switch enemy...");
            Sleep(0.1);
        }

    }
};
// module.exports = { AttackingBoss };

// SwipeLeft(3.5);
// Sleep(1);
// SwipeDown(3.5);
// Sleep(1);
// SwipeRight(3.5);
// Sleep(1);
// SwipeUp(3.5);
