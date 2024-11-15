const DownLoadApk = (downloadUrl, savePath) =>
{
    threads.start(function ()
    {
        const url = `http://10.6.130.129:82/${downloadUrl}`;
        const fullSavePath = `/sdcard/${savePath}`;

        let r = http.client().newCall(
            http.buildRequest(url, {
                method: "GET",
            })
        ).execute();

        let fs = new java.io.FileOutputStream(fullSavePath);

        let is = r.body().byteStream();
        const buffer = util.java.array("byte", 1024);
        let byteRead; //每次读取的byte数
        while ((byteRead = is.read(buffer)) != -1)
        {
            fs.write(buffer, 0, byteRead); //读取
        }
        if (files.exists(fullSavePath))
        {
            app.viewFile(fullSavePath);
        }
        else
        {
            alert('下载失败');
        }
    }
    );
};
const UpdateScript = () => DownLoadApk("LordNine.apk", "LordNine/LordNine.apk");


const uiFloaty = (delayTime) =>
{
    delayTime = delayTime || random(3, 1000);
    let count = delayTime;
    const floatyWindow = floaty.window(
        <frame gravity="center" id="frame" alpha="1" bg="#71c9ce">
            <vertical gravity="center" padding="20">
                <horizental>
                    <button id="createCharacter">创建角色</button>

                </horizental>

                <button id="start" color="#e3fdfd" h="40" w="100" bg="#a6e3e9" margin="5 10" radius="10dp">开始</button>
                <text id="delayTime" gravity="center" h='0' color="#ffffff"></text>
                <button id="update" color="#e3fdfd" h="40" margin="5 10" bg="#a6e3e9">更新</button>
                <button id="stop" color="#e3fdfd" h="40" margin="5 10" bg="#a6e3e9">停止</button>
            </vertical>
        </frame>
    );
    const floatyWindowWidth = 400;
    const floatyWindowHeight = 500;
    floatyWindow.setSize(-1, -1);
    // floatyWindow.setPosition((device.width - floatyWindowWidth) / 2, (device.height - floatyWindowHeight) / 2);

    const uiInterval = setInterval(() => { }, 1000);
    floatyWindow.createCharacter.click(() =>
    {
        dialogs.input("请输入区服编号", "999", (name) =>
        {
            console.log("serverName:" + name);
        });
    });

    floatyWindow.start.click(() =>
    {
        floatyWindow.delayTime.attr("h", 300);
        floatyWindow.delayTime.setText(`${count}s`);


        const delayInterval = setInterval(() =>
        {
            ui.run(() =>
            {
                floatyWindow.delayTime.setText(`${count}s`);
            });
            console.log("delayTime:" + count);
            count--;
        }, 1000);
        setTimeout(() =>
        {
            console.log("清理前：" + delayInterval);

            clearInterval(delayInterval);
            console.log("清理后：" + delayInterval);
            floatyWindow.close();
        }, (delayTime + 1) * 1000);
        clearInterval(uiInterval);

    });
    floatyWindow.update.click(UpdateScript);
    floatyWindow.stop.click(() =>
    {
        engines.stopAllAndToast();
    });
};
// uiFloaty(3);
const cat_icon = "file://img/cat.png";

const stateFloaty = () =>
{
    const floaty_window = floaty.window(
        <frame gravity="center" id="switch" w="18" h="18" >
            <text color="#ffffff">🎯</text>

            {/* <img src="{{cat_icon}}"></img> */}
        </frame>
    );

    floaty_window.setPosition(0, 682);


};
stateFloaty();
let count = 5;
const interval = setInterval(() =>
{
    count--;
    if (count <= 0)
    {
        clearInterval(interval);
    }
}, 1000);
// uiFloaty(15);