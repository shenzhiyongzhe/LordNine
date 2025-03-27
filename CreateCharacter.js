const {
    ClickSkip,
    FindMultiColors, FindBlueBtn, FindCheckMark, PressBlank, FindRedBtn, FindImgInList, FindImg,
    HasSkip, HasPopupClose, LoadImgList,
    ReadConfig, RewriteConfig, ReadImg, RandomPress, RestartGame, ReadAccountFile,
    WaitUntil, WaitUntilFindColor,
    Sleep, SetCountryAndBirth,
    RecycleImgList,
    StopScript,
    StopGame,
    humanSwipe,
} = require("./utils.js");


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
    ["#8a3031", [[17, 1, "#862f30"], [27, 1, "#8b3031"], [32, 1, "#8a3031"], [46, -2, "#8b3031"]]],
    ["#842e2f", [[2, 0, "#842e2f"], [5, 0, "#842e2f"], [8, 0, "#732b2b"], [19, 1, "#8a3031"]]]
];

const BlackBtnColorList = [
    ["#000000", [[51, -4, "#000000"], [86, 33, "#000000"], [35, 51, "#000000"], [-42, 27, "#000000"]]],
    ["#000000", [[64, -1, "#000000"], [110, 23, "#000000"], [55, 51, "#000000"], [-3, 12, "#000000"]]],
    ["#000000", [[118, -8, "#000000"], [305, -1, "#000000"], [308, 45, "#000000"], [56, 37, "#000000"]]],
    ["#000000", [[100, 0, "#000000"], [237, 19, "#000000"], [210, 41, "#000000"], [32, 33, "#000000"]]]
];

let checkBox_0 = ReadImg("icon/login/checkBox_0");
const verificationCoeInput_zh = LoadImgList("icon/beginner/verificationCodeInput_zh");
const confirmsuccess = LoadImgList("icon/confirmsuccess");
const PleaseReconfirm = LoadImgList("icon/PleaseReconfirm");
const deviceRegistrationIsComplete = LoadImgList("icon/deviceRegistrationIsComplete");
const canNotCreateCharacterImgList = LoadImgList("icon/beginner/canNotCreateCharacter");
const PreventAutomaticLogin = LoadImgList("icon/PreventAutomaticLogin");
const RecognitionFailure = LoadImgList("icon/RecognitionFailure");
const DropDownOption = LoadImgList("icon/DropDownOption");
const HongKong = LoadImgList("icon/HongKong+852");
const agree = LoadImgList("icon/agree");

const input_placeholder_recoveryEmail = ReadImg("icon/login/input_placeholder_recoveryEmail");
const loginto = ReadImg("icon/login/001");

const serverNameImgList = [];
const GenerateRandomName = () => {
    const CharDiction = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    let name = [];
    for (let i = 0; i < 8; i++) {
        name.push(CharDiction[Math.floor(random() * CharDiction.length)]);
    }
    name[0] = CharDiction[Math.floor(random() * 51)];
    return name.join("");
};



const LoadServerImgList = () => {
    let imgList = null;
    for (let i = 0; i < 9; i++) {
        imgList = LoadImgList(`icon/beginner/serverNameList/${i}`);
        serverNameImgList.push(imgList);
    }
};

LoadServerImgList();

const HasMainUI = () => FindMultiColors(LordNineWordColorList, [313, 333, 728, 354]);

const ClickNextBtn = (findTime) => {
    findTime = findTime || 20;
    const hasNext_kr = text("다음").findOne(findTime);
    const hasNext_zh = text("下一步").findOne(findTime);
    const hasNext_en = text("Next").findOne(findTime)
    if (hasNext_zh) {
        hasNext_zh.click();
        console.log("检测到中文 点击下一步");
    }
    else if (hasNext_kr) {
        hasNext_kr.click();
        console.log("检测到韩文 点击下一步");
    }
    else if (hasNext_en) {
        hasNext_en.click()
    }
};
const ClickConfirmBtn = (findTime) => {
    findTime = findTime || 20;
    const hasConfirm_zh = text("確認").findOne(findTime);
    if (hasConfirm_zh) {
        console.log("点击确认-zh");
        hasConfirm_zh.click();
        return true;
    }
    const hasConfirm_kr = text("확인").findOne(findTime);
    if (hasConfirm_kr) {
        console.log("点击确认-kr");
        hasConfirm_kr.click();
        return true;
    }

};





function ReceiveVerificationCode(url) {
    let resoult = http.get(url)
    if (resoult) {
        log("code = " + r.statusCode);
        log("html = " + r.body.string());
    }
}



const PressServerBar = () => { console.log("点击服务器框，进入选区页面"); RandomPress([547, 590, 173, 32]); };
const CheckLogin = () => {
    console.log("check login：检测是否已经登录账号");

    let isLogin = false;

    for (let i = 0; i < 400; i++) {
        if (HasSkip()) {
            ClickSkip();
        }
        if (HasMainUI()) {
            if (!FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41])) {
                console.log("发现权力之望标志，点击屏幕开始");
                Sleep(5);
                PressBlank();
            }
            else {
                console.log("到了区服的游戏主页面");
                PressServerBar();
            }
        }
        ClickNextBtn()
        if (FindMultiColors(BlackBtnColorList, [283, 530, 717, 109])) {
            RandomPress([402, 556, 506, 50])
        }
        let hasFacebookLogin = textMatches(/(.*Facebook.*)/).findOne(20);
        if (hasFacebookLogin) {
            let googleIcon = textMatches(/(.*Google.*)/).findOne(20);
            if (googleIcon) {
                if (googleIcon.bounds().centerY() > 720) {
                    swipe(1000, 670, 1000, 200, 1);
                    Sleep();
                }
                googleIcon = textMatches(/(.*Google.*)/).findOne(20);
                click(googleIcon.bounds().centerX(), googleIcon.bounds().centerY());
                console.log("发现谷歌登录选项。点击选择谷歌账号登录。");
            }
        }
        let hasAppleLoginPopup = textMatches(/.*lordnine signin with apple.*/).findOne(20);
        if (hasAppleLoginPopup) {
            console.log("误点击苹果账号登录，点击关闭苹果登录弹窗");
            let close_btn = id("close_button").findOne(20);
            if (close_btn) {
                close_btn.click();
            }
            else {
                RandomPress([1161, 38, 29, 27])
            }
        }
        let hasSelectAccount = textMatches(/.*选择账号.*|.*계정 선택.*|.*选择帐号.*|.*再添加一个账号.*/).findOne(20);
        if (hasSelectAccount) {
            let hasAccount = textMatches(/(.*@gmail.com.*)/).findOne(20);
            if (hasAccount) {
                console.log("发现谷歌账号选择页面，点击使用该账号直接登录");
                click(hasAccount.bounds().centerX(), hasAccount.bounds().centerY())
            }
        }
        let hasAgreeConcept = text("모두 동의 후 계속하기 (선택항목 포함)").findOne(20);
        if (hasAgreeConcept) {
            click(hasAgreeConcept.bounds().centerX(), hasAgreeConcept.bounds().centerY());
            console.log("点击同意全部协议");
        }
        //同意相关协议
        let hadOrangeConfirm_KoreadRepublicOf = text("다음").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf) {
            console.log("韩文：发现确认按钮，点击下一步");
            hadOrangeConfirm_KoreadRepublicOf.click();
            Sleep(3);
        }
        let hadOrangeConfirm_KoreadRepublicOf_ch = text("下一步").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf_ch) {
            console.log("发现中文按钮：点击下一步");
            hadOrangeConfirm_KoreadRepublicOf_ch.click();
            Sleep(3);
        }
        let hadOrangeConfirm_AgreeThreeProtocol = text("모두 동의 후 계속하기 (선택항목 포함)").findOne(20);
        if (hadOrangeConfirm_AgreeThreeProtocol) {
            console.log("发现3个协议，点击同意");
            hadOrangeConfirm_AgreeThreeProtocol.click();
        }
        let hadOrangeConfirm_AgreeThreeProtocal_zh = text("全部同意後繼續（包含可選項目）").findOne(20);
        if (hadOrangeConfirm_AgreeThreeProtocal_zh) {
            hadOrangeConfirm_AgreeThreeProtocal_zh.click();
        }
        let clickWrong_14_years_old = text("I am 14 years of age or older").findOne(20);
        if (clickWrong_14_years_old) {
            RandomPress([34, 39, 37, 40]);
        }

        let hasLoginGameDevice_zh = text("登錄遊戲裝置").findOne(20);
        if (hasLoginGameDevice_zh) {
            let hasCheckBox_0 = FindImg(checkBox_0, [247, 232, 127, 108]);
            const agreeToUsePersonalData = textMatches(/.*同意收集及使用個人資料.*/).findOne(20);
            if (hasCheckBox_0) {
                console.log("点击勾选框");
                click(300, 280);
                Sleep();
                RandomPress([506, 556, 299, 52]);
            }
            else if (agreeToUsePersonalData) {
                RandomPress([297, 271, 23, 26]); //勾选项
                RandomPress([414, 565, 492, 42]); //下一步
            }
        }
        let hasLoginGameDevice_kr = text("게임 기기 등록").findOne(20);
        if (hasLoginGameDevice_kr) {
            let agreeToUsePersonalData_kr = text("개인정보 수집 및 이용에 동의합니다.").findOne(20); //翻译：同意使用个人信息
            if (FindImg(checkBox_0, [247, 232, 127, 108])) {
                console.log("点击勾选框");
                click(300, 280);
                Sleep();
                RandomPress([506, 556, 299, 52]);
            }
            else if (agreeToUsePersonalData_kr) {
                RandomPress([297, 271, 23, 26]); //勾选项
                RandomPress([414, 565, 492, 42]); //下一步
            }
        }
        let hadOrangeConfirm_txt = text("確定").findOne(20);
        if (hadOrangeConfirm_txt) {
            hadOrangeConfirm_txt.click();
        }
        let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(20);
        let hasForgetEmail_kr = text("이메일을 잊으셨나요?").findOne(20);
        if (hasForgetEmail_zh || hasForgetEmail_kr) {
            console.log("发现忘记电子邮件地址。 账号未登录，开始执行登录流程");
            isLogin = false;
            break;
        }

        // if (FindImgInList(PreventAutomaticLogin, [504, 180, 254, 102])) {
        //     console.log("发现防止自动登录，点击验证");
        //     shot = captureScreen();
        //     let temp = images.clip(shot, 469, 296, 284, 98)
        //     let image_Base64 = images.toBase64(temp)
        //     temp.recycle()
        //     let resoult = CJY_OCR(image_Base64)
        //     if (resoult != null) {
        //         RandomPress([518, 407, 248, 23]);
        //         sleep(random(1000, 2000))
        //         setText(resoult.pic_str)
        //         sleep(random(1000, 2000))
        //         RandomPress([363, 42, 602, 94]);
        //         sleep(random(1000, 2000))
        //         RandomPress([567, 514, 139, 39]);
        //         shot = captureScreen();
        //         if (FindImgInList(RecognitionFailure, [510, 395, 258, 55])) {
        //             console.log("发现未验证通过，执行反分");
        //             CJY_ReportError(resoult.pic_id)
        //         }
        //     }
        // }


        // if (FindImgInList(agree, [647, 408, 203, 103])) {
        //     console.log("点击同意");
        //     RandomPress([677, 442, 120, 31]);
        // }


        // let HongKong_resoult = FindImgInList(HongKong, [466, 310, 362, 223])
        // if (HongKong_resoult != null) {
        //     console.log("点击选择HongKong地区");
        //     RandomPress([HongKong_resoult.x, HongKong_resoult.y, 153, 13]);
        // }

        // if (FindImgInList(DropDownOption, [756, 252, 92, 65])) {
        //     if (FindImgInList(HongKong, [547, 257, 198, 53])) {
        //         console.log("点击电话号码输入框并输入");
        //         RandomPress([496, 312, 179, 17]);
        //         sleep(random(1000, 2000))
        //         setText()//电话
        //         sleep(random(1000, 2000))
        //         RandomPress([338, 39, 611, 112]);//输入法上方区域
        //         sleep(random(1000, 2000))
        //         RandomPress([724, 312, 90, 21]);//接收验证码按钮

        //     } else {
        //         console.log("点击选择电话号码地区");
        //         RandomPress([800, 277, 17, 16]);
        //     }
        // }


        if (HasPopupClose([1161, 56, 61, 68])) {
            console.log("发现到了选区页面，已经登录账号，跳过登录流程");
            isLogin = true;
            // RandomPress([73, 211, 1134, 395]);
            break
        }


        let hasGameRegisterBook = text("게임 기기 등록 서비스 안내").findOne(20);
        if (hasGameRegisterBook) {
            let hasBlackConfrimBtn = text("다음").findOne(20);
            if (hasBlackConfrimBtn) {
                Sleep(3);
                console.log("${发现游戏注册指南，需要辅助邮箱验证，需要登录}");
                console.log("点击黑色的确认按钮");
                hasBlackConfrimBtn.click();
                isLogin = false;
                break;
            }
        }
        let hasRecoveryEmailInput = textMatches(/.*請進行備用電子信箱驗證.*/).findOne(20);
        if (hasRecoveryEmailInput) {
            console.log("发现需要输入辅助邮箱");
            isLogin = false;
            break;
        }
        let hasRecoveryEmailInput_kr = text("보조 이메일 인증을 진행해주세요.").findOne(20);
        if (hasRecoveryEmailInput_kr) {
            console.log("发现身份验证，需要输入辅助邮箱，并发送验证码");
            isLogin = false;
            break;
        }
        let haveSendVerificationCode = text("이메일로 인증번호가 발송되었습니다.").findOne(20);
        if (haveSendVerificationCode) {
            console.log("发现已发送邮箱验证码，退出");
            isLogin = false;
            break;
        }
        if (FindBlueBtn([557, 427, 169, 61])) {
            console.log("发现t004 确认按钮，点击确认");
            RandomPress([578, 443, 125, 29]);
        }
        let hadNeedInputBirthday = textMatches(/(.*MM.DD.YYYY.*)/).findOne(20);
        if (hadNeedInputBirthday) {
            console.log("输入生日");
            SetCountryAndBirth();
        }
        if (text('[40003] InitializeError').findOne(20)) {
            let hadOrangeConfirm_txt = text("確定").findOne(20);
            if (hadOrangeConfirm_txt) {
                console.log("40003错误，退出脚本");
            }
        }
        if (textMatches(/.*已發送驗證碼至電子信箱.*/).findOne(20)) {
            console.log("发现已发送验证码弹窗，点击确认");
            let hasConfirmBtn = text("確認").findOne(20);
            if (hasConfirmBtn) {
                hasConfirmBtn.click();
                Sleep()
            }
            break;
        }
        let hasInput_placeholder_recoveryEmail = FindImg(input_placeholder_recoveryEmail, [280, 359, 170, 119]);
        if (hasInput_placeholder_recoveryEmail) {
            console.log("发现辅助游戏邮箱输入框，进入登录环节");
            isLogin = false;
            break;
        }
        Sleep();
    }
    console.log("检测登录流程结束，当前是否登录：" + isLogin);
    return isLogin;
};



const config = ReadConfig();
const accountInfo = config.accountInfo;

const LoginGoogleAccount = () => {
    console.log("LoginGoogleAccount:开始登录 Google 账号");

    for (let i = 0; i < 400; i++) {
        let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(20);
        let hasForgetEmail_kr = text("이메일을 잊으셨나요?").findOne(20);
        if (hasForgetEmail_zh || hasForgetEmail_kr) {
            console.log("发现忘记电子邮件地址。 开始输入邮箱。");
            setText(accountInfo.account);
            Sleep(3);
            ClickNextBtn();
        }
        let hasPasswordInputBox_kr = text("비밀번호 표시").findOne(20);
        let hasPasswordInputBox_zh = text("显示密码").findOne(20);
        if (hasPasswordInputBox_kr || hasPasswordInputBox_zh) {
            console.log("发现密码输入框，开始输入密码");
            setText(accountInfo.password);
            Sleep(3);
            ClickNextBtn();
        }
        let hasRecoveryEmailOption = desc("복구 이메일 확인").findOne(20);
        if (hasRecoveryEmailOption) {
            console.log("发现账号验证选项，使用辅助邮箱验证");
            hasRecoveryEmailOption.click();
        }
        let hasRecoveryEmailOption_zh = text("选择您想要使用的登录方式：").findOne(20);
        if (hasRecoveryEmailOption_zh) {
            console.log("发现选择登录方式，使用辅助邮箱验证：");
            let hasUseRecoveryEmailOption_zh = text("确认您的辅助邮箱").findOne(20);
            if (hasUseRecoveryEmailOption_zh) {
                console.log("点击确认您的辅助邮箱");
                click(hasUseRecoveryEmailOption_zh.bounds().centerX(), hasUseRecoveryEmailOption_zh.bounds().centerY());
            }
        }
        let hasInputRecovery = text("다른 방법 시도").findOne(20);
        if (hasInputRecovery) {
            console.log("发现辅助邮箱输入框，开始输入辅助邮箱");
            setText(accountInfo.auxiliary_mailbox);
            Sleep(3);
            ClickNextBtn();
        }
        let hasInputRecovery_simple_zh = textMatches(/.*确认您添加到自己账号的辅助邮箱地址.*/).findOne(20);
        if (hasInputRecovery_simple_zh) {
            console.log("发现辅助邮箱输入框，开始输入辅助邮箱");
            setText(accountInfo.auxiliary_mailbox);
            Sleep(3);
            ClickNextBtn();
        }
        let hasAddTelephone_zh = text("要添加电话号码吗？").findOne(20);
        if (hasAddTelephone_zh) {
            console.log("是否添加电话号码？，点击跳过");
            let hasJump = text("跳过").findOne(20);
            if (hasJump) {
                hasJump.click();
            }
        }
        let hasInputRecovery_zh = textMatches(/.*請進行備用電子信箱驗證.*/).findOne(20);
        if (hasInputRecovery_zh) {
            console.log("发现辅助邮箱输入框，开始输入辅助邮箱");
            setText(accountInfo.account);
            Sleep(3);
            RandomPress([413, 558, 539, 41], 3);
            console.log("cn:邮箱验证码已发送！");
            if (textMatches(/.*已發送驗證碼至電子信箱.*/).findOne(20)) {
                console.log("发现已发送验证码弹窗，点击确认");
                let hasConfirmBtn = text("確認").findOne(20);
                if (hasConfirmBtn) {
                    hasConfirmBtn.click();
                }
            }
            break;

        }
        let hasAggreeBtn_zh = text("我同意").findOne(20);
        let hasAggreeBtn_kr = text("동의").findOne(20);
        if (hasAggreeBtn_zh) {
            console.log("我同意");
            hasAggreeBtn_zh.click();
        }
        else if (hasAggreeBtn_kr) {
            console.log("同意");
            hasAggreeBtn_kr.click();
        }
        let hasMoreBtn_zh = text("更多").findOne(20);
        let hasMoreBtn_kr = text("더보기").findOne(20);
        if (hasMoreBtn_zh) {
            console.log("更多");
            hasMoreBtn_zh.click();
        }
        if (hasMoreBtn_kr) {
            console.log("更多 kr");
            hasMoreBtn_kr.click();
            Sleep();
        }
        let hasAcceptBtn_zh = text("接受").findOne(20);
        let hasAcceptBtn_kr = text("동의").findOne(20);
        if (hasAcceptBtn_zh) {
            console.log("接受");
            hasAcceptBtn_zh.click();
        }
        else if (hasAcceptBtn_kr) {
            console.log("接受");
            hasAcceptBtn_kr.click();
        }
        let hadYeah = text("예").findOne(20);
        if (hadYeah) {
            console.log("click yes");
            hadYeah.click();
        }
        //同意相关协议
        let hadOrangeConfirm_KoreadRepublicOf = text("다음").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf) {
            console.log("韩文：点击下一步");
            hadOrangeConfirm_KoreadRepublicOf.click();
            Sleep(3);
        }
        let hadOrangeConfirm_KoreadRepublicOf_ch = text("下一步").findOne(20);
        if (hadOrangeConfirm_KoreadRepublicOf_ch) {
            console.log("点击下一步");
            hadOrangeConfirm_KoreadRepublicOf_ch.click();
            Sleep(3);
        }
        let hadOrangeConfirm_AgreeThreeProtocol = text("모두 동의 후 계속하기 (선택항목 포함)").findOne(20);
        if (hadOrangeConfirm_AgreeThreeProtocol) {
            console.log("发现3个协议，点击同意");
            hadOrangeConfirm_AgreeThreeProtocol.click();
        }
        let hadOrangeConfirm_AgreeThreeProtocal_zh = text("全部同意後繼續（包含可選項目）").findOne(20);
        if (hadOrangeConfirm_AgreeThreeProtocal_zh) {
            hadOrangeConfirm_AgreeThreeProtocal_zh.click();
        }
        let clickWrong_14_years_old = text("I am 14 years of age or older").findOne(20);
        if (clickWrong_14_years_old) {
            RandomPress([34, 39, 37, 40]);
        }
        let hasBlackBtn = FindMultiColors(BlackBtnColorList, [272, 520, 748, 125]);
        if (hasBlackBtn) {
            RandomPress([hasBlackBtn.x, hasBlackBtn.y, 10, 10]);
            console.log("点击黑色按钮");
        }
        let hasBlackBtn_node = text("다음").findOne(20);
        if (hasBlackBtn_node) {
            hasBlackBtn_node.click();
            console.log("点击黑色按钮节点");
        }

        let hasCheckBox_0 = FindImg(checkBox_0, [247, 232, 127, 108]);
        let agreeToUsePersonalData = textMatches(/.*同意收集及使用個人資料.*/).findOne(20);
        if (hasCheckBox_0) {
            console.log("点击勾选框");
            click(300, 280);
            Sleep();
            RandomPress([506, 556, 299, 52]);
        }
        else if (agreeToUsePersonalData) {
            RandomPress([297, 271, 23, 26]); //勾选项
            RandomPress([414, 565, 492, 42]); //下一步
        }

        let hasInput_placeholder_recoveryEmail = FindImg(input_placeholder_recoveryEmail, [280, 359, 170, 119]);
        if (hasInput_placeholder_recoveryEmail) {
            console.log(`发现辅助游戏邮箱输入框，开始输入邮箱,email:${accountInfo.account}`);
            RandomPress([329, 390, 619, 41])
            setText(accountInfo.account);
            Sleep(random(1, 3));
            RandomPress([338, 71, 615, 63]) // 关闭键盘
            RandomPress([413, 558, 539, 41], 3); //点击下一步
            console.log("邮箱验证码已发送！");
            if (textMatches(/.*已發送驗證碼至電子信箱.*/).findOne(20)) {
                console.log("发现已发送验证码弹窗，点击确认");
                ClickConfirmBtn();
                break;
            }
        }
        //删除账户，重新登录，不需要重新输入邮箱
        let haveSendVerificationCodeToBox = text("이메일로 인증번호가 발송되었습니다.").findOne(20); //翻译：已通过电子邮件发送了验证码。
        if (haveSendVerificationCodeToBox) {
            console.log("发现已经发送了邮箱验证码，点击确认");
            let haveBlackConfirmBtn = text("확인").findOne(20); //翻译：确认
            if (haveBlackConfirmBtn) {
                haveBlackConfirmBtn.click();
                break;
            }
        }

        let hasloginto = FindImg(loginto, [316, 225, 684, 144]);
        if (hasloginto) {
            console.log("识图发现已经发送了邮箱验证码，点击确认");
            RandomPress([408, 384, 459, 56])
            break;
        }
        Sleep();
    }
};

const InputEmailUrl = () => {
    console.log("开始输入邮箱网址");

    let hasHomeIcon = false;
    let hasPlusIcon = false;
    let hasSearchInputBox = false;
    let hasLocationBar = false;
    let hasUrlBar = false;

    for (let i = 0; i < 100; i++) {
        let hasJump_btn = text("건너뛰기").findOne(20);
        if (hasJump_btn) {
            hasJump_btn.click();
        }
        hasHomeIcon = id("home_button").findOne(20);
        if (hasHomeIcon) {
            hasHomeIcon.click();
            hasSearchInputBox = id("search_box").findOne(20);
            if (hasSearchInputBox) {
                console.log("find search box !");
                break;
            }
        }
        let has_optional_boolbar_button = id("optional_boolbar_button").findOne(20);
        if (has_optional_boolbar_button) {
            console.log("点击新建页");
            has_optional_boolbar_button.click();
        }
        hasPlusIcon = id("new_tab_view").findOne(20);
        if (hasPlusIcon) {
            hasPlusIcon.click();
            hasHomeIcon = id("home_button").findOne(20);
            if (hasHomeIcon) {
                hasHomeIcon.click();
                hasSearchInputBox = id("search_box").findOne(20);
                if (hasSearchInputBox) {
                    console.log("find serch box");
                    break;
                }
            }
        }

        hasSearchInputBox = id("search_box").findOne(20);
        if (hasSearchInputBox) {
            break;
        }
        hasLocationBar = id("location_bar_status_icon").findOne(20);
        if (hasLocationBar) {
            console.log("find location bar!");
            break;
        }
        hasUrlBar = id("url_bar").findOne(200);
        if (hasUrlBar) {
            console.log("find url bar.");
            break;
        }
        let openNewTab = textMatches(/.*打开新的标签页.*/).findOne(20)
        if (openNewTab) {
            console.log("点击打开新的标签页")
            click(openNewTab.bounds().centerX(), openNewTab.bounds().centerY())
        }
        let hasAcceptAndContinue_zh = text("接受并继续").findOne(20);
        if (hasAcceptAndContinue_zh) {
            hasAcceptAndContinue_zh.click();
        }
        let hasFre_bottom_group = id("fre_bottom_group").findOne(20);
        if (hasFre_bottom_group) {
            console.log("id: 首次打开谷歌浏览器，确认协议.");
            Sleep(3);
            try {
                hasFre_bottom_group.click()
                click(hasFre_bottom_group.bounds().centerX(), hasFre_bottom_group.bounds().centerY());
            }
            catch (error) {
                alert("异常", "暂未处理的异常")
            }
        }
        let hadAggreeConcept = text("동의하고 계속").findOne(20);
        if (hadAggreeConcept) {
            console.log("text:首次打开谷歌浏览器，确认协议.");
            hadAggreeConcept.click();
        }
        if (textMatches(/.*要将Chrome设为您的默认浏览器应用吗.*/).findOne(20)) {
            let haveCancel = text('取消').findOne(20)
            if (haveCancel) {
                haveCancel.click()
            }
        }
        let hasAddAccount = text("취소").findOne(20);
        if (hasAddAccount) {
            console.log("是否添加账号，点击取消");
            hasAddAccount.click();
        }
        let hasUseAccount = text("사용").findOne(20);
        if (hasUseAccount) {
            console.log("发现关联账号，点击关联该账号");
            hasUseAccount.click();
        }
        let hasNoAccoutToUse = text("계정 없이 사용").findOne(20);
        if (hasNoAccoutToUse) {
            hasNoAccoutToUse.click();
        }
        let hadOpenText = text("展开").findOne(20);
        if (hadOpenText) {
            console.log("点击展开");
            hadOpenText.click();
        }
        let hadKnownText = text("知道了").findOne(20);
        if (hadKnownText) {
            console.log("知道了");
            hadKnownText.click();
        }
        let hadDetailedText = text("자세히").findOne(20);
        if (hadDetailedText) {
            hadDetailedText.click();
        }
        let hadFirstTime_confirmText = text("확인").findOne(20);
        if (hadFirstTime_confirmText) {
            hadFirstTime_confirmText.click();
        }
        let yourKeyborderWontChange = textMatches(/.*您的键盘不会有变化.*/).findOne(20);
        if (yourKeyborderWontChange) {
            let hasKeyBorderPopupConfirm = text("确认").findOne(20);
            if (hasKeyBorderPopupConfirm) {
                console.log("发现键盘弹窗，点击确认");
                hasKeyBorderPopupConfirm.click();
            }
        }
        let hasSaveTimePopup = text("节省时间，减少输入操作").findOne(20);
        if (hasSaveTimePopup) {
            console.log("节省时间，减少输入操作");
            let hasNoAndThanks = text("不用了，谢谢").findOne(20);
            hasNoAndThanks.click();
        }
        let hasOpenSyncFunc = textMatches(/.*开启同步功能.*/).findOne(20);
        if (hasOpenSyncFunc) {
            console.log("发现开启同步功能弹窗，点击取消");
            let hasNoAndThanks = text("不用了，谢谢").findOne(20);
            hasNoAndThanks.click();
        }
        let hasUseIdentificationContinue = textMatches(/.*的身份继续.*/).findOne(20);
        if (hasUseIdentificationContinue) {
            console.log("发现关联账号，点击使用该账户继续");
            click(hasUseIdentificationContinue.bounds().centerX(), hasUseIdentificationContinue.bounds().centerY());
        }


        Sleep();
        console.log("loop: " + i);
    }
    for (let i = 0; i < 10; i++) {
        RandomPress([345, 100, 56, 14]);
        console.log("set text: url: https://mail.google.com");
        setText("https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=Ab5oB3qf7n2kJ0DkeNfW4CCNqYU37pmOSMWBPtyZzVGDdJnrZfPwECRIX01Jayqe0Yc5cR29ifDZGA&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S18480657%3A1724727896300825&ddm=0");
        Sleep(random(6, 10));
        if (textMatches(/.*인증 메일 안내.*/).findOne(20)) {
            console.log("发现STOVE邮箱验证，退出输入邮箱地址");
            return true;
        }
        if (textMatches(/(.*mail.google.com.*)/).findOne(3000)) {
            Sleep();
            console.log("固定点击第一个");
            RandomPress([117, 195, 348, 48]);
            console.log("输入邮箱网址完成。");
            Sleep(5);
            for (let i = 0; i < 40; i++) {
                let hasAccountSelect = text("건너뛰기").findOne(20);
                if (hasAccountSelect) {
                    console.log("发现邮箱关联账户，点击关联");
                    Sleep(3);
                    RandomPress([252, 1084, 218, 41]);
                }
                if (textMatches(/.*인증 메일 안내.*/).findOne(20)) {
                    console.log("发现STOVE邮箱验证，退出输入邮箱地址");
                    return true;
                }
                let hasUseIdentificationContinue = textMatches(/.*的身份继续.*/).findOne(20);
                if (hasUseIdentificationContinue) {
                    console.log("发现关联账号，点击使用该账户继续");
                    click(hasUseIdentificationContinue.bounds().centerX(), hasUseIdentificationContinue.bounds().centerY());
                }
                let hasForgetEmail_zh = text("忘记了电子邮件地址？").findOne(20);
                if (hasForgetEmail_zh) {
                    console.log("发现忘记电子邮件地址。 开始输入邮箱。");
                    setText(accountInfo.account);
                    Sleep(3);
                    ClickNextBtn();
                }
                let hasPasswordInputBox_zh = text("显示密码").findOne(20);
                if (hasPasswordInputBox_zh) {
                    console.log("发现密码输入框，开始输入密码");
                    setText(accountInfo.password);
                    Sleep(3);
                    ClickNextBtn();
                }
                let haveShowPassword_en = text("Show password").findOne(20)
                if (haveShowPassword_en) {
                    console.log("发现密码输入框，开始输入密码");
                    setText(accountInfo.password);
                    Sleep(3);
                    ClickNextBtn()
                }
                if (text("Use the web version").findOne(20)) {
                    console.log("发现网页邮箱，输入邮箱地址成功，退出");
                    return true;
                }
                if (text("Refresh").findOne(20)) {
                    console.log("发现刷新按钮，输入邮箱地址成功退出");
                    return true;
                }
                if (text("새로고침").findOne(20)) {
                    console.log("发现刷新按钮，刷新页面");
                    return true;
                }
                if (text("Inbox").findOne(20)) {
                    console.log("已经进入邮箱，退出");
                    return true;
                }
                if (text("Primary").findOne(20)) {
                    console.log("已经进入邮箱，退出");
                    return true;
                }
                if (textMatches(/.*收件箱.*/).findOne(20)) {
                    console.log("已经进入邮箱页面，退出")
                    return true;
                }
                if (text("刷新").findOne(20)) {
                    console.log("发现刷新按钮，刷新页面");
                    return true;
                }
                Sleep();
            }

        }
        Sleep();

    }

    return false;
};
const GetEmailVerificationCode = () => {
    console.log("开始获取邮箱验证码");
    app.launch("com.android.chrome");

    InputEmailUrl();

    let code = null;

    for (let i = 0; i < 400; i++) {
        let hasUseWebVersion = text("Use the web version").findOne(20);
        if (hasUseWebVersion) {
            console.log("click web version");
            click(hasUseWebVersion.bounds().centerX(), hasUseWebVersion.bounds().centerY());
            Sleep(3);
        }
        let hasTranslateFlowty = text("한국어").findOne(20);
        if (hasTranslateFlowty) {
            console.log("发现谷歌翻译，点击关闭");
            Sleep(3);
            RandomPress([651, 1211, 28, 29]);
        }

        let account_picker_continue_as_button = textMatches(/(.*계속.*)/).findOne(20);
        if (account_picker_continue_as_button) {
            console.log("发现关联账户弹窗，点击该账户进入邮箱");
            account_picker_continue_as_button.click();
            Sleep(3);
        }
        let has_positive_button = text("사용").findOne(20);
        if (has_positive_button) {
            console.log("发现关联账号的使用按钮，点击使用");
            has_positive_button.click();
        }
        let has_refresh_page = text("새로고침").findOne(20);
        let has_refreshBtn = text("Refresh").findOne(20);
        let has_refreshBtn_zh = text("刷新").findOne(20);

        if (has_refresh_page || has_refreshBtn || has_refreshBtn_zh) {
            console.log("发现重新加载按钮，重新加载页面");
            Sleep(3);
            console.log("向下拉动，刷新页面");
            swipe(420, 520, 420, 920, 2000);
            break;
        }
        let hasInboxBtn = text("Inbox").findOne(20);
        if (hasInboxBtn) {
            console.log("发现inbox 按钮");
            hasInboxBtn.click();
        }
        let hadPrimaryBtn = text("Primary").findOne(20);
        if (hadPrimaryBtn) {
            console.log("发现primary按钮，点击返回邮箱");
            hadPrimaryBtn.click();
        }
        Sleep();
    }
    const WaitUntilRefreshPage = () => {
        for (let i = 0; i < 40; i++) {
            if (text("Refresh").findOne(20)) {
                console.log("发现刷新按钮，刷新页面");
                Sleep(6);
                return true;
            }
            if (text("새로고침").findOne(20)) {
                console.log("发现刷新按钮，刷新页面");
                Sleep(6);
                return true;
            }
            if (text("刷新").findOne(20)) {
                console.log("发现刷新按钮，刷新页面");
                Sleep(6);
                return true;
            }
            Sleep(3);
        }
    };

    const GetLastestCode = () => {
        let code = null;
        let haveCode = null;
        const refreshEmailPage = () => {
            console.log("@来回查看三次，确保最新");
            for (let i = 0; i < 4; i++) {
                let hasInboxBtn = text("Inbox").findOne(20);
                if (hasInboxBtn) {
                    hasInboxBtn.click();
                    Sleep();
                }
                let hadPrimaryBtn = text("Primary").findOne(20);
                if (hadPrimaryBtn) {
                    hadPrimaryBtn.click();
                    Sleep();
                }
                let haveReceived = text("收件箱").findOne(20);
                if (haveReceived) {
                    console.log("发现收件箱，点击返回主页")
                    haveReceived.click();
                    Sleep();
                }
                let has_refreshBtn = text("Refresh").findOne(20);
                if (has_refreshBtn) {
                    has_refreshBtn.click()
                    Sleep(3)
                }
                let has_refreshBtn_zh = text("刷新").findOne(20);
                if (has_refreshBtn_zh) {
                    has_refreshBtn_zh.click()
                    Sleep(3)
                }
                let hasEmail = textMatches(/.*驗證信說明.*|.*인증 메일 안내.*/).find()
                if (hasEmail.empty()) {
                    console.log("没找到╭(╯^╰)╮")
                }
                else {
                    haveCode = true;
                    console.log('-----发现最新的邮件-----')
                    hasEmail[0].click()
                }
                Sleep()
            }
        }
        const getCode = () => {
            console.log("获取验证码")
            Sleep()
            let verificationCodeStr = textMatches(/.*請在輸入欄中輸入以下認證碼.*|.*인증번호.*/).find()
            if (verificationCodeStr) {
                const codeList = []
                verificationCodeStr.map(item => {
                    if (item.text) {
                        let str = item.text()
                        let match = str.match(/\b\d{6}\b/)
                        if (match) {
                            codeList.push(match[0])
                        }
                    }
                })
                console.log("codelist: " + JSON.stringify(codeList))
                if (codeList.length >= 1) {
                    code = codeList[codeList.length - 1]
                    return code;
                }
                return null
            }
            else {
                console.log('╭(╯^╰)╮ 未发现新邮件')
                return null;
            }
        }

        refreshEmailPage()

        if (haveCode) {
            getCode()
        }
        return code;
    };
    WaitUntilRefreshPage();

    function isSixDigits(str) {
        const regex = /^\d{6}$/;
        return regex.test(str);
    }

    for (let i = 0; i < 3; i++) {
        code = GetLastestCode();
        if (code != null && code.length == 6 && isSixDigits(code)) {
            console.log("最终的验证码为：" + code)
            return code;
        }
        Sleep()
    }
    return code;
};

const LoginFlow = () => {
    LoginGoogleAccount();
    const code = GetEmailVerificationCode();
    if (code == null) {
        alert("recovery code is null", "获取验证码失败");
        return false;
    }
    recents();
    Sleep(random(2, 4));
    click(30, 600);
    Sleep();
    for (let i = 0; i < 30; i++) {

        // let hasCodeInputBox = text("게임 기기 등록").findOne(20);
        let hasInput_placeholder_recoveryEmail_zh = FindImgInList(verificationCoeInput_zh, [286, 365, 204, 97]);
        if (hasInput_placeholder_recoveryEmail_zh) {//hasCodeInputBox ||
            console.log("找到验证码输入框");
            setText(code);
            Sleep();
            ClickNextBtn();
            ClickConfirmBtn()
        }


        let hadVerificationSuccess = text("이메일 인증이 완료되었습니다.").findOne(20);
        if (hadVerificationSuccess) {
            console.log("辅助验证成功");
            let haveBlackSuccessConfirm = text("확인").findOne(20);
            if (haveBlackSuccessConfirm) {
                haveBlackSuccessConfirm.click();
            }
        }


        let hadconfirmsuccess = FindImgInList(confirmsuccess, [343, 243, 612, 134]);
        if (hadconfirmsuccess) {
            console.log("识图辅助验证成功");
            RandomPress([429, 386, 428, 57])
        }

        let hadPleaseReconfirm = FindImgInList(PleaseReconfirm, [343, 243, 612, 134]);
        if (hadPleaseReconfirm) {
            console.log("请再次验证");
            RandomPress([408, 387, 437, 53])
        }

        if (textMatches(/.*已發送驗證碼至電子信箱.*/).findOne(20)) {
            console.log("发现已发送验证码弹窗，点击确认");
            ClickConfirmBtn();
        }
        if (textMatches(/.*已完成電子信箱驗證.*/).findOne(20)) {
            console.log("已完成電子信箱驗證");
            ClickConfirmBtn();
        }
        if (textMatches(/.*請輸入裝置名稱.*/).findOne(20)) {
            ClickNextBtn();
        }
        if (FindMultiColors(BlackBtnColorList, [281, 528, 720, 104])) {
            RandomPress([333, 557, 624, 48])
        }
        if (textMatches(/.*已完成裝置.*/).findOne(20)) {
            ClickConfirmBtn();
            console.log("装置绑定完成");
            const delayStopTime = random(3, 500)
            Sleep(delayStopTime)
            alert("邮箱接码完成", "接码完成")
            console.log("邮箱接码完成")
            StopScript()
            break;
        }

        let haddeviceRegistrationIsComplete = FindImgInList(deviceRegistrationIsComplete, [333, 253, 542, 104]);
        if (haddeviceRegistrationIsComplete) {
            console.log("设备注册已完成");
            RandomPress([401, 386, 472, 54])
            break;
        }
        Sleep();
    }

    for (let i = 0; i < 30; i++) {
        if (HasPopupClose([1161, 56, 61, 68])) {
            console.log("到达服务器选择页面，开始下一步，选择一个区进入!");
            break;
        }
        if (FindBlueBtn([557, 427, 169, 61])) {
            console.log("发现确认按钮，点击确认");
            RandomPress([578, 443, 125, 29]);
        }
        if (HasMainUI()) {
            break;
        }
        if (text('[40003] InitializeError').findOne(20)) {
            console.log("40003错误，退出脚本");
        }
        Sleep();
    }
};
let clickTimes = 0;

const WaitUntilEnterServerSelectPage = () => {
    console.log("等待直到进入服务器选择页面...");
    const notice_timeoutImgList = LoadImgList("icon/beginner/notice_timeout");

    for (let i = 0; i < 90; i++) {
        if (HasMainUI()) {
            if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41])) {
                console.log("发现区服的游戏的主界面，点击区服框");
                PressServerBar();
            }
            else {
                console.log("游戏主页面，点击空白");
                PressBlank();
                clickTimes++
            }

        }
        if (clickTimes > 30) {
            alert("创建角色异常", "点击主页面次数过多，退出")
            console.log("点击主页面次数过多，退出")
            StopScript()
        }
        if (FindBlueBtn([557, 427, 169, 61])) {
            console.log("发现确认按钮，点击确认");
            RandomPress([578, 443, 125, 29]);
        }
        if (HasPopupClose([1161, 56, 61, 68])) {
            console.log("到达服务器选择页面，开始选区!");
            break;
        }

        // 验证完毕，有弹窗提示：code-t004
        if (FindImgInList(notice_timeoutImgList, [580, 360, 125, 50])) {
            console.log("已验证完毕，发现服务器弹窗，点击关闭");
            RandomPress([578, 445, 124, 23]);
        }
        if (FindBlueBtn([557, 427, 169, 61])) {
            console.log("发现确认按钮，点击确认");
            RandomPress([578, 443, 125, 29]);
        }
        Sleep();
    }
    RecycleImgList(notice_timeoutImgList);
};

const FindServer = (serverName) => {
    const [bigServer, littleServer] = serverName;
    const server_name = `${bigServer + 1}区${littleServer + 1}`;
    console.log("server name : " + server_name);
    const relativeX = littleServer > 4 ? littleServer - 5 : littleServer;
    const relativeY = littleServer > 4 ? 1 : 0;
    let hasServer = null;
    for (let i = 0; i < 24; i++) {
        hasServer = FindImgInList(serverNameImgList[bigServer], [58, 145, 266, 487]);
        if (hasServer) {
            if (hasServer.y > 445) {
                humanSwipe([138, 446, 969, 78], [103, 292, 1082, 77], [2000, 2300])
                hasServer = FindImgInList(serverNameImgList[bigServer], [58, 145, 266, 487]);
            }

            const isServerFull = FindMultiColors(CanNotCreateCharacterColorList, [hasServer.x + relativeX * 230 - 100, hasServer.y + relativeY * 110 + 20, 120, 40]);
            const isServerFull_img = FindImgInList(canNotCreateCharacterImgList, [hasServer.x + relativeX * 230 - 100, hasServer.y + relativeY * 110 + 20, 120, 40]);
            if (!isServerFull && !isServerFull_img) {
                console.log("可进入: " + server_name);
                const config = ReadConfig();
                config.game.serverName = server_name;
                RewriteConfig(config);
                return hasServer;
            }
            else {
                console.log("该区已满，无法进入");
                return false;
            }
        }
        else {
            if (Math.floor(i / 8) % 2 == 0) {
                console.log("向下滑动");
                humanSwipe([102, 439, 1100, 128], [91, 215, 1103, 86], [3300, 3500])
            }
            else {
                console.log("向上滑动");
                humanSwipe([129, 221, 1028, 64], [136, 523, 1055, 74])
            }
        }
    }
    return false;
}

const EnterServer = (serverName) => {
    let haveFoundServer = false;

    for (let i = 0; i < 20; i++) {
        haveFoundServer = FindServer(serverName)
        if (haveFoundServer) {
            console.log("服务器位置：" + JSON.stringify(haveFoundServer));
            let relativeX = serverName[1] > 4 ? serverName[1] - 5 : serverName[1];
            let relativeY = serverName[1] > 4 ? 1 : 0;
            const clickPosition = [haveFoundServer.x + relativeX * 230, haveFoundServer.y + relativeY * 110, 10, 10]
            console.log("点击位置：" + clickPosition);
            RandomPress(clickPosition)
            break;
        }
        else {
            console.log("重新生成随机服务器");
            if (serverName[0] == 8) {
                serverName[0] = 8;
            }
            else {
                serverName[0] = random(0, 7)
            }
            serverName[1] = random(0, 9)
        }
    }
}

const SetName = () => {
    console.log("start create character...");
    let hasCreateCharacterBtn = false;
    for (let i = 0; i < 300; i++) {
        if (FindBlueBtn([894, 621, 348, 97])) {
            console.log("发现创建角色按钮，开始创建角色");
            hasCreateCharacterBtn = true;
            break;
        }

        if (FindMultiColors(WhiteAvatarColorList, [35, 601, 44, 41])) {
            PressBlank();
        }
        if (HasSkip()) {
            ClickSkip();
        }
        Sleep();
    }
    const config = ReadConfig();
    let name = null;
    if (hasCreateCharacterBtn == true) {
        console.log("点击创建角色");
        if (random(1, 100) > 50) {
            console.log("选择男性角色");
            RandomPress([20, 161, 34, 41])
        }
        //随机头型和发型
        RandomPress([83, 94, 192, 538]);
        RandomPress([944, 123, 251, 284]);
        //时装外表
        RandomPress([938, 559, 261, 36])

        RandomPress([945, 670, 248, 31], 3); //create btn
        if (FindCheckMark([669, 431, 45, 41])) {
            RandomPress([509, 338, 263, 23]); //input box
            name = GenerateRandomName();
            setText(name);
            Sleep();
            back();
            Sleep();
            RandomPress([686, 452, 77, 17]); //confirm
            Sleep();
            RandomPress([685, 452, 84, 19]); //confirm 
        }

        for (let i = 0; i < 30; i++) {
            Sleep(5);
            if (FindCheckMark([667, 442, 48, 42])) {
                RandomPress([686, 441, 90, 16]);
                if (FindCheckMark([667, 442, 48, 42])) {
                    console.log("name error, try again");
                    RandomPress([496, 338, 288, 20]); //input box
                    name = GenerateRandomName();
                    setText(name);
                    Sleep();
                    // RandomPress([1172, 520, 56, 25]); // keyboard confirm btn
                    back();
                    RandomPress([685, 452, 84, 19]); //confirm
                    RandomPress([685, 452, 84, 19]); //confirm
                }

            }
            else {
                console.log("the name is ok, create character successfully");
                break;
            }
        }
        config.game.name = name;
        config.createCharacterTime = new Date().toJSON()
        RewriteConfig(config);
    }
    else {
        console.log("未发现创建角色按钮，请检查创建流程");
    }
};
const FirstEnterGameClickSkip = () => {
    console.log("等待进入游戏，并点击第一个跳过与主线任务");
    for (let i = 0; i < 10; i++) {
        if (FindBlueBtn([930, 640, 264, 69])) {
            RandomPress([963, 659, 200, 32]);
            Sleep(10);
            for (let i = 0; i < 30; i++) {
                if (HasSkip()) {
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
const phoneNumberVerification = () => {
    console.log("开始手机号验证");
    for (let i = 0; i < 20; i++) {
        if (FindBlueBtn([649, 428, 179, 61])) {
            console.log("发现手机号验证页面");
            RandomPress([671, 445, 133, 27]);
            console.log("点击同意")
            break;
        }
        Sleep();
    }
}
const CreateCharacterFlow = (serverName) => {
    console.log("动态导入创建角色模板...");
    const isLogin = CheckLogin();
    if (!isLogin) {
        console.log("**需要登录账号**");
        LoginFlow();
    }
    WaitUntilEnterServerSelectPage();
    EnterServer(serverName)
    SetName();
    FirstEnterGameClickSkip();
};

const temporaryLoginGoogle = () => {
    CheckLogin()
    LoginFlow();
}

module.exports = { CreateCharacterFlow, temporaryLoginGoogle };







