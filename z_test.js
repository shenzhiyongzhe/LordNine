const { baseUrl, IsBackpackFull, CountDownFloaty, Sleep, StopGame, StopScript, PressToAuto, SwipeUp, SwipeDown, SwipeLeft, SwipeRight, IsMoving, OpenMap, LoadImgList, RandomPress, FindImgInList, ReadConfig } = require("./utils");
const hasLimitAccount = textMatches(/(.*服務使用限制介紹.*)/).findOne(20);
if (hasLimitAccount)
{
    console.log("检测到账号被封，关闭脚本");
    const config = ReadConfig()
    config.game.vm = config.game.vm.replace(/\n/g, '');
    const searchResponse = http.get(`${baseUrl}devices/search?vm=${config.game.vm}`)
    const searchResult = JSON.parse(searchResponse.body.string())
    let banTimes = 1;
    if (searchResult.result != null)
    {
        banTimes += searchResult.result.banTimes;
    }
    const params = {
        vm: config.game.vm,
        banTimes: banTimes,
        config: config
    }
    try
    {
        const postResult = http.post(`${baseUrl}devices`, params)
        let postResponse = JSON.parse(postResult.body.string())
        postResponse = postResponse.result
        if (postResponse.code == 0)
        {
            console.log("发生封号数据成功");
        }
        else
        {
            console.log("发生封号数据失败");
            console.log(postResponse);
        }
    }
    catch (error)
    {
        console.log(error);
    }

}