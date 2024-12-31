
// const {
//     specialConfig,
//     BuySkillBook,
//     CloseBackpack, CloseMenu, ClickSkip, ChangeHaltModeTime, ChangeRecoverPotionPercentToMax, ChangeRecoverPotionPercentToNormal, ClearPage, ChangeGameSetting, ClickAuto,
//     DeathCheck,
//     EnterMenuItemPage, ExitHaltMode, EnterHaltMode,
//     FindBlueBtn, FindTipPoint, FindImg, FindMultiColors, FindCheckMark, FindRedBtn, FindGoldBtn, FindGreenBtn, FindImgInList, FindNumber, FindFloatNumber, FindWhiteCheckMark,
//     GoToTheNPC, GetVerificationCode, GetCharacterLv, GetDateTime, GetServerName,
//     HasPageback, HasMenu, HasMenuClose, HollowPress, HasSkip, HasBackpackClose, HasBackpackMenuClose, HasPopupClose, HasTip, HaveMainStoryIcon, HasTransformIcon, HaveDailyMissionIcon,
//     HaveFinished, HasMap, HaveToTapBlank,
//     IsMoving, IsBackpackFull, IsInCity, IsHaltMode, IsLocked, IsInQuest, IsAuto_active, IsAuto_inactive, IsNoPotion,
//     LoadImgList, LaunchGame,
//     MatchTemplateList,
//     TapBlankToContinue, TapTip,
//     OpenMenu, OpenBackpack, OpenBackpackMenu,
//     PageBack, PressBlank, PullDownSkill, PressToAuto,
//     RandomPress, ReadImg, ReturnHome, RestartGame, RecycleImgList, ReadConfig, RewriteConfig, ReadDealRecord, ReadAccountFile, ReadDailyDiamondRecord, ReadTradeRecord,
//     UpdateTradeRecord,
//     Sleep, SwipeSlowly, StopScript, SetCountryAndBirth,
//     WaitUntil, WaitUntilMenu, WaitUntilPageBack, WaitUntilFindColor,
// }
//     = require("./utils.js");
// console.log(specialConfig)
const str = '2459191551 2859191344 2259190760 2159190442 2259190019 2259190879 2559190570 2859190205 2559190327 2559198109 2159198013 2059198538 2659198256 2859198313 2759195765 2559195429 2759195107 2959195615 2059192758 2359192471 2759192879 2759192244 2559192942 2559192693 2659199426 2059199168 2559199037 2259199871 2359199965 2959199654 2059199363 2159196185 2359196056 2059196847 2259196253 2059196974 2359196663 2759193767 2059193427 2059193102 2859193087 2859193916 2959193620 2059167754 2759167457 2559167112 2759167056 2059164748 2259164091 2959164882 2059164560 2459164349 2159161753 2859161471 2559161139 2859161072 2159161814 2859161522 2959161281 2159161913 2959161608 2159160740 2959160485 2759160091 2859160829 2659160269 2759160920 2759160314 2459163801 2359163316 2359137727 2459137923 2659137375 2759134732 2859134084 2559134802 2959134532 2659134921 2859134612 2659131742 2359131809 2559131526 2359131214 2659131940 2959131655 2659131382 2459130494 2759130177 2159130923 2759130698 2259138411 2059138115 2159138016 2359138868 2159138965 2559138600 2259135759 2759135459 2259135080 2559135549 2159135922 2659135608 2159135317 2659132010 2659132846 2359132559 2559132283 2059132903 2259132684 2859139468 2659139150 2359139541 2859139235 2959139914 2659139648 2659139384 2859136096 2759136885 2059136255 2859136910 2059136637 2959133736 2559133452 2259133139 2059133074 2359133833 2759133535 2959133917 2459133600 2659133332 2259077747 2459077417 2559077117 2959077838 2659077622 2059077365 2659074724 2559074508 2859074263 2159074955 2559074337 2159071749 2959071459 2259071190 2259071094 2059071829 2459071504 2659075977 2459075647 2359072783 2459072421 2759072091 2059072875 2559072509 2459072999 2159079786 2859079867 2859079580 2559079966 2259079687 2659079316 2559076402 2459076018 2359076896 2759076910 2759076640 2659073716 2059073115 2159073021 2059073892 2559073572 2059073963 2259073647 2059073382 2559047776 2159047143 2959047853 2359047535 2259047222 2559047962 2259047683 2859044056 2059044524 2159044244 2559044942 2259044366 2059041773 2559041411 2659041661 2759041360 2059040702 2559040170 2259040225 2959040986 2459040394 2259048766 2559048444 2259048035 2359048858 2059048566 2356466091 2556466847 2456466217 2556466935 2756463797 2556437029 2556439093 2056439257 2956436444 2656436147 2256436075 2856436877 2156174534 2456178344 2156175476 2356175504 2156496979 2656496604 2456493140 2956493828 2056468299 2856499161 2656499892 2856499509 2656499929 2356494007 2356490028 2256490827 2156490318 2556498796 2856498139 2156498342 2056495498 2956495037 2656495975 2556492120 2856492069 2756492899 2956452305 2156459412 2656459118 2256459094 2656459816 2856459526 2956459908 2056456790 2956456445 2756456521 2256456203 2456456656 2756453129 2056453021 2856453547 2456453275 2156453937 2256427450 2356427199 2556427041 2056427548 2456427981 2656424775 2956424435 2656424115 2656424012 2256424516 2756424959 2656424666 2256421757 2056421149 2556421848 2456421574 2056421252 2156421603 2356421312 2056420770 2056420421 2956420115 2856420003 2556420534 2456420268 2356420686 2656428723 2556428145 2756428599 2456428975 2856428687 2056425511 2256425675 2556425389 2356422076 2656422517 2256429770 2756429411 2656429178 2756429581 2356429233 2956426120 2256426945 2156426612 2956423479 2356423137 2556423012 2556423534 2856423635'
const arr = str.split(' ')
arr.map((item, index) => arr[index] = parseInt(item))
console.log(arr);
console.log('这是hotfix分支');
