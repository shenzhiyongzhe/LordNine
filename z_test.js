const { IsBackpackFull, CountDownFloaty, Sleep } = require("./utils");

const delayTime = random(3, 6);
console.log("游戏延迟启动时间: " + delayTime + "s");
threads.start(() => CountDownFloaty(delayTime))
for (let i = 0; i < delayTime; i++)
{
    sleep(1000)
}
console.log('jieshu');