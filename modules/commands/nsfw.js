module.exports.config = {
    name: "nsfw",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "Mirai Team",
    description: "Bật tắt quyền sử dụng các lệnh nsfw",
    commandCategory: "group",
    cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "returnSuccessEnable": "Đã cho phép thành viên sử dụng lệnh nsfw",
        "returnSuccessDisable": "Đã cấm thành viên sử dụng lệnh nsfw",
        "error": "Đã có lỗi xảy ra, vui lòng thử lại sau"
    },
    "en": {
        "returnSuccessEnable": "Success enable nsfw command for this group",
        "returnSuccessDisable": "Success disable nsfw command for this group",
        "error": "Error! An error occurred. Please try again later!"
    }
}

module.exports.run = async function ({ event, api, Threads, getText }) {
    const { threadID, messageID } = event;
    const { getData, setData } = Threads;
    var type;

    try {
        let data = (await getData(threadID)).data || {};
        if (typeof data == "undefined" || data.NSFW == false) {
            data.NSFW = true;
            global.data.threadAllowNSFW.push(threadID);
            type = "on"
        }
        else {
            data.NSFW = false;
            global.data.threadAllowNSFW = global.data.threadAllowNSFW.filter(item => item != threadID);
        }
        await setData(threadID, { data });
        return api.sendMessage((type == "on") ? getText("returnSuccessEnable") : getText("returnSuccessDisable"), threadID, messageID);
    } catch (e) { console.log(e); return api.sendMessage(getText("error"), threadID, messageID) }
}