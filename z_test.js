const { IsBackpackFull, CountDownFloaty, Sleep, StopGame } = require("./utils");



function generateUniqueRandomArray(length)
{
    const array = Array(length).fill().map((_, index) => index);
    const randomArray = []
    for (let i = array.length - 1; i > 0; i--)
    {
        let randomNumber = random(0, length - 1)
        if (!randomArray.includes(randomNumber))
        {
            randomArray.push(randomNumber)
        }
    }
    return randomArray;
}
for (let i = 0; i < 10; i++)
{
    console.log(generateUniqueRandomArray(10));

}