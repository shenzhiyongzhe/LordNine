const { ListenServerFlow } = require("./ListenServer.js");
const {
    ReadImg, FindImg, RandomPress, Sleep, FindMultiColors, SwipeSlowly,
    ClickSkip,
    FindBlueBtn, FindCheckMark, PressBlank, FindRedBtn,
    HasSkip,
    HasPopupClose,
    ReadConfig,
    RewriteConfig,
    WaitUntil,
    WaitUntilFindColor,
    RestartGame,
    LoadImgList,
    FindImgInList,
    GetVerificationCode,

} = require("./utils.js");

let verificationCodeImgList = LoadImgList("icon/login/verificationCodePopup");


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

const BlackBtnColorList = [
    ["#000000", [[51, -4, "#000000"], [86, 33, "#000000"], [35, 51, "#000000"], [-42, 27, "#000000"]]],
    ["#000000", [[64, -1, "#000000"], [110, 23, "#000000"], [55, 51, "#000000"], [-3, 12, "#000000"]]],
    ["#000000", [[118, -8, "#000000"], [305, -1, "#000000"], [308, 45, "#000000"], [56, 37, "#000000"]]],
    ["#000000", [[100, 0, "#000000"], [237, 19, "#000000"], [210, 41, "#000000"], [32, 33, "#000000"]]]
];



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


LoadServerImgList();

const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);

//*****************************************************main******************************************** */


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


    for (let i = 0; i < 90; i++)
    {
        let shot = captureScreen();
        if (HasMainUI())
        {
            if (!FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41], shot))
            {
                Sleep(5);
                PressBlank();
            }
        }
        let googleIcon = textMatches(/(.*Google.*)/).findOne(20);
        if (googleIcon)
        {
            Sleep(3);
            click(googleIcon.bounds().centerX(), googleIcon.bounds().centerY());
            hasEnterAccountPage = true;
            console.log("发现谷歌登录选项。find google icon break;");
            Sleep(3);
        }
        let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(100);
        let hasForgetEmail_kr = text("이메일을 잊으셨나요?").findOne(100);
        if (hasForgetEmail_zh || hasForgetEmail_kr)
        {
            console.log("发现忘记电子邮件地址。 break。");

            break;
        }
        let hasSelectAccount = textMatches(/(.*选择账号.*|.*계정 선택.*)/).findOne(20);
        if (hasSelectAccount)
        {
            let hasAccount = textMatches(/(.*@gmail.com.*)/).findOne(20).parent().parent();
            if (hasAccount)
            {
                hasEnterAccountPage = true;
                console.log("发现已经登录了账号，find select account break;");
                break;
            }
        }

        if (FindMultiColors(BlackBtnColorList, [268, 516, 749, 122], shot)) 
        {
            RandomPress([342, 564, 627, 37]);
        }
        Sleep();
    }
    console.log("finished login account page");
    return hasEnterAccountPage;
};

const HadLoginCheck = () =>
{
    let hadLogin = false;

    for (let i = 0; i < 30; i++)
    {
        let hasSelectAccount = textMatches(/(.*选择账号.*|.*계정 선택.*)/).findOne(20);
        if (hasSelectAccount)
        {
            let hasAccount = textMatches(/(.*@gmail.com.*)/).findOne(20).parent().parent();
            if (hasAccount)
            {
                console.log("find select account break;");
                hasAccount.click();
                hadLogin = true;
                return hadLogin;
            }
        }
        let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(100);
        let hasForgetEmail_kr = text("이메일을 잊으셨나요?").findOne(100);
        if (hasForgetEmail_zh || hasForgetEmail_kr)
        {
            console.log("发现忘记电子邮件地址。 开始输入邮箱。");
            console.log("input email account!");
            hadLogin = false;
            return hadLogin;
        }
        Sleep();
    }
};
const LoginGoogleAccount = () =>
{
    console.log("start login google account");
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

    for (let i = 0; i < 90; i++)
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
        let hadYeah_0 = text("예").findOne(100);
        if (hadYeah_0)
        {
            console.log("click yes");
            hadYeah_0.click();
            console.log("暂时不用输入辅助邮箱");
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
            hasAggreeBtn_zh.click();
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

        let hadYeah = text("예").findOne(100);
        if (hadYeah)
        {
            console.log("click yes");
            hadYeah.click();
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
const SetCountryAndBirth = () =>
{
    let hadNeedSelectCountry = textMatches(/(.*국가 선택.*|.*選擇國家.*)/).findOne(20);
    if (hadNeedSelectCountry)
    {
        console.log("SetCountryAndBirth");
        hadNeedSelectCountry.click();
        Sleep(3);
        setText("Korea");
        let hasCanada = textMatches(/(.*Korea.*)/).findOne(2000);
        if (hasCanada)
        {
            Sleep(3);
            RandomPress([298, 401, 219, 44]);
        }
    }

    let hadNeedInputBirthday = textMatches(/(.*MM.DD.YYYY.*)/).findOne(4000);
    if (hadNeedInputBirthday)
    {

        RandomPress([258, 317, 236, 28]);
        const month = random(1, 12).toString().padStart("0", 2);
        setText(0, month);
        const day = random(1, 28).toString().padStart("0", 2);
        setText(1, day);
        const year = random(1960, 2004).toString().padStart("0", 2);
        setText(2, year);
        console.log("birthday input finished");
        Sleep(3);
        for (let i = 0; i < 30; i++)
        {
            let hadTermsAndConditions = text("확인").findOne(20);
            if (hadTermsAndConditions)
            {
                console.log("同意条款");
                hadTermsAndConditions.click();
            }
            let hasConfirm_cn = text("下一步").findOne(20);
            let hasConirm_kr = text("다음").findOne(20);
            if (hasConfirm_cn)
            {
                Sleep(5);
                hasConfirm_cn.click();
                console.log("click next");
                Sleep(3);
            }
            else if (hasConirm_kr)
            {
                Sleep(5);
                hasConirm_kr.click();
                console.log("click next");
                Sleep(3);
            }
            let hasConfirm_2_cn = text("確認").findOne(20);
            let hasConfirm_2_kr = text("다음").findOne(20);
            if (hasConfirm_2_cn)
            {
                Sleep(5);
                hasConfirm_2_cn.click();
                console.log("click confirm");
                Sleep(3);
                break;
            }
            else if (hasConfirm_2_kr)
            {
                Sleep(5);
                hasConfirm_2_kr.click();
                console.log("click confirm");
                Sleep(3);
                break;
            }
            Sleep();
        }

        console.log("finish set country and birth");
    }
};
const PassGameRules = (accountArray) =>
{
    console.log("pass game rules...");

    console.log("判断是否有橙色确认条");
    for (let i = 0; i < 60; i++)
    {
        let shot = captureScreen();
        let hadNeedInputBirthday = textMatches(/(.*MM.DD.YYYY.*)/).findOne(20);
        if (hadNeedInputBirthday)
        {
            console.log("输入生日");
            SetCountryAndBirth();
        }
        let hadOrangeConfirm_KoreadRepublicOf = text("다음").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf)
        {
            console.log("korea Republic of");
            hadOrangeConfirm_KoreadRepublicOf.click();
            Sleep(3);
        }
        let hadOrangeConfirm_KoreadRepublicOf_ch = text("下一步").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf_ch)
        {
            console.log("korea Republic of");
            hadOrangeConfirm_KoreadRepublicOf_ch.click();
            Sleep(3);
        }
        let hadOrangeConfirm_AgreeThreeProtocol = text("모두 동의 후 계속하기 (선택항목 포함)").findOne(20);
        if (hadOrangeConfirm_AgreeThreeProtocol)
        {
            console.log("agree three protocol");
            hadOrangeConfirm_AgreeThreeProtocol.click();
        }
        if (FindMultiColors(BlackBtnColorList, [272, 520, 748, 125], shot)) 
        {
            console.log("发现令牌 黑色确认按钮");
            break;
        }
        if (text("게임 기기 등록").findOne(20))
        {
            console.log("发现勾选框跳过");
            break;
        }
        Sleep();
    }

    console.log("click black confirm btn; wait for click check box");
    let checkBox_0 = ReadImg("icon/login/checkBox_0");
    for (let i = 0; i < 30; i++)
    {
        if (FindMultiColors(BlackBtnColorList, [272, 520, 748, 125]))
        {
            RandomPress([415, 565, 472, 36]);
            break;
        }
        if (FindImg(checkBox_0, [247, 232, 127, 108]))
        {
            console.log("find check box");
            break;
        }
        if (text("게임 기기 등록").findOne(20))
        {
            console.log("发现勾选框跳过");
            break;
        }
    }
    const hasCheckBox_0 = WaitUntil(() => FindImg(checkBox_0, [247, 232, 127, 108]));
    if (hasCheckBox_0)
    {
        console.log("点击勾选框");
        click(300, 280);
        Sleep();
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
const ClickNextBtn = (findTime) =>
{
    findTime = findTime || 20;
    const hasNext_kr = text("다음").findOne(findTime);
    const hasNext_zh = text("下一步").findOne(findTime);
    if (hasNext_zh)
    {
        hasNext_zh.click();
        console.log("检测到中文 下一步按钮，点击下一步");
    }
    else if (hasNext_kr)
    {
        hasNext_kr.click();
        console.log("检测到韩文 下一步按钮，点击下一步");
    }
};
const InputGoogleAccount = (accountArray) =>
{
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
        console.log("发现忘记电子邮件地址。 开始输入邮箱。");
        console.log("input email account!");
        setText(accountArray[0]);
        Sleep();
        ClickNextBtn(3000);
    }
    let hasPasswordInputBox_kr = text("비밀번호 표시").findOne(20);
    let hasPasswordInputBox_zh = text("显示密码").findOne(20);
    if (hasPasswordInputBox_kr || hasPasswordInputBox_zh)
    {
        console.log("发现密码输入框，开始输入密码");
        setText(accountArray[1]);
        Sleep();
        ClickNextBtn(3000);
    }
    let hasRecoveryEmailOption = desc("복구 이메일 확인").findOne(20);
    if (hasRecoveryEmailOption)
    {
        console.log("发现账号验证页面，选择使用辅助邮箱验证");
        hasRecoveryEmailOption.click();
    }
    let hasInputRecovery = text("다른 방법 시도").findOne(20);
    if (hasInputRecovery)
    {
        console.log("发现辅助邮箱输入框，开始输入辅助邮箱账号");
        setText(accountArray[2]);
        ClickNextBtn();
    }
    let hasAggreeBtn_zh = text("我同意").findOne(20);
    let hasAggreeBtn_kr = text("동의").findOne(20);
    if (hasAggreeBtn_zh)
    {
        console.log("中文：我同意");
        hasAggreeBtn_zh.click();
    }
    else if (hasAggreeBtn_kr)
    {
        console.log("韩文：我同意");
        hasAggreeBtn_kr.click();
    }
    let hasMoreBtn_zh = text("更多").findOne(100);
    let hasMoreBtn_kr = text("더보기").findOne(100);
    if (hasMoreBtn_zh)
    {
        console.log("更多");
        hasMoreBtn_zh.click();
    }
    if (hasMoreBtn_kr)
    {
        console.log("韩文：更多");
        hasMoreBtn_kr.click();
        Sleep();
    }
    let hasAcceptBtn_zh = text("接受").findOne(100);
    let hasAcceptBtn_kr = text("동의").findOne(100);
    if (hasAcceptBtn_zh)
    {
        console.log("接受");
        hasAcceptBtn_zh.click();
    }
    else if (hasAcceptBtn_kr)
    {
        console.log("韩文：接受");
        hasAcceptBtn_kr.click();
    }
    let hadYeah = text("예").findOne(100);
    if (hadYeah)
    {
        console.log("click yes");
        hadYeah.click();
    }
};
const AgreeGameRules = () =>
{
    let checkBox_0 = ReadImg("icon/login/checkBox_0");

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
    if (FindMultiColors(BlackBtnColorList, [272, 520, 748, 125]))
    {
        RandomPress([415, 565, 472, 36]);
    }
    const hasCheckBox_0 = FindImg(checkBox_0, [247, 232, 127, 108]);
    if (hasCheckBox_0)
    {
        console.log("点击勾选框");
        click(300, 280);
        Sleep();
        RandomPress([337, 561, 632, 32]);
    }
    checkBox_0.recycle();
};
const LoginGoogleAccountInGame = () =>
{
    console.log("开始登录谷歌账号");
    let hadSentEmail = false;
    const accountArray = GetAccountFile();
    let input_placeholder_recoveryEmail = ReadImg("icon/login/input_placeholder_recoveryEmail");

    for (let i = 0; i < 400; i++)
    {
        InputGoogleAccount(accountArray);
        SetCountryAndBirth();
        AgreeGameRules();
        let hasInput_placeholder_recoveryEmail = FindImg(input_placeholder_recoveryEmail, [280, 359, 170, 119]);
        if (hasInput_placeholder_recoveryEmail)
        {
            setText(accountArray[0]);
            RandomPress([413, 558, 539, 41]);
            console.log("发送邮箱验证码。");
            hadSentEmail = true;
            break;
        }
        ClickNextBtn();
        Sleep();
        console.log("loop： " + i);
    }
    input_placeholder_recoveryEmail.recycle();
    return hadSentEmail;
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

    for (let i = 0; i < 90; i++)
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
                    console.log("find serch box");
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
            console.log("id: 首次打开谷歌浏览器，确认协议.");
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
        console.log("输入邮箱网址完成。");
        return true;
    }
    return false;
};

const EnterGoogleEmail = () =>
{
    console.log("确保进入到谷歌邮箱页面");

    let hasRefreshIcon = false;

    console.log("判断是否已经登录");
    for (let i = 0; i < 50; i++)
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
            console.log("already login in google account");
        }
        let hasMenu_0 = text("Menu").findOne(20);
        if (hasMenu_0)
        {
            console.log("发现邮箱的菜单按钮，已经在邮箱页面中，开始下一步获取验证码");
            break;
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
    console.log("获取邮箱验证码。。。");

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
        }
        hasInBoxIcon = text("Inbox").findOne(20);
        if (hasInBoxIcon)
        {
            console.log("has inbox icon. click to inbox");
            hasInBoxIcon.click();
        }
        let hasUseWebVersion = text("Use the web version").findOne(20);
        if (hasUseWebVersion)
        {
            console.log("click web version");
            click(hasUseWebVersion.bounds().centerX(), hasUseWebVersion.bounds().centerY());
            Sleep(3);
        }
        let hasStoveEmail_0 = textMatches(/(.*인증 메일 안내.*)/).findOne(100);
        if (hasStoveEmail_0)
        {
            console.log("收到验证邮件，开始下一步，获取最新验证码");
            hasStoveEmail_0.click();
            break;
        }
        Sleep();
    }
    for (let i = 0; i < 30; i++)
    {
        let hasStoveEmail = textMatches(/(.*인증 메일 안내.*)/).findOne(100);
        if (hasStoveEmail)
        {
            console.log("recevie email");
            hasStoveEmail.click();
            Sleep(2);
            let hasRecoveryCode_0 = textMatches(/\d{6}/).findOne(100);
            if (hasRecoveryCode_0)
            {
                code = hasRecoveryCode_0.text();
                console.log("发现最新的邮件验证码: " + code);
                break;
            }
        }
        let hasLatestEmail = textMatches(/(.*minute.*)/).findOne(20);
        if (hasLatestEmail)
        {
            let lastMinute = hasLatestEmail.text().replace(/[^0-9]/ig, "");
            if (lastMinute == 0 || lastMinute == 1)
            {
                let hasRecoveryCode = textMatches(/\d{6}/).findOne(100);
                if (hasRecoveryCode)
                {
                    code = hasRecoveryCode.text();
                    console.log("发现最新的邮件验证码: " + code);
                    break;
                }
            }
        }
        Sleep();
    }
    return code;
};

const LoginFlow = () =>
{
    console.log("login flow...");
    const accountArray = GetAccountFile();
    WaitUntilEnterAccountPage();
    const hadLoginCheck = HadLoginCheck();
    if (!hadLoginCheck)
    {
        LoginGoogleAccount();
    }
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
    const voiceIconColorList = [
        ["#ccbc8b", [[7, -2, "#d7c692"], [9, -3, "#d4c391"], [10, 1, "#dac894"], [9, 2, "#dac894"]]]
    ];
    Sleep(5);
    if (FindMultiColors(voiceIconColorList, [1207, 27, 48, 47]))
    {
        console.log("voice icon found! need download something");
        for (let i = 0; i < 30; i++)
        {
            if (FindMultiColors(voiceIconColorList, [1207, 27, 48, 47]))
            {
                console.log("voice icon found! need download something");
            }
            else
            {
                console.log("voice icon not found! need download something");
                break;
            }
            Sleep(60);
        }
    }
};

const PressServerBar = () => RandomPress([547, 590, 173, 32]);

const WaitUntilEnterServerSelectPage = () =>
{
    console.log("等待直到进入服务器选择页面...");

    for (let i = 0; i < 90; i++)
    {
        if (HasMainUI())
        {
            Sleep(5);
            PressServerBar();
        }
        if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]))
        {
            PressServerBar();
        }
        if (HasPopupClose([1161, 56, 61, 68]))
        {
            console.log("enter server select page successfullly!!");
            break;
        }
        else if (HasSkip())
        {
            ClickSkip();
            Sleep();
        }
        let hasPopup_verificationCode = FindImgInList(verificationCodeImgList, [530, 235, 215, 78]);
        if (hasPopup_verificationCode)
        {
            console.log("发现验证码弹窗");
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
    let hadAlreadyLogin = false;
    for (let i = 0; i < 60; i++)
    {
        if (HasMainUI())
        {
            Sleep(5);
            PressServerBar();
            // PressBlank();
        }
        if (HasPopupClose([1168, 60, 48, 56]))
        {
            console.log("检测到已经登录账号，跳过登录账号");
            hadAlreadyLogin = true;
            break;
        }
        if (textMatches(/(.*Google.*)/).findOne(20))
        {
            console.log("发现Google账号登录界面，需要登录账号");
            hadAlreadyLogin = false;
            break;
        }
        if (HasSkip())
        {
            ClickSkip();
        }
        if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41]))
        {
            PressServerBar();
            console.log("发现已经选区，重新选区");
            hadAlreadyLogin = true;
            break;
        }
        Sleep();
    }

    if (hadAlreadyLogin == false)
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

// LoginFlow();
// LoginGoogleAccountInGame();
// GetVerificationCode();
// EnterGoogleEmail();
// EnterGameToSendVerificationCode();
// InputEmailUrl();
// EnterGoogleEmail();
// GetRecoveryCode();
// WaitUntilEnterLoginPage();
// LoginGoogleAccout();
// app.launch("com.android.chrome");


// WaitUntilEnterServerSelectPage();
// EnterRandomServer();
// console.log(FindMultiColors(CanNotCreateCharacterColorList, [515, 317, 106, 58]));
// EnterSelectedServer("65");
// console.log(FindCheckMark([294, 552, 91, 64]));
// SetName();