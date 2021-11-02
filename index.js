require('./config')
let awesome = require('awesome-phonenumber')
let {
MessageType,
WAConnection,
Browsers
} = require('@adiwajshing/baileys')
let { color, bgcolor } = require('./lib/color')
const cp = require('child_process')
const simple = require('./lib/simple.js')
const WAPI = simple.WAConnection(WAConnection)
const fetch = require('./lib/fetcher')
let fs = require('fs')
let os = require('os')
let figlet = require('figlet')
global.authfile = './session.json'
async function mulai() {
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
let caliph = new WAPI()
caliph.browserDescription = Browsers.appropriate('Desktop')
caliph.browserDescription[0] = "Bot WhatsApp By Bisu Official"
var { currentVersion } = await fetch.json(`https://web.whatsapp.com/check-update?version=1&platform=web`)
caliph.version = currentVersion.split('.').map(a => parseInt(a)) || [2, 2140, 12]
caliph.logger.level = 'warn'
console.log(color(figlet.textSync('Base Wabot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
console.log(color('[ CREATED BY BisuArea ]'))
caliph.on('qr', async () => {
console.log('Scan kode qr ini untuk menjalankan bot')
})
fs.existsSync(authfile) && caliph.loadAuthInfo(authfile)
	caliph.on('connecting', () => {
		console.log(color('[CLIENT]', 'cyan'), color('Connecting...', 'yellow'))
	})
	caliph.on('close', async ({ reason, isReconnecting }) => {
	console.log(color('[CLIENT]', 'cyan'), color(`Because ${reason} reconnecting : ${isReconnecting}`, 'yellow'))
	if (!isReconnecting && reason == 'invalid_session') {
           console.log(color('[CLIENT]', 'cyan'), color('Sesion Invalid, deleting session', 'rex'))
            if (fs.existsSync(authfile)) {
                fs.unlinkSync(authfile)
            }
            caliph.clearAuthInfo()
	    mulai()
        }
	})
	caliph.on('open', (ye) => {
		console.log(color('[CLIENT]', 'cyan'), color('Connected...', 'green'))
	})
	await caliph.connect().then(async v => { 
        console.log(color(`[CLIENT]`, 'cyan'), color('WhatsApp Web Running On Version :'), color(caliph.version.join('.'), 'yellow'))
        global.server ? require('./server')(caliph) : ''
	// console.log(`Nama Bot : ${caliph.user.name}\nID Bot : ${awesome('+'+caliph.user.jid.split('@')[0]).getNumber('international')}\nMode : ${selfmode ? 'Self Mode' : 'Public Mode'}\nHostname : ${os.hostname()}`)
		if (!fs.existsSync(authfile)) fs.writeFileSync(authfile, JSON.stringify(caliph.base64EncodedAuthInfo(), null, '\t'))
	owner.map(a => caliph.reply(a + "@c.us", 'Bot Started.....'))
		})
    caliph.on('CB:action,,call', id => {
    require('./message/call')(caliph, id)
    })
    caliph.on('group-participants-update', async (anu) => {
	console.log(anu)
	require('./message/detect')(caliph, anu)
	})
	caliph.on('CB:action,,battery', json => {
      caliph.battery = Object.fromEntries(Object.entries(json[2][0][1]).map(v => [v[0], eval(v[1])]))
      console.log(color(`[CLIENT]`, 'cyan'), color('Battery Updated!', 'yellow'))
      console.log(caliph.battery)
      })
      caliph.on('message-delete', async (m) => {
      require('./message/antidelete')(caliph, m)
    })
    caliph.on('chat-update', async chatUpdate => {
    try {
     if (!chatUpdate.hasNewMessage) return   
     if (!chatUpdate.messages && !chatUpdate.count) return
    
 let msg = chatUpdate.messages.all()[0]
	 if (!msg.message) return
     msg.message = msg.message.hasOwnProperty('ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
       simple.smsg(caliph, msg)
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return 
	if (!msg.key.fromMe && selfmode) return
	if (msg.key.id.startsWith('XYZ0')) return
	if(autoread) caliph.chatRead(msg.chat)
    require('./message/caliph')(caliph, msg)
    } catch (e) {
    console.log(color('[ERR]', 'cyan'), color(e, 'red'))
    }
    })
    }
    async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)
  }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(color("Update './index.js'", 'red'))
  delete require.cache[file]
  require(file)
})

mulai()
_quickTest()
