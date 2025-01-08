const str = new Date().toJSON().slice(11, 16)
console.log(str);
for (let i = 0; i < 100; i++)
{
    let a = `${random(7, 8).toString().padStart(2, 0)}:${random(0, 59).toString().padStart(2, 0)}`;
    if (a == str)
    {
        console.log(a);
    }

}