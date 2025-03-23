const { ComprehensiveImprovement_Instance } = require("./CommonFlow");
const { MakeSureInGame } = require("./Exception")
const { HangUpSecretLab, HangUpWild } = require("./Instance")
const { IsHaltMode, IsInCity, GetRandom, IsAuto_active, IsAuto_inactive, ClickAuto, Sleep, EnterHaltMode } = require("./utils")


let dailyTradingHours = null;

const TimeManager = () =>
{
    if (dailyTradingHours == null)
    {
        const config = ReadConfig();
        dailyTradingHours = config.dailyTradingHours;
    }
    const currentTimeString = new Date().toString().slice(16, 21)
    let isTimeToTrade = false;
    dailyTradingHours.map((time) =>
    {
        if (currentTimeString == time)
        {
            console.log(currentTimeString + " --- " + time);
            console.log("到达随机交易时间");
            isTimeToTrade = true;
        }
    });
    if (isTimeToTrade)
    {
        ComprehensiveImprovement_Instance();
    }

};
const dhyanaFlow = () =>
{
    if (!IsHaltMode())
    {
        MakeSureInGame()
        if (!IsAuto_active() && IsAuto_inactive())
        {
            ClickAuto()
        }
        else if (IsAuto_active())
        {
            console.log("自动战斗中")
            const delayTime = random(3, 700)
            console.log("延迟进入省电模式" + delayTime + " s")
            Sleep(delayTime)
            if (!IsHaltMode())
            {
                EnterHaltMode()
            }
        }
        if (IsInCity())
        {
            if (GetRandom() > 50)
            {
                HangUpSecretLab()
            }
            else
            {
                HangUpWild()
            }
        }
    }
    TimeManager()
}


module.exports = {
    dhyanaFlow
}

