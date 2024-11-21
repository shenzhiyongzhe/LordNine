

const version = "2024/11/14 18:21";
const versionColor = "#fce38a";

let checked = "mainStory";
const floatyWindow = floaty.window(

    <card gravity="center|top" cardCornerRadius="10" >
        <vertical bg="#71c9ce" gravity="center|top">
            <button id="start" h="40" w="120" color="#ffffff" bg="#a6e3e9" marginTop="15">开始</button>
            <text id="more" textSize="20" h="20" gravity="center" marginTop="5">✡</text>

        </vertical>

        <vertical id="more_container" h="0" gravity="center" marginTop="15">
            <button id="update" color="#ffffff" w="120" h="40" bg="#a6e3e9">更新</button>
            <button id="stop" color="#ffffff" w="120" h="40" bg="#a6e3e9" marginTop="15">停止</button>
            <radiogroup orientation="horizontal" gravity="center" color="#ffffff">
                <radio id="mainStory" text="主线" textSize="10" checked="{{checked == 'mainStory' ? true : false}}" />
                <radio id="instance" text="挂机" textSize="10" checked="{{checked == 'instance' ? true : false}}" />
            </radiogroup>
            <linear orientation="horizontal" gravity="center" marginTop="15">
                <text id="createCharacter" w="60" textSize="8" color="#ffffff" >创建角色</text>
                <text textSize="10" textStyle="italic" color={versionColor}>版本：{version}</text>
            </linear>
            <linear orientation="horizontal" gravity="center" >
                <text id="downloadAutoJs" textSize="10">下载autojs</text>

            </linear>
        </vertical>
    </card>
);


floatyWindow.setSize(400, 250);
ui.post(() =>
{
    floatyWindow.setPosition((device.width - floatyWindow.getWidth()) / 2, (device.width - floatyWindow.getHeight()) / 2);
});

floatyWindow.more.click(() =>
{
    floatyWindow.setSize(400, 500);
    floatyWindow.more_container.attr("h", 240);
    floatyWindow.more.attr("h", 0);
});
// setTimeout(() => floatyWindow.close(), 5000);
const path = "/storage/emulated/0/Android/2.txt";
console.log(files.createWithDirs(path));