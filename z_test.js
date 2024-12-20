
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

const { LoadImgList, HaveDailyMissionIcon, IsHaltMode, FindImgInList, FindNumber, ReadConfig, RewriteConfig, ReadDealRecord, ExitHaltMode,
    SwipeSlowly, Sleep, HasMenu, UpdateDealRecord,
    DeathCheck,
    GetDateTime,
    OpenBackpack,
    ChangeGameSetting,
    ClearPage,
    FindFloatNumber,
    HasPopupClose,
    IsLocked,
    FindBlueBtn,
    FindRedBtn,
    FindTipPoint,
    ReadImg,
    RandomPress,
    FindImg,
    ReadTradeRecord,
    FindCheckMark,
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

// console.log(IsHaltMode());

// console.log(FindNumber("combatPower", [668, 253, 40, 34]));
// const data = { "vm": "VM010245081019", "serverName": "3区9", "lv": 0, "combatPower": 25001, "diamond": 920, "monthlyIncome": 920, historyDealRecord: JSON.stringify({ deal: ["2024_1_1", 10] }) };
// const res = http.post("http://10.6.130.129:8001/devices", data);
// console.log(res);

// let filename = `any_name_${(new Date().toJSON().slice(0, 10))}.zip`;
// const config = ReadConfig();
// const dealRecord = ReadDealRecord();
// // console.log(`Add here ${filename}`);
// const postData = {
//     vm: "VM010240030023",
//     serverName: config.game.serverName,
//     lv: config.game.lv,
//     combatPower: config.game.combatPower,
//     diamond: 0,
//     monthlyIncome: 0,
//     historyDealRecord: JSON.stringify(dealRecord)
// };
// console.log("postData: " + JSON.stringify(postData));
// RewriteConfig(config);

// UpdateDealRecord(dealRecord);


const getRecentOneMonthDates = (removeYear, underline) =>
{
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++)
    {
        const date = new Date();
        date.setDate(today.getDate() - i); // 往前推i天
        let str = date.toISOString().split('T')[0]
        if (removeYear)
        {
            str = str.slice(5, 10)
        }
        if (underline)
        {
            str = str.split("-").join("_")
        }
        dates.push(str); // 将日期格式化为 YYYY-MM-DD
    }

    return dates.reverse(); // 确保日期按升序排列
}
// const verificationCodeStr = textMatches(/.*有效時間為10分鐘.*/).findOne(20)
// if (verificationCodeStr)
// {
//     const arr = verificationCodeStr.text().split('認證碼')
//     if (arr.length > 3)
//     {
//         code = arr[2].trim().slice(0, 6)
//     }
// }
const GetLastestCode = () =>
{
    let code = null;

    console.log("@来回查看三次，确保最新");
    for (let i = 0; i < 3; i++)
    {
        let hasInboxBtn = text("Inbox").findOne(20);
        if (hasInboxBtn)
        {
            hasInboxBtn.click();
            Sleep();
        }
        let hadPrimaryBtn = text("Primary").findOne(20);
        if (hadPrimaryBtn)
        {
            hadPrimaryBtn.click();
            Sleep();
        }
        let haveReceived = text("收件箱").findOne(20);
        if (haveReceived)
        {
            console.log("发现收件箱，点击返回主页")
            haveReceived.click();
            Sleep();
        }
        // let hasStoveEmail = textMatches(/(.*인증 메일 안내.*)/).findOne(20);
        // if (hasStoveEmail)
        // {
        //     RandomPress([74, 535, 551, 76])
        //     Sleep();
        // }
        let hasStoveEmail_zh = text('STOVE [STOVE] 驗證信說明').find()
        if (hasStoveEmail_zh)
        {
            hasStoveEmail_zh[0].click()
            console.log("for:点击最新的 stove 邮件")
        }
        Sleep()
    }

    // let hasStoveEmail = textMatches(/(.*인증 메일 안내.*)/).findOne(20);
    // if (hasStoveEmail)
    // {
    //     RandomPress([74, 535, 551, 76])
    //     Sleep();
    // }

    let hasStoveEmail_zh = text('STOVE [STOVE] 驗證信說明').find()
    if (hasStoveEmail_zh)
    {
        console.log("点击最新的 stove 邮件")
        hasStoveEmail_zh.click()
        Sleep()
    }
    let hasLatestEmail = textMatches(/(.*0 minutes ago.*|.*1 minute ago.*|.*2 minute ago.*|.*3 minute ago.*|.*4 minute ago.*|.*5 minute ago.*|.*0分钟前.*|.*1分钟前.*|.*2分钟前.*|.*3分钟前.*|.*4分钟前.*|.*5分钟前.*)/).findOne(20);
    if (hasLatestEmail)
    {
        console.log("@已经进入验证码邮件页面")

        let verificationCodeStr = textMatches(/.*您好， 為了進行身分確認，請在輸入欄中輸入以下認證碼。           認證碼.*/).find()
        if (verificationCodeStr)
        {
            const arr = verificationCodeStr[verificationCodeStr.length - 1].text().split('認證碼')
            if (arr.length >= 3)
            {
                code = arr[2].trim().slice(0, 6)
            }
        }

    }
    else
    {
        console.log('没有最新的邮件，下拉刷新')
        swipe(420, 520, 420, 920, 2000);
    }
    return code;
};
console.log(GetLastestCode())
// console.log()
// console.log(text('STOVE [STOVE] 驗證信說明').find()[0].click())
// let verificationCodeStr = textMatches(/.*有效時間為10分鐘.*/).findOne(20)
// if (verificationCodeStr)
// {
//     const arr = verificationCodeStr.text().split('認證碼')
//     if (arr.length > 3)
//     {
//         code = arr[2].trim().slice(0, 6)
//         console.log("验证码为：" + code)
//     }
// }
