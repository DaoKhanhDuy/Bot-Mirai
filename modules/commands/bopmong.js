module.exports.config = {
  name: "bopmong",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "NhậtCuteUwU",
  description: "bopmong người bạn tag",
  commandCategory: "img-edit",
  usages: "[tag người bạn cần bop]",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs":""
  }
};

module.exports.run = function({
  api,
  event,
  args
}) {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join(" ")) return out("Bạn chưa nhập tin nhắn");
  else
  return request('https://api.vinhbeat.ga/bopmong.php', (err, response, body) => {
    let picData = JSON.parse(body);
    var mention = Object.keys(event.mentions)[0];
    let getURL = picData.url;
    let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
    let tag = event.mentions[mention].replace("@", "");
    let callback = function() {
      api.sendMessage({
        body: tag + "𝐁𝐢̣ 𝐀𝐧𝐡 𝐁𝐨́𝐩 𝐌𝐨̂𝐧𝐠 Đ𝐚̃ 𝐊𝐡𝐨̂𝐧𝐠 𝐄𝐦 🤤",
        mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
        attachment: fs.createReadStream(__dirname + `/cache/anime.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anime.${ext}`), event.messageID);
    };
    request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/anime.${ext}`)).on("close", callback);
  });
}