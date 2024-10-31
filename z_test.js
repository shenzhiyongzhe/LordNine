const axios = require('axios');

// "ui";
// ui.layout(
//     <vertical>
//         <button>牙叔教程</button>
//     </vertical>
// );
// setTimeout(function ()
// {
//     activity.moveTaskToBack(true);
// }, 2000);

// setTimeout(function ()
// {
//     let manager = context.getSystemService(context.ACTIVITY_SERVICE);
//     let recentTasks = manager.getRunningTasks(java.lang.Integer.MAX_VALUE);
//     for (let i = 0; i < recentTasks.size(); i++)
//     {
//         log("xk", " " + recentTasks.get(i).baseActivity.toShortString() + " ID: " + recentTasks.get(i).id + "");
//         log("xk", "@@@@ " + recentTasks.get(i).baseActivity.toShortString());
//         // bring to front
//         if (
//             recentTasks
//                 .get(i)
//                 .baseActivity.toShortString()
//                 .indexOf("com.smilegate.lordnine.stove.google") > -1
//         )
//         {
//             manager.moveTaskToFront(recentTasks.get(i).id, android.app.ActivityManager.MOVE_TASK_WITH_HOME);
//         }
//     }
// }, 4000);

const {
    Sleep, RandomPress, ReadImg, FindImg, FindMultiColors,
    HasPageback, HasMenu, FindTipPoint,
    FindBlueBtn,

    SwipeSlowly, PullDownSkill, PressBlank, PageBack,
    HasPopupClose,
    LoadImgList,
    FindCheckMark,
    FindGoldBtn,
    IsHaltMode,
    HasSkip,
    GetFormatedTimeString,
    FindNumber,
    FindRedBtn,
    IsBackpackFull,
    WaitUntil,
    FindImgInList,
    RecycleImgList,
    ClearPage,
    CloseBackpack,
    OpenBackpack,
    GetCharacterLv,
    ReadConfig,
    RewriteConfig,
    IsMoving,
    FindFloatNumber,
    EnterMenuItemPage,
    ChangeGameSetting,
    HaveDailyMissionIcon,
    HaveFinished,
} = require("./utils.js");




//检查权限

// const intent = Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
// intent.setData(Uri.parse("package:$packageName"));
// launcher.launch(intent);

// app.startActivity({
//     packageName: "org.autojs.autojs",
//     className: "org.autojs.autojs.ui.settings.SettingsActivity_",
//     root: true
// });
// let intent = new Intent();
// intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
// let pkg = "org.autojs.autojs";
// let cls = "org.autojs.autojs.ui.settings.SettingsActivity_";
// let componentName = new android.content.ComponentName(pkg, cls);
// intent.setComponent(componentName);
// app.startActivity(intent);
// runtime.requestPermissions([
//     "write_external_storage",
// ]);
// let permissionName = "camera";
// let pm = context.getPackageManager().checkPermission("write_external_storage", context.getPackageName());
// let r = android.content.pm.PackageManager.PERMISSION_GRANTED == pm;
// log(r);
// true 有权限 false 没有权限
// let permissionName = "write_external_storage";
// runtime.requestPermissions([permissionName]);
// let pm = context.getPackageManager().checkPermission("write_external_storage", context.getPackageName());
// let r = android.content.pm.PackageManager.PERMISSION_GRANTED == pm;
// log(r);
// shell("am start " + app.intentToShell({

//     packageName: "org.autojs.autojs",

//     className: "org.autojs.autojs.ui.settings.SettingsActivity_"

// }), true);
// console.log(FindBlueBtn([917, 639, 273, 68]));
// var start = 44032;  // 韩文字母的Unicode起始值
// var end = 55203;    // 韩文字母的Unicode结束值
// var random2 = new java.util.Random();
// var 长度 = 4;
// let result;
// for (var i = 0; i <= 长度; i++)
// {
//     result += String.fromCharCode(random2.nextInt(end - start + 1) + start);
// }
// console.log(result);
// console.log(FindBlueBtn([654, 439, 205, 71]));

// console.log(ReadImg('icon/font/abilitySkillPage_select'));

const DownLoadApk = (downloadUrl, savePath) =>
{
    threads.start(function ()
    {
        if (files.exists("/sdcard/AutoJs.apk"))
        {
            app.viewFile("/sdcard/AutoJs.apk");
            let is_sure = textMatches(/(.*설.*|.*정.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne();
            if (is_sure.enabled())
            {
                textMatches(/(.*설.*|.*정.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne().click();
            }
        }
        else
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
                // sleep(400);
                // click(580, 765);
                // sleep(2000);
                // click(580, 765);
            }
            else
            {
                alert('下载失败');
            }
        }

    });
};
// DownLoadApk("AutoJs.apk", "AutoJs.apk");
// const fullSavePath = `/sdcard/AutoJs.apk`;
// console.log(files.exists("/sdcard/AutoJs.apk"));


// text("설정").findOne().click();
function 关闭应用(packageName)
{
    log("强制停止:" + packageName);
    var name = getPackageName(packageName);
    if (!name)
    {
        if (getAppName(packageName))
        {
            name = packageName;
        } else
        {
            return false;
        }
    }
    app.openAppSetting(name);
    text(app.getAppName(name)).waitFor();
    let is_sure = textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled())
    {
        textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*확.*|.*인.*|.*OK.*|.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(name) + "应用已被关闭");
        sleep(1000);
        back();
    } else
    {
        log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
        back();
    }
    home();
    sleep(10000);
    app.launch(packageName);
}



// try
// {
//     // 解析JSON字符串
//     const parsedData = JSON.parse(jsonData);

//     // 检查是否为空对象或空数组
//     if (Object.keys(parsedData).length === 0)
//     {
//         console.log('JSON文件是空的');
//     } else
//     {
//         c;
//         console.log('JSON文件不是空的');
//     }
// } catch (error)
// {
//     console.error('解析JSON文件时发生错误:', error);
// }

const GetData = () =>
{
    axios({
        url: "http://10.6.130.129:8000/devices/",
        method: "get",
        responseType: 'json'
    }).then(res => console.log(res));
    // axios.get('http://localhost:8000/devices/', {}).then(res => console.log(res));
};

const PostData = (data) =>
{
    console.log("上传的数据为: " + JSON.stringify(data));
    // const res = http.post("http://10.6.130.129:8000/devices/", data);
    // if (res.statusCode == 200)
    // {
    //     console.log("数据上传成功");
    //     return true;
    // }
    // else
    // {
    //     console.log("数据上传失败");
    //     return false;
    // }
    axios.post("http://10.6.130.129:8000/devices/", data).then(res => console.log(res));
};
const UpdateData = (data) =>
{
    console.log("更新数据" + JSON.stringify(data));
    axios.put(`http://10.6.130.129:8000/devices/01`, data).then(res =>
    {
        if (res.status == 200)
        {
            console.log("更新数据成功");
        }
        else
        {
            console.log("更新数据失败");
        }
    });

};

const DeleteData = (data) =>
{
    axios({
        url: "http://10.6.130.129:8000/devices/",
        method: "delete",
        responseType: 'json'
    }).then(res => console.log(res));
};
// GetData();

// const data = { vm: "01", serverName: 99, lv: 11, diamond: 1000, gold: 10123 };
// PostData(data);

// const data = { serverName: 199, lv: 11, diamond: 1000, gold: 10123 };
// UpdateData(data);
// serverName

console.log(HasPopupClose([668, 559, 136, 29]));