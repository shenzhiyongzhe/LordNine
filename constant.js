const armorList = {
    "helmet": [
        { name: "賽勒畢斯頭盔", englishName: "SaiLeBiSiTouKui", identified: false, },
        { name: "賽拉特帽子", englishName: "SaiLaTeMaoZi", identified: false, },
        { name: "灰光破曉帽子", englishName: "HuiGuangPoXiaoMaoZi", identified: false, },
        { name: "賽拉特頭巾", englishName: "SaiLaTeTouJin", identified: false, },
        { name: "賽勒畢斯頭巾", englishName: "SaiLeBiSiTouJin", identified: false, },
    ],

    "tops": [
        { name: "賽拉特背心", englishName: "SaiLaTeBeiXin", identified: false, },
        { name: "賽拉特長袍", englishName: "SaiLaTeChangPao", identified: false, },
        { name: "灰光破曉長袍", englishName: "HuiGuangPoXiaoChangPao", identified: false, },
        { name: "灰光破曉背心", englishName: "HuiGuangPoXiaoBeiXin", identified: false, },

        { name: "賽勒畢斯背心", englishName: "SaiLeBiSiBeiXin", identified: false, },
        { name: "灰光破曉盔甲", englishName: "HuiGuangPoXiaoKuiJia", identified: false, },
        { name: "賽勒畢斯盔甲", englishName: "SaiLeBiSiKuiJia", identified: false, },
        { name: "賽拉特盔甲", englishName: "SaiLaTeKuiJia", identified: false, },

    ],

    "underClothes": [
        { name: "賽拉特皮褲", englishName: "SaiLaTePiKu", identified: false, },
        { name: "灰光破曉布褲子", englishName: "HuiGuangPoXiaoBuKuZi", identified: false, },
        { name: "賽勒畢斯布褲子", englishName: "SaiLeBiSiBuKuZi", identified: false, },

        { name: "賽拉特布褲子", englishName: "SaiLaTeBuKuZi", identified: false, },
        { name: "灰光破曉皮褲", englishName: "HuiGuangPoXiaoPiKu", identified: false, },
        { name: "賽勒畢斯皮褲", englishName: "SaiLeBiSiPiKu", identified: false, },
    ],

    "gloves": [
        { name: "灰光破曉護手", englishName: "HuiGuangPoXiaoHuShou", identified: false, },
        { name: "灰光破曉手套", englishName: "HuiGuangPoXiaoShouTao", identified: false, },
        { name: "黑色荊棘護手", englishName: "HeiSeJingJiHuShou", identified: false, },

        { name: "賽勒畢斯護手", englishName: "SaiLeBiSiHuShou", identified: false, },
        { name: "灰光破曉手甲", englishName: "HuiGuangPoXiaoShouJia", identified: false, },
        { name: "賽勒畢斯手甲", englishName: "SaiLeBiSiShouJia", identified: false, },
    ],

    "shoes": [
        { name: "賽拉特長靴", englishName: "SaiLaTeChangXue", identified: false, },
        { name: "黑色荊棘短靴", englishName: "HeiSeJingJiDuanXue", identified: false, },
        { name: "灰光破曉短靴", englishName: "HuiGuangPoXiaoDuanXue", identified: false, },

        { name: "賽勒畢斯短靴", englishName: "SaiLeBiSiDuanXue", identified: false, },
        { name: "賽拉特短靴", englishName: "SaiLaTeDuanXue", identified: false, },
    ],
}

ornamentList = {
    "necklace": [
        { name: "墮落信念項鍊", englishName: "DuoLuoXinNianXiangLian", identified: true, },
        { name: "藍色月光項鍊", englishName: "LanSeYueLiangXiangLian", identified: true, },
        { name: "深邃虛空項鍊", englishName: "ShenSuiXuKongXiangLian", identified: true, },
        { name: "束縛者項鍊", englishName: "ShuFuZheXiangLian", identified: true, },
    ],
    "earring": [
        { name: "墮落信念耳環", englishName: "DuoLuoXinNianErHuan", identified: true, },
        { name: "藍色月光耳環", englishName: "LanSeYueLiangErHuan", identified: true, },
        { name: "深邃虛空耳環", englishName: "ShenSuiXuKongErHuan", identified: true, },
        { name: "束縛者耳環", englishName: "ShuFuZheErHuan", identified: true, },
    ],
    "bracelet": [
        { name: "墮落信念手鐲", englishName: "DuoLuoXinNianShouZhuo", identified: true, },
        { name: "藍色月光手鐲", englishName: "LanSeYueLiangShouZhuo", identified: true, },
        { name: "深邃虛空手鐲", englishName: "ShenSuiXuKongShouZhuo", identified: true, },
        { name: "束縛者手鐲", englishName: "ShuFuZheShouZhuo", identified: true, },
    ],

    "ring": [
        { name: "墮落信念戒指", englishName: "DuoLuoXinNianJieZhi", identified: true, },
        { name: "藍色月光戒指", englishName: "LanSeYueLiangJieZhi", identified: true, },
        { name: "深邃虛空戒指", englishName: "ShenSuiXuKongJieZhi", identified: true, },
        { name: "束縛者戒指", englishName: "ShuFuZheJieZhi", identified: true, },
    ],

    "belt": [
        { name: "墮落信念腰帶", englishName: "DuoLuoXinNianYaoDai", identified: true, },
        { name: "藍色月光腰帶", englishName: "LanSeYueLiangYaoDai", identified: true, },
        { name: "深邃虛空腰帶", englishName: "ShenSuiXuKongYaoDai", identified: true, },
        { name: "束縛者腰帶", englishName: "ShuFuZheYaoDai", identified: true, },
    ],
}


module.exports = {
    armorList, ornamentList
}