
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


const { HasMainUI } = require("./Exception.js");
const { HasTip } = require("./MainStory.js");
const { Sleep, RandomPress, ReadImg, FindImg, FindMultiColors,
    HasPageback, HasMenu, FindTipPoint,
    FindBlueBtn,

    SwipeSlowly, PullDownSkill, PressBlank, PageBack,
    HasPopupClose,
    LoadImgList,
    FindCheckMark,
    FindGoldBtn,
    NeedPressBlank,
    IsHaltMode,
    HasSkip,
    GetFormatedTimeString,
    FindNumber,
    FindRedBtn,
    IsBackpackFull,
    WaitUntil,
    FindImgInList,
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
// if (files.exists("/sdcard/AutoJs.apk"))
// {
//     app.viewFile("/sdcard/AutoJs.apk");
//     let is_sure = textMatches(/(.*설.*|.*정.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne();
//     if (is_sure.enabled())
//     {
//         textMatches(/(.*설.*|.*정.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne().click();
//     }
// }

// console.log(new Date().getMinutes());
// console.log(HasPopupClose([1216, 111, 25, 25]));
// console.log(HasPageback());

// toast("hello");

const GetAccountFile = () =>
{
    if (files.exists("/sdcard/disposition.txt"))
    {
        const accountString = files.read("/sdcard/disposition.txt");
        const accountArray = accountString.split("---");
        if (accountArray.length == 4)
        {
            return accountArray;
        }
        else
        {
            alert("账号信息有误，读取文件失败");
        }
    }
};

// console.log(id("line_2").findOne(2000));
// KeyCode("KEYCODE_A"); className("android.widget.Button").text("이메일을 잊으셨나요?").findOne();
// setText("https://mail.google.com");
// console.log(id("home_button").findOne(200));
// className("android.widget.TextView").text("업무용").depth(13).findOne();
// className("android.widget.Button").text("동의함").findOne();
// console.log(id("home_button").findOne(200));
// console.log(FindTipPoint([1164, 183, 38, 29]));
// console.log(FindTipPoint([288, 193, 28, 34]));
// console.log(HasPopupClose([1137, 60, 52, 47]));
// console.log(FindCheckMark([487, 354, 55, 50]));
// console.log(id("account_picker_continue_as_button").findOne(200));
// log(id("account_picker_continue_as_button").findOne(100));
// log(textMatches(/(.*身份继续.*)/).findOne(20));
// console.log(textMatches(/(.*选择账号.*)/).findOne(20));
// console.log(text("选择账号").findOne(20));    
// console.log(ReadImg("icon/login/input_placeholder_recoveryEmail"));   
// const hasStoveEmail = textMatches(/(.*STOVE.*)/).findOne(100);
// if (hasStoveEmail)
// {
//     console.log("recevie email");
//     hasStoveEmail.click();
// }
const GetRecoveryCode = () =>
{
    // let code = null;
    // className("android.widget.GridView").findOne().children().forEach(child =>
    // {
    //     let target = child.findOne(className("android.widget.TextView").textMatches(/\d{6}/));
    //     if (target != null)
    //     {
    //         console.log("find code");
    //         code = target.text();
    //     }
    // });
    // return code;
    const hasRecoveryCode = textMatches(/\d{6}/).findOne(100);
    if (hasRecoveryCode)
    {
        return hasRecoveryCode.text();
    }
    return null;
};

const SetApplicationProxy = () =>
{
    console.log("set application proxy");
    app.launch("fun.kitsunebi.kitsunebi4android");
    id("add_btn").findOne(15000).click();
};
// console.log(FindGoldBtn([836, 459, 146, 68]));
// console.log(NeedPressBlank([580, 645, 121, 43]));
// console.log(text("시작하기").findOne(2000));
// console.log(new Date());
// console.log(new Date().getDate());
// console.log(HasPopupClose([1184, 55, 42, 39]));
// console.log(device.getAndroidId());
// console.log(text("Refresh").findOne(20));
// splitScreen();
// console.log(GetRecoveryCode());
// menu();
// recents();
// home();
// log(text("이메일을 잊으셨나요?").findOne(10));
// console.log(text("忘记了电子邮件地址？").findOne(1000));
// console.log(textMatches(/(.*계속.*)/).findOne(20));
// console.log(text("Use the web version").findOne(20));
// className("android.widget.Button").text("동의").findOne();
// console.log(text("동의").findOne(100));
// console.log(id("fre_bottom_group").findOne(100));
// desc("복구 이메일 확인").findOne(100).click();

// text("Use the web version").findOne(20).click();
// var date1 = new Date(); //开始时间
// Sleep();
// var date2 = new Date();  //结束时间
// var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
// var hours = Math.floor(date3 / (3600 * 1000));
// console.log(hours);
// console.log(text("열기").findOne(200));
// console.log(FindBlueBtn([532, 590, 217, 67]));
// console.log(FindBlueBtn([536, 415, 204, 77]));
// toast("hello");
// console.log(HasPageback());

// console.log(new Date());
// console.log(HasPopupClose([823, 211, 35, 38]));
// const account = textMatches(/(.*@gmail.com.*)/).findOne(100).parent().parent();
// console.log(account);
// console.log(IsHaltMode());
// toast("hello");
// console.log(textMatches(/(.*시작하기.*|.*立即开始.*)/).findOne(2000));

// let hadNeedSelectCountry = text("국가 선택").findOne(20);
// if (hadNeedSelectCountry)
// {
//     hadNeedSelectCountry.click();
//     Sleep();
//     setText("Canada");
//     let hasCanada = text("Canada").findOne(2000);
//     if (hasCanada)
//     {
//         Sleep(3);
//         RandomPress([298, 401, 219, 44]);
//     }
// }

// let hadNeedInputBirthday = text("생년월일 MM.DD.YYYY").findOne(20);
// if (hadNeedInputBirthday)
// {

//     RandomPress([258, 317, 236, 28]);
//     const month = random(1, 12).toString().padStart("0", 2);
//     setText(0, month);
//     const day = random(1, 28).toString().padStart("0", 2);
//     setText(1, day);
//     const year = random(1960, 2004).toString().padStart("0", 2);
//     setText(2, year);
//     console.log(`${month}-${day} -${year}`);
// }

// console.log(textMatches(/(.*다음.*|.*下一步.*)/).findOne(15000));
// toast("hello");
// console.log(textMatches(/\d{6}/).findOne(100));
// console.log(text("동의하고 계속").findOne(20).click());
// let googleIcon = textMatches(/(.*Google.*)/).findOne(20);
// if (googleIcon)
// {
//     click(googleIcon.bounds().centerX(), googleIcon.bounds().centerY());
// }
// let hasUseTheWebVersion = text("Use the web version").findOne(20);
// if (hasUseTheWebVersion)
// {
//     console.log("发现使用网页版图标");
//     console.log(textMatches(/\d{6}/).findOne(100));
// }
// console.log(text("Refresh").findOne(100));
// console.log(hasUseTheWebVersion);
// console.log(text("국가 선택").findOne(20).click());
// setText("Korea");
// console.log(text("Korea, Republic of").findOne(10));
// text("국가 선택").findOne().parent().parent();
// 인증 메일 안내;
// toast("hello");
// console.log(HasPopupClose([1166, 61, 50, 56]));
// console.log(text("Menu").findOne(20));
// console.log(text("Refresh").findOne(20));
// console.log(textMatches(/(.*인증 메일 안내.*)/).findOne(100));

// console.log(text("동의하고 계속").findOne(20));

// let time = textMatches(/(.*days ago.*)/).findOne(20).text();
// console.log(time.replace(/[^0-9]/ig, ''));
// console.log(FindNumber("lv", [416, 382, 215, 120]));
// console.log(FindRedBtn([423, 380, 204, 69]));


// console.log(WaitUntil(HasPopupClose));
// ChangeVPNSetting();
// const comprehensiveTime = [[random(0, 11), random(0, 59)], [random(12, 23), random(0, 59)]];
// console.log("副本模式挂机随机提升战力时刻为：" + comprehensiveTime[0][0] + "时" + comprehensiveTime[0][1] + "分；" + comprehensiveTime[1][0] + "时" + comprehensiveTime[1][1] + "分");

// const a = [1, 2, 4];
// console.log(a.indexOf(3));
// RandomPress([440, 457, 10, 5]);
// console.log(HasPopupClose([515, 314, 56, 53]));
// swipe(370, 460, 370 + random(0, 20), 470, 200);
// console.log(LoadImgList("icon/font/swipeToConfirm"));
// console.log(IsBackpackFull());
// const hasSkillBookPage = FindImg(GrowthImgList.skillBookMerchantPage, [1035, 3, 203, 56], shot);

// console.log(HasPopupClose([1202, 96, 47, 48]));
// engines.stopAllAndToast();