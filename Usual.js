const { Sleep, OpenMenu } = require("./utils.js");

const GetAchievementAwards = () =>
{
    OpenMenu();
};

const PickAbilityPoint = () =>
{
    console.log("Start: Pick ability point");
    const crucifixIcon = ReadImg("icon/crucifix");
    const hasCrucifixIcon = FindImg(crucifixIcon, [325, 61, 44, 45]);
    if (!hasCrucifixIcon) { console.log("no crucifix icon"); return; }
};

const EquipAbility = () =>
{

};