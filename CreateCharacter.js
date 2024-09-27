const {
    ClickSkip,
    FindMultiColors, FindBlueBtn, FindCheckMark, PressBlank, FindRedBtn, FindImgInList, FindImg,
    HasSkip, HasPopupClose, LoadImgList, GetVerificationCode,
    ReadConfig, RewriteConfig, ReadImg, RandomPress, RestartGame,
    WaitUntil, WaitUntilFindColor,
    Sleep, SwipeSlowly,
} = require("./utils.js");

const { ListenServerFlow } = require("./ListenServer.js");

const { LordNineWordColorList, WhiteAvatarColorList } = require("./Color/ExceptionColorList.js");

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

const BlackBtnColorList = [
    ["#000000", [[51, -4, "#000000"], [86, 33, "#000000"], [35, 51, "#000000"], [-42, 27, "#000000"]]],
    ["#000000", [[64, -1, "#000000"], [110, 23, "#000000"], [55, 51, "#000000"], [-3, 12, "#000000"]]],
    ["#000000", [[118, -8, "#000000"], [305, -1, "#000000"], [308, 45, "#000000"], [56, 37, "#000000"]]],
    ["#000000", [[100, 0, "#000000"], [237, 19, "#000000"], [210, 41, "#000000"], [32, 33, "#000000"]]]
];

const verificationCodeImgList = LoadImgList("icon/login/verificationCodePopup");
const serverNameImgList = [];
const GenerateRandomName = () =>
{
    const CharDiction = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    let name = [];
    for (let i = 0; i < 8; i++)
    {
        name.push(CharDiction[Math.floor(random() * CharDiction.length)]);
    }
    naem[0] = CharDiction[Math.floor(random() * 51)];
    return name.join("");
};
const LoadServerImgList = () =>
{
    let imgList = null;
    for (let i = 0; i < 7; i++)
    {
        imgList = LoadImgList(`icon/beginner/serverNameList/${i}`);
        serverNameImgList.push(imgList);
    }
};
LoadServerImgList();
const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);
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
const ClickNextBtn = (findTime) =>
{
    findTime = findTime || 20;
    const hasNext_kr = text("다음").findOne(findTime);
    const hasNext_zh = text("下一步").findOne(findTime);
    if (hasNext_zh)
    {
        hasNext_zh.click();
        console.log("检测到中文 点击下一步");
    }
    else if (hasNext_kr)
    {
        hasNext_kr.click();
        console.log("检测到韩文 点击下一步");
    }
};
const PressServerBar = () => { console.log("点击服务器框，进入选区页面"); RandomPress([547, 590, 173, 32]); };
const CheckLogin = () =>
{
    console.log("开始执行：检测是否已经登录账号");

    let isLogin = false;

    for (let i = 0; i < 400; i++)
    {
        if (HasSkip())
        {
            ClickSkip();
        }
        if (HasMainUI())
        {
            if (!FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]))
            {
                console.log("发现权力之望标志，点击屏幕开始");
                Sleep(5);
                PressBlank();
            }
            else
            {
                console.log("到了区服的游戏主页面");
                PressServerBar();
            }
        }
        let hasFacebookLogin = textMatches(/(.*Facebook.*)/).findOne(20);
        if (hasFacebookLogin)
        {
            let googleIcon = textMatches(/(.*Google.*)/).findOne(20);
            if (googleIcon)
            {
                click(googleIcon.bounds().centerX(), googleIcon.bounds().centerY());
                console.log("发现谷歌登录选项。点击选择谷歌账号登录。");
            }
        }
        let hasAppleLoginPopup = text("Apple 계정을 사용하여 로드나인에 로그인하십시오.").findOne(20);
        if (hasAppleLoginPopup)
        {
            console.log("误点击苹果账号登录，点击关闭苹果登录弹窗");
            let close_btn = id("close_button").findOne(20);
            if (close_btn)
            {
                close_btn.click();
            }
        }
        let hasSelectAccount = textMatches(/(.*选择账号.*|.*계정 선택.*)/).findOne(20);
        if (hasSelectAccount)
        {
            let hasAccount = textMatches(/(.*@gmail.com.*)/).findOne(20);
            if (hasAccount)
            {
                console.log("发现谷歌账号选择页面，点击使用该账号直接登录");
                hasAccount.parent().parent().click();
            }
        }
        let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(20);
        let hasForgetEmail_kr = text("이메일을 잊으셨나요?").findOne(20);
        if (hasForgetEmail_zh || hasForgetEmail_kr)
        {
            console.log("发现忘记电子邮件地址。 账号未登录，开始执行登录流程");
            isLogin = false;
            break;
        }
        if (HasPopupClose([1161, 56, 61, 68]))
        {
            console.log("发现到了选区页面，已经登录账号，跳过登录流程");
            isLogin = true;
            break;
        }
        Sleep();
    }
    console.log("检测登录流程结束，当前是否登录：" + isLogin);
    return isLogin;
};
const accountArray = GetAccountFile();

const LoginGoogleAccount = () =>
{
    console.log("开始登录 Google 账号");
    let checkBox_0 = ReadImg("icon/login/checkBox_0");
    let input_placeholder_recoveryEmail = ReadImg("icon/login/input_placeholder_recoveryEmail");

    for (let i = 0; i < 400; i++)
    {
        let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(20);
        let hasForgetEmail_kr = text("이메일을 잊으셨나요?").findOne(20);
        if (hasForgetEmail_zh || hasForgetEmail_kr)
        {
            console.log("发现忘记电子邮件地址。 开始输入邮箱。");
            setText(accountArray[0]);
            Sleep(3);
            ClickNextBtn();
        }
        let hasPasswordInputBox_kr = text("비밀번호 표시").findOne(20);
        let hasPasswordInputBox_zh = text("显示密码").findOne(20);
        if (hasPasswordInputBox_kr || hasPasswordInputBox_zh)
        {
            console.log("发现密码输入框，开始输入密码");
            setText(accountArray[1]);
            Sleep(3);
            ClickNextBtn();
        }
        let hasRecoveryEmailOption = desc("복구 이메일 확인").findOne(20);
        if (hasRecoveryEmailOption)
        {
            console.log("发现账号验证选项，使用辅助邮箱验证");
            hasRecoveryEmailOption.click();
            break;
        }
        let hasInputRecovery = text("다른 방법 시도").findOne(20);
        if (hasInputRecovery)
        {
            console.log("发现辅助邮箱输入框，开始输入辅助邮箱");
            setText(accountArray[2]);
            Sleep(3);
            ClickNextBtn();
        }
        let hasAggreeBtn_zh = text("我同意").findOne(20);
        let hasAggreeBtn_kr = text("동의").findOne(20);
        if (hasAggreeBtn_zh)
        {
            console.log("我同意");
            hasAggreeBtn_zh.click();
        }
        else if (hasAggreeBtn_kr)
        {
            console.log("同意");
            hasAggreeBtn_kr.click();
        }
        let hasMoreBtn_zh = text("更多").findOne(20);
        let hasMoreBtn_kr = text("더보기").findOne(20);
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
        let hasAcceptBtn_zh = text("接受").findOne(20);
        let hasAcceptBtn_kr = text("동의").findOne(20);
        if (hasAcceptBtn_zh)
        {
            console.log("接受");
            hasAcceptBtn_zh.click();
        }
        else if (hasAcceptBtn_kr)
        {
            console.log("接受");
            hasAcceptBtn_kr.click();
        }
        let hadYeah = text("예").findOne(20);
        if (hadYeah)
        {
            console.log("click yes");
            hadYeah.click();
        }
        //同意相关协议
        let hadOrangeConfirm_KoreadRepublicOf = text("다음").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf)
        {
            console.log("韩文：发现橙色确认按钮，点击下一步");
            hadOrangeConfirm_KoreadRepublicOf.click();
            Sleep(3);
        }
        let hadOrangeConfirm_KoreadRepublicOf_ch = text("下一步").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf_ch)
        {
            console.log("发现中文橙色按钮：点击下一步");
            hadOrangeConfirm_KoreadRepublicOf_ch.click();
            Sleep(3);
        }
        let hadOrangeConfirm_AgreeThreeProtocol = text("모두 동의 후 계속하기 (선택항목 포함)").findOne(20);
        if (hadOrangeConfirm_AgreeThreeProtocol)
        {
            console.log("发现3个协议，点击同意");
            hadOrangeConfirm_AgreeThreeProtocol.click();
        }
        let hasBlackBtn = FindMultiColors(BlackBtnColorList, [272, 520, 748, 125]);
        if (hasBlackBtn)
        {
            RandomPress([hasBlackBtn.x, hasBlackBtn.y, 10, 10]);
            console.log("点击黑色按钮");
        }
        const hasCheckBox_0 = FindImg(checkBox_0, [247, 232, 127, 108]);
        if (hasCheckBox_0)
        {
            console.log("点击勾选框");
            click(300, 280);
            Sleep();
            RandomPress([337, 561, 632, 32]);
        }
        let hasInput_placeholder_recoveryEmail = FindImg(input_placeholder_recoveryEmail, [280, 359, 170, 119]);
        if (hasInput_placeholder_recoveryEmail)
        {
            setText(accountArray[0]);
            Sleep(3);
            RandomPress([413, 558, 539, 41]);
            console.log("邮箱验证码已发送！");
            break;
        }

        Sleep();
    }
};
const InputEmailUrl = () =>
{
    console.log("开始输入邮箱网址");

    let hasHomeIcon = false;
    let hasPlusIcon = false;
    let hasSearchInputBox = false;
    let hasLocationBar = false;
    let hasUrlBar = false;

    for (let i = 0; i < 100; i++)
    {
        hasHomeIcon = id("home_button").findOne(20);
        if (hasHomeIcon)
        {
            hasHomeIcon.click();
            hasSearchInputBox = id("search_box").findOne(20);
            if (hasSearchInputBox)
            {
                console.log("find search box !");
                break;
            }
        }
        hasPlusIcon = id("new_tab_view").findOne(20);
        if (hasPlusIcon)
        {
            hasPlusIcon.click();
            hasHomeIcon = id("home_button").findOne(20);
            if (hasHomeIcon)
            {
                hasHomeIcon.click();
                hasSearchInputBox = id("search_box").findOne(20);
                if (hasSearchInputBox)
                {
                    console.log("find serch box");
                    break;
                }
            }
        }

        hasSearchInputBox = id("search_box").findOne(20);
        if (hasSearchInputBox)
        {
            break;
        }
        hasLocationBar = id("location_bar_status_icon").findOne(20);
        if (hasLocationBar)
        {
            console.log("find location bar!");
            break;
        }
        hasUrlBar = id("url_bar").findOne(200);
        if (hasUrlBar)
        {
            console.log("find url bar.");
            break;
        }
        let hasAcceptAndContinue_zh = text("接受并继续").findOne(20);
        if (hasAcceptAndContinue_zh)
        {
            hasAcceptAndContinue_zh.click();
        }
        let hasFre_bottom_group = id("fre_bottom_group").findOne(20);
        if (hasFre_bottom_group)
        {
            console.log("id: 首次打开谷歌浏览器，确认协议.");
            Sleep(3);
            click(hasFre_bottom_group.bounds().centerX(), hasFre_bottom_group.bounds().centerY());
        }
        let hadAggreeConcept = text("동의하고 계속").findOne(20);
        if (hadAggreeConcept)
        {
            console.log("text:首次打开谷歌浏览器，确认协议.");
            hadAggreeConcept.click();
        }
        let hasAddAccount = text("취소").findOne(20);
        if (hasAddAccount)
        {
            console.log("是否添加账号，点击取消");
            hasAddAccount.click();
        }
        let hasUseAccount = text("사용").findOne(20);
        if (hasUseAccount)
        {
            console.log("发现关联账号，点击关联该账号");
            hasUseAccount.click();
        }
        let hasNoAccoutToUse = text("계정 없이 사용").findOne(20);
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
    Sleep();
    if (textMatches(/(.*mail.google.com.*)/).findOne(3000))
    {
        Sleep();
        console.log("固定点击第一个");
        RandomPress([117, 195, 348, 48]);
        console.log("输入邮箱网址完成。");
        return true;
    }
    return false;
};
const GetEmailVerificationCode = () =>
{
    console.log("开始获取邮箱验证码");
    app.launch("com.android.chrome");

    InputEmailUrl();

    let hasRefreshIcon = false;
    let code = null;

    for (let i = 0; i < 400; i++)
    {
        let hasUseWebVersion = text("Use the web version").findOne(20);
        if (hasUseWebVersion)
        {
            console.log("click web version");
            click(hasUseWebVersion.bounds().centerX(), hasUseWebVersion.bounds().centerY());
            Sleep(3);
        }
        hasRefreshIcon = text("Refresh").findOne(20);
        if (hasRefreshIcon)
        {
            console.log("发现邮箱的刷新按钮。");
        }
        let hasMenu_0 = text("Menu").findOne(20);
        if (hasMenu_0)
        {
            console.log("发现邮箱的菜单按钮，已经在邮箱页面中，开始下一步获取验证码");
        }
        let account_picker_continue_as_button = textMatches(/(.*계속.*)/).findOne(20);
        if (account_picker_continue_as_button)
        {
            console.log("发现关联账户弹窗，点击该账户进入邮箱");
            account_picker_continue_as_button.click();
            Sleep(3);
        }
        let has_positive_button = text("사용").findOne(20);
        if (has_positive_button)
        {
            console.log("发现关联账号的使用按钮，点击使用");
            has_positive_button.click();
        }
        let has_refresh_page = text("새로고침").findOne(20);
        if (has_refresh_page)
        {
            console.log("发现重新加载按钮，重新加载页面");
            click(has_refresh_page.bounds().centerX(), has_refresh_page.bounds().centerY());
            Sleep(3);
        }
        let hasStoveEmail = textMatches(/(.*인증 메일 안내.*)/).findOne(20);
        if (hasStoveEmail)
        {
            console.log("收到Stove邮件");
            hasStoveEmail.click();
            Sleep(2);
        }
        let hasLatestEmail = textMatches(/(.*minute.*)/).findOne(20);
        if (hasLatestEmail)
        {
            console.log("发现最新的邮件");
            let hasRecoveryCode = textMatches(/\d{6}/).findOne(20);
            if (hasRecoveryCode)
            {
                code = hasRecoveryCode.text();
                console.log("发现最新的邮件验证码: " + code);
                break;
            }
        }
        Sleep();
    }
    return code;
};

const LoginFlow = () =>
{
    LoginGoogleAccount();
    const code = GetEmailVerificationCode();
    if (code == null)
    {
        alert("recovery code is null", "获取验证码失败");
        return false;
    }
    recents();
    Sleep(3);

    click(30, 600);
    Sleep();
    for (let i = 0; i < 30; i++)
    {
        let hasCodeInputBox = text("게임 기기 등록").findOne(20);
        if (hasCodeInputBox)
        {
            console.log("找到验证码输入框");
            setText(code);
            Sleep();
            break;
        }
        Sleep();
    }

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
    console.log("等待直到进入服务器选择页面...");
    let lastTimeGetVerificationCode = 1726208812345;

    for (let i = 0; i < 90; i++)
    {
        if (HasMainUI())
        {
            if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]))
            {
                console.log("发现区服的游戏的主界面，点击区服框");
                PressServerBar();
            }
            else
            {
                console.log("游戏主页面，点击空白");
                PressBlank();
            }

        }

        if (HasPopupClose([1161, 56, 61, 68]))
        {
            console.log("到达服务器选择页面，开始下一步，选择一个区进入!");
            break;
        }

        let hasPopup_verificationCode = FindImgInList(verificationCodeImgList, [530, 235, 215, 78]);
        if (hasPopup_verificationCode)
        {
            console.log("发现验证码弹窗");
            if ((new Date().getTime() - lastTimeGetVerificationCode) / 60000 < 1)
            {
                console.log("连续接验证码间隔较短，等待一分钟再接取验证码");
                Sleep(60);
            }
            let code = GetVerificationCode();
            RandomPress([511, 426, 295, 11]);
            if (!code)
            {
                alert("获取图形验证码失败", "接验证码有问题");
                return false;
            }
            console.log("验证码为:" + code);
            setText(code);
            Sleep();
            if (FindBlueBtn([531, 500, 222, 73]))
            {
                RandomPress([569, 518, 143, 31]);
                Sleep();
            }
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
    let hasServerName = FindImgInList(serverNameImgList[bigServer], [73, 162, 228, 434]);
    if (!hasServerName)
    {
        alert("创建角色失败,", "未找到服务器");
        return false;
    }

    if (hasServerName.y > 445)
    {
        SwipeSlowly([750, 500, 400, 10], [750, 400, 400, 10], 1);
    }
    hasServerName = FindImgInList(serverNameImgList[bigServer], [73, 162, 228, 434]);

    if (!hasServerName)
    {
        alert("创建角色失败,", "未找到服务器");
        return false;
    }

    const isFull = FindMultiColors(CanNotCreateCharacterColorList, [hasServerName.x + shiftX * 230 - 100, hasServerName.y + shiftY * 110 + 30, 120, 30]);
    console.log("isFull : " + isFull);
    if (isFull)
    {
        console.log("服务器已满！", "没有可进入的服务器,开始监听服务器,直到有可进入的服务器为止");
        const hasAvailableServer = ListenServerFlow();
        if (hasAvailableServer)
        {
            EnterRandomServer();
        }
    }

    console.log("选择服务器成功 " + (bigServer + 1) + "区 " + (littleServer + 1));
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
        if (FindImgInList(verificationCodeImgList, [530, 235, 215, 78]))
        {
            console.log("发现图形验证码，开始输入验证码");
            const verificationCode_0 = GetVerificationCode();
            if (verificationCode_0)
            {
                console.log("验证码：", verificationCode_0);
                RandomPress([511, 426, 295, 11]);
                setText(verificationCode_0);
                Sleep();
                if (FindBlueBtn([531, 500, 222, 73]))
                {
                    RandomPress([569, 518, 143, 31]);
                    Sleep();
                }
                break;
            }
            else
            {
                console.log("验证码识别失败，请手动输入验证码");
            }
        }
        Sleep();
    }

};

const EnterRandomServer = () =>
{
    console.log("开始随机进入一个服务器");
    let hasServer = false;
    let isServerFull;
    const serverAvailableList = [];
    out: for (let n = 0; n < 7; n++)
    {
        if (n != 0)
        {
            SwipeSlowly([600, 550, 10, 10], [600, 320, 10, 10], 3.3);
        }
        hasServer = FindImgInList(serverNameImgList[n]);
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
                        console.log("可进入: " + (n + 1) + "区" + (5 * i + j + 1) + "号");
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
        console.log("服务器已满！", "没有可进入的服务器,开始监听服务器,直到有可进入的服务器为止");
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
    for (let i = 0; i < 300; i++)
    {
        if (FindBlueBtn([894, 621, 348, 97]))
        {
            console.log("发现创建角色按钮，开始创建角色");
            hasCreateCharacterBtn = true;
            break;
        }
        let hasPopup_verificationCode = FindImgInList(verificationCodeImgList, [530, 235, 215, 78]);
        if (hasPopup_verificationCode)
        {
            console.log("发现验证码弹窗");
            if ((new Date().getTime() - lastTimeGetVerificationCode) / 60000 < 1)
            {
                console.log("连续接验证码间隔较短，等待一分钟再接取验证码");
                Sleep(60);
            }
            let code = GetVerificationCode();
            RandomPress([511, 426, 295, 11]);
            if (!code)
            {
                alert("获取图形验证码失败", "接验证码有问题");
                return false;
            }
            console.log("验证码为:" + code);
            setText(code);
            Sleep();
            if (FindBlueBtn([531, 500, 222, 73]))
            {
                RandomPress([569, 518, 143, 31]);
                Sleep();
            }
        }
        if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]))
        {
            PressBlank();
        }
        if (HasSkip())
        {
            ClickSkip();
        }
        // let hasNeedInputVerificationCode =
        Sleep();
    }
    // RecycleServerImgList(verificationCodeImgList);
    if (hasCreateCharacterBtn == true)
    {
        console.log("点击创建角色");
        //随机头型和发型
        RandomPress([83, 94, 192, 538]);
        RandomPress([944, 123, 251, 284]);

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

        for (let i = 0; i < 30; i++)
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
    else
    {
        console.log("未发现创建角色按钮，请检查创建流程");
    }
};
const FirstEnterGameClickSkip = () =>
{
    console.log("等待进入游戏，并点击第一个跳过与主线任务");
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
                    console.log("创建角色成功，流程结束。");
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
    console.log("动态导入创建角色模板...");
    const isLogin = CheckLogin();
    if (!isLogin)
    {
        LoginFlow();
    }
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