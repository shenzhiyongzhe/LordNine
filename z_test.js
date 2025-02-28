const { StopScript, LoadImgList, FindImgInList, FindNumber, HasPopupClose, RandomPress, FindBlueBtn, baseUrl, ReadConfig, PressToAuto, GetRandom, updateDeviceData, Sleep, FindGoldBtn, FindRedBtn, IsLocked, HasPageback, HaveToTapBlank, FindGreenBtn } = require("./utils.js")


// for (let i = 0; i < 1000; i++)
// {
//     delay = logNormal(Math.log(1300), 0.4);
//     if (delay < min)
//     {
//         min = delay
//     }
//     if (delay > max)
//     {
//         max = delay
//     }
//     number += delay

// }
// console.log(`总延迟：${number},平均延迟：${number / 1000}ms, 最大延迟：${max}ms, 最小延迟：${min}ms`);


console.log(FindBlueBtn([930, 640, 264, 71]));

