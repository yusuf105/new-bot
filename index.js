const {
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WAMessageProto,
	ReconnectMode,
	ProxyAgent,
	ChatModification,
	GroupSettingChange,
	WA_MESSAGE_STUB_TYPES,
	WA_DEAFULT_EPHEMERAL,
	waChatKey,
	mentionedJid,
	processTime,
	prepareMessageFromContent, 
	relayWAMessage
	} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('./lib/color')
const { getBuffer, generateMessageID, getGroupAdmins, getRandom, info } = require('./lib/functions')
const { fetchJson, fetchText, kyun, createExif} = require('./lib/fetcher')
const fs = require('fs')
const ytsd = require('ytsr')
const axios = require("axios")
const request = require('request')
const moment = require('moment-timezone')
const { spawn, exec, execSync } = require("child_process")
const Math_js = require('mathjs')
const translate = require('@vitalets/google-translate-api')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { jadibot, stopjadibot, listjadibot } = require('./lib/jadibot.js')
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const antivirtex = JSON.parse(fs.readFileSync('./database/antivirtex.json'))
const { wikiSearch } = require('./lib/wiki.js')
const { yta, ytv, buffer2Stream, ytsr, baseURI, stream2Buffer, noop } = require('./lib/ytdl')
const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms))
}

ky_ttt = []
tttawal= ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
cmhit = []
multi = true
nopref = false
allpref = false
banChats = false
ownerNumber = '62857700173269@s.whatsapp.net'
creator = "62857700173269@s.whatsapp.net"
baterai = {
battery: "" || "Tidak Terdeteksi",
isCharge: "" || false
}

module.exports = client = async (client, mek) => {
	try {
		if (!mek.hasNewMessage) return
		mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
		const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = client.user.phone
		const type = Object.keys(mek.message)[0]
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
		const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
		client.on("CB:action,,battery", json => {
			const battery = json[2][0][1].value
			const persenbat = parseInt(battery)
				baterai.battery = `${persenbat}%`
				baterai.isCharge = json[2][0][1].live
			}
		)
		if (multi){
			var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.'
		} else { if (nopref){
			var prefix = ''
		} else { if (allpref){
			var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : ''
		} else {
			var prefix = prefa
		}}}
		const body = (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ""
		const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const botNumber = client.user.jid
		const botNumberss = client.user.jid + '@c.us'
		const isGroup = from.endsWith('@g.us')
		const sender = mek.key.fromMe ? client.user.jid : isGroup ? mek.participant : mek.key.remoteJid
		const senderNumber = sender.split("@")[0] 
		const totalchat = await client.chats.all()
		const isOwner = ownerNumber.includes(sender)
		const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const isAntiLink = isGroup ? antilink.includes(from) : false
		const isAntiVirtex = isGroup ? antivirtex.includes(from) : false
		const txt = mek.message.conversation
		const mentionByTag = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.mentionedJid : []
		const mentionByReply = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.participant || "" : ""
		const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
		mention != undefined ? mention.push(mentionByReply) : []
		const mentionUser = mention != undefined ? mention.filter(n => n) : []
		const sendKontak = (from, nomor, nama) => {
		const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nama + '\n' + `ORG:By Yusuf\n` + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
			client.sendMessage(from, { displayname: nama, vcard: vcard}, MessageType.contact, {quoted:finv, contextInfo: { forwardingScore: 999, isForwarded: true, externalAdReply: {title: `${jmn} - ${week} ${weton} - ${calender}`,body:"Yusuf",previewType:"PHOTO",thumbnail:ofrply,sourceUrl:"https://github.com"}}})
			}
		cmhit.push(command)
		const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
		const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
		const sendImage = (teks, teks1) => { client.sendMessage(from, teks, image, { caption:teks1, quoted: mek, thumbnail:Buffer.alloc(0)})}
		const sendVideo = (teks, teks1) => { client.sendMessage(from, teks, video, { caption:teks1, thumbnail:Buffer.alloc(0), quoted: mek})}
		const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
		const buttonMessage = {
			contentText: text1,
			footerText: desc1,
			buttons: but,
			headerType: "EMPTY"
			}
			client.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options)
		}
		const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
			kma = gam1
			mhan = await client.prepareMessage(from, kma, image)
		const buttonMessages = {
			imageMessage: mhan.message.imageMessage,
			contentText: text1,
			footerText: desc1,
			buttons: but,
			headerType: "IMAGE"
			}
			client.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
		}
		
		idttt = []
		players1 = []
		players2 = []
		gilir = []
		for (let t of ky_ttt){
		idttt.push(t.id)
		players1.push(t.player1)
		players2.push(t.player2)
		gilir.push(t.gilir)
		}
		const isTTT = isGroup ? idttt.includes(from) : false
		isPlayer1 = isGroup ? players1.includes(sender) : false
		isPlayer2 = isGroup ? players2.includes(sender) : false

		var ase = new Date();
		var jamss = ase.getHours();
			switch(jamss){
				case 0: jamss = "Midnight"; break;
				case 1: jamss = "Midnight"; break;
				case 2: jamss = "Midnight"; break;
				case 3: jamss = "Midnight"; break;
				case 4: jamss = "Midnight"; break;
				case 5: jamss = "Dawn"; break;
				case 6: jamss = "Morning"; break;
				case 7: jamss = "Morning"; break;
				case 8: jamss = "Morning"; break;
				case 9: jamss = "Morning"; break;
				case 10: jamss = "Morning"; break;
				case 11: jamss = "Afternoon"; break;
				case 12: jamss = "Zuhur"; break;
				case 13: jamss = "Afternoon"; break;
				case 14: jamss = "Afternoon"; break;
				case 15: jamss = "Asr"; break;
				case 16: jamss = "Afternoon"; break;
				case 17: jamss = "Evening"; break;
				case 18: jamss = "Maghrib"; break;
				case 19: jamss = "Isha"; break;
				case 20: jamss = "Night"; break;
				case 21: jamss = "Night"; break;
				case 22: jamss = "Midnight"; break;
				case 23: jamss = "Midnight"; break;
				}
				var tampilUcapan = "" + jamss;
			const jmn = moment.tz('Asia/Jakarta').format('HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
			const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
			const week = d.toLocaleDateString(locale, { weekday: 'long' })
			const calender = d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
				})

		mess = {
			wait: 'Tunggu',
			sukses: ' Done',
			salah: 'Apa Itu?',
			eror: {
				link: 'Link nya error'
			},
			only: {
				group: 'Khusus di group',
				admin: 'Khusus admin group'
			}
		}
		const reply = (teks) => {
			client.sendMessage(from, teks, text, { thumbnail: ofrply, sendEphemeral: true, quoted: mek})
		}
		const mentions = (teks, memberr, id) => {
			(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
		}
		try {
			pporang = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
				} catch {
			pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
		const ofrply = await getBuffer(pporang)
			const finv = {
					"key": {
						"fromMe": false,
						"participant": "0@s.whatsapp.net",
						"remoteJid": "0@s.whatsapp.net"
					},
					"message": {
						"groupInviteMessage": {
						"groupJid": "6288213840883-1616169743@g.us",
						"inviteCode": `${tampilUcapan} ${pushname} — ${sender.split('@')[0]}`,
						"groupName": `${tampilUcapan} ${pushname} — ${sender.split('@')[0]}`, 
						"caption": `${tampilUcapan} ${pushname} — ${sender.split('@')[0]}`, 
						'jpegThumbnail': ofrply
					}
				}
			}
		if (budy.includes("https://chat.whatsapp.com/")) {
			if (!mek.key.fromMe){
				if (!isGroup) return
				if (!isAntiLink) return
				if (isGroupAdmins) return reply('Admin mah bebas')
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply('Link terdeteksi, Auto kick!')
				setTimeout( () => {
					client.groupRemove(from, [kic]).catch((e) => { reply('Eror Bot Belum Jadi Admin') })
				}, 3000)
			}
		}
		if (txt.length > 1000){
			if (!mek.key.fromMe){
				if (!isGroup) return
				if (!isAntiVirtex) return
				if (isGroupAdmins) return reply('Admin mah bebas')
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				var longkapnye = "\n".repeat(300)
				tekuss = `TANDAI TELAH DIBACA !!!${longkapnye}@⁨${sender.split('@')[0]} Terdeteksi Telah Mengirim Bug !\n`
				client.sendMessage(from, tekuss, text, { contextInfo: { "mentionedJid": sender }})
				setTimeout( () => {
					client.groupRemove(from, [kic]).catch((e) => { reply('Eror Bot Belum Jadi Admin') })
				}, 2000)
				await sleep(3000)
				await client.blockUser(sender, "add")
			}
		}
        	
		const sendFileFromUrl = async(link, type, options) => { 
			hasil = await getBuffer(link) 
			client.sendMessage(from, hasil, type, options).catch(e => { 
				fetch(link).then((hasil) => { 
					client.sendMessage(from, hasil, type, options).catch(e => { 
						client.sendMessage(from, { url : link }, type, options).catch(e => { 
							reply ("ERROR")
							console.log(e)
						})
					})
				})
			})
		}
		const sendMediaURL = async(to, url, text="", mids=[]) =>{ 
			if(mids.length > 0){
				text = normalizeMention(to, text, mids)
				}
				const fn = Date.now() / 10000;
				const filename = fn.toString()
				let mime = ""
				var download = function (uri, filename, callback) {
					request.head(uri, function (err, res, body) {
						mime = res.headers['content-type']
						request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
					});
				};
				download(url, filename, async function () {
					console.log('done');
					let media = fs.readFileSync(filename)
					let type = mime.split("/")[0]+"Message"
					if(mime === "image/gif"){
						type = MessageType.video
						mime = Mimetype.gif
					}
					if(mime.split("/")[0] === "audio"){
						mime = Mimetype.mp4Audio
					}
					client.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
					
					fs.unlinkSync(filename)
				});
			}
		colors = ['red','white','black','blue','yellow','green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
		if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
		if (!mek.key.fromMe && banChats === true ) return
		if (!isCmd && !isCmd && !command && mek.message) { for (let i of totalchat) { client.updatePresence(i.jid, Presence.recording)}}

	switch(command) {
		case 'menu': case 'help':
			sendernya = `${sender}`
			stst = await client.getStatus(`${sender.split('@')[0]}@c.us`)
			stst = stst.status == 401 ? '' : stst.status
			num = await fetchJson(`https://numlookupapi.com/api/validate/${senderNumber}`, {method: 'get'})
			menu = `\n${tampilUcapan} ${pushname}\n\nNama Owner : Yusuf\nNomor Owner : @${ownerNumber.split('@')[0]}\nBattery : ${baterai.battery}\nCharge : ${baterai.isCharge}\nMode : ${banChats ? 'Self-mode' : 'Public-mode'}\nTotal Hit : 6251${cmhit.length}\n\nINFO USER\n\nStatus : ${isOwner ? 'Owner' : 'User'}\nNama : ${pushname}\nBio : ${stst}\nNomor : @${sendernya.split('@')[0]}\nInfo Nomor : ${num.line_type} - ${num.country_name} - ${num.carrier}`
			sendButImage(from, `${menu}`, "Yusuf", ofrply, 
			[{buttonId:`${prefix}command`, buttonText:{displayText:'COMMAND'}, type:1 },
			{buttonId:`${prefix}creator`, buttonText:{displayText:'CREATOR'}, type:1 },
			{buttonId:`${prefix}sc`, buttonText:{displayText:'SOURCE CODE'}, type:1 }],
			{
				quoted:finv, contextInfo: {
					mentionedJid: [ownerNumber,sendernya], forwardingScore: 999, isForwarded: true, externalAdReply: {title: `${jmn} - ${week} ${weton} - ${calender}`,body:"Yusuf",previewType:"PHOTO",thumbnail:ofrply,sourceUrl:"https://youtube.com/UCHIMODDER"}}})
			break
		case 'allmenu': case 'command':
			menu = `\n${tampilUcapan} ${pushname}\n\n\nSTICKER MENU\n\n${prefix}sticker\n${prefix}stickerwm nama|author\n${prefix}take nama|author\n${prefix}attp <text>\n\nFUN MENU\n\n${prefix}fast\n${prefix}slow\n${prefix}reverse\n${prefix}gtts [kode negara] <text>\n${prefix}readmore\n${prefix}detikvn\n${prefix}detikvideo\n${prefix}caripesan <text>\n${prefix}listgroup\n${prefix}status\n${prefix}wiki <text>\n${prefix}kalkulator 1+1=\n${prefix}translate\n\nDOWNLOAD MENU\n\n${prefix}ytmp4 <link>\n${prefix}ytmp3 <link>\n${prefix}ytsearch <text>\n${prefix}igdl <link>\n${prefix}tiktokdl <link>\n\nGROP MENU\n\n${prefix}setnamegc <nama group>\n${prefix}setdeskgc <desk group>\n${prefix}kick @tag member\n${prefix}add 62xxxxx\n${prefix}hidetag <text>\n${prefix}sider\n${prefix}tag\n${prefix}tagme\n${prefix}demote @tag admin\n${prefix}promote @tag member\n${prefix}linkgroup\n${prefix}resetlinkgroup\n${prefix}opengc\n${prefix}closegc\n${prefix}antilink 1/0\n${prefix}antivirtex 1/0\n${prefix}tictactoe @tag teman\n${prefix}delttt\n\nASUPAN MENU\n\n${prefix}asupancecan\n${prefix}asupanhijab\n${prefix}asupansantuy\n${prefix}asupanukty\n${prefix}asupanbocil\n${prefix}asupanrika\n\nOWNER MENU\n\n${prefix}leave\n${prefix}public\n${prefix}self\n${prefix}setprefix\n${prefix}jadiv\n\n`
			sendButImage(from, `${menu}`, "By Yusuf", ofrply, 
			[{buttonId:`${prefix}sc`, buttonText:{displayText:'SOURCE CODE'}, type:1 }],
			{
				quoted:finv, contextInfo: {
					forwardingScore: 999, isForwarded: true, externalAdReply: {title: `${jmn} - ${week} ${weton} - ${calender}`,body:"Yusuf",previewType:"PHOTO",thumbnail:ofrply,sourceUrl:"https://youtube.com/UCHIMODDER"}}})
			break
		case 'status':
			menu = `\n\nCreator : @${creator.split('@')[0]}\nOwner : Yusuf\nNomor Owner : @${ownerNumber.split('@')[0]}\nMode : ${banChats ? 'Self-mode' : 'Public-mode'}\nBattery : ${baterai.battery}\nCharge : ${baterai.isCharge}\nWa Version : ${client.user.phone.wa_version}\nStatus : ${isOwner ? 'Owner' : 'User'}\n\n`
			sendButImage(from, `${menu}`, 'Yusuf', ofrply,
			[{buttonId:`${prefix}menu`, buttonText:{displayText:'MENU'}, type:1 },
			{buttonId:`${prefix}sc`, buttonText:{displayText:'SOURCE CODE'}, type:1 }],
			{
				quoted:finv, contextInfo: {
					mentionedJid: [ownerNumber,creator], forwardingScore: 999, isForwarded: true, externalAdReply: {title: `${jmn} - ${week} ${weton} - ${calender}`,body:"Yusuf",previewType:"PHOTO",thumbnail:ofrply,sourceUrl:"https://youtube.com/UCHIMODDER"}}})
			break
		case 'setnamegc': 
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return 
				client.groupUpdateSubject(from, `${body.slice(11)}`) 
				reply(`Sukses mengganti nama grup ke ${body.slice(11)}`)
			break
		case 'setdeskgc': case 'setdescgc':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return
				client.groupUpdateDescription(from, `${body.slice(10)}`)
				reply(`Sukses mengganti deskripsi grup ke ${body.slice(10)}`)
			break
		case 'leave':
			if (!isGroup) return reply(mess.only.group)
			if (!isOwner && !mek.key.fromMe) return
				client.groupLeave(from)
			break
		case 'owner': case 'creator': case 'developer': case 'author':
			sendKontak(from, creator, 'Yusuf')
			break
                case 'jadibot':
reply('Selamat kamu Menjadi bot')

        jadibot(reply,client,from)
        break
		case 'sc': case 'sourcecode':
			client.sendMessage(from, { text: "https://youtube.com/UCHIMODDER", matchedText: 'https://youtube.com/UCHIMODDER', description: "", title: "Don't click here !!!", jpegThumbnail: ofrply }, 'extendedTextMessage', { detectLinks: false, contextInfo: { forwardingScore: 508, isForwarded: true}, quoted: finv})
			break
		case 'public':
			if (!isOwner && !mek.key.fromMe) return
			if (banChats === false) return reply("Udah public")
				banChats = false
				reply(`PUBLIC-MODE`)
			break
		case 'self':
			if (!isOwner && !mek.key.fromMe) return
			if (banChats === true) return reply("Udah self")
				uptime = process.uptime()
				banChats = true
				reply(`SELF-MODE`)
			break
		case 'kick':
            if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return 
			if (!isGroup) {
			if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				mentions(mentioned, true)
				client.groupRemove(from, mentioned)
			} else {
				await client.groupRemove(from, mentionUser)
				reply(`SUCCESS`)
			}
			break
		case 'add':	
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return 	 
			if (args.length < 1) return reply('NOMER NYA MANA')
			if (args[0].startsWith('08')) return reply('GUNAKAN KODE NEGARA!')
			try {
				num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
				client.groupAdd(from, [num])
			} catch (e) {
				console.log('Error :', e)
				reply('GAGAL MENAMBAHKAN TARGET, MUNGKIN KARENA DI PRIVATE')
			}
			break
		case 'hidetag':
			if (!isGroup)return
			var value = args.join(' ')
			var group = await client.groupMetadata(from)
			var member = group['participants']
			var mem = []
			member.map(async adm => {
				mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var optionshidetag = {
				text: value,
				contextInfo: { mentionedJid: mem },
				quoted: mek
			}
			client.sendMessage(from, optionshidetag, text)
			break
		case 'sider':
			if (!isGroup) return reply(mess.only.group)
			infom = await client.messageInfo(from, mek.message.extendedTextMessage.contextInfo.stanzaId)
			tagg = []
			teks = `Telah Dibaca Oleh :\n\n`
			for(let i of infom.reads){ 
				teks += '@' + i.jid.split('@')[0] + '\n'
				teks += `Waktu : ` + moment(`${i.t}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') + '\n\n'
				tagg.push(i.jid)
			}
			mentions(teks, tagg, true)
			break
		case 'setprefix':
			if (!isOwner && !mek.key.fromMe) return
			if (args.length < 1) return sendButMessage(from, `PREFIX SETTINGS`, `Silahkan pilih salah satu`, 
			[{ buttonId: `setprefix multi`, buttonText: { displayText: `Multi Prefix` }, type: 1 },
			{ buttonId: `setprefix nopref`, buttonText: { displayText: `No Prefix` }, type: 1 },
			{ buttonId: `setprefix allpref`, buttonText: { displayText: `All Prefix`}, type: 1 }], {quoted:mek})
			if (q === 'multi'){
				multi = true
				allpref = false
				nopref = false
				reply(`Berhasil mengubah prefix ke ${q}`)
			} else if (q === 'nopref'){
				multi = false
				allpref = false
				nopref = true
				reply(`Berhasil mengubah prefix ke ${q}`)
			} else if (q === 'allpref'){
				allpref = true
				nopref = false
				multi = false
				reply(`Berhasil mengubah prefix ke ${q}`)
			} else {
				multi = false
				nopref = false
				allpref = false
				prefa = `${c}`
				reply(`Berhasil mengubah prefix ke ${q}`)}
			break
		case 'take': case 'colong':
			if (!isQuotedSticker) return reply('Tag Stikernya')
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
			media = await client.downloadAndSaveMediaMessage(encmedia)
			anu = args.join(' ').split('|')
			satu = anu[0] !== '' ? anu[0] : 'Yusuf'
			dua = typeof anu[1] !== 'undefined' ? anu[1] : ``
			require('./lib/fetcher.js').createExif(satu, dua)
			require('./lib/fetcher.js').modStick(media, client, mek, from)
			break
		case 'tag':
			if (args.length < 1) return reply(`Penggunaan ${prefix}tag 62xnxx`)
			var nomqm = `${body.slice(5)}@s.whatsapp.net` 
			tagq = `@${nomqm.split('@')[0]}` 
			client.sendMessage(from, tagq, text, { quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true, mentionedJid: [nomqm]}})
			break
		case 'tagme':
			var nomqm = mek.participant
			tagu = `@${nomqm.split('@s.whatsapp.net')[0]}`
			client.sendMessage(from, tagu, text, { quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true, mentionedJid: [nomqm]}})
			break
		case 'join':
			if (!isOwner && !mek.key.fromMe) return
			if (args.length < 1) return ephe('Link nya mana?')
			client.query({ 
				json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]
			})	
			reply('Sukses bergabung dalam group')
			break
		case 'attp':
			if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}attp ${NamaBot}`)
			atetepe = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
			client.sendMessage(from, atetepe, sticker, { quoted: mek })
			break
		case 'fast':
			if (!isQuotedVideo) return reply('Reply videonya!')
			reply(mess.wait)
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
			media = await client.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.mp4')
			exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
				fs.unlinkSync(media)
				if (err) return reply(`Err: ${err}`)
				buffer453 = fs.readFileSync(ran)
				client.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: finv })
				fs.unlinkSync(ran)
			})
			break
		case 'slow':
			if (!isQuotedVideo) return reply('Reply videonya!')
			reply(mess.wait)
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
			media = await client.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.mp4')
			exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
				fs.unlinkSync(media)
				if (err) return reply(`Err: ${err}`)
				buffer453 = fs.readFileSync(ran)
				client.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: finv })
				fs.unlinkSync(ran)
			})
			break
		case 'reverse':
			if (!isQuotedVideo) return reply('Reply videonya!')
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
			media = await client.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.mp4')
			exec(`ffmpeg -i ${media} -vf reverse -af areverse ${ran}`, (err) => {
				fs.unlinkSync(media)
				if (err) return reply(`Err: ${err}`)
				buffer453 = fs.readFileSync(ran)
				client.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: finv })
				fs.unlinkSync(ran)
			})
			break
		case 'asupancecan': 
			reply(mess.wait)
			try {
				results1 = await fetchJson(`https://api-devilbot.herokuapp.com/api/asupan/cecan?apikey=Devilbotz`)
				results2 = await getBuffer(results1.result.url)
				sendImage(results2, mess.sukses)
			} catch (e) { reply("ERROR")}
			break
		case 'asupanhijab':  
			reply(mess.wait)
			try {
				results1 = await fetchJson(`https://api-devilbot.herokuapp.com/api/asupan/hijaber?apikey=Devilbotz`)
				results2 = await getBuffer(results1.result.url)
				sendImage(results2, mess.sukses)
			} catch (e) { reply("ERROR")}
			break
		case 'asupansantuy':
			reply(mess.wait)
			try {
				results1 = await fetchJson(`https://api-devilbot.herokuapp.com/api/asupan/santuy?apikey=Devilbotz`)
				results2 = await getBuffer(results1.result.url)
				sendVideo(results2, mess.sukses)
			} catch (e) { reply("ERROR")}
			break
		case 'asupanukty':
			reply(mess.wait)
			try {
				results1 = await fetchJson(`https://api-devilbot.herokuapp.com/api/asupan/ukty?apikey=Devilbotz`)
				results2 = await getBuffer(results1.result.url)
				sendVideo(results2, mess.sukses)
			} catch (e) { reply("ERROR")}
			break
		case 'asupanrika':
			reply(mess.wait)
			try {
				results1 = await fetchJson(`https://api-devilbot.herokuapp.com/api/asupan/rikagusriani?apikey=Devilbotz`)
				results2 = await getBuffer(results1.result.url)
				sendVideo(results2, mess.sukses)
			} catch (e) { reply("ERROR")}
			break
		case 'asupanbocil':
			reply(mess.wait)
			try {
				results1 = await fetchJson(`https://api-devilbot.herokuapp.com/api/asupan/bocil?apikey=Devilbotz`)
				results2 = await getBuffer(results1.result.url)
				sendVideo(results2, mess.sukses)
			} catch (e) { reply("ERROR")}
			break
		case 'stikerwm': case 'stickerwm': case 'swm':
			var pe = args.join('')
			var a = pe.split("|")[0];
			var b = pe.split("|")[1];
			if (isMedia && !mek.message.videoMessage || isQuotedImage ) { 
				const encmedia = isQuotedImage   ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
				media = await client.downloadAndSaveMediaMessage(encmedia)
				await createExif(a,b)
				var out = getRandom('.webp')
				ffmpeg(media)
				.on('error', (e) => {
					console.log(e)
					client.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: finv })
					fs.unlinkSync(media)
				})
				.on('end', () => {
					_out = getRandom('.webp')
					spawn('webpmux', ['-set','exif','./stik/data.exif', out, '-o', _out])
					.on('exit', () => {
						client.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: finv })
						fs.unlinkSync(out)
						fs.unlinkSync(_out)
						fs.unlinkSync(media)
					})
				})
				.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
				.toFormat('webp')
				.save(out) 
			} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) { 
				const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
				const media = await client.downloadAndSaveMediaMessage(encmedia)
				var pe = args.join('')
				var a = pe.split("|")[0];
            	var b = pe.split("|")[1];
				await createExif(a,b)
				var out = getRandom('.webp')
				ffmpeg(media)
				.on('error', (e) => {
					console.log(e)
					client.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: finv })
					fs.unlinkSync(media)
				})
				.on('end', () => {
					_out = getRandom('.webp')
					spawn('webpmux', ['-set','exif','./stik/data.exif', out, '-o', _out])
				.on('exit', () => {
					client.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: finv })
					fs.unlinkSync(out)
					fs.unlinkSync(_out)
					fs.unlinkSync(media)
					})
				})
				.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]) 
				.toFormat('webp')
				.save(out)
			} else { 
				reply(`Kirim gambar dengan caption ${prefix}swm teks|teks atau tag gambar yang sudah dikirim`) 
			}
			break
		case 'gtts':
			try { 
				if (args.length > 1) { 
					const gtts = require('./lib/gtts')(args[0]) 
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana gan?', text, {quoted: mek})
					var ngab = budy.slice(7)
					var ranm = getRandom('.mp3')
					var rano = getRandom('.ogg')
					ngab.length > 600 
					? reply('Textnya kebanyakan gan')
					: gtts.save(ranm, ngab, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal gan:(')
							client.sendMessage(from, buff, audio, {quoted:mek,ptt:true})
							fs.unlinkSync(rano)
						})
					})
				} else if ( args.length === 1 ){
					var ngab = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
					const gtts = require('./lib/gtts')(args[0])
					var ranm = getRandom('.mp3')
					var rano = getRandom('.ogg')
					gtts.save(ranm, ngab, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							var buff = fs.readFileSync(rano)
							if (err) return reply(mess.error.api)
							client.sendMessage(from, buff, audio, {quoted:mek,ptt:true})
							fs.unlinkSync(rano)
						})
					})
				}
			} catch (e){
				reply('ERROR')
			}
			break
		case 'ytmp4':
			if (args.length === 0) return reply(`Kirim perintah ${prefix}ytmp4 [linkYt]`)
			let isLinks2 = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
			if (!isLinks2) return reply(mess.error.Iv)
			try {
				reply(mess.wait)
				ytv(args[0])
				.then((res) => {
					const { dl_link, thumb, title, filesizeF, filesize } = res
					axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
					.then((a) => {
						if (Number(filesize) >= 40000) return sendMediaURL(from, thumb, `❏ YTmp4\n\n❏ Title : ${title}\n❏ Ext : MP3\nFilesize : ${filesizeF}\nLink : ${a.data}\n\n_Maaf durasi melebihi batas maksimal, Silahkan klik link diatas_`)
						sendFileFromUrl(dl_link, document, {mimetype: 'video/mp4', filename: `${title}.mp4`, quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:title,body:"",mediaType:"2",thumbnail:getBuffer(thumb),mediaUrl:`${body.slice(7)}`}}}).catch(() => reply('ERROR'))
					})
				})
			} catch (err) {
				reply('ERROR')
			}
			break
		case 'ytsearch':
			if (!args.length) return reply('Judulnya apa kak?')
			try {
				reply(mess.wait)
				const input = args.join(" ")
				const filter1 = await ytsd.getFilters(input)
				const filters1 = filter1.get('Type').get('Video')
				const { items } = await ytsd(filters1.url, { limit: 10 })
				let hehe = `┌ ◪ YOUTUBE SEARCH\n└ Search Query: ${input}\n\n`
				for (let i = 0; i < items.length; i++) {
					hehe += `───────────────\n\n┌ ❏ Judul: ${items[i].title}\n├ ❏ Id: ${items[i].id}\n├ ❏ Ditonton: ${items[i].views}\n├ ❏ Durasi: ${items[i].duration}\n└ ❏ Link: ${items[i].url}\n\n`
				}
				thumb = await getBuffer(items[0].bestThumbnail.url)
				await client.sendMessage(from, thumb, image, {quoted: mek, caption: `${hehe}───────────────\n\n┌ ◪ DOWNLOAD\n├ ${prefix}ytmp3 [link yt] = Audio\n└ ${prefix}ytmp4 [link yt] = Video`})
			} catch(e) {
				reply('Didn\'t find anything or there is any error!')
				reply(`Error: ${e.message}`)
			}
			break
		case 'ytmp3':
			if (args.length === 0) return reply(`Kirim perintah ${prefix}ytmp3 [linkYt]`)
			let isLinks = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
			if (!isLinks) return reply(mess.error.Iv)
			try {
				reply(mess.wait)
				yta(args[0])
				.then((res) => {
					const { dl_link, thumb, title, filesizeF, filesize } = res
					axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
					.then((a) => {
						if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `❏ YTmp3\n\n❏ Title : ${title}\n❏ Ext : MP3\nFilesize : ${filesizeF}\nLink : ${a.data}\n\n_Maaf durasi melebihi batas maksimal, Silahkan klik link diatas_`)
						sendFileFromUrl(dl_link, document, {mimetype: 'audio/mp3', filename: `${title}.mp3`, quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:title,body:"",mediaType:"2",thumbnail:getBuffer(thumb),mediaUrl:`${body.slice(7)}`}}}).catch(() => reply('ERROR'))
					})
				})
			} catch (err) {
				reply('ERROR')
			}
			break
		case 'demote':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return 
			if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Reply targetnya!')
			demote = mek.message.extendedTextMessage.contextInfo.participant
			client.groupDemoteAdmin(from, [demote])
			reply('Sukses demote admin')
			break
		case 'promote':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return
			if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Reply targetnya!')
			promote = mek.message.extendedTextMessage.contextInfo.participant
			client.groupMakeAdmin(from, [promote])
			reply('Sukses promote member')
			break
		case 'linkgrup': case 'linkgroup': case 'linkgc':
			if (!isGroup) return reply(mess.only.group)
			if (!isBotGroupAdmins) return 
			linkgc = await client.groupInviteCode(from)
			yeh = `https://chat.whatsapp.com/${linkgc}\n\nLink grup ${groupName}`
			client.sendMessage(from, yeh, text, { quoted: mek })
			break
		case 'resetlinkgc': case 'resetlinkgroup': case 'revoke':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return 
			json = ['action', 'inviteReset', from]
			client.query({json, expect200: true})
			reply('Sukses Mereset Link Group')
			break
		case 'opengc':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return 
			reply(`Sukses membuka grup ${groupName}`)
			client.groupSettingChange(from, GroupSettingChange.messageSend, false)
			break
		case 'closegc':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return 
			reply(`Sukses menutup grup ${groupName}`)
			client.groupSettingChange(from, GroupSettingChange.messageSend, true)
			break
		case 'sticker': case 'stiker': case 'sg': case 's':
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
				const media = await client.downloadAndSaveMediaMessage(encmedia)
				ran = '666.webp'
				await ffmpeg(`./${media}`)
				.input(media)
				.on('start', function (cmd) {
					console.log(`Started : ${cmd}`)
				})
				.on('error', function (err) {
					console.log(`Error : ${err}`)
					fs.unlinkSync(media)
					reply('error')
				})
				.on('end', function () {
					console.log('Finish')
					client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: finv})
					fs.unlinkSync(media)
					fs.unlinkSync(ran)
				})
				.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
				.toFormat('webp')
				.save(ran)
			} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
				const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
				const media = await client.downloadAndSaveMediaMessage(encmedia)
				ran = '999.webp'
				reply(mess.wait)
				await ffmpeg(`./${media}`)
				.inputFormat(media.split('.')[1])
				.on('start', function (cmd) {
					console.log(`Started : ${cmd}`)
				})
				.on('error', function (err) {
					console.log(`Error : ${err}`)
					fs.unlinkSync(media)
					tipe = media.endsWith('.mp4') ? 'video' : 'gif'
					reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
				})
				.on('end', function () {
					console.log('Finish')
					client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: finv})
					fs.unlinkSync(media)
					fs.unlinkSync(ran)
				})
				.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
				.toFormat('webp')
				.save(ran)
			} else {
				reply(`Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
			}
			break
		case 'githubstalk':
			if (args.length < 1) return reply('Usernamenya?')
			var teks = body.slice(13)
			anu = await fetchJson(`https://yuzzu-api.herokuapp.com/api/github/stalk?username=${teks}`, {method: 'get'})
			gstalk = `GITHUB STALK\n\nName : ${anu.result.user.username}\nFollowers : ${anu.result.user.followers}\nFollowing : ${anu.result.user.following}\nId : ${anu.result.user.idUser}\nNode Id : ${anu.result.user.nodeId}\nType : ${anu.result.user.type}\nCompany : ${anu.result.user.company}\nBio : ${anu.result.user.bio}\nSite Admin : ${anu.result.user.isSiteAdmin}\nEmail : ${anu.result.user.email}\nCreated At : ${anu.result.user.createdAt}\nUpdated At : ${anu.result.user.updatedAt}\nBlog : ${anu.result.user.blog}\nAvatar Url : ${anu.result.user.avatarUrl}\nGravatar Id : ${anu.result.user.gravatarId}\nHtml Url : ${anu.result.user.githubUrl}`
			reply(mess.wait)
			buff = await getBuffer(anu.result.user.avatarUrl)
			client.sendMessage(from, buff, image, {quoted: finv, caption: gstalk})
			break
		case 'readmore': case 'more':
			if (args.length < 1) return reply(`kirim perintah ${prefix}readmore text1|text2`)
			const more = String.fromCharCode(8206)
			const readmore = more.repeat(4001)
			if (!q.includes('|')) return  reply(mess.error.api)
			const text1 = q.substring(0, q.indexOf('|') - 0)
			const text2 = q.substring(q.lastIndexOf('|') + 1)
			reply( text1 + readmore + text2)
			break
		case 'detikvn':
			encmediam = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
			mediam = await client.downloadAndSaveMediaMessage(encmediam)
			cokmatane = Number(args[0])
			hah = fs.readFileSync(mediam)
			client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', duration: cokmatane, ptt: true, quoted:finv})
			fs.unlinkSync(mediam)
			break	
		case 'detikvideo':
			encmedian = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
			median = await client.downloadAndSaveMediaMessage(encmedian)
			cokmatane = Number(args[0])
			hah = fs.readFileSync(median)
			client.sendMessage(from, hah, video, {mimetype: 'video/mp4', duration: cokmatane, quoted: finv})
			fs.unlinkSync(median)
			break
		case 'caripesan':
			if(!q)return reply('pesannya apa bang?')
			let v = await client.searchMessages(q,from,10,1)
			let s = v.messages
			let el = s.filter(v => v.message)
			el.shift()
			try {
				if(el[0].message.conversation == undefined) return
				reply(`Ditemukan ${el.length} pesan`)
				await sleep(3000)
				for(let i = 0; i < el.length; i++) {
					await client.sendMessage(from,'Nih pesannya',text,{quoted:el[i]})
				}	
			} catch(e){
				reply('Pesan tidak ditemukan!')
			}
			break
		case 'wiki':
			if (args.length < 1) return reply(' Yang Mau Di Cari Apa? ')
			teks = args.join(' ')
			res = await wikiSearch(teks).catch(e => {
				return reply('[ ! ] Error Hasil Tidak Ditemukan') 
			}) 
			result = `Judul : ${res[0].judul}\nWiki : ${res[0].wiki}`
			sendFileFromUrl(res[0].thumb, image, {quoted: mek, caption: result}).catch(e => {
				reply(result)
			})
			break
		case 'antilink':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return
			if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
			if (Number(args[0]) === 1) {
				if (isAntiLink) return reply('Sudah Aktif')
				antilink.push(from)
				fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
				reply('Sukses mengaktifkan fitur antilink')
				client.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti link\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
			} else if (Number(args[0]) === 0) {
				if (!isAntiLink) return reply('Sudah Mati')
				var ini = antilink.indexOf(from)
				antilink.splice(ini, 1)
				fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
				reply('Sukses menonaktifkan fitur antilink')
			} else {
				reply('1 untuk mengaktifkan, 0 untuk mematikan')
			}
			break
		case 'antivirtex':
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return
			if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antivirtex 1`)
			if (Number(args[0]) === 1) {
				if (isAntiVirtex) return reply('Sudah Aktif')
				antivirtex.push(from)
				fs.writeFileSync('./database/antivirtex.json', JSON.stringify(antivirtex))
				reply('Sukses mengaktifkan fitur antivirtex')
				client.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti virtex\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
			} else if (Number(args[0]) === 0) {
				if (!isAntiVirtex) return reply('Sudah Mati')
				var ini = antivirtex.indexOf(from)
				antivirtex.splice(ini, 1)
				fs.writeFileSync('./database/antivirtex.json', JSON.stringify(antivirtex))
				reply('Sukses menonaktifkan fitur antivirtex')
			} else {
				reply('1 untuk mengaktifkan, 0 untuk mematikan')
			}
			break
		case 'ig': case 'igdl': case 'instagram':
			if (!q) return reply('Linknya?')
			var { igDownloader } = require('./lib/igdown')
			res = await igDownloader(`${q}`).catch(e => {
				reply(mess.error.api)
			})
			console.log(res)
			sendMediaURL(from,`${res.result.link}`,`${res.result.desc}`)
			break
		case 'tiktok': case 'tiktokdl': case 'tiktoknowm':
			if (!q) return reply('Linknya?')
			var { TiktokDownloader } = require('./lib/tiktokdl')
			reply(mess.wait)
			res = await TiktokDownloader(`${q}`).catch(e => {
				reply(mess.error.api)
			})
			console.log(res)
			sendMediaURL(from, `${res.result.nowatermark}`)
			break
		case 'listgc': case 'gclist': case 'listgroup': case 'listgrup': case 'listgrop': case 'gruplist': case 'groplist': case 'grouplist':
			const txs = client.chats.all().filter(v => v.jid.endsWith('g.us')).map(v =>`- ${client.getName(v.jid)}\n${v.jid}\n[${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`
			reply(txs)
			break
		case 'jadiv':
			if (!isOwner && !mek.key.fromMe) return
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
				file = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
				ini_buffer = fs.readFileSync(file)
				client.sendMessage(from, ini_buffer, image, {thumbnail:fs.readFileSync('./stik/virgam.jpg')})
				fs.unlinkSync(file)
			} else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
				encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
				file = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
				ini_buffer = fs.readFileSync(file)
				client.sendMessage(from, ini_buffer, video)
				fs.unlinkSync(file)
			} else {
				reply(`reply gambar/video dengan caption ${prefix}jadiv`)
			}
			break
		case 'kalkulator':
			var mtk = body.slice(12)
			teks = `${mtk} = ${Math_js.evaluate(mtk)}`
			reply(teks)
			break
		case 'translate': case 'ts':
			try {
				if ( args.length === 1 ){
					tekss = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
					translate(tekss, {client: 'gtx', to:args[0]})
					.then((res) =>{
						reply(res.text)
					}) 
				} else
				if(args.length > 0 ) {
					ngab = args.join(' ')
					teks = ngab.split(' ')[0];
					bhs = ngab.split(' ')[1];
					translate(teks, {client: 'gtx', to:bhs})
					.then((res) =>{
						reply(res.text)
					})
				}
			} catch (e){
				reply("ERROR")
			}
			break
		case 'tictactoe': case 'ttt':
				if (!isGroup) return reply(mess.only.group)
				if (args.length < 1) return reply('Tag Lawan Anda! ')
				if (isTTT) return reply('Sedang Ada Permainan Di Grub Ini, Harap Tunggu')
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target Lawan!')
				ment = mek.message.extendedTextMessage.contextInfo.mentionedJid
				player1 = sender
				player2 = ment[0]
				angka = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
				id = from
				gilir = player2
				ky_ttt.push({player1,player2,id,angka,gilir})
				client.sendMessage(from, `🎳 Memulai Game Tictactoe 🎲\n\n[@${player2.split('@')[0]}] Menantang anda untuk menjadi lawan Game🔥\nKetik Y/N untuk menerima atau menolak permainan\n\nKetik ${prefix}delttc , Untuk Mereset Permainan Yg Ada Di Grup!`, text, {contextInfo: {mentionedJid: [player2]}})
			break
		case 'delttt': case 'delttc':
			if (!isGroup) return reply(mess.only.group)
			if (!isTTT) return reply('Tidak Ada Permainan Di Grub Ini')
			naa = ky_ttt.filter(toek => !toek.id.includes(from)) 
			ky_ttt = naa 
			reply('Sukses')
			break
			
			default:
			}

			if (isTTT && isPlayer2){
				if (budy.startsWith('Y')){
					tto = ky_ttt.filter(ghg => ghg.id.includes(from))
					tty = tto[0]
					angka = tto[0].angka
					ucapan = `🎳 Game Tictactoe 🎲\nPlayer1 @${tty.player1.split('@')[0]}=❌\nPlayer2 @${tty.player2.split('@')[0]}=⭕\n\n${angka[1]}${angka[2]}${angka[3]}\n${angka[4]}${angka[5]}${angka[6]}\n${angka[7]}${angka[8]}${angka[9]}\n\nGiliran = @${tty.player1.split('@')[0]}`
					client.sendMessage(from, ucapan, text, {quoted: finv, contextInfo:{mentionedJid: [tty.player1,tty.player2]}})
				}
				if (budy.startsWith('N')){
					tto = ky_ttt.filter(ghg => ghg.id.includes(from))
					tty = tto[0]
					naa = ky_ttt.filter(toek => !toek.id.includes(from)) 
					ky_ttt = naa
					client.sendMessage(from, `Yahh @${tty.player2.split('@')[0]} Menolak:(`,text,{quoted:finv,contextInfo:{mentionedJid:[tty.player2]}})
				}
			}
			if (isTTT && isPlayer1){
				nuber = parseInt(budy)
				if (isNaN(nuber)) return
				if (nuber < 1 || nuber > 9) return reply('Masukan Angka Dengan Benar')
				main = ky_ttt.filter(hjh => hjh.id.includes(from)) 
				if (!tttawal.includes(main[0].angka[nuber])) return reply('Udah Di Isi, Isi Yang Lain Gan')
				if (main[0].gilir.includes(sender)) return reply('Tunggu Giliran Gan')
				s = '❌'
				main[0].angka[nuber] = s
				main[0].gilir = main[0].player1
				naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
				ky_ttt = naa
				pop = main[0]
				ky_ttt.push(pop)
				tto = ky_ttt.filter(hgh => hgh.id.includes(from))
				tty = tto[0]
				angka = tto[0].angka
				ttt = `${angka[1]}${angka[2]}${angka[3]}\n${angka[4]}${angka[5]}${angka[6]}\n${angka[7]}${angka[8]}${angka[9]}`
				ucapmenang = () => {
					ucapan1 = `🎳Result Game Tictactoe 🎲\n\nYeyyy Permainan Di Menangkan Oleh @${tty.player1.split('@')[0]}\n`
					ucapan2 = `🎳Result Game Tictactoe 🎲\n\nHasil Akhir:\n\n${ttt}`
					client.sendMessage(from, ucapan1, text, {quoted:finv, contextInfo:{mentionedJid: [tty.player1]}})
					naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
					return ky_ttt = naa
				}
				if (angka[1] == s && angka[2] == s && angka[3] == s) return ucapmenang()
				if (angka[1] == s && angka[4] == s && angka[7] == s) return ucapmenang()
				if (angka[1] == s && angka[5] == s && angka[9] == s) return ucapmenang()
				if (angka[2] == s && angka[5] == s && angka[8] == s) return ucapmenang()
				if (angka[4] == s && angka[5] == s && angka[6] == s) return ucapmenang()
				if (angka[7] == s && angka[8] == s && angka[9] == s) return ucapmenang()
				if (angka[3] == s && angka[5] == s && angka[7] == s) return ucapmenang()
				if (angka[3] == s && angka[6] == s && angka[9] == s) return ucapmenang()

				if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && ! ttt.includes('4️⃣') && !
				ttt.includes('5️⃣') && !
				ttt.includes('6️⃣') && ! ttt.includes('7️⃣') && ! ttt.includes('8️⃣') && ! ttt.includes('9️⃣')){
					ucapan1 = `🎳 Result Game Tictactoe 🎲\n\n_Permainan Seri 🗿👌_`
					ucapan2 = `🎳 Result Game Tictactoe 🎲\n\nHasil Akhir:\n\n${ttt}`
					reply(ucapan1)
					naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
					return ky_ttt = naa
				}
				ucapan = `🎳 Game Tictactoe 🎲\n\nPlayer2 @${tty.player2.split('@')[0]}=⭕\nPlayer1 @${tty.player1.split('@')[0]}=❌\n\n${ttt}\n\nGiliran = @${tty.player2.split('@')[0]}`
				client.sendMessage(from, ucapan, text, {quoted: finv, contextInfo:{mentionedJid: [tty.player1,tty.player2]}})
			}
			if (isTTT && isPlayer2){
				nuber = parseInt(budy)
				if (isNaN(nuber)) return
				if (nuber < 1 || nuber > 9) return reply('Masukan Angka Dengan Benar')
				main = ky_ttt.filter(hjh => hjh.id.includes(from)) 
				if (!tttawal.includes(main[0].angka[nuber])) return reply('Udah Di Isi, Isi Yang Lain Gan')
				if (main[0].gilir.includes(sender)) return reply('Tunggu Giliran Gan')
				s = '⭕'
				main[0].angka[nuber] = s
				main[0].gilir = main[0].player2
				naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
				ky_ttt = naa
				pop = main[0]
				ky_ttt.push(pop)
				tto = ky_ttt.filter(hgh => hgh.id.includes(from))
				tty = tto[0]
				angka = tto[0].angka
				ttt = `${angka[1]}${angka[2]}${angka[3]}\n${angka[4]}${angka[5]}${angka[6]}\n${angka[7]}${angka[8]}${angka[9]}`
				ucapmenang = () => {
					ucapan1 = `🎳 Result Game Tictactoe 🎲\n\nYeyyy Permainan Di Menangkan Oleh @${tty.player2.split('@')[0]}\n`
					ucapan2 = `🎳 Game Tictactoe 🎲\n\nHasil Akhir:\n\n${ttt}`
					client.sendMessage(from, ucapan1, text, {quoted:finv, contextInfo:{mentionedJid: [tty.player2]}})
					naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
					return ky_ttt = naa
				}

				if (angka[1] == s && angka[2] == s && angka[3] == s) return ucapmenang()
				if (angka[1] == s && angka[4] == s && angka[7] == s) return ucapmenang()
				if (angka[1] == s && angka[5] == s && angka[9] == s) return ucapmenang()
				if (angka[2] == s && angka[5] == s && angka[8] == s) return ucapmenang()
				if (angka[4] == s && angka[5] == s && angka[6] == s) return ucapmenang()
				if (angka[7] == s && angka[8] == s && angka[9] == s) return ucapmenang()
				if (angka[3] == s && angka[5] == s && angka[7] == s) return ucapmenang()
				if (angka[3] == s && angka[6] == s && angka[9] == s) return ucapmenang()
				if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && ! ttt.includes('4️⃣') && !
				ttt.includes('5️⃣') && !
				ttt.includes('6️⃣') && ! ttt.includes('7️⃣') && ! ttt.includes('8️⃣') && ! ttt.includes('9️⃣')){
					ucapan1 = `🎳Result Game Tictactoe 🎲\n\n_Permainan Seri🗿👌`
					ucapan2 = `🎳 Result Game Tictactoe 🎲\n\nHasil Akhir:\n\n${ttt}`
					reply(ucapan1)
					naa = ky_ttt.filter(hhg => !hhg.id.includes(from))
					return ky_ttt = naa
				}
				ucapan = `🎳 Game Tictactoe 🎲\n\nPlayer1 @${tty.player1.split('@')[0]}=⭕\nPlayer2 @${tty.player2.split('@')[0]}=❌\n\n${ttt}\n\niliran = @${tty.player1.split('@')[0]}`
				client.sendMessage(from, ucapan, text, {quoted: finv, contextInfo:{mentionedJid: [tty.player1,tty.player2]}})
			}

			if (isGroup && budy != undefined) {
			} else {
			}
		} catch (e) {
			e = String(e)
			if (!e.includes("this.isZero") && !e.includes("jid")) {
				console.log('Message : %s', color(e, 'green'))
			}
		}
	}
