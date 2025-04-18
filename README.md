#更新日志

## 2025/1/10

1、修复网络掉线时增加的倒计时弹窗报错。
2、修复部分分解装备时没有点击分解。
3、更改背包满时的状态为照片识别。
4、背包清理时间限定在上午 8：00 之后。
5、恢复去副本和野外时对药水使用百分比的检查，如果是 100%则修改。
6、晚上不切换地图。改为早上 8：00 之后执行。如果在主城，则直接去野外。
7、每周一次，自动使用 buff 药水。
8、战力小于 22500 时，增加升级圣物的频率，每天一次。大于 22500 时，每周一次。
9、每周任务不每次接，每天 30%概率接每周任务。
10、增加清理背包时间段，改为 160~360 分钟。

---

## 2025/1/13

1、修复倒计时弹窗没有关闭问题。
2、修复更改交易时间的配置后没有重新读取。
3、修复部分机子卡导致没有获取截图权限。
4、更改脚本中文名。
5、增加通行证奖励的符文领取。
6、增加部分箱子的开启。
7、增加紫装穿戴。
8、增加符文抽卡
9、接完邮箱验证码退出游戏

## 2025/1/14

1、修复在主城没有药水长时间停留问题。
2、修复成号之前领取奖励的默认概率为 1
3、修复使用 map 函数错误导致没有进行交易。

## 2025/1/15

1、优化装备分解流程，根据配置来选择性执行是否更改自动登录选项
2、修复没有交易问题。交易时间随机在白天，但是获取的当前时间是国际时间的问题
3、延长了进入节电模式的时间，随机时间为：300 秒到 700 秒 + 3 秒到 200 秒
4、修复刷完副本如果停留不在主城，会优先做每日任务的问题。
5、背包扩充从扩充至 200 改为每周扩充一次，直至 500.
6、综合提升全随机，每天平均一次，执行队列里的其中一件事情。

## 2025/1/17

1、修复创建角色后，在主城没有药水长时间延迟问题。
2、修改上架时绿装和灰色装备的概率，10% -> 30%
3、修改上架前分解装备的概率，50% -> 10%

## 2025/1/20

1、修复主线领取奖励，背包格子即将满时无法领取奖励，导致卡主线问题
2、更改穿戴装备与使用道具的点击位置。改为统一点击使用按钮而双击物品。
3、结束 boss 流程后药水使用百分比改为 70%左右。
4、增加新手阶段判断，没有菜单和 quest 时，默认点击主线。
4、增加制作物品和核萌的上架。
5、修复上架普通装备没有点击该装备导致未上架的问题。

## 2025/1/21

1、增加进入副本的额外条件，当有“不法”标识时，不进入
2、当点击 auto 附近没有敌人时，会打开地图，点击随机位置。
3、根据战力判断是不是新号，如果是新号，则跳过部分环节。
4、主线阶段购买药水不设延迟，省电阶段延迟暂未改动。
5、修改在新手村阶段的主线点击逻辑。
6、增加主线阶段的异常判断，如果重复点击同一主线次数过多，并且未移动，则弹窗提示。
7、接完邮箱验证码后，延迟退出游戏。
8、增加封号设备的字段记录。
9、上架装备的栏数从 3 排改到 6 排
10、看板数据增加战力排序

## 2025/1/22

1、脚本交易的记录时间从国际时间改为中国时间
2、账号价值从原来 11 月 13 号计算改为成号时间。
3、当有封号时，库存信息会减去封号的库存。
4、修改数据面板的路由模式，现在可以直接刷新页面而不需要改地址。
5、修改能力升级和佩戴流程。
6、每日任务刷新次数限定 5 次
7、每日任务只接一次。
8、屏蔽符文抽卡
9、修复主线任务在能力未解锁时的卡点。

## 2025/1/23

1、主线任务配置能力错误修复。部分角色能力位置不固定导致点击错误，能力配置改为筛选模式。
2、优化秘密实验室的挂机位置选择。通过点击地图的方式随机挂机位置，改变原来通过走路的时间来随机位置。
3、新号打完第一个 boss 时 34 级，不能继续推主线，增加 34 级挂机流程。
4、修复分解装备配置错误，导致主线任务的默认分解没有正常分解。
5、在主线任务进行中时，交叉做一些成长任务，减少一些成号还未做完成长任务的情况。
6、修复没有购买披风问题，购买披风逻辑改为只购买 10 钻石的披风，不仅限于束缚者类型。
7、圣物改为目前只强化前三个。
8、修复背包满时的识别问题。

## 2025/2/6

1、修改创建角色逻辑。不再遍历服务器，减少滑动时卡顿所引起的创建角色失败的问题，减少弹窗。
2、增加背包扩充条件，在背包满时无法分解装备，增加满时的扩充背包逻辑
3、优化创建角色。增加男性角色创建，增加时装外表选择。
4、优化主线。角色 5 级时穿戴蓝装。

## 2025/2/7

1、修复选错服务器问题，滑动时修正滑动后没有重新识图导致点错位置。
2、回退到正常死亡后穿戴蓝装。主线任务强化装备会卡住，穿戴蓝装会导致无法强化装备而不能完成主线任务。
3、增加看板的更改配置功能

## 2025/2/8

1、看板增加根据 id 搜索功能。
2、看板运维工具增加清空功能
3、脚本增加大号购买紫装逻辑。

## 2025/2/15

1、快捷栏增加随机道具，并且随机是否自动使用
2、商城活动道具兑换，随机数量（1-5）随机物品
3、增加活动箱子打开，增加坐骑道具使用。
4、修复符文抽卡卡点，恢复符文抽卡。
5、背包物品使用增加随机操作，上下滑动。打开背包 50%概率整理物品。
6、添加每周 1~3 天里概率触发随机事件。
7、修复技能书未使用问题。

## 2025/2/17

1、不统计封号次数，直接删除数据。
2、交易时间鉴定失败延迟从 30 秒改为 60 秒。
3、点击 auto 时增加随机事件。
4、设备统一使用 id 做唯一标识，脚本增加 id 字段展示。

## 2025/2/18

1、添加新的材料上架，制作道具坐骑强化材料
2、添加新的随机事件到随机池，背包物品分解，制作材料，坐骑强化，工会捐献
3、修改随机事件的队列长度为 0-8，随机概率改为 2%
4、增加自动狩猎功能

## 2025/2/19

1、添加“查看通知”的随机事件，通知栏添加以下事件执行：领取活动奖励，领取邮件，领取成就奖励，工会捐献，友好度捐献，商店购买，升级圣物，下架过期物品

## 2025/2/20

1、增加 30 件紫装购买
2、修改挂机地点选择，暮光之丘 26000 战力进入
3、圣物强化操作修改，随机强化任意一个圣物。
4、删除一些过时逻辑，获取图形验证码，等待服务器可创建角色，排队等逻辑。
5、看板增加紫装价格配置修改功能。

## 2025/2/21

1、修复主城进入省电模式问题
2、获取截图权限失败后退出脚本

## 2025/2/24

1、增加挑战考验之塔功能。
2、随机生成交易次数，超过交易次数不再交易。
3、武器特性随机 1-3 个进行重置。
4、看板配置增加蓝色饰品的限价。
5、看板配置大号集钻增加取消选项

## 2025/2/26

1、修改主线重复点击判断，重复点击同一个主线，没有反应后停止脚本
2、修复背包分解重复点击问题
3、获取截图权限失败后尝试重新获取一次
4、减少主线阶段的一些操作，减少装备穿戴次数，减少紫色装备和饰品检查次数，部分事件随机执行。
5、增加能力随机搭配与预设。
6、修复紫色装备随机购买

## 2025/2/27

1、修复武器特性事件报错
2、修复自动狩猎报错
3、购买装备随机 1-3 件。
4、未创建角色进入输入昵称页面弹窗提示。
5、增加新的通知事件处理：怪物图鉴奖励，武器特性搭配
6、修改点击前后的延迟
7、增加未创建角色的弹窗提示

## 2025/2/28

1、按压操作改为滑动操作
2、直线滑动改为多点轨迹滑动
3、修改设置时进入节电模式改为概率关闭

## 2025/3/2

1、新增禅模式

## 2025/3/19

1、新增韩文的邮箱验证码的获取

## 2025/3/20

1、新增国际服的服务器选择

## 2025/3/23

1、脚本数据迁移到新服务器
2、修复国际服务器不是中文导致无法选区问题。
3、增加禅模式下的交易功能。(原来的交易逻辑)
4、修复能力书图标变化导致未上架问题。

## 2025/3/29

1、添加卡密

## 2025/4/6

1、添加手动设置价格，当系统推荐价与市场最低价相差 10 钻以上时，手动设置价格。

## 2025/4/13

1、修复游戏更新导致无法购买装备问题。
