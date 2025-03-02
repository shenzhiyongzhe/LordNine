const { MakeSureInGame } = require("./Exception")
const { HangUpSecretLab, HangUpWild } = require("./Instance")
const { IsHaltMode, IsInCity, GetRandom, IsAuto_active, IsAuto_inactive, ClickAuto, Sleep, EnterHaltMode } = require("./utils")



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
}


module.exports = {
    dhyanaFlow
}

