const { FindMultiColors, FindImg, RandomPress, Sleep, ReadImg, ClickRandomly } = require("./utils.js");


const FindBlock = () =>
{
    const shot = captureScreen();
    const redRange = [180, 255];
};


const SwipeUp = (sec) => gesture(sec * 1000, [212, 485], [212, 385]);
const SwipeDown = (sec) => gesture(sec * 1000, [212, 520], [212, 620]);
const SwipeLeft = (sec) => gesture(sec * 1000, [180, 496], [80, 496]);
const SwipeRight = (sec) => gesture(sec * 1000, [240, 496], [440, 496]);

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

let isAttackBoss = true;

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
SwipeLeft(3);
while (isAttackBoss)
{
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

