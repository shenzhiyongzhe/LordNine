const { StopScript, LoadImgList, FindImgInList, FindNumber, HasPopupClose, RandomPress, FindBlueBtn, baseUrl, ReadConfig, PressToAuto, GetRandom, updateDeviceData, Sleep, FindGoldBtn, FindRedBtn, IsLocked, HasPageback, HaveToTapBlank, FindGreenBtn, humanSwipe } = require("./utils.js")


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
const getCode = () =>
{
    console.log("获取验证码")
    Sleep()
    let verificationCodeStr = textMatches(/.*請在輸入欄中輸入以下認證碼.*|.*인증번호.*/).find()
    if (verificationCodeStr)
    {
        const codeList = []
        verificationCodeStr.map(item =>
        {
            if (item.text)
            {
                let str = item.text()
                let match = str.match(/\b\d{6}\b/)
                if (match)
                {
                    codeList.push(match[0])
                }
            }
        })
        console.log("codelist: " + JSON.stringify(codeList))
        if (codeList.length >= 1)
        {
            code = codeList[codeList.length - 1]
            return code;
        }
        return null
    }
    else
    {
        console.log('╭(╯^╰)╮ 未发现新邮件')
        return null;
    }
}

humanSwipe([449, 524, 405, 32], [439, 171, 445, 35], [500, 700])