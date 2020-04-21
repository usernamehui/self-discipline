/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "usernamehui.xyz:9443"
//var host = "localhost:9443"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 用code换取openId
    openIdUrl: `https://${host}/openid`,

    // 开始游戏
    startGameUrl: `https://${host}/startGame`,

    //更新游戏结果并返回新的词语
    updateGameUrl: `https://${host}/updateGame`

};

module.exports = config
