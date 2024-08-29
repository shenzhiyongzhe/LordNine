const { ListenServerFlow } = require("./ListenServer.js");
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, SwipeSlowly,
    ClickSkip,
    FindBlueBtn, FindCheckMark, PressBlank,
    HasSkip,
    HasPopupClose,
    ReadConfig,
    RewriteConfig,
    WaitUntil,
    WaitUntilFindColor,
    RestartGame,

} = require("./utils.js");


function GenerateRandomName()
{
    const CharDiction = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
        // "ㄱ", 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
        // 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ',
        // 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
        // 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ',
    ];

    let name = [];
    for (let i = 0; i < 8; i++)
    {
        name.push(CharDiction[Math.floor(random() * CharDiction.length)]);
    }
    return name.join("");
}

const LordNineWordColorList = [
    ["#cda465", [[75, -4, "#d8b773"], [139, -8, "#d8b77e"], [189, -5, "#c79959"], [205, 13, "#a67c41"]]],
    ["#dbbb87", [[25, 3, "#be985b"], [49, 8, "#c8a263"], [99, 4, "#e2b980"], [124, 1, "#dab66d"]]]
];

const WhiteAvatarColorList = [
    ["#a4a4a3", [[2, 0, "#b1b1b1"], [7, 1, "#b4b4b3"], [2, 4, "#bababa"], [5, 13, "#b6b6b6"]]],
    ["#a4a4a3", [[1, 0, "#a6a6a5"], [2, 0, "#b1b1b1"], [5, 3, "#b4b4b3"], [3, 10, "#b8b8b8"]]]
];


const CanNotCreateCharacterColorList = [
    ["#862f30", [[5, 0, "#802d2f"], [14, 0, "#8a3031"], [20, 1, "#893031"], [37, -1, "#882f30"]]],
    ["#8b3031", [[7, 0, "#8a3031"], [14, 0, "#8b3031"], [21, 0, "#7e2d2e"], [33, 2, "#8b3031"]]],
    ["#832f2f", [[5, 1, "#893031"], [14, 1, "#8b3031"], [20, 1, "#8b3031"], [34, 1, "#842f2f"]]],
    ["#832e2f", [[18, -3, "#8a3031"], [33, -1, "#832e2f"], [44, 0, "#762b2c"], [32, -6, "#862f30"]]],
    ["#8a3031", [[15, 2, "#882f30"], [29, 2, "#872f30"], [41, -2, "#8b3031"], [44, -2, "#8b3031"]]],
    ["#8b3031", [[5, 0, "#8a3031"], [16, 5, "#832e2f"], [32, 2, "#892f31"], [50, 0, "#8b3031"]]],
    ["#8b3031", [[20, 1, "#8b3031"], [32, 4, "#882f30"], [45, -2, "#882f30"], [49, 2, "#7d2d2e"]]],
    ["#8b3031", [[14, 0, "#8b3031"], [20, 0, "#8b3031"], [33, 3, "#8b3031"], [50, 2, "#8b3031"]]],
    ["#8a3031", [[17, 1, "#862f30"], [27, 1, "#8b3031"], [32, 1, "#8a3031"], [46, -2, "#8b3031"]]]
];

const RedBtnColorList = [
    ["#381a1a", [[41, -2, "#3d1c1c"], [137, 1, "#3d1d1d"], [120, 27, "#421f1f"], [16, 27, "#432020"]]],
];
const BlackBtnColorList = [
    ["#000000", [[51, -4, "#000000"], [86, 33, "#000000"], [35, 51, "#000000"], [-42, 27, "#000000"]]],
    ["#000000", [[64, -1, "#000000"], [110, 23, "#000000"], [55, 51, "#000000"], [-3, 12, "#000000"]]],
    ["#000000", [[118, -8, "#000000"], [305, -1, "#000000"], [308, 45, "#000000"], [56, 37, "#000000"]]],
    ["#000000", [[100, 0, "#000000"], [237, 19, "#000000"], [210, 41, "#000000"], [32, 33, "#000000"]]]
];

const ImgList = {
    "googleLogin": ReadImg("icon/login/googleLogin"),
    "selectAccount_zh": ReadImg("icon/login/selectAccount_zh"),
    "selectAccount_kr": ReadImg("icon/login/selectAccount_kr")
};

const serverNameImgList = [];

const LoadServerImgList = () =>
{
    let img = null;
    for (let i = 0; i < 7; i++)
    {
        img = ReadImg(`icon/beginner/serverNameList/${i}`);
        if (!img)
        {
            break;
        }
        serverNameImgList.push(img);
    }
};

const RecycleServerImgList = () =>
{
    serverNameImgList.forEach(Item => Item.recycle());
};

LoadServerImgList();

const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);

//*****************************************************main******************************************** */

const FindRedBtn = (region) => FindMultiColors(RedBtnColorList, region);
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
    else
    {
        alert("读取文件失败", "没有导入账号文件");
    }
};
const WaitUntilEnterAccountPage = () =>
{
    console.log("wait until enter account page");
    app.launch("com.smilegate.lordnine.stove.google");

    let hasEnterAccountPage = false;

    const WhiteAvatarColorList = [
        ["#a4a4a3", [[2, 0, "#b1b1b1"], [7, 1, "#b4b4b3"], [2, 4, "#bababa"], [5, 13, "#b6b6b6"]]],
        ["#a4a4a3", [[1, 0, "#a6a6a5"], [2, 0, "#b1b1b1"], [5, 3, "#b4b4b3"], [3, 10, "#b8b8b8"]]]
    ];
    const CloseMarkColorList = [
        ["#ebebeb", [[18, 17, "#ebebeb"], [36, 36, "#ebebeb"], [33, 1, "#ebebeb"], [3, 32, "#ebebeb"]]]
    ];

    for (let i = 0; i < 30; i++)
    {
        let shot = captureScreen();
        if (HasMainUI())
        {
            if (!FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41], shot))
            {
                Sleep(5);
                PressBlank();
                const hasGoogleIcon = WaitUntil(() => FindImg(ImgList.googleLogin, [649, 492, 108, 105]));
                if (hasGoogleIcon)
                {
                    RandomPress([759, 523, 298, 30]);
                    console.log("enter google page successfully");
                    Sleep(5);
                    hasEnterAccountPage = true;
                    break;
                }
                else
                {
                    alert("登录失败！", "未发现谷歌登录选项");
                }
            }
        }
        else if (FindImg(ImgList.googleLogin, [649, 492, 108, 105], shot))
        {
            Sleep(3);
            RandomPress([759, 523, 298, 30]);
            console.log("enter google page successfully");
            Sleep(5);
            hasEnterAccountPage = true;
            break;
        }
        else if (HasSkip())
        {
            ClickSkip();
        }
        else if (FindMultiColors(CloseMarkColorList, [1183, 24, 75, 79], shot))
        {
            RandomPress([1202, 43, 32, 43]);
        }
        else if (FindMultiColors(BlackBtnColorList, [268, 516, 749, 122], shot)) 
        {
            RandomPress([342, 564, 627, 37]);
        }
        Sleep();
    }
    return hasEnterAccountPage;
};
// const WaitUntilSelectAccountPage = () =>
// {
//     console.log("wait unitl have select account page");
//     for (let i = 0; i < 30; i++)
//     {
//         if (FindImg(ImgList.selectAccount_zh, [477, 106, 357, 170]))
//         {
//             RandomPress([385, 282, 494, 50]);
//             return true;
//         }
//         else if (FindImg(ImgList.selectAccount_kr), [490, 67, 306, 130])
//         {
//             RandomPress([402, 284, 328, 51]);
//             return true;
//         }
//         Sleep();
//     }
//     return false;
// };

// WaitUntilEnterAccountPage();
const LoginGoogleAccount = () =>
{
    console.log("wait until enter login page");
    const accountArray = GetAccountFile();

    const ClickNextBtn = () =>
    {
        const hasNext_kr = text("다음").findOne(3000);
        const hasNext_zh = text("下一步").findOne(3000);
        if (hasNext_zh)
        {
            hasNext_zh.click();
            console.log("next btn clicked");
        }
        else if (hasNext_kr)
        {
            hasNext_kr.click();
            console.log("next btn clicked");
        }
    };
    for (let i = 0; i < 30; i++)
    {
        let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(100);
        let hasForgetEmail_kr = text("이메일을 잊으셨나요?").findOne(100);
        if (hasForgetEmail_zh || hasForgetEmail_kr)
        {
            console.log("发现忘记电子邮件地址。 开始输入邮箱。");
            console.log("input email account!");
            setText(accountArray[0]);
            Sleep();
            ClickNextBtn();
            Sleep();
            break;
        }
        Sleep();
    }
    for (let i = 0; i < 30; i++)
    {
        let hasPasswordInputBox_kr = text("비밀번호 표시").findOne(100);
        let hasPasswordInputBox_zh = text("显示密码").findOne(100);
        if (hasPasswordInputBox_kr || hasPasswordInputBox_zh)
        {
            console.log("input password");
            setText(accountArray[1]);
            Sleep();
            ClickNextBtn();
            Sleep();
            break;
        }
        Sleep();
    }

    //使用辅助邮箱来验证
    for (let i = 0; i < 30; i++)
    {
        let hasRecoveryEmailOption = desc("복구 이메일 확인").findOne(100);
        if (hasRecoveryEmailOption)
        {
            console.log("use recovery email to verify");
            hasRecoveryEmailOption.click();
            break;
        }
        else if (text("다른 방법 시도").findOne(100))
        {
            break;
        }
        else if (text("동의").findOne(100))
        {
            break;
        }
        Sleep();
    }
    for (let i = 0; i < 30; i++)
    {
        let hasInputRecovery = text("다른 방법 시도").findOne(100);
        if (hasInputRecovery)
        {
            console.log("input recovery email");
            setText(accountArray[2]);
            ClickNextBtn();
            break;
        }
        else if (text("동의").findOne(100))
        {
            break;
        }
        Sleep();
    }
    for (let i = 0; i < 30; i++)
    {
        let hasAggreeBtn_zh = text("我同意").findOne(100);
        let hasAggreeBtn_kr = text("동의").findOne(100);
        if (hasAggreeBtn_zh)
        {
            console.log("我同意");
            hasAggreeBtn.click();
            break;
        }
        else if (hasAggreeBtn_kr)
        {
            console.log("同意");
            hasAggreeBtn_kr.click();
            break;
        }
    }
    for (let i = 0; i < 30; i++)
    {
        let hasMoreBtn_zh = text("更多").findOne(100);
        let hasMoreBtn_kr = text("더보기").findOne(100);
        if (hasMoreBtn_zh)
        {
            console.log("更多");
            hasMoreBtn_zh.click();
        }
        if (hasMoreBtn_kr)
        {
            console.log("更多 kr");
            hasMoreBtn_kr.click();
            Sleep();
        }
        let hasAcceptBtn_zh = text("接受").findOne(100);
        let hasAcceptBtn_kr = text("동의").findOne(100);
        if (hasAcceptBtn_zh)
        {
            console.log("接受");
            hasAcceptBtn_zh.click();
            break;
        }
        let acc = 0;
        if (hasAcceptBtn_kr)
        {
            console.log("接受 kr");
            hasAcceptBtn_kr.click();
            acc++;
            Sleep();
            if (acc == 2)
            {
                console.log("break login loop");
                console.log("login success");
                break;
            }
        }

        Sleep();
    }

    // for (let i = 0; i < 30; i++)
    // {
    //     let hasRecoverEmail_kr = text("복구 이메일 확인").findOne(15000);
    //     if (hasRecoverEmail_kr)
    //     {
    //         Sleep(5);
    //         RandomPress([116, 1168, 408, 63]);
    //         console.log("click recover email");
    //         break;
    //     }
    //     Sleep();
    // }
};

const PassGameRules = (accountArray) =>
{
    console.log("pass game rules...");

    const OrangeConfirmColorList = [
        ["#fc4420", [[24, -3, "#fc4420"], [53, 4, "#fc4420"], [54, 31, "#fc4420"], [22, 34, "#fc4420"]]],
        ["#fc4420", [[169, -6, "#fc4420"], [438, 22, "#fc4420"], [172, 43, "#fc4420"], [33, 45, "#fc4420"]]]
    ];
    console.log("判断是否有橙色确认条");
    for (let i = 0; i < 30; i++)
    {
        let shot = captureScreen();
        if (FindMultiColors(OrangeConfirmColorList, [495, 536, 311, 86], shot))
        {
            console.log("find orange confirm bar");
            WaitUntilFindColor(OrangeConfirmColorList, [495, 536, 311, 86], 60) && RandomPress([300, 555, 713, 49]);

            WaitUntilFindColor(OrangeConfirmColorList, [386, 527, 730, 107], 60) && RandomPress([469, 555, 546, 48]);
            break;
        }
        if (FindMultiColors(BlackBtnColorList, [272, 520, 748, 125], shot)) 
        {
            console.log("find black confirm btn befor game rule pass");
            break;
        }
        Sleep();
    }


    WaitUntilFindColor(BlackBtnColorList, [272, 520, 748, 125]) && RandomPress([415, 565, 472, 36]);

    let checkBox_0 = ReadImg("icon/login/checkBox_0");
    const hasCheckBox_0 = WaitUntil(() => FindImg(checkBox_0, [247, 232, 127, 108]));
    if (hasCheckBox_0)
    {
        RandomPress([304, 272, 423, 19]);
        RandomPress([337, 561, 632, 32]);
    }
    checkBox_0.recycle();

    let input_placeholder_recoveryEmail = ReadImg("icon/login/input_placeholder_recoveryEmail");
    const hasInput_placeholder_recoveryEmail = WaitUntil(() => FindImg(input_placeholder_recoveryEmail, [280, 359, 170, 119]));
    if (hasInput_placeholder_recoveryEmail)
    {
        setText(accountArray[0]);
        RandomPress([413, 558, 539, 41]);
    }
    input_placeholder_recoveryEmail.recycle();


    WaitUntilFindColor(BlackBtnColorList, [363, 360, 555, 114]) && RandomPress([420, 394, 461, 44]); // 验证码弹出确认按钮 

    console.log("finish pass game rules");
};

const googleBackgroundIconColorList = [
    ["#e1392c", [[-19, 20, "#2d9f4c"], [20, 22, "#fbc013"], [-2, 14, "#1a73e8"], [7, 21, "#1a73e8"]]],
    ["#e23a2d", [[-19, 27, "#2a9c49"], [-2, 21, "#1a73e8"], [17, 23, "#fbc014"], [1, 14, "#1a73e8"]]]
];
const IsVertical = () =>
{
    for (let i = 0; i < 30; i++)
    {
        let shot = captureScreen();
        if (FindMultiColors(googleBackgroundIconColorList, [312, 143, 103, 107], shot))
        {
            console.log("是竖屏");
            return true;
        }
        else if (FindMultiColors(googleBackgroundIconColorList, [630, 19, 110, 107], shot))
        {
            console.log("是横屏");
            return false;

        }
        Sleep();
    }
    return null;
};
const InputEmailUrl = () =>
{
    console.log("start input email url");

    // RestartGame("com.android.chrome", 1);
    // Sleep();
    app.launch("com.android.chrome");

    let hasHomeIcon = false;
    let hasPlusIcon = false;
    let hasSearchInputBox = false;
    let hasLocationBar = false;
    let hasUrlBar = false;

    for (let i = 0; i < 20; i++)
    {
        hasHomeIcon = id("home_button").findOne(200);
        if (hasHomeIcon)
        {
            hasHomeIcon.click();
            hasSearchInputBox = id("search_box").findOne(200);
            if (hasSearchInputBox)
            {
                console.log("find search box !");
                break;
            }
        }
        hasPlusIcon = id("new_tab_view").findOne(200);
        if (hasPlusIcon)
        {
            hasPlusIcon.click();
            hasHomeIcon = id("home_button").findOne(200);
            if (hasHomeIcon)
            {
                hasHomeIcon.click();
                hasSearchInputBox = id("search_box").findOne(200);
                if (hasSearchInputBox)
                {
                    break;
                }
            }
        }
        hasSearchInputBox = id("search_box").findOne(100);
        if (hasSearchInputBox)
        {
            break;
        }
        hasLocationBar = id("location_bar_status_icon").findOne(100);
        if (hasLocationBar)
        {
            console.log("find location bar!");
            break;
        }
        hasUrlBar = id("url_bar").findOne(1000);
        if (hasUrlBar)
        {
            console.log("find url bar.");
            break;
        }
        let hasAcceptAndContinue_zh = text("接受并继续").findOne(100);
        if (hasAcceptAndContinue_zh)
        {
            hasAcceptAndContinue_zh.click();
        }
        let hasFre_bottom_group = id("fre_bottom_group").findOne(100);
        if (hasFre_bottom_group)
        {
            Sleep(5);
            console.log("find fre_bottom_group.");
            if (!IsVertical())
            {
                click(1130, 630);

            }
            else
            {
                click(350, 1200);
            }


            Sleep();
        }
        let hasUseAccount = text("사용").findOne(100);
        if (hasUseAccount)
        {
            console.log("hasUseAccount");
            hasUseAccount.click();
        }
        let hasNoAccoutToUse = text("계정 없이 사용").findOne(100);
        if (hasNoAccoutToUse)
        {
            hasNoAccoutToUse.click();
        }
        Sleep();
        console.log("loop: " + i);
    }

    if (!hasSearchInputBox && !hasLocationBar && !hasUrlBar)
    {
        alert("未发现输入框：", "输入网址失败");
        return false;
    }

    console.log("set text: url: https://mail.google.com");
    setText("https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=Ab5oB3qf7n2kJ0DkeNfW4CCNqYU37pmOSMWBPtyZzVGDdJnrZfPwECRIX01Jayqe0Yc5cR29ifDZGA&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S18480657%3A1724727896300825&ddm=0");
    if (textMatches(/(.*mail.google.com.*)/).findOne(3000))
    {
        Sleep();
        console.log("固定点击第一个");
        RandomPress([117, 195, 348, 48]);
        Sleep(15);
    }
    return true;
};
// InputEmailUrl();
const EnterGoogleEmail = () =>
{
    console.log("enter google email");

    let hasRefreshIcon = false;

    console.log("judge if already login");
    for (let i = 0; i < 30; i++)
    {
        // let hasUseWebVersion = text("Use the web version").findOne(20);
        // if (hasUseWebVersion)
        // {
        //     console.log("click web version");
        //     click(120, 1200);
        //     Sleep(3);
        // }
        hasRefreshIcon = text("Refresh").findOne(20);
        if (hasRefreshIcon)
        {
            console.log("already login in google account");
            break;
        }
        let account_picker_continue_as_button = textMatches(/(.*계속.*)/).findOne(20);
        if (account_picker_continue_as_button)
        {
            console.log("related , identify login continue...");
            account_picker_continue_as_button.click();
            Sleep(10);
        }

        Sleep();
    }

    // if (!hasRefreshIcon)
    // {
    //     console.log("当前未登录——02。");
    //     const ClickNextBtn = () => text("다음").findOne(5000).click();


    //     let hasEmailInputBox = text("이메일을 잊으셨나요?").findOne(15000);
    //     if (hasEmailInputBox)
    //     {
    //         console.log("input email account!");
    //         setText(accountArray[0]);
    //         ClickNextBtn();
    //         Sleep(4);
    //     }
    //     let hasPasswordInputBox = text("비밀번호 표시").findOne(15000);
    //     if (hasPasswordInputBox)
    //     {
    //         console.log("input password");
    //         setText(accountArray[1]);
    //         ClickNextBtn();
    //         Sleep(4);
    //     }
    //     let hasRecoverEmail = text("복구 이메일 확인").findOne(15000);
    //     if (hasRecoverEmail)
    //     {
    //         Sleep(5);
    //         RandomPress([116, 1168, 408, 63]);
    //         console.log("click recover email");
    //     }
    //     let hasPreregistered_email_response = id("knowledge-preregistered-email-response");
    //     if (hasPreregistered_email_response)
    //     {
    //         console.log("input recover email.");
    //         setText(accountArray[2]);
    //         ClickNextBtn();
    //         Sleep(4);
    //     }
    // }

};
// EnterGoogleEmail();

const GetRecoveryCode = () =>
{
    console.log("get recovery code...");

    let code = null;


    let hasRefreshIcon = false;
    let hasInBoxIcon = false;
    for (let i = 0; i < 30; i++)
    {
        hasRefreshIcon = text("Refresh").findOne(20);
        if (hasRefreshIcon)
        {
            console.log("has refresh icon enter google email success");
            hasRefreshIcon.click();
            Sleep(3);
            break;
        }
        hasInBoxIcon = text("Inbox").findOne(20);
        if (hasInBoxIcon)
        {
            console.log("has inbox icon. click to inbox");
            hasInBoxIcon.click();
            hasRefreshIcon = text("Refresh").findOne(15000);
            if (hasRefreshIcon)
            {
                console.log("has refresh icon enter google email success");
                hasRefreshIcon.click();
                Sleep();
                break;
            }
        }
        Sleep();
    }
    let hasStoveEmail = textMatches(/(.*STOVE.*)/).findOne(15000);
    if (hasStoveEmail)
    {
        console.log("recevie email");
        hasStoveEmail.click();
        const hasRecoveryCode = textMatches(/\d{6}/).findOne(15000);
        if (hasRecoveryCode)
        {
            code = hasRecoveryCode.text();
        }
    }

    return code;
};

const LoginFlow = () =>
{
    console.log("login flow...");
    const accountArray = GetAccountFile();
    WaitUntilEnterAccountPage();
    LoginGoogleAccount();
    PassGameRules(accountArray);
    const hasInputEmailUrlSuccessfully = InputEmailUrl();
    if (hasInputEmailUrlSuccessfully)
    {
        EnterGoogleEmail();
    }
    const code = GetRecoveryCode();

    if (code == null)
    {
        alert("recovery code is null", "获取验证码失败");
        return false;
    }
    console.log("code:", code);
    recents();
    Sleep();
    if (IsVertical())
    {
        click(50, 550); // back to game
    }
    else
    {
        click(50, 350);
    }
    Sleep();
    setText(code);
    for (let i = 0; i < 30; i++)
    {
        if (FindMultiColors(BlackBtnColorList, [270, 516, 745, 134]))
        {
            RandomPress([329, 558, 639, 40]);
        }
        if (FindMultiColors(BlackBtnColorList, [364, 354, 552, 136])) 
        {
            RandomPress([415, 391, 465, 48]);
            console.log("邮箱验证完成！");
            WaitUntilFindColor(BlackBtnColorList, [271, 524, 751, 119]) && RandomPress([338, 556, 606, 47]);
            WaitUntilFindColor(BlackBtnColorList, [362, 363, 561, 116]) && RandomPress([431, 392, 424, 48]);
            break;
        }
        Sleep();
    }
};

const WaitUntilEnterServerSelectPage = () =>
{
    console.log("wait until enter server select page");
    const PressServerBar = () => RandomPress([547, 590, 173, 32]);

    out: for (let i = 0; i < 30; i++)
    {
        if (HasMainUI())
        {
            Sleep(5);
            PressServerBar();
            for (let j = 0; j < 30; j++)
            {
                if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]))
                {
                    PressServerBar();
                }
                else if (HasPopupClose([1168, 60, 48, 56]))
                {
                    console.log("enter server select page successfullly!!");
                    break out;
                }
            }
        }
        else if (HasSkip())
        {
            ClickSkip();
            Sleep();
        }
        Sleep();
    }

};

const EnterSelectedServer = (serverName) =>
{

    const bigServer = parseInt(serverName.slice(0, 1));
    const littleServer = parseInt(serverName.slice(1, 2));
    console.log("server name : " + (bigServer + 1) + "区 " + (littleServer + 1));
    let shiftX = littleServer <= 4 ? littleServer : littleServer - 5;
    let shiftY = littleServer <= 4 ? 0 : 1;


    for (let i = 0; i < bigServer; i++)
    {
        SwipeSlowly([600, 550, 10, 10], [600, 320, 10, 10], 3.3);
    }
    let hasServerName = FindImg(serverNameImgList[bigServer], [73, 162, 228, 434]);
    if (!hasServerName)
    {
        alert("创建角色失败,", "未找到服务器");
        return false;
    }

    if (hasServerName.y > 445)
    {
        SwipeSlowly([750, 500, 400, 10], [750, 400, 400, 10], 1);
    }
    hasServerName = FindImg(serverNameImgList[bigServer], [73, 162, 228, 434]);

    if (!hasServerName)
    {
        alert("创建角色失败,", "未找到服务器");
        return false;
    }

    const isFull = FindMultiColors(CanNotCreateCharacterColorList, [hasServerName.x + shiftX * 230 - 100, hasServerName.y + shiftY * 110 + 30, 120, 30]);
    console.log("isFull : " + isFull);
    if (isFull)
    {
        alert("创建角色失败,", "服务器已满");
        return false;
    }

    console.log("创建角色,选择服务器成功 " + (bigServer + 1) + "区 " + (littleServer + 1));
    RandomPress([hasServerName.x + shiftX * 230, hasServerName.y + shiftY * 110, 10, 10]);
    Sleep(5);
    RandomPress([488, 274, 297, 194]);
    Sleep(15);
    for (let i = 0; i < 500; i++)
    {
        if (FindRedBtn([535, 494, 212, 69]))
        {
            console.log("排队等待中......");
            Sleep(180);
        }
        else if (HasSkip())
        {
            ClickSkip();
            break;
        }
        else if (FindBlueBtn([553, 424, 177, 65]))
        {
            RandomPress([576, 443, 133, 28]);
            console.log("server is full");
            alert("server is full!", "create character failed!");
            break;
        }
        else
        {
            if (FindRedBtn([535, 494, 212, 69]))
            {
                alert("创建角色失败,", "排队超时");
                return false;
            }
            else if (FindBlueBtn([886, 612, 369, 104]))
            {
                console.log("^_^ 排队结束");
                break;

            }
        }
        Sleep();
    }

};

const EnterRandomServer = () =>
{
    console.log("enter random server");
    let hasServer = false;
    let isServerFull;
    const serverAvailableList = [];
    out: for (let n = 0; n < 7; n++)
    {
        if (n != 0)
        {
            SwipeSlowly([600, 550, 10, 10], [600, 320, 10, 10], 3.3);
        }
        hasServer = FindImg(serverNameImgList[n]);
        if (hasServer)
        {
            if (hasServer.y > 445)
            {
                SwipeSlowly([750, 500, 10, 10], [750, 400, 10, 10], 1);
            }
            for (let i = 0; i < 2; i++)
            {
                for (let j = 0; j < 5; j++)
                {
                    isServerFull = FindMultiColors(CanNotCreateCharacterColorList, [hasServer.x + j * 230 - 100, hasServer.y + i * 110 + 20, 120, 40]);
                    // console.log("region: " + "{" + (hasServer.x + j * 230 - 100) + "," + (hasServer.y + i * 110 + 20) + "," + 120 + "," + 40 + "}");
                    if (!isServerFull)
                    {
                        console.log("server is not full: " + (n + 1) + "区" + (5 * i + j + 1) + "号");
                        serverAvailableList.push([n, i, j]);
                    }
                }
            }
        }
    }
    Sleep();
    for (let i = 0; i < 6; i++)
    {
        SwipeSlowly([600, 250, 10, 10], [600, 550, 10, 10], 1);
    }
    // serverAvailableList.forEach(item => console.log(item));
    if (serverAvailableList.length == 0)
    {
        console.log("服务器已满！", "没有可进入的服务器");
        const hasAvailableServer = ListenServerFlow();
        if (hasAvailableServer)
        {
            EnterRandomServer();
        }
    }
    else
    {
        const randomIndex = random(0, serverAvailableList.length - 1);
        const serverIndex = serverAvailableList[randomIndex];
        let config = ReadConfig();
        config.ui.serverName = `${serverIndex[0]}${serverIndex[1] * 5 + serverIndex[2]}`;
        console.log("config: " + config.ui.serverName);
        RewriteConfig("ui", config.ui);

        Sleep();

        EnterSelectedServer(config.ui.serverName);
    }

};

const SetName = () =>
{
    console.log("start create character...");
    let hasCreateCharacterBtn = false;

    for (let i = 0; i < 30; i++)
    {
        if (FindBlueBtn([894, 621, 348, 97]))
        {
            console.log("find create btn,start create");
            hasCreateCharacterBtn = true;
            break;
        }
    }
    if (hasCreateCharacterBtn == true)
    {
        console.log("点击创建角色");
        RandomPress([945, 670, 248, 31]); //create btn
        Sleep();
        if (FindCheckMark([669, 431, 45, 41]))
        {
            RandomPress([509, 338, 263, 23]); //input box
            setText(GenerateRandomName());
            Sleep();
            RandomPress([1175, 647, 51, 22]); // keyboard confirm btn
            Sleep();
            RandomPress([686, 452, 77, 17]); //confirm
            Sleep();
            RandomPress([685, 452, 84, 19]); //confirm 
        }

        for (let i = 0; i < 5; i++)
        {
            Sleep(5);
            if (FindCheckMark([667, 442, 48, 42]))
            {
                RandomPress([686, 441, 90, 16]);
                if (FindCheckMark([667, 442, 48, 42]))
                {
                    console.log("name error, try again");
                    RandomPress([496, 338, 288, 20]); //input box
                    setText(GenerateRandomName());
                    Sleep();
                    RandomPress([1175, 647, 51, 22]); // keyboard confirm btn
                    RandomPress([685, 452, 84, 19]); //confirm
                    RandomPress([685, 452, 84, 19]); //confirm
                }

            }
            else
            {
                console.log("name ok, create character success");
                break;
            }
        }
    }
};

const FirstEnterGameClickSkip = () =>
{
    console.log("wait until enter game and click the first skip");
    for (let i = 0; i < 10; i++)
    {
        if (FindBlueBtn([930, 640, 264, 69]))
        {
            RandomPress([963, 659, 200, 32]);
            Sleep(10);
            for (let i = 0; i < 30; i++)
            {
                if (HasSkip())
                {
                    ClickSkip();
                    Sleep(3);
                    RandomPress([905, 135, 260, 25]);
                    console.log("create character flow finished!!! oh yeah!!!");
                    return true;
                }
                Sleep();
            }
        }
        Sleep();
    }
};

const CreateCharacterFlow = (serverName) =>
{
    console.log("import select server flow");
    LoginFlow();

    WaitUntilEnterServerSelectPage();

    if (serverName == "00")
    {
        EnterRandomServer();
    }
    else
    {
        EnterSelectedServer();
    }

    SetName();

    FirstEnterGameClickSkip();

};

module.exports = {
    CreateCharacterFlow,
};

// LoginFlow();

// GetVerificationCode();
// EnterGoogleEmail();
// EnterGameToSendVerificationCode();

// WaitUntilEnterLoginPage();
// LoginGoogleAccout();
// app.launch("com.android.chrome");

// CreateCharacterFlow("28");
// WaitUntilEnterServerSelectPage();
// EnterRandomServer();
// console.log(FindMultiColors(CanNotCreateCharacterColorList, [515, 317, 106, 58]));
// EnterSelectedServer("65");
// console.log(FindCheckMark([294, 552, 91, 64]));
// SetName();