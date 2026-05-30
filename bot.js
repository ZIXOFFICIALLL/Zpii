import crypto from 'crypto';

const SECRET_KEY = "Zx9#mK2@pL7!qW5&vB3^nR8*Xs4%dT";
const requestLog = new Map();
const nonceCache = new Set();

function encrypt(text) {
    const key = crypto.createHash('sha256').update(SECRET_KEY).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let enc = cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
    return iv.toString('base64') + '.' + enc;
}

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    try {
        const { uid, version } = req.query;
        const apiKey = req.headers['x-api-key'] || '';
        const signature = req.headers['x-signature'] || '';
        const timestamp = req.headers['x-timestamp'] || '0';
        const nonce = req.headers['x-nonce'] || '';
        const ip = req.headers['x-forwarded-for'] || 'unknown';
        const now = Date.now();
        
        if (apiKey !== SECRET_KEY) return res.status(403).json({s:0,m:'key'});
        
        const sig = crypto.createHmac('sha256', SECRET_KEY).update(`${uid}:${timestamp}:${nonce}:${version||'5.0'}`).digest('hex');
        if (signature !== sig) return res.status(403).json({s:0,m:'sig'});
        
        if (Math.abs(now - parseInt(timestamp)) > 30000) return res.status(403).json({s:0,m:'time'});
        if (nonceCache.has(nonce)) return res.status(403).json({s:0,m:'nonce'});
        nonceCache.add(nonce);
        
        if (requestLog.has(ip)) {
            let log = requestLog.get(ip);
            if (now - log.time < 60000 && log.count >= 10) return res.status(429).json({s:0,m:'rate'});
            now - log.time > 60000 ? requestLog.set(ip,{count:1,time:now}) : log.count++;
        } else requestLog.set(ip,{count:1,time:now});

        const BOT_CODE = `import socket
import os
import binascii
from datetime import datetime
import json
import select
import requests
import threading
import re
import time
import struct
import urllib3
import random
inviteD = False
inviteD = False
zix = False
invit_spam = False
V = 5

def g_m(pk, rp):
    rp = rp.encode('utf-8')
    rp = rp.hex()

    hd = pk[0:8]
    pL = pk[8:10]
    pB = pk[10:32]
    bL = pk[32:34]
    b2 = pk[34:60]

    p_l = pk[60:62]
    p_t = re.findall(r'{}(.*?)28'.format(p_l), pk[50:])[0]
    p_T = pk[int(int(len(p_t)) + 62):]

    nT = (hex((int(f'0x{p_l}', 16) - int(len(p_t) // 2)) + int(len(rp) // 2))[2:])
    if len(nT) == 1:
        nT = "0" + str(nT)

    np = hex(((int(f'0x{pL}', 16) - int((len(p_t)) // 2))) + int(len(rp) // 2))[2:]
    nb = hex(((int(f'0x{bL}', 16) - int(len(p_t) // 2))) + int(len(rp) // 2))[2:]

    fP = hd + np + pB + nb + b2 + nT + rp + p_T
    return str(fP)

yout1 = b"\x06\x00\x00\x00{\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*o\x08\x81\x80\x83\xb6\x01\x1a)[18ffff]\xd8\xb5\xd8\xa7\xd8\xa6\xd8\xaf\xe3\x85\xa4\xd8\xa7\xd9\x84\xd8\xa8\xd9\x87\xd8\xa7\xd8\xa6\xd9\x85[18ffff]2\x02ME@N\xb0\x01\x13\xb8\x01\xdc)\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\tAO'-'TEAM\xf0\x01\x01\xf8\x01\xdc\x03\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x11\xd8\x02F"
yout2 = b'\x06\x00\x00\x00|\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*p\x08\xd6\xd1\xb9(\x1a![18ffff]\xef\xbc\xa8\xef\xbc\xac\xe3\x85\xa4Hassone.[18ffff]2\x02ME@G\xb0\x01\x13\xb8\x01\xcf\x1e\xd8\x01\xcc\xd6\xd0\xad\x03\xe0\x01\xed\xdc\x8d\xae\x03\xea\x01\x1d\xef\xbc\xb4\xef\xbc\xa8\xef\xbc\xa5\xe3\x85\xa4\xef\xbc\xa8\xef\xbc\xa5\xef\xbc\xac\xef\xbc\xac\xe0\xbf\x90\xc2\xb9\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x01'
yout3 = b'\x06\x00\x00\x00x\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*l\x08\xe9\xa7\xe9\x1b\x1a [18ffff]DS\xe3\x85\xa4WAJIHANO\xe3\x85\xa4[18ffff]2\x02ME@Q\xb0\x01\x14\xb8\x01\xca2\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x10.DICTATORS\xe3\x85\xa4\xe2\x88\x9a\xf0\x01\x01\xf8\x01\xc4\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0c\xd8\x02+'
yout4 = b'\x06\x00\x00\x00z\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*n\x08\xed\xd4\xa7\xa2\x02\x1a\x1f[18ffff]M8N\xe3\x85\xa4y\xe3\x85\xa4Fouad[18ffff]2\x02ME@O\xb0\x01\x13\xb8\x01\xa9#\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xdb\xdb\x8d\xae\x03\xea\x01\x0cGREAT\xe2\x80\xbfWALL\xf0\x01\x01\xf8\x01b\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\r\xd8\x023\xe0\x02\xc1\xb7\xf8\xb1\x03'
yout5 = b"\x06\x00\x00\x00\x84\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*x\x08\xb6\xc0\xf1\xcc\x01\x1a'[18ffff]\xd9\x85\xd9\x84\xd9\x83\xd8\xa9*\xd9\x84\xd9\x85\xd8\xb9\xd9\x88\xd9\x82\xd9\x8a\xd9\x86[18ffff]2\x02ME@G\xb0\x01\x05\xb8\x01\x82\x0b\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x15\xe9\xbf\x84\xef\xbc\xac\xef\xbc\xaf\xef\xbc\xb2\xef\xbc\xa4\xef\xbc\xb3\xe9\xbf\x84\xf0\x01\x01\xf8\x01>\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x05\xd8\x02\x0e"
yout6 = b'\x06\x00\x00\x00\x8e\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x81\x01\x08\xeb\x98\x88\x8e\x01\x1a"[18ffff]OP\xe3\x85\xa4BNL\xe3\x85\xa4\xe2\x9a\xa1\xe3\x85\xa4*[18ffff]2\x02ME@R\xb0\x01\x10\xb8\x01\xce\x16\xd8\x01\x84\xf0\xd2\xad\x03\xe0\x01\xa8\xdb\x8d\xae\x03\xea\x01\x1f\xe1\xb4\x8f\xe1\xb4\xa0\xe1\xb4\x87\xca\x80\xe3\x85\xa4\xe1\xb4\x98\xe1\xb4\x8f\xe1\xb4\xa1\xe1\xb4\x87\xca\x80\xe2\x9a\xa1\xf0\x01\x01\xf8\x01A\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x01\xe0\x02\xf3\x94\xf6\xb1\x03'
yout7 = b"\x06\x00\x00\x00\x8e\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x81\x01\x08\xb0\xa4\xdb\x80\x01\x1a'[18ffff]\xd9\x85\xd9\x83\xd8\xa7\xd9\x81\xd8\xad\xd8\xa9.\xe2\x84\x93\xca\x99\xe3\x80\xb5..[18ffff]2\x02ME@T\xb0\x01\x13\xb8\x01\xfc$\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xc1\xdb\x8d\xae\x03\xea\x01\x1d\xef\xbc\xad\xef\xbc\xa1\xef\xbc\xa6\xef\xbc\xa9\xef\xbc\xa1\xe3\x85\xa4\xe2\x8e\xb0\xe2\x84\x93\xca\x99\xe2\x8e\xb1\xf0\x01\x01\xf8\x01\xdb\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0f\xd8\x02>"
yout8 = b'\x06\x00\x00\x00y\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*m\x08\xfd\x8a\xde\xb4\x02\x1a\x1f[18ffff]ITZ\xe4\xb8\xb6MOHA\xe3\x85\xa42M[18ffff]2\x02ME@C\xb0\x01\n\xb8\x01\xdf\x0f\xd8\x01\xac\xd8\xd0\xad\x03\xe0\x01\xf2\xdc\x8d\xae\x03\xea\x01\x15\xe3\x80\x9dITZ\xe3\x80\x9e\xe1\xb5\x97\xe1\xb5\x89\xe1\xb5\x83\xe1\xb5\x90\xf8\x01\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0e\xd8\x026'
yout9 = b'\x06\x00\x00\x00w\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*k\x08\xc6\x99\xddp\x1a\x1b[18ffff]HEROSHIIMA1[18ffff]2\x02ME@I\xb0\x01\x01\xb8\x01\xe8\x07\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x1e\xef\xbc\xa8\xef\xbc\xa5\xef\xbc\xb2\xef\xbc\xaf\xef\xbc\xb3\xef\xbc\xa8\xef\xbc\xa9\xef\xbc\xad\xef\xbc\xa1\xef\xa3\xbf\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x01'
yout10 = b'\x06\x00\x00\x00p\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*d\x08\xde\x91\xb7Q\x1a\x1c[18ffff]SH\xe3\x85\xa4SHIMA|M[18ffff]2\x02ME@R\xb0\x01\x14\xb8\x01\xe7C\xd8\x01\xdd\xd6\xd0\xad\x03\xe0\x01\xca\xdb\x8d\xae\x03\xea\x01\tSH\xe3\x85\xa4Team\xf8\x014\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x11\xd8\x02G\xe0\x02\x89\xa0\xf8\xb1\x03'
yout11 = b'\x06\x00\x00\x00h\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\\\x08\xa1\x9f\xb3\xf4\x01\x1a\x1b[18ffff]2JZ\xe3\x85\xa4POWER[18ffff]2\x02ME@M\xb0\x01\x13\xb8\x01\xa5(\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xec\xdb\x8d\xae\x03\xf0\x01\x01\xf8\x01\x9a\x01\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0c\xd8\x02.\xe0\x02\xb2\xe9\xf7\xb1\x03'
yout12 = b'\x06\x00\x00\x00\x8f\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x82\x01\x08\xaa\xe5\xa4\xe3\x01\x1a-[18ffff]\xe3\x85\xa4\xd8\xb4\xd9\x83\xd8\xa7\xd9\x8e\xd9\x83\xd9\x80\xd9\x8a\xe3\x80\x8e\xe2\x85\xb5\xe1\xb4\x98\xe3\x80\x8f[18ffff]2\x02ME@Q\xb0\x01\x13\xb8\x01\xf2*\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xaf\xdb\x8d\xae\x03\xea\x01\x15\xe2\x80\xa2\xe3\x85\xa4\xe2\x93\x8b\xe2\x92\xbe\xe2\x93\x85\xe3\x85\xa4\xe2\x80\xa2\xf8\x01q\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02e\xe0\x02\xa0\xf1\xf7\xb1\x03'
yout14 = b'\x06\x00\x00\x00\x86\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*z\x08\xfd\x8b\xf4\xfa\x01\x1a$[18ffff]"\xd8\xaf\xd8\xb1\xd8\xa7\xd8\xba\xd9\x88\xd9\x86\xd9\x80\xd9\x88\xd9\x81"[18ffff]2\x02ME@F\xb0\x01\x13\xb8\x01\xec \xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x12\xe1\xb4\x98\xe1\xb4\x84\xe1\xb5\x80\xe1\xb5\x89\xe1\xb5\x83\xe1\xb5\x90\xf0\x01\x01\xf8\x01\xb0\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x04\xd8\x02\t\xe0\x02\xf2\x94\xf6\xb1\x03'
yout15 = b'\x06\x00\x00\x00\x7f\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*s\x08\x90\xf6\x87\x15\x1a"[18ffff]V4\xe3\x85\xa4RIO\xe3\x85\xa46%\xe3\x85\xa4zt[18ffff]2\x02ME@M\xb0\x01\x13\xb8\x01\x95&\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb1\xdd\x8d\xae\x03\xea\x01\x0e\xe1\xb4\xa0\xe1\xb4\x80\xe1\xb4\x8d\xe1\xb4\x8f\xd1\x95\xf0\x01\x01\xf8\x01\xe2\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02^\xe0\x02\x85\xff\xf5\xb1\x03'
yout16 = b'\x06\x00\x00\x00s\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*g\x08\xaa\x84\xc1r\x1a\x1f[18ffff]SA777RAWI\xe3\x85\xa4\xe3\x85\xa4[18ffff]2\x02ME@N\xb0\x01\x13\xb8\x01\xc8\x1b\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x0cSA7RAWI\xe3\x85\xa4TM\xf0\x01\x01\xf8\x01\xfe\x01\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\t\xd8\x02 '
yout17 = b'\x06\x00\x00\x00y\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*m\x08\xe7\xbf\xb6\x8f\x01\x1a\x1c[18ffff]SVG.NINJA\xe2\xbc\xbd[18ffff]2\x02ME@I\xb0\x01\x13\xb8\x01\x94\x1b\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\x85\xdb\x8d\xae\x03\xea\x01\x15\xe3\x85\xa4\xe3\x85\xa4\xe3\x85\xa4\xe3\x85\xa4???\xe3\x85\xa4\xe3\x85\xa4\xf0\x01\x01\xf8\x01o\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x10\xd8\x02?'
yout18 = b"\x06\x00\x00\x00\x9d\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x90\x01\x08\xa8\xe8\x91\xd7\x01\x1a.[18ffff]\xef\xbc\xa1\xef\xbc\xac\xef\xbc\x93\xef\xbc\xab\xef\xbc\xa5\xef\xbc\xa4\xe4\xba\x97\xef\xbc\xb9\xef\xbc\xb4\xe3\x85\xa4[18ffff]2\x02ME@N\xb0\x01\x13\xb8\x01\x97'\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x1e\xef\xbc\xa1\xef\xbc\xac\xef\xbc\x93\xef\xbc\xab\xef\xbc\xa5\xef\xbc\xa4\xe2\x80\xa2\xef\xbc\xb9\xef\xbc\xb4\xe2\x9c\x93\xf0\x01\x01\xf8\x01\xab\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x10\xd8\x02@\xe0\x02\xe9\x80\xf8\xb1\x03"
yout19 = b'\x06\x00\x00\x00r\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*f\x08\x9b\x94\xaa\r\x1a\x1c[18ffff]FARAMAWY_1M.[18ffff]2\x02ME@I\xb0\x01\x01\xb8\x01\xe8\x07\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x12\xe2\x80\xa2\xe3\x85\xa4STRONG\xe3\x85\xa4\xe2\x80\xa2\xf0\x01\x01\xf8\x01X\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x01'
yout20 = b'\x06\x00\x00\x00p\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*d\x08\xde\x91\xb7Q\x1a\x1c[18ffff]SH\xe3\x85\xa4SHIMA|M[18ffff]2\x02ME@R\xb0\x01\x14\xb8\x01\xe7C\xd8\x01\xdd\xd6\xd0\xad\x03\xe0\x01\xca\xdb\x8d\xae\x03\xea\x01\tSH\xe3\x85\xa4Team\xf8\x014\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x11\xd8\x02G\xe0\x02\x89\xa0\xf8\xb1\x03'
yout21= b'\x06\x00\x00\x00h\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\\\x08\xa1\x9f\xb3\xf4\x01\x1a\x1b[18ffff]2JZ\xe3\x85\xa4POWER[18ffff]2\x02ME@M\xb0\x01\x13\xb8\x01\xa5(\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xec\xdb\x8d\xae\x03\xf0\x01\x01\xf8\x01\x9a\x01\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0c\xd8\x02.\xe0\x02\xb2\xe9\xf7\xb1\x03'
yout22 = b'\x06\x00\x00\x00\x8f\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x82\x01\x08\xaa\xe5\xa4\xe3\x01\x1a-[18ffff]\xe3\x85\xa4\xd8\xb4\xd9\x83\xd8\xa7\xd9\x8e\xd9\x83\xd9\x80\xd9\x8a\xe3\x80\x8e\xe2\x85\xb5\xe1\xb4\x98\xe3\x80\x8f[18ffff]2\x02ME@Q\xb0\x01\x13\xb8\x01\xf2*\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xaf\xdb\x8d\xae\x03\xea\x01\x15\xe2\x80\xa2\xe3\x85\xa4\xe2\x93\x8b\xe2\x92\xbe\xe2\x93\x85\xe3\x85\xa4\xe2\x80\xa2\xf8\x01q\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02e\xe0\x02\xa0\xf1\xf7\xb1\x03'
yout23 = b'\x06\x00\x00\x00\x86\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*z\x08\xfd\x8b\xf4\xfa\x01\x1a$[18ffff]"\xd8\xaf\xd8\xb1\xd8\xa7\xd8\xba\xd9\x88\xd9\x86\xd9\x80\xd9\x88\xd9\x81"[18ffff]2\x02ME@F\xb0\x01\x13\xb8\x01\xec \xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x12\xe1\xb4\x98\xe1\xb4\x84\xe1\xb5\x80\xe1\xb5\x89\xe1\xb5\x83\xe1\xb5\x90\xf0\x01\x01\xf8\x01\xb0\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x04\xd8\x02\t\xe0\x02\xf2\x94\xf6\xb1\x03'
yout24 = b'\x06\x00\x00\x00s\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*g\x08\xaa\x84\xc1r\x1a\x1f[18ffff]SA777RAWI\xe3\x85\xa4\xe3\x85\xa4[18ffff]2\x02ME@N\xb0\x01\x13\xb8\x01\xc8\x1b\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x0cSA7RAWI\xe3\x85\xa4TM\xf0\x01\x01\xf8\x01\xfe\x01\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\t\xd8\x02 '
yout25 = b'\x06\x00\x00\x00y\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*m\x08\xe7\xbf\xb6\x8f\x01\x1a\x1c[18ffff]SVG.NINJA\xe2\xbc\xbd[18ffff]2\x02ME@I\xb0\x01\x13\xb8\x01\x94\x1b\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\x85\xdb\x8d\xae\x03\xea\x01\x15\xe3\x85\xa4\xe3\x85\xa4\xe3\x85\xa4\xe3\x85\xa4???\xe3\x85\xa4\xe3\x85\xa4\xf0\x01\x01\xf8\x01o\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x10\xd8\x02?'
yout26 = b"\x06\x00\x00\x00\x9d\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x90\x01\x08\xa8\xe8\x91\xd7\x01\x1a.[18ffff]\xef\xbc\xa1\xef\xbc\xac\xef\xbc\x93\xef\xbc\xab\xef\xbc\xa5\xef\xbc\xa4\xe4\xba\x97\xef\xbc\xb9\xef\xbc\xb4\xe3\x85\xa4[18ffff]2\x02ME@N\xb0\x01\x13\xb8\x01\x97'\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x1e\xef\xbc\xa1\xef\xbc\xac\xef\xbc\x93\xef\xbc\xab\xef\xbc\xa5\xef\xbc\xa4\xe2\x80\xa2\xef\xbc\xb9\xef\xbc\xb4\xe2\x9c\x93\xf0\x01\x01\xf8\x01\xab\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x10\xd8\x02@\xe0\x02\xe9\x80\xf8\xb1\x03"
yout27 = b'\x06\x00\x00\x00r\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*f\x08\x9b\x94\xaa\r\x1a\x1c[18ffff]FARAMAWY_1M.[18ffff]2\x02ME@I\xb0\x01\x01\xb8\x01\xe8\x07\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x12\xe2\x80\xa2\xe3\x85\xa4STRONG\xe3\x85\xa4\xe2\x80\xa2\xf0\x01\x01\xf8\x01X\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x01'
yout28 = b"\x06\x00\x00\x00\x82\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*v\x08\xaa\xdd\xf1'\x1a\x1d[18ffff]BM\xe3\x85\xa4ABDOU_YT[18ffff]2\x02ME@G\xb0\x01\x13\xb8\x01\xd4$\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x1d\xe2\x80\xa2\xc9\xae\xe1\xb4\x87\xca\x9f\xca\x9f\xe1\xb4\x80\xca\x8d\xe1\xb4\x80\xd2\x93\xc9\xaa\xe1\xb4\x80\xc2\xb0\xf0\x01\x01\xf8\x01\x8e\x01\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x07\xd8\x02\x16"
yout29 = b'\x06\x00\x00\x00r\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*f\x08\x9a\xd6\xdcL\x1a-[18ffff]\xe1\xb4\x8d\xcd\xa1\xcd\x9co\xe3\x85\xa4\xef\xbc\xa8\xef\xbc\xa1\xef\xbc\xa6\xef\xbc\xa9\xef\xbc\xa4\xef\xbc\xa9[18ffff]2\x02ME@H\xb0\x01\x01\xb8\x01\xe8\x07\xea\x01\x15\xe1\xb4\x8d\xcd\xa1\xcd\x9co\xc9\xb4\xef\xbd\x93\xe1\xb4\x9b\xe1\xb4\x87\xca\x80\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x01'
yout30 = b'\x06\x00\x00\x00v\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*j\x08\xb6\x92\xa9\xc8\x01\x1a [18ffff]\xef\xbc\xaa\xef\xbc\xad\xef\xbc\xb2\xe3\x85\xa4200K[18ffff]2\x02ME@R\xb0\x01\x13\xb8\x01\xc3(\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\n3KASH-TEAM\xf8\x012\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x06\xd8\x02\x13\xe0\x02\x89\xa0\xf8\xb1\x03'
yout31 = b"\x06\x00\x00\x00\x92\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x85\x01\x08\xa2\xd3\xf4\x81\x07\x1a'[18ffff]\xd8\xb3\xd9\x80\xd9\x86\xd9\x80\xd8\xaf\xd8\xb1\xd9\x8a\xd9\x84\xd8\xa71M\xe3\x85\xa4[18ffff]2\x02ME@K\xb0\x01\x13\xb8\x01\xc1 \xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x1a\xef\xbc\xad\xef\xbc\xa6\xef\xbc\x95\xef\xbc\xb2\xef\xbc\xa8\xe3\x85\xa4\xe1\xb4\xa0\xc9\xaa\xe1\xb4\x98\xf0\x01\x01\xf8\x01\x8c\x01\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0e\xd8\x024\xe0\x02\x87\xff\xf5\xb1\x03"
yout32 = b'\x06\x00\x00\x00|\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*p\x08\xe0\xe1\xdeu\x1a\x1a[18ffff]P1\xe3\x85\xa4Fahad[18ffff]2\x02ME@N\xb0\x01\x13\xb8\x01\xd0&\xd8\x01\xea\xd6\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x1a\xe3\x85\xa4\xef\xbc\xb0\xef\xbc\xa8\xef\xbc\xaf\xef\xbc\xa5\xef\xbc\xae\xef\xbc\xa9\xef\xbc\xb8\xc2\xb9\xf0\x01\x01\xf8\x01\x9e\x03\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0b\xd8\x02*'
yout33 = b'\x06\x00\x00\x00\x82\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*v\x08\xc5\xcf\x94\x8b\x02\x1a\x18[18ffff]@EL9YSAR[18ffff]2\x02ME@P\xb0\x01\x13\xb8\x01\x86+\xd8\x01\xa2\xd7\xd0\xad\x03\xe0\x01\x89\xae\x8f\xae\x03\xea\x01\x1d-\xc9\xaa\xe1\xb4\x8d\xe1\xb4\x8d\xe1\xb4\x8f\xca\x80\xe1\xb4\x9b\xe1\xb4\x80\xca\x9fs\xe2\xac\x86\xef\xb8\x8f\xf8\x01j\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x14\xd8\x02\xe2\x02\xe0\x02\x9f\xf1\xf7\xb1\x03'
yout34 = b'\x06\x00\x00\x00x\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*l\x08\xa9\x81\xe6^\x1a\x1e[18ffff]STRONG\xe3\x85\xa4CRONA[18ffff]2\x02ME@J\xb0\x01\x13\xb8\x01\xd8$\xd8\x01\xd8\xd6\xd0\xad\x03\xe0\x01\x92\xdb\x8d\xae\x03\xea\x01\x12\xe2\x80\xa2\xe3\x85\xa4STRONG\xe3\x85\xa4\xe2\x80\xa2\xf0\x01\x01\xf8\x01q\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x14\xd8\x02\xbc\x01'
yout35 = b'\x06\x00\x00\x00\x7f\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*s\x08\xeb\x8d\x97\xec\x01\x1a&[18ffff]\xd8\xb9\xd9\x80\xd9\x85\xd9\x80\xd8\xaf\xd9\x86\xd9\x8a\xd9\x80\xd8\xaa\xd9\x80\xd9\x88[18ffff]2\x02ME@F\xb0\x01\x13\xb8\x01\xd3\x1a\xd8\x01\xaf\xd7\xd0\xad\x03\xe0\x01\xf4\xdc\x8d\xae\x03\xea\x01\rOSIRIS\xe3\x85\xa4MASR\xf8\x01o\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02\\\xe0\x02\xf4\x94\xf6\xb1\x03'
yout36 = b'\x06\x00\x00\x00\x7f\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*s\x08\xb4\xff\xa3\xef\x01\x1a\x1c[18ffff]ZAIN_YT_500K[18ffff]2\x02ME@K\xb0\x01\x13\xb8\x01\xa3#\xd8\x01\xa2\xd7\xd0\xad\x03\xe0\x01\xbb\xdb\x8d\xae\x03\xea\x01\x1b\xe1\xb6\xbb\xe1\xb5\x83\xe1\xb6\xa4\xe1\xb6\xb0\xe3\x85\xa4\xe1\xb5\x97\xe1\xb5\x89\xe1\xb5\x83\xe1\xb5\x90\xf0\x01\x01\xf8\x01\\\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0b\xd8\x02('
yout37 = b'\x06\x00\x00\x00\x8f\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x82\x01\x08\x86\xa7\x9e\xa7\x0b\x1a([18ffff]\xe2\x80\x94\xcd\x9e\xcd\x9f\xcd\x9e\xe2\x98\x85\xef\xbc\xa2\xef\xbc\xac\xef\xbc\xb2\xef\xbc\xb8[18ffff]2\x02ME@d\xb0\x01\x13\xb8\x01\xe3\x1c\xe0\x01\xf2\x83\x90\xae\x03\xea\x01!\xe3\x85\xa4\xef\xbc\xa2\xef\xbc\xac\xef\xbc\xb2\xef\xbc\xb8\xe3\x85\xa4\xef\xbc\xb4\xef\xbc\xa5\xef\xbc\xa1\xef\xbc\xad\xe3\x85\xa4\xf8\x01u\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02Y\xe0\x02\xc1\xb7\xf8\xb1\x03'
yout38 = b'\x06\x00\x00\x00\x85\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*y\x08\xc3\xcf\xe5H\x1a([18ffff]\xe3\x85\xa4BEE\xe2\x9c\xbfSTO\xe3\x85\xa4\xe1\xb5\x80\xe1\xb4\xb5\xe1\xb4\xb7[18ffff]2\x02ME@Q\xb0\x01\x14\xb8\x01\xffP\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xc1\xdb\x8d\xae\x03\xea\x01\x15TIK\xe2\x9c\xbfTOK\xe1\xb5\x80\xe1\xb4\xb1\xe1\xb4\xac\xe1\xb4\xb9\xf0\x01\x01\xf8\x01\xc8\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02q'
yout39 = b'\x06\x00\x00\x00\x94\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x87\x01\x08\x97\xd5\x9a.\x1a%[18ffff]\xd8\xb9\xd9\x86\xd9\x83\xd9\x88\xd8\xb4\xe1\xb4\x80\xc9\xb4\xe1\xb4\x8b\xe3\x85\xa4[18ffff]2\x02ME@P\xb0\x01\x13\xb8\x01\xe8(\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x1f\xe1\xb4\x80\xc9\xb4\xe1\xb4\x8b\xe1\xb4\x9c\xea\x9c\xb1\xca\x9c\xe3\x85\xa4\xe1\xb4\x9b\xe1\xb4\x87\xe1\xb4\x80\xe1\xb4\x8d\xf0\x01\x01\xf8\x01\xb6\x03\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\n\xd8\x02"\xe0\x02\xf2\x94\xf6\xb1\x03'
yout40 = b'\x06\x00\x00\x00\x8a\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*~\x08\xf7\xdf\xda\\\x1a/[18ffff]\xef\xbc\xa1\xef\xbc\xac\xef\xbc\xa8\xef\xbc\xaf\xef\xbc\xad\xef\xbc\xb3\xef\xbc\xa9_\xef\xbc\xb9\xef\xbc\xb4\xe2\x9c\x93[18ffff]2\x02ME@P\xb0\x01\x13\xb8\x01\xb9*\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xc1\xdb\x8d\xae\x03\xea\x01\x0cALHOMSI~TEAM\xf0\x01\x01\xf8\x01\x8e\x0e\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02S\xe0\x02\xc3\xb7\xf8\xb1\x03'
yout41 = b'\x06\x00\x00\x00\x86\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*z\x08\xb5\xdd\xec\x8e\x01\x1a%[18ffff]\xd8\xa7\xd9\x88\xd9\x81\xe3\x80\x80\xd9\x85\xd9\x86\xd9\x83\xe3\x85\xa4\xe2\x9c\x93[18ffff]2\x02ME@K\xb0\x01\x13\xb8\x01\xdd#\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x18\xef\xbc\xaf\xef\xbc\xa6\xe3\x85\xa4\xef\xbc\xb4\xef\xbc\xa5\xef\xbc\xa1\xef\xbc\xad\xe3\x85\xa4\xf0\x01\x01\xf8\x01\xe8\x02\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02Q'
yout42 = b'\x06\x00\x00\x00\x8b\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*\x7f\x08\x81\xf4\xba\xf8\x01\x1a%[18ffff]\xef\xbc\xa7\xef\xbc\xa2\xe3\x85\xa4\xef\xbc\xae\xef\xbc\xaf\xef\xbc\x91\xe3\x81\x95[18ffff]2\x02ME@N\xb0\x01\x0c\xb8\x01\xbd\x11\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb1\xdd\x8d\xae\x03\xea\x01\x1a\xef\xbc\xa7\xef\xbc\xb2\xef\xbc\xa5\xef\xbc\xa1\xef\xbc\xb4__\xef\xbc\xa2\xef\xbc\xaf\xef\xbc\xb9\xf8\x018\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0c\xd8\x02-\xe0\x02\x85\xff\xf5\xb1\x03'
yout43 = b'\x06\x00\x00\x00o\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*c\x08\xfb\x9d\xb9\xae\x06\x1a\x1c[18ffff]BT\xe3\x85\xa4BadroTV[18ffff]2\x02ME@@\xb0\x01\x13\xb8\x01\xe7\x1c\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\x91\xdb\x8d\xae\x03\xea\x01\nBadro_TV_F\xf0\x01\x01\xf8\x01\x91\x1a\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\n\xd8\x02!'
yout44 = b"\x06\x00\x00\x00s\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*g\x08\xc4\xe5\xe1>\x1a'[18ffff]\xd8\xb5\xd8\xa7\xd8\xa6\xd8\xaf~\xd8\xa7\xd9\x84\xd8\xba\xd9\x86\xd8\xa7\xd8\xa6\xd9\x85[18ffff]2\x02ME@J\xb0\x01\x14\xb8\x01\xceP\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x03Z7F\xf0\x01\x01\xf8\x01\xd0\x19\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x14\xd8\x02\x9c\x01"
yout45 = b'\x06\x00\x00\x00\x85\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*y\x08\xfd\xa4\xa6i\x1a$[18ffff]\xd8\xb2\xd9\x8a\xd9\x80\xd8\xb1\xc9\xb4\xcc\xb67\xcc\xb6\xca\x80\xe3\x85\xa4[18ffff]2\x02ME@M\xb0\x01\x13\xb8\x01\xe1(\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x19\xc2\xb7\xe3\x85\xa4\xe3\x85\xa4N\xe3\x85\xa47\xe3\x85\xa4R\xe3\x85\xa4\xe3\x85\xa4\xc2\xb7\xf0\x01\x01\xf8\x01\x8f\t\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02k'
yout46 = b'\x06\x00\x00\x00y\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*m\x08\xcc\xb9\xcc\xd4\x06\x1a"[18ffff]\xd8\xa8\xd9\x88\xd8\xad\xd8\xa7\xd9\x83\xd9\x80\xd9\x80\xd9\x80\xd9\x85[18ffff]2\x02ME@9\xb0\x01\x07\xb8\x01\xca\x0c\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x11*\xef\xbc\x97\xef\xbc\xaf\xef\xbc\xab\xef\xbc\xa1\xef\xbc\xad*\xf0\x01\x01\xf8\x01\xad\x05\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x01'
yout47 = b'\x06\x00\x00\x00e\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*Y\x08\xe8\xbd\xc9b\x1a [18ffff]\xe3\x80\x8cvip\xe3\x80\x8dDR999FF[18ffff]2\x02ME@Q\xb0\x01\x10\xb8\x01\x94\x16\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xf0\x01\x01\xf8\x01\xa0\x04\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x0c\xd8\x02+'
yout48 = b'\x06\x00\x00\x00\x82\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*v\x08\x86\xb7\x84\xf1\x01\x1a&[18ffff]\xd8\xa2\xd9\x86\xd9\x8a\xd9\x80\xd9\x80\xd9\x84\xd8\xa7\xce\x92\xe2\x92\x91\xe3\x85\xa4[18ffff]2\x02ME@Q\xb0\x01\x13\xb8\x01\x82)\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xb2\xdd\x8d\xae\x03\xea\x01\x13\xce\x92\xe2\x92\x91\xe3\x85\xa4MAFIA\xe3\x85\xa4\xef\xa3\xbf\xf0\x01\x01\xf8\x01\x95\x04\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02W'
yout49 = b'\x06\x00\x00\x00u\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*i\x08\xb4\xbe\xde\x83\x02\x1a [18ffff]SPONGEBOB!\xe3\x85\xa4\xe4\xba\x97[18ffff]2\x02ME@N\xb0\x01\x14\xb8\x01\x842\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\x96\xdb\x8d\xae\x03\xea\x01\x0cALHOMSI~TEAM\xf0\x01\x01\xf8\x01\xbd\x03\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02{'
yout50 = b'\x06\x00\x00\x00u\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x02*i\x08\xb4\xbe\xde\x83\x02\x1a [18ffff]SPONGEBOB!\xe3\x85\xa4\xe4\xba\x97[18ffff]2\x02ME@N\xb0\x01\x14\xb8\x01\x842\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\x96\xdb\x8d\xae\x03\xea\x01\x0cALHOMSI~TEAM\xf0\x01\x01\xf8\x01\xbd\x03\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\x13\xd8\x02{'
yout51 = b'\x06\x00\x00\x00z\x08\xd4\xd7\xfa\xba\x1d\x10\x06 \x028c8d99a21bn\x08\xed\xd4\xa7\xa2\x02\x1a\x1f[18ffff]M8N\xe3\x85\xa4y\xe3\x85\xa4Fouad[18ffff]2\x02ME@O\xb0\x01\x13\xb8\x01\xa9#\xd8\x01\xd4\xd8\xd0\xad\x03\xe0\x01\xdb\xdb\x8d\xae\x03\xea\x01\x0cGREAT\xe2\x80\xbfWALL\xf0\x01\x01\xf8\x01b\x80\x02\xfd\x98\xa8\xdd\x03\x90\x02\x01\xd0\x02\r\xd8\x023\xe0\x02\xc1\xb7\xf8\xb1\x03'
yout_list = [yout1,yout2,yout3,yout4,yout5,yout6,yout7,yout8,yout9,yout10,yout11,yout12,yout14,yout15,yout16,yout17,yout18,yout19,yout20,yout21,yout22,yout23,yout24,yout25,yout26,yout27,yout28,yout29,yout30,yout31,yout32,yout33,yout34,yout35,yout36,yout37,yout38,yout39,yout40,yout41,yout42,yout43,yout44,yout45,yout46,yout47,yout48,yout49,yout50,yout51]

class Px:
    def __init__(self):
        self.u = "bot"
        self.p = "bot"
        self.yout_list = yout_list
        self.zix = False
        self.p1 = None
        self.p2 = None
        self.rt = None
        self.s5 = None
        self.s12 = None
        self.eP = None
        self.lag_0515_packet = None
        self.lag_remote = None
        self.lag_active = False
        self.lag_lock = threading.Lock()
        self.lvl_start_packet = None 
        self.lvl_cancel_packet = None 
        self.lvl_active = False
        self.lvl_lock = threading.Lock()
        self.lvl_remote = None
    def zx(self, id):
        try:
            n = int(id)
            eB = []
            while True:
                b = n & 0x7F
                n >>= 7
                if n:
                    b |= 0x80
                eB.append(b)
                if not n:
                    break
            return ''.join(f'{b:02x}' for b in eB)
        except Exception as e:
            return None

    def sH(self, id, msg):
        try:
            eP = self.pP(msg, id)
            if self.s12:
                self.s12.send(bytes.fromhex(eP))
        except Exception as e:
            pass

    def send_yout_list(self):
        if not self.s5:
            print("[!] s5 not assigned.")
            return
        for i, packet in enumerate(self.yout_list):
            try:
                self.s5.send(packet)
                time.sleep(2)
            except Exception as e:
                print(f"[!] Error sending packet {i+1}: {e}")

    def bmw(self, id):
        try:
            number = int(id)
            encoded_bytes = []
            while True:
                byte = number & 0x7F   
                number >>= 7
                if number:
                    byte |= 0x80     
                encoded_bytes.append(byte)
                if not number:
                    break
            return ''.join(f'{b:02x}' for b in encoded_bytes)
        except Exception as e:
            print("error", e)
            return None
            
    def pP(self, txt, uid):
        try:
            if isinstance(uid, str):
                t_id = self.Dc(uid) if hasattr(self, 'Dc') else int(uid, 16)
            else:
                t_id = uid
            dt = {
                1: t_id,
                2: 18,
                4: 2,
                5: {
                    1: 13600840828,
                    2: t_id,
                    4: txt,
                    5: 1726183152,
                    9: {
                        1: '[b][c][FF0000]IG => @mero.antiban , @t_q_h_i , @gplx.antiban1 , @7.9.x_',
                        2: 902000306,
                        3: 901000276,
                        4: 330,
                        5: 801043518,
                        8: 'xMeRo'
                    },
                    10: 'ar',
                    13: {
                        1: 'https://graph.facebook.com/v9.0/120443410213545/picture?width=160&height=160',
                        2: 1,
                        3: 1
                    },
                    14: ''
                }
            }

            hR = self.pH(dt)
            if hR:
                return self.zP("1200", hR)
            return None
        except Exception as e:
            return None

    def eV(self, val):
        res = bytearray()
        while val > 0x7F:
            res.append((val & 0x7F) | 0x80)
            val >>= 7
        res.append(val & 0x7F)
        return bytes(res)

    def eT(self, f_n, w_t):
        return self.eV((f_n << 3) | w_t)

    def e6(self, f_n, val):
        return self.eT(f_n, 0) + self.eV(val)

    def e3(self, f_n, val):
        return self.eT(f_n, 0) + self.eV(val)

    def eS(self, f_n, val):
        enc = val.encode('utf-8')
        return self.eT(f_n, 2) + self.eV(len(enc)) + enc

    def eM(self, f_n, data):
        return self.eT(f_n, 2) + self.eV(len(data)) + data

    def e14_3(self, data):
        buf = bytearray()
        if 1 in data:
            buf.extend(self.e3(1, data[1]))
        if 2 in data:
            buf.extend(self.e3(2, data[2]))
        return bytes(buf)

    def e9_14(self, data):
        buf = bytearray()
        if 1 in data:
            buf.extend(self.e3(1, data[1]))
        if 2 in data:
            buf.extend(self.e3(2, data[2]))
        if 3 in data and isinstance(data[3], dict):
            sub = self.e14_3(data[3])
            buf.extend(self.eM(3, sub))
        return bytes(buf)

    def e9_13(self, data):
        buf = bytearray()
        if 1 in data:
            buf.extend(self.e3(1, data[1]))
        return bytes(buf)

    def eU(self, data):
        buf = bytearray()
        if 1 in data:
            buf.extend(self.eS(1, data[1]))
        if 2 in data:
            buf.extend(self.e3(2, data[2]))
        if 4 in data:
            buf.extend(self.e3(4, data[4]))
        if 5 in data:
            buf.extend(self.e3(5, data[5]))
        if 8 in data:
            buf.extend(self.eS(8, data[8]))
        if 10 in data:
            buf.extend(self.e3(10, data[10]))
        if 11 in data:
            buf.extend(self.e3(11, data[11]))
        if 13 in data:
            s13 = self.e9_13(data[13])
            buf.extend(self.eM(13, s13))
        if 14 in data:
            s14 = self.e9_14(data[14])
            buf.extend(self.eM(14, s14))
        return bytes(buf)

    def eA(self, data):
        buf = bytearray()
        if 2 in data:
            buf.extend(self.e3(2, data[2]))
        if 3 in data:
            buf.extend(self.e3(3, data[3]))
        return bytes(buf)

    def eI(self, data):
        buf = bytearray()
        if 1 in data:
            buf.extend(self.e6(1, data[1]))
        if 2 in data:
            buf.extend(self.e6(2, data[2]))
        if 4 in data:
            buf.extend(self.eS(4, data[4]))
        if 5 in data:
            buf.extend(self.e3(5, data[5]))
        if 7 in data:
            buf.extend(self.e3(7, data[7]))
        if 9 in data:
            u_d = self.eU(data[9])
            buf.extend(self.eM(9, u_d))
        if 10 in data:
            buf.extend(self.eS(10, data[10]))
        if 13 in data:
            a_d = self.eA(data[13])
            buf.extend(self.eM(13, a_d))
        return bytes(buf)

    def eO(self, data):
        buf = bytearray()
        if 1 in data:
            buf.extend(self.e6(1, data[1]))
        if 2 in data:
            buf.extend(self.e3(2, data[2]))
        if 4 in data:
            buf.extend(self.e3(4, data[4]))
        if 5 in data:
            i_d = self.eI(data[5])
            buf.extend(self.eM(5, i_d))
        return bytes(buf)

    def pH(self, data):
        enc = self.eO(data)
        return binascii.hexlify(enc).decode('utf-8')

    def zP(self, st, pk):
        p_len = len(pk)//2
        l_h = hex(p_len).split('x')[-1]
        z = "0000" if len(l_h) == 2 else "000" if len(l_h) == 3 else "00" if len(l_h) == 4 else "0"
        return f"{st}{z}{l_h}{pk}"

    def En(self, val):
        try:
            val = int(val)
            res = []
            while val > 0:
                b = val & 0x7F
                val >>= 7
                if val > 0:
                    b |= 0x80
                res.append(b)
            return bytes(res).hex()
        except Exception as e:
            return None

    def Dc(self, h_v):
        try:
            b_v = bytes.fromhex(h_v)
            r, sh = 0, 0
            for b in b_v:
                r |= (b & 0x7F) << sh
                if not (b & 0x80):
                    break
                sh += 7
            return r
        except Exception as e:
            return None
            
    def ff(self, c, i):
        try:
            if len(i) == 8:
                p = '060000007408d4d7faba1d100620022a6808cec2f1051a185b4646303030305d5b635d5b625d4534303420424f54000032024d454064b00101b801e807d801d4d8d0ad03e001b2dd8dae03ea011eefbca8efbca5efbcb2efbcafefbcb3efbca8efbca9efbcadefbca1efa3bf8002fd98a8dd03900201d00201'
                p = re.sub(r'cec2f105', i, p)
                c.send(bytes.fromhex(p))
            elif len(i) == 10:
                p = '060000006b08d4d7faba1d100620022a5f08fb9db9ae061a185b4646303030305d5b635d5b625d4534303420424f54000032024d454064b00113b801e71cd801d4d8d0ad03e001b2dd8dae03ea010a5a45522d49534b494e47f00101f801911a8002fd98a8dd03900201d0020ad80221'
                p = re.sub(r'fb9db9ae06', i, p)
                c.send(bytes.fromhex(p))
        except Exception as e:
            pass

    def zx2(self, i):
        try:
            n = int(i)
            e = []
            while True:
                b = n & 0x7F
                n >>= 7
                if n:
                    b |= 0x80
                e.append(b)
                if not n:
                    break
            return ''.join(f'{b:02x}' for b in e)
        except:
            return None


    def send_lvl_loop(self, user_id):
        with self.lvl_lock:
            if self.lvl_active:
                threading.Thread(target=self.sH, args=(user_id, "[FF0000]أمر /lvl قيد التشغيل بالفعل")).start()
                return
            if not self.lvl_start_packet or not self.lvl_cancel_packet:
                threading.Thread(target=self.sH, args=(user_id, "[FF0000]لم يتم التقاط باكيتات /lvl بعد. تأكد من دخولك إلى وضع الترقية أولاً")).start()
                return
            self.lvl_active = True
        
        start_msg = """[00FF00]تم بدء إرسال باكيتات /lvl بشكل متكرر لا نهائي
سيتم إرسال باكيت البدا ثم باكيت الإلغاء بعد 11 ثانية ثم باكيت البدا بعد ثانية وهكذا...[00FF00]"""
        threading.Thread(target=self.sH, args=(user_id, start_msg)).start()
        
        try:
            while self.lvl_active:
                if not self.lvl_remote:
                    break
                # إرسال باكيت البدا
                try:
                    self.lvl_remote.send(self.lvl_start_packet)
                    print(f"[LVL] Start packet sent, length: {len(self.lvl_start_packet)}")
                except Exception as e:
                    print(f"[LVL] Error sending start packet: {e}")
                    break
                
                # انتظار 11 ثانية
                time.sleep(11)
                
                if not self.lvl_active:
                    break
                
                # إرسال باكيت الإلغاء
                try:
                    self.lvl_remote.send(self.lvl_cancel_packet)
                    print(f"[LVL] Cancel packet sent, length: {len(self.lvl_cancel_packet)}")
                except Exception as e:
                    print(f"[LVL] Error sending cancel packet: {e}")
                    break
                
                # انتظار ثانية واحدة
                time.sleep(1)
                
        except Exception as e:
            print(f"[LVL] Error in loop: {e}")
        finally:
            with self.lvl_lock:
                self.lvl_active = False
            threading.Thread(target=self.sH, args=(user_id, "[FF0000]توقف أمر /lvl")).start()

    def send_lag_loop(self, packet, remote, user_id):
        start_time = time.time()
        duration = 60
        sent_count = 0
        
        start_msg = """[00FF00]يجب عليك ضغط على زر الاستعداد او الغاء في الفريق بدا تعليق الفريق
        
ملاحظة يجب عليك ان تكون عضو ليس قائد للفريق[00FF00]"""
        threading.Thread(target=self.sH, args=(user_id, start_msg)).start()
        
        try:
            while time.time() - start_time < duration:
                try:
                    remote.send(packet)
                    sent_count += 1
                    time.sleep(0.001)
                except Exception as e:
                    break
            
            elapsed = time.time() - start_time
            finish_msg = f"[00FF00]تم التعليق الفريق بنجاح تم إرسال {sent_count} حزمة في {elapsed:.1f} ثانية[00FF00]"
            threading.Thread(target=self.sH, args=(user_id, finish_msg)).start()
            
        finally:
            with self.lag_lock:
                self.lag_active = False

            
    def spy(self, id):
        ep = f"050000040108{id}100520062af40708{id}12024d451801200332c90408{id}121a544fe385a4efbcb3efbd81efbd8cefbd81efbd8defbd8fe29cb01a024d452087b68faa06284030a9cbd13038324218dcf38766f4aae860efb7ce64e39ba361e99fe061e8b6ce64480150d30158b9106886db8dae037a05b38ec5b00382011d08efdaf1eb041203357635180620f087d4f0042a0808c89d85f30410038801c2ffc4b00392010c0107090a0b1216191a1e20239801d501a00131a80185fff5b103c00101c80101e80101880203920208b930e532fe0ac205aa020a080110a84618807d2003aa0208080210fa3318f403aa0208080f109b7118904eaa0205081710e751aa0205081810ba41aa0205081a10c435aa0205081b109b71aa0205081c109539aa0205082010d338aa0205082110f736aa0205082210c435aa0205082b108835aa02050823109b71aa02050831108835aa02050839109b71aa0205083d109b71aa02050841109b71aa0205084910e432aa0205084d10e432aa02050834109b71aa0205082810e432aa0205082910e432b00201c2024012041a0201041a21084812060104050607021a0b08011003189b0320bc9b011a08080210022092ed021a0508501201631a0508511201652207120565ed0e890ed802a9a38daf03ea02520a4c68747470733a2f2f67726170682e66616365626f6f6b2e636f6d2f76392e302f3339303835333639383032393935362f706963747572653f77696474683d313630266865696768743d31363010011801f202090882cab5ee0110f9028a03060802100218059203009803f7c282ac0ba2030c2144454144e385a4484f4d4532d30208{id}120b544f502d464952452d50431a024d45208cb68faa0628043085cbd13038324218c09ae061c0b5ce64c091e66080c3856680a897638096a361480150c90158e80792010601090a1219209801c901c00101c80101e801018802049202059603000000aa0208080110ff34188064aa020b080f10fd3218b086012001aa0205080210e432aa0205081810fd32aa0205081a10fd32aa0205081c10fd32aa0205082010fd32aa0205082210fd32aa0205082110fd32aa0205081710e432aa0205082310fd32aa0205082b10fd32aa0205083110fd32aa0205083910fd32aa0205083d10fd32aa0205084110fd32aa0205084910d836aa0205084d10e432aa0205081b10fd32aa0205083410fd32aa0205082810e432aa0205082910e432c2022112041a0201041a0508501201631a0508511201651a090848120501040506072200ea0204100118018a03009203003a0101400150016801721e313639383934353830303230323738373034345f346a7867796f626e397988018190ae92d194c8ef17a20100a80101b001e001ea010449444331"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))            

    def v(self, id):
        ep = f"050000029508{id}100520012a880508{id}12024d451801200332f10308{id}120c5a49582d4f464646464646461a024d4520c5c6b8d00628643087cbd13038324218d1afe96092b4a661d1b8e361d6d3d164d7d3d16488e18866480150ca02589f8d066082d8d0ad03708080027a0fede5cab0038ca6f3b20389afedb30392010701090a121920279801c302a001ba01e80101aa020a080110e43218807d2003aa020a080f10e43218807d2003aa0209082510f02e18002003b00203c2022712031a01001a0f0848120b0104050607f1a802f4a8021a0508501201631a060851120265662200d00203d802a5a38daf03ea0204100118018a0302080192030098039bb99fc50ba203096573702d524542454ce20304374f5219ea0300f20300fa030908d1afe96010351807fa03090892b4a66110351807fa030908d1b8e36110351807fa030908d6d3d16410351807fa030908d7d3d16410351807fa03090888e18866103518078004649004029a040a08c5c6b8d00620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0406080110808002da042808{id}10081a140f0401070d12131103061415080a0e05100b0c0220c05728c05730c09a0cf0040afa0405080310f602fa04050804108103fa04050805109f01fa0405081d10c801fa040408161059fa0405080e109001fa0402081580050a9005e9073a01014001500260016801721e313737393331313432393837343632343235325f7538303535723965376e880180e0b3e394e6aac61ca20100b001c902ea010449444332fa011e313737393331313432393837343632363532315f7877776a7478693669388a021e313737393331313432393837343632383235345f30386e68663076707961"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))                        
            
    def q5(self, id):
        ep = f"050000001808{id}100520202a0c0a0a39393939393939393939"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))
            
    def spy_room(self, id):
        ep = f"0e1500000050d6d519002bdcc64de8a42c1aaedf5c3aaacf7ce694efbfc1f11f026809b625e793614dd13ffa38eecc554ff320a61b8ac69699a8eb5edab73b39e9d9107a50d5e083a2bc8c01fbad64dbce6b8581cd50"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))            
            

    def q6(self, id):
        ep = f"050000019008{id}100520082a830308dbdcd7cb251afa0208{id}12024d451801200532870208{id}12105b4646303030305d5a4958264d45524f1a024d4520ebdd88b90628363087cbd1303832420880c38566949be061480150d60158991468b7db8dae037a0082011f08d1daf1eb0412054f75656973180420d487d4f0042a0808cc9d85f304100392010220229801db01a0014fc00101d001ada48aaf03e80101880203920200aa0205082910e432c2021a12021a001a100851120265661a08086620822d289e0522021200d802a6a38daf03ea020410011801f202080885cab5ee01105c8a0300920300980398e0b3af0ba20319efbca334e385a4eaa884e385a4efbcb4efbca5efbca1efbcada80368b00301c2030a081c100f180320052801e203014fea03003a00403e50056801721e313733303239333438313635343436323834305f6c646a72387477723378880180909beaf3d18fd919a20100b001e201ea010449444331fa011e313733303239333438313635343436363239355f6f747735637831756c6d"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))
            
    def dm(self, id):
        ep = f"080000001708{id}100820022a0b089f8d06109f8d0618c801"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))
            


    def y10(self, id):
        ep = f"12000000F308{id}101220022ae60108{id}10{id}2883bbbcc40642247b225469746c654944223a3930343939303037322c2274797065223a225469746c65227d4a520a13e29dbc2ecfbb2ee29dbce385a4524544464f5810edb58fae0318b1b1d2ad0320c10228c3b7f8b10338024214e3808e4164e3808fc39fc581c398c48ccca3c6986a00720c08{id}10011a0210155202656e6a520a4c68747470733a2f2f67726170682e66616365626f6f6b2e636f6d2f76392e302f3131393337333137393632373538352f706963747572653f77696474683d313630266865696768743d313630100118017200"
        if self.s12:
            self.s12.send(bytes.fromhex(ep))

    def y9(self, id):
        ep = f"12000000d208{id}101220022ac50108{id}10{id}2883bbbcc40642247b225469746c654944223a3930343939303037312c2274797065223a225469746c65227d4a310a037a697810edb58fae0318b1b1d2ad0320c10228c3b7f8b103380242037a69786a00720c08{id}10011a0210155202656e6a520a4c68747470733a2f2f67726170682e66616365626f6f6b2e636f6d2f76392e302f3131393337333137393632373538352f706963747572653f77696474683d313630266865696768743d313630100118017200"
        if self.s12:
            self.s12.send(bytes.fromhex(ep))

    def y8(self, id):
        ep = f"12000000d208{id}101220022ac50108{id}10{id}2883bbbcc40642247b225469746c654944223a3930343939303037302c2274797065223a225469746c65227d4a310a037a697810edb58fae0318b1b1d2ad0320c10228c3b7f8b103380242037a69786a00720c08{id}10011a0210155202656e6a520a4c68747470733a2f2f67726170682e66616365626f6f6b2e636f6d2f76392e302f3131393337333137393632373538352f706963747572653f77696474683d313630266865696768743d313630100118017200"
        if self.s12:
            self.s12.send(bytes.fromhex(ep))

    def y7(self, id):
        ep = f"12000000F308{id}101220022AE60108{id}10{id}2883BBBCC40642247B225469746C654944223A3930343039303032372C2274797065223A225469746C65227D4A520A13E29DBC2ECFBB2EE29DBCE385A4524544464F5810EDB58FAE0318B1B1D2AD0320C10228C3B7F8B10338024214E3808E4164E3808FC39FC581C398C48CCCA3C6986A00720C08{id}10011A0210155202656E6A520A4C68747470733A2F2F67726170682E66616365626F6F6B2E636F6D2F76392E302F3131393337333137393632373538352F706963747572653F77696474683D313630266865696768743D313630100118017200"
        if self.s12:
            self.s12.send(bytes.fromhex(ep))

    def y6(self, id):
        ep = f"12000000F308{id}101220022AE60108{id}10{id}2883BBBCC40642247B225469746C654944223A3930343039303032362C2274797065223A225469746C65227D4A520A13E29DBC2ECFBB2EE29DBCE385A4524544464F5810EDB58FAE0318B1B1D2AD0320C10228C3B7F8B10338024214E3808E4164E3808FC39FC581C398C48CCCA3C6986A00720C08{id}10011A0210155202656E6A520A4C68747470733A2F2F67726170682E66616365626F6F6B2E636F6D2F76392E302F3131393337333137393632373538352F706963747572653F77696474683D313630266865696768743D313630100118017200"
        if self.s12:
            self.s12.send(bytes.fromhex(ep))

    def st(self, id):
        ep = f"120000009708{id}101220022a8a0108{id}10{id}28a0acb4d00642337b22537469636b6572537472223a225b313d313230303030303030312d31395d222c2274797065223a22537469636b6572227d4a350a19d985d98ad8b1d988e385a4d8a8db92d980d984d8a7d8b1d8a920b40228f194f6b1036a00720d08{id}10011a030910155202656e6a04100118017200"
        if self.s12:
            self.s12.send(bytes.fromhex(ep))

    def xp(self, id):
        ep = f"0e0000020d08{id}100e20172a800408abb3e42412ea030881e1f6921c1081e1f6921c1ae4025b625d5b635d5b4646303030305d5a6978265b3030666630305d4d65526f2653746576650a2020202020202020202020200a5b435d5b425d5b4646464630305d446f6e4520537461725420426f5420466f6c6c6f77204d652034204e65772054470a0a5b4646303030305d204d65526f0a20203d3e200a5b3030464630305d74656c656772616d203a2020406d65726f7076700a5b3030464630305d696e7374616772616d203a206d65726f2e616e746962616e0a0a5b4646303035305d7a6958206f6666696369616c0a20203d3e200a74656c656772616d203a20204058695a59454c466c0a696e7374616772616d203a20745f715f685f690a0a5b4646303037305d2053746556650a20203d3e200a5b3030464630305d74656c656772616d203a202040535445564531313534320a5b3030464630305d696e7374616772616d203a2067706c782e616e746962616e310a0a5b3030304646465d426f54204534303428b2dd8dae03300138d4d8d0ad034a0050bee8fbfd02580160ca0268dd1f70be02784d800182c0b5c187eca3c61cb2010410011801ba0100c201024d45ca0100d20100da0100e00168ea0100fa010e08ffdacddf1810011a0030f9b80182020208159802aa0ca00201ca0204e024a218d0029fdaf1eb041801200f280330e3c2c1be213801"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))
            
    def pc(self, id):
        ep = f"05000003ff08{id}100520062af20708d3858dd22312024d451801200332cc0408d3858dd22312135b6564303930395d50454741e2808f535553201a024d4520a6e38baa0628443087cbd13038324218e0f38766e796a3618994e660f39ae061e5b7d064bfb8ce64480150ce01588e0c60f5d7d0ad0368c2dc8dae037a05d7d0cab00382012b08b3daf1eb041211d8b2d98ad988d98ad986d983d983e29cbf180620b687d4f0042a0808c49d85f30410038801ed89c5b00392010b0107090a0b1216191a20239801cd01a00111a80185fff5b103c00101c80101d001bace89af03e80101880203920207c20500a606e532aa020a080110c03e18f0602002aa0205080210b232aa0205080310e432aa020a080f10918a0118a09c01aa0205081710e750aa0205081810b768aa0205081a10da74aa0206081b10918a01aa0206081c10958c01aa02050820108b79aa0205082110eb7aaa0205082210a275aa0206082310dc8701aa0205082b10f476aa0205083110f476aa0206083910918a01aa0206083d10918a01aa0206084110918a01aa0205084910e432aa0205084d10e432aa0206083410918a01aa0205082810e432aa0205082910e432c2022112041a0201041a090848120501040506071a0508501201631a0508511201652200ea02520a4c68747470733a2f2f67726170682e66616365626f6f6b2e636f6d2f76392e302f3237373631373532363237343633352f706963747572653f77696474683d313630266865696768743d31363010011801f202090887cab5ee0110870a8a030808021003180528019203009803f3e78ea30ba20315e298afd986d8a7d8acd988d986d98ae298afe29c9432d00208{id}120b5b6666303030305d5a49581a024d452096ed8baa0628043089cbd13038324214fa96e660b599a361c19de061aab9ce64abb9ce64480150c90158e80792010601090a1219209801c901c00101c80101e80101880204920206ee07ce010000aa0208080110ff34188064aa020b080f10fd3218b086012001aa0205080210e432aa0205081810fd32aa0205081a10fd32aa0205081c10fd32aa0205082010fd32aa0205082210fd32aa0205082110fd32aa0205081710e432aa0205082310fd32aa0205082b10fd32aa0205083110fd32aa0205083910fd32aa0205083d10fd32aa0205084110fd32aa0205084910d836aa0205084d10e432aa0205081b10fd32aa0205083410fd32aa0205082810e432aa0205082910e432c2022112041a0201041a090848120501040506071a0508501201631a0508511201652200ea0204100118018a03009203003a0101400150016801721e313639383838363035353130343733333939355f6a67386c37333431646688818090aefec3978fef17a20100b001e001ea010449444331"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))       

    def d1(self):
        ep = f"060000005c08d4d7faba1d100620022a5008ece39cf1081a155b4646303030305d5b635d5b625d784d65526f000032024d454064b00101b801e807d801d4d8d0ad03e001b2dd8dae03ea01084534303420424f548002fd98a8dd03900201d00201"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))  

    def d2(self):
        ep = f"060000005c08d4d7faba1d100620022a5008c2cfd6d9071a155b4646303030305d5b635d5b625d5354455645000032024d454064b00101b801e807d801d4d8d0ad03e001b2dd8dae03ea01084534303420424f548002fd98a8dd03900201d00201"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))   

    def d3(self):
        ep = f"060000005a08d4d7faba1d100620022a4e08c8f0dacb081a135b4646303030305d5b635d5b625d5a4958000032024d454064b00101b801e807d801d4d8d0ad03e001b2dd8dae03ea01084534303420424f548002fd98a8dd03900201d00201"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))     

    def skin1(self, id):
        ent_packet = f"050000025808{id}100520542acb0408a5f1a5c90310{id}1abc0408{id}120b2b2b2b2b464f582b2b2b2b1a024d4520f9db8dc50628023087cbd1303832421880a89763f089e361f680e960b185a661a5cfd064c9fb8766480150ad0258e80792010a0107090a0b12191a201d9801ad02c00101d001a1fd89af03e80101880204920208c205ae2dba109215aa0208080110e43218807daa0208080f10e43218807daa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710904eaa0205082310e432aa0205082b10b06daa0205084a10b06daa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910d836aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810904eaa0205082910e432aa0205085910e432c2022712031a01001a0508501201631a060851120265661a0f0848120b0104050607f1a802f4a8022200ea0204100118018a030208019203009803fab8cdb80ba20312e385a4e385a4434f444558e385a4424f5453e203024f52ea0300f203008004649004029a040a08f9db8dc50620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0400da040608{id}e00401ea042108a5f1a5c903121484a5d164bf9ce061b5c38566839aa361f780e96018b3cbd130f00407fa04050803108703fa0405080410de02fa0405080510c001fa0405081d109501fa040408161073fa0405080e10af01fa0402081580050a9005e907"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
            
    def skin2(self, id):
        ent_packet = f"050000025c08{id}100520542acf0408a5f1a5c90310{id}1ac00408{id}120b2b2b2b2b464f582b2b2b2b1a024d4520f9db8dc50628023087cbd1303832421880a89763f089e361f680e960b185a661a5cfd064c9fb8766480150ad0258e80792010a0107090a0b12191a201d9801ad02c00101d001a1fd89af03e80101880204920208c205ae2dba109215aa0208080110e43218807daa0208080f10e43218807daa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710904eaa0205082310e432aa0205082b10b06daa0205084a10b06daa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910d836aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810904eaa0205082910e432aa0205085910e432c2022712031a01001a0508501201631a060851120265661a0f0848120b0104050607f1a802f4a8022200ea0204100118018a030208019203009803fab8cdb80ba20312e385a4e385a4434f444558e385a4424f5453e203024f52ea0300f203008004649004029a040a08f9db8dc50620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0400da040608{id}e00401ea042508a5f1a5c90312188cf6d064cf85d164bf9ce061b5c385669abfa5619dcae86018b3cbd130f00406fa04050803108703fa0405080410de02fa0405080510c001fa0405081d109501fa040408161073fa0405080e10af01fa0402081580050a9005e907"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
    def skin3(self, id):
        ent_packet = f"050000025c08{id}100520542acf0408a5f1a5c90310{id}1ac00408{id}120b2b2b2b2b464f582b2b2b2b1a024d4520f9db8dc50628023087cbd1303832421880a89763f089e361f680e960b185a661a5cfd064c9fb8766480150ad0258e80792010a0107090a0b12191a201d9801ad02c00101d001a1fd89af03e80101880204920208c205ae2dba109215aa0208080110e43218807daa0208080f10e43218807daa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710904eaa0205082310e432aa0205082b10b06daa0205084a10b06daa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910d836aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810904eaa0205082910e432aa0205085910e432c2022712031a01001a0508501201631a060851120265661a0f0848120b0104050607f1a802f4a8022200ea0204100118018a030208019203009803fab8cdb80ba20312e385a4e385a4434f444558e385a4424f5453e203024f52ea0300f203008004649004029a040a08f9db8dc50620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0400da040608{id}e00401ea042508a5f1a5c9031218b5c38566d0fda561c8e1e860d7bace64c9ded064929be06118b3cbd130f00408fa04050803108703fa0405080410de02fa0405080510c001fa0405081d109501fa040408161073fa0405080e10af01fa0402081580050a9005e907"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")

    def skin4(self, id):
        ent_packet = f"050000025a08{id}100520502acd0408a5f1a5c90310{id}1abe0408{id}120b2b2b2b2b464f582b2b2b2b1a024d452099d98dc50628023087cbd1303832421880a89763f089e361f680e960b185a661a5cfd064c9fb876650ad0258e80792010a0107090a0b12191a201d9801ad02c00101d001a1fd89af03e80101880204920208c205ae2dba109215aa0208080110e43218807daa0208080f10e43218807daa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710904eaa0205082310e432aa0205082b10b06daa0205084a10b06daa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910d836aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810904eaa0205082910e432aa0205085910e432c2022712031a01001a0f0848120b0104050607f1a802f4a8021a0508501201631a060851120265662200ea0204100118018a030208019203009803fab8cdb80ba20312e385a4e385a4434f444558e385a4424f5453e203024f52ea0300f203008004649004029a040a0899d98dc50620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0400da040608{id}e00401ea042508a5f1a5c9031218929be061b5c38566d0fda561e0e1e860899dd1648bf6d06418b3cbd130f00409fa04050803108703fa0405080410de02fa0405080510c001fa0405081d109501fa040408161073fa0405080e10af01fa0402081580050a9005e907"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")   
            
    def skin5(self, id):
        ent_packet = f"050000022e08{id}100520502aa10408{id}10{id}1a920408{id}120c75776a736a736a736e646a641a024d4520c6befec40628023087cbd13038324218c09ae06180a89763c091e660c0b5ce6480c385668096a361480150ad0258e80792010a0107090a0b12191a201d9801ad02c00101e80101880204920208c205ae2dba109215aa0208080110e43218807daa0208080f10e43218807daa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710904eaa0205082310e432aa0205082b10b06daa0205084a10b06daa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910d836aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810904eaa0205082910e432aa0205085910e432c2022712031a01001a0f0848120b0104050607f1a802f4a8021a0508501201631a060851120265662200ea0204100118018a03020801920300ea0300f203008004649004029a040a08b6befec40620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0400da040608{id}e00401ea042508{id}1218b597a361909ce660c0b5ce6480a89763929be061b5c3856618b3cbd130f00408fa04050803108703fa0405080410de02fa0405080510c001fa0405081d109501fa040408161073fa0405080e10af01fa04020815"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
                                          
    def skin6(self, id):
        ent_packet = f"050000025c08{id}100520542acf0408a5f1a5c90310{id}1ac00408{id}120b2b2b2b2b464f582b2b2b2b1a024d4520f9db8dc50628023087cbd1303832421880a89763f089e361f680e960b185a661a5cfd064c9fb8766480150ad0258e80792010a0107090a0b12191a201d9801ad02c00101d001a1fd89af03e80101880204920208c205ae2dba109215aa0208080110e43218807daa0208080f10e43218807daa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710904eaa0205082310e432aa0205082b10b06daa0205084a10b06daa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910d836aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810904eaa0205082910e432aa0205085910e432c2022712031a01001a0508501201631a060851120265661a0f0848120b0104050607f1a802f4a8022200ea0204100118018a030208019203009803fab8cdb80ba20312e385a4e385a4434f444558e385a4424f5453e203024f52ea0300f203008004649004029a040a08f9db8dc50620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0400da040608{id}e00401ea042508a5f1a5c9031218b5c38566d0fda561c8e1e860d0b5ce64c9ded064929be06118b3cbd130f00408fa04050803108703fa0405080410de02fa0405080510c001fa0405081d109501fa040408161073fa0405080e10af01fa0402081580050a9005e907"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
    def skin7(self, id):
        ent_packet = f"050000023708{id}100520502aaa0408{id}10{id}1a9b0408{id}120c75776a736a736a736e646a641a024d4520a0c0fec40628023087cbd13038324218c09ae06180a89763c091e660c0b5ce6480c385668096a361480150ad0258e80792010a0107090a0b12191a201d9801ad02c00101e80101880204920208c205ae2dba109215aa0208080110e43218807daa0208080f10e43218807daa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710904eaa0205082310e432aa0205082b10b06daa0205084a10b06daa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910d836aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810904eaa0205082910e432aa0205085910e432c2022712031a01001a0f0848120b0104050607f1a802f4a8021a0508501201631a060851120265662200ea0204100118018a03020801920300e203024f52ea0300f203008004649004029a040a08a0c0fec40620014001a00465aa040408011001aa040408011003aa0407080f1d0000803fba0400ca0400da040608{id}e00401ea042908{id}121c909ce660c0b5ce6480a89763929be061b5c38566ddd9e860b597a36118b3cbd130f00407fa04050803108703fa0405080410de02fa0405080510c001fa0405081d109501fa040408161073fa0405080e10af01fa04020815"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")

    def zix_dens17(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}109184bbb1032a0c08{id}189184bbb10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
                        
    def zix_dens16(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}109afbb8b1032a0c08{id}189afbb8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
    def zix_dens15(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10e193bbb1032a0c08{id}18e193bbb10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")


    def zix_dens14(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}108bfbb8b1032a0c08{id}188bfbb8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
            
    def zix_dens13(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}1095fbb8b1032a0c08{id}1895fbb8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
    def zix_dens12(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10d9fab8b1032a0c08{id}18d9fab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")

    def zix_dens11(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10d5fab8b1032a0c08{id}18d5fab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")   
            
    def zix_dens10(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10d0fab8b1032a0c08{id}18d0fab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
                                          
    def zix_dens9(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10f4fab8b1032a0c08{id}18f4fab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
    def zix_dens8(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10fffab8b1032a0c08{id}18fffab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")  
            
    def zix_dens1(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10f0fab8b1032a0c08{id}18f0fab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
            
    def zix_dens2(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10d4fab8b1032a0c08{id}18d4fab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
    def zix_dens3(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10cbfab8b1032a0c08{id}18cbfab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")

    def zix_dens4(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10cefab8b1032a0c08{id}18cefab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")   
            
    def zix_dens5(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10ccfab8b1032a0c08{id}18ccfab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
                                          
    def zix_dens6(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}10c6fab8b1032a0c08{id}18c6fab8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")
            
    def zix_dens7(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}1091fbb8b1032a0c08{id}1891fbb8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")  

    def zix_dens18(self, id):
        ent_packet = f"050000002c08{id}100520162a2008{id}109afbb8b1032a0c08{id}189afbb8b10330b7d7bc8206"
        if self.s5:
            self.s5.send(bytes.fromhex(ent_packet))
        else: 
            print("[!] s5 not assigned.")


    def gt(self, id):
        ep = f"050000020808{id}1005203f2afb0308{id}12024d451801200332f40108{id}12394947203d3e20406d65726f2e616e746962616e202c2040745f715f685f69202c204067706c782e616e746962616e31202c2040372e392e785f1a024d4520abbabccc0628023087cbd1303832420dc0b5ce64f680e960da98a36100480150ad0258e80782011808d1daf1eb04180120d187d4f0042a0808c79d85f304100392010202009801ad02c00101d001a1fd89af03e80101fa010808021010180f2861880204920200c2020612021a002200ea0204100118018a0300920300e20300ea0300f203008004619004029a040a08abbabccc0620014001a00465ba0400ca0400da040608{id}f0040a3a00400150016801721e313737303938363739353836353034323630395f6439756b6b7377766568880180c0f7b0bee7a7881ca20100a80101b001c902ea010449444331f2016d08{id}10c8f0dacb081a475b625d5b635d5b4646303030305d4947203d3e20406d65726f2e616e746962616e202c2040745f715f685f69202c204067706c782e616e746962616e31202c2040372e392e785f2084db8dae0328a3babccc06302b380b4204100118014801fa011e313737303938363739353836353034363037325f3335397568776b6573678a021e313737303938363739353836353034383335305f613133667036386e3364"
        if self.s5:
            self.s5.send(bytes.fromhex(ep))
   
    def send_lag_loop(self, packet, remote, user_id):
        start_time = time.time()
        duration = 60
        sent_count = 0
        
        start_msg = """[00FF00]يجب عليك ضغط على زر الاستعداد او الغاء في الفريق بدا تعليق الفريق
        
ملاحظة يجب عليك ان تكون عضو ليس قائد للفريق[00FF00]"""
        threading.Thread(target=self.sH, args=(user_id, start_msg)).start()
        
        try:
            while time.time() - start_time < duration:
                try:
                    remote.send(packet)
                    sent_count += 1
                    time.sleep(0.001)
                except Exception as e:
                    break
            
            elapsed = time.time() - start_time
            finish_msg = f"[00FF00]تم التعليق الفريق بنجاح تم إرسال {sent_count} حزمة في {elapsed:.1f} ثانية[00FF00]"
            threading.Thread(target=self.sH, args=(user_id, finish_msg)).start()
            
        finally:
            with self.lag_lock:
                self.lag_active = False

    def hC(self, conn):
        ver, n_m = conn.recv(2)
        mths = self.gA(n_m, conn)
        if 2 not in set(mths):
            conn.close()
            return
        conn.sendall(bytes([V, 2]))
        if not self.vC(conn):
            return
        ver, cmd, _, a_t = conn.recv(4)
        if a_t == 1:
            addr = socket.inet_ntoa(conn.recv(4))
        elif a_t == 3:
            d_len = conn.recv(1)[0]
            addr = conn.recv(d_len)
            addr = socket.gethostbyname(addr)
        port = int.from_bytes(conn.recv(2), 'big', signed=False)
        try:
            if cmd == 1:
                rem = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                rem.connect((addr, port))
                b_a = rem.getsockname()
            else:
                conn.close()
                return
            ad = int.from_bytes(socket.inet_aton(b_a[0]), 'big', signed=False)
            port = b_a[1]
            rep = b''.join([
                V.to_bytes(1, 'big'),
                int(0).to_bytes(1, 'big'),
                int(0).to_bytes(1, 'big'),
                int(1).to_bytes(1, 'big'),
                ad.to_bytes(4, 'big'),
                port.to_bytes(2, 'big')
            ])
        except Exception as e:
            rep = self.h(a_t, 5)
        conn.sendall(rep)
        if rep[1] == 0 and cmd == 1:
            self.eL(conn, rem)
        conn.close()

    def eL(self, cl, rem):
        global inviteD
        while True:
            r, w, e = select.select([cl, rem], [], [])

            if cl in r:
                dC = cl.recv(4096)

                if '0515' in dC.hex()[0:4] and len(dC.hex()) == 44:
                    with self.lag_lock:
                        self.lag_0515_packet = dC
                        self.lag_remote = rem

                if '0515' in dC.hex()[0:4] and len(dC.hex()) < 50:
                    self.p2 = dC
                    self.rt = rem

                if '0315' in dC.hex()[0:4] and len(dC.hex()) == 1334:
                    with self.lvl_lock:
                        self.lvl_start_packet = dC
                        self.lvl_remote = rem
                        print(f"[LVL] Start packet captured! Length: {len(dC.hex())}")
                

                if '0315' in dC.hex()[0:4] and len(dC.hex()) == 22:
                    with self.lvl_lock:
                        self.lvl_cancel_packet = dC
                        self.lvl_remote = rem
                        print(f"[LVL] Cancel packet captured! Length: {len(dC.hex())}")

                    
                if '0515' in dC.hex()[0:4] and len(dC.hex()) >= 141:
                    self.p1 = dC
                    self.rt = rem

                if "39699" in str(rem):
                    self.op = dC
                if "39801" in str(rem):
                    self.xz = rem

                if '0515' in dC.hex()[0:4] and len(dC.hex()) >= 820 and inviteD == True:
                    for i in range(10):
                        for _ in range(15):
                            rem.send(dC)
                            time.sleep(0.04)
                            time.sleep(0.2)

                if rem.send(dC) <= 0:
                    break
            if rem in r:
                dt = rem.recv(4096)    
                
                if '0500' in dt.hex()[:4]:
                    self.s5 = cl
                if '1200' in dt.hex()[:4]:
                    self.s12 = cl
                    

                if dt.hex().startswith("0500000") and len(dt) >= 600:
                    id = dt.hex()[12:22]
                    c_m = "[C][B][FF0000]WelcomE To BoT E404 Follow Me 4 New TG => @meropvp , @XiZYELFl , @STEVE11542 , @MC_8G\n IG => @mero.antiban , @t_q_h_i , @gplx.antiban1 , @7.9.X_\n To See Cmd /help"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()   
                    threading.Thread(target=self.xp, args=(id,)).start()      
                    threading.Thread(target=self.st, args=(id,)).start()         
                    threading.Thread(target=self.d1).start()
                    threading.Thread(target=self.d2).start()
                    threading.Thread(target=self.d3).start()
                    threading.Thread(target=self.gt, args=(id,)).start()
                    
                if '1200' in dt.hex()[0:4] and b'/6s' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.q6, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE ChangE sQ To 6"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()   

                if '1200' in dt.hex()[0:4] and b'/5s' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.q5, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE ChangE sQ To 5"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:4] and b'/spyrom' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.spy_room, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE ChangE spy To room"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()                    
                    
                if '1200' in dt.hex()[0:4] and b'/3s' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.s3, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE ChangE sQ To 3"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()

                if '1200' in dt.hex()[0:4] and b'/gt' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.gt, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE GhOSt"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()                                        
                                                                                
                if '1200' in dt.hex()[0:4] and b'/pc' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.pc, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE pC"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()                    

                if '1200' in dt.hex()[0:4] and b'/dm' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.dm, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT Diamond"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()

                if '1200' in dt.hex()[0:4] and b'/gd' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.gd, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT Gold"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()

                if '1200' in dt.hex()[0:4] and b'/lag' in dt:
                    try:
                        id = dt.hex()[12:22]
                        
                        with self.lag_lock:
                            if self.lag_0515_packet is not None and self.lag_remote is not None and not self.lag_active:
                                self.lag_active = True
                                captured_packet = self.lag_0515_packet
                                target_remote = self.lag_remote
                                threading.Thread(target=self.send_lag_loop, args=(captured_packet, target_remote, id)).start()
                            elif self.lag_active:
                                stop_msg = "[FFA500]الامر قيد تشغيل[FFA500]"
                                threading.Thread(target=self.sH, args=(id, stop_msg)).start()
                            else:
                                error_msg = "[FF0000]يجب الدخول لفريق أولاً قبل استخدام هذا الأمر[FF0000]"
                                threading.Thread(target=self.sH, args=(id, error_msg)).start()
                            
                    except Exception as e:
                        pass

                if '1200' in dt.hex()[0:4] and b'/lvl' in dt:
                    try:
                        u_id = dt.hex()[12:22]
                        threading.Thread(target=self.send_lvl_loop, args=(u_id,)).start()
                    except Exception as e:
                        print(f"[LVL] Error: {e}")
                

                if '1200' in dt.hex()[0:4] and b'/stoplvl' in dt:
                    try:
                        u_id = dt.hex()[12:22]
                        with self.lvl_lock:
                            self.lvl_active = False
                        threading.Thread(target=self.sH, args=(u_id, "[FF0000]تم إيقاف أمر /lvl")).start()
                    except Exception as e:
                        pass

                if '1200' in dt.hex()[0:6] and b'/stop' in dt:
                    try:
                        id = dt.hex()[12:22]
                        
                        with self.lag_lock:
                            if self.lag_0515_packet is not None and self.lag_remote is not None and not self.lag_active:
                                self.lag_active = True
                                captured_packet = self.lag_0515_packet
                                target_remote = self.lag_remote
                                threading.Thread(target=self.send_lag_loop, args=(captured_packet, target_remote, id)).start()
                            elif self.lag_active:
                                stop_msg = "[FFA500]SPY..."
                                threading.Thread(target=self.sH, args=(id, stop_msg)).start()
                            else:
                                error_msg = "[FF0000]يجب الدخول لفريق أولاً قبل استخدام هذا الأمر[FF0000]"
                                threading.Thread(target=self.sH, args=(id, error_msg)).start()
                            
                    except Exception as e:
                        pass


                if '1200' in dt.hex()[0:5] and b'/y10' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.y10, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT 10y"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:5] and b'/spy' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.spy, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT spy"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()                    
                    
                    
                if '1200' in dt.hex()[0:5] and b'/y9' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.y9, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT 9y"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()                    

                if '1200' in dt.hex()[0:5] and b'/proxy' in dt:
                    try:
                        items_ids = ['c1b5ce64', 'c2b5ce64', 'e99cc9d202', 'd19be660', 'd29be660', 'd39be660', '82fbc6d202', '83fbc6d202', '84fbc6d202', '85fbc6d202', '86fbc6d202', '87fbc6d202', '88fbc6d202', '89fbc6d202', '8afbc6d202', '8bfbc6d202', '8cfbc6d202']
                        for ids in items_ids:
                            self.s5.send(bytes.fromhex(f"080000003108d8bfb4db3a1008180020062a230a2108{ids}1002180020ffffffffffffffffff01280130003801400048005000080000001808d8bfb4db3a1008180020022a0a08cec2f10510cffee529"))
                            time.sleep(0.2)
                    except Exception as e:
                        print(f"[!] Error in @proxy: {e}")





                if '1200' in dt.hex()[0:5] and b'/y8' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.y8, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT 8y"
                    threading.Thread(target=self.sH, args=(id, c_m)).start() 

                if '1200' in dt.hex()[0:5] and b'/y7' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.y7, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT 7y"
                    threading.Thread(target=self.sH, args=(id, c_m)).start() 

                if '1200' in dt.hex()[0:5] and b'/yt' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.send_yout_list).start()
                    c_m = "[C][B][00FF00]DonE Youtybr"
                    threading.Thread(target=self.sH, args=(id, c_m)).start() 

                if '1200' in dt.hex()[0:4] and b'/fr' in dt:
                    id = dt.hex()[12:22]
                    c_m = "[C][B][00FF00]DonE Add FrienD"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    try:
                        i = str(dt).split('/fr')[1]
                        if '***' in i:
                            i = i.replace('***', '106')
                        x = str(i).split('(\\x')[0]
                        x = self.zx2(x)
                        if x:
                            self.ff(self.s5, x)
                    except Exception as e:
                        pass

                if '1200' in dt.hex()[0:5] and b'/y6' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.y6, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT 6y"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()  
                if '1200' in dt.hex()[0:6] and b'/skin1' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.skin1, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT skin"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/skin2' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.skin2, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT skin"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/skin3' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.skin3, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT skin"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/skin4' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.skin4, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT skin"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/skin5' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.skin5, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT skin"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/skin6' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.skin6, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT skin"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/skin7' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.skin7, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT skin"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    

                if '1200' in dt.hex()[0:6] and b'/dens1' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens1, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens2' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens2, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens3' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens3, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens4' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens4, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens5' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens5, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens6' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens6, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens7' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens7, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens8' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens8, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:6] and b'/dens9' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens9, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens10' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens10, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens11' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens11, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens12' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens12, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens13' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens13, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens14' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens14, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens15' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens15, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens16' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens16, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens17' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens17, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()
                    
                if '1200' in dt.hex()[0:7] and b'/dens18' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.zix_dens18, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT dens"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()             
                    
                if '1200' in dt.hex()[0:7] and b'/v' in dt:
                    id = dt.hex()[12:22]
                    threading.Thread(target=self.v, args=(id,)).start()
                    c_m = "[C][B][00FF00]DonE SenT v youtuber on squad"
                    threading.Thread(target=self.sH, args=(id, c_m)).start()                                  

                if '1200' in dt.hex()[0:4] and b'/skins' in dt:
                    try:
                        u_id = dt.hex()[12:22]
                        hlp = """[b][c][FFFFFF]Uniform list in squad
[FF3C3C][b][c]
/skin1
/skin2
/skin3
/skin4
/skin5
/skin6
/skin7"""
                        threading.Thread(target=self.sH, args=(u_id, hlp)).start()
                    except Exception as e:
                        pass

                if '1200' in dt.hex()[0:4] and b'/dances' in dt:
                    try:
                        u_id = dt.hex()[12:22]
                        hlp = """[FFFFFF][b][c]Promotion list
[FF3C3C][b][c]
/dance1
/dance2
/dance3
/dance4
/dance5
/dance6
/dance7
/dance8
/dance9
/dance10
/dance11
/dance12
/dance13
/dance14
/dance15
/dance16
/dance17
/dance18"""
                        threading.Thread(target=self.sH, args=(u_id, hlp)).start()
                    except Exception as e:
                        pass         
                                                                
                if '1200' in dt.hex()[0:4] and b'/help' in dt:
                    try:
                        u_id = dt.hex()[12:22]
                        hlp = """[b][c][FF7B00]Welcome Bot Free Fire
[00FFD5][b][c]━━━━━━━━━━━━━━━━━━━━━━ 
[00FF6A][b][c]Commands
[00FFD5][b][c]Switch team mode
[00FF6A][b][c] Squad 3 --->[b][681ed6]  /3s
[00FF6A][b][c] Squad 5 --->[b][681ed6]  /5s
[00FF6A][b][c] Squad 6 --->[b][681ed6]  /6s

[00FF6A][b][c] Switch to PC mode
[FF3C3C][b][c]/pc

[FFFFFF][b][c] Get Diamond and Gold
[FF3C3C][b][c]/dm

[FFFFFF][b][c] v in Squad
[FF3C3C][b][c]/v 

[FFFFFF][b][c] Spy in Squad 
[FF3C3C][b][c]/spy

[FFFFFF][b][c] Spy in room 
[FF3C3C][b][c]/spyrom

[FFFFFF][b][c] stop Spy in Squad or room
[FF3C3C][b][c]/stop

[FFFFFF][b][c] spam squad
[FF3C3C][b][c]/inv

[FFFFFF][b][c] Get Youtuber
[FF3C3C][b][c]/yt

[FFFFFF][b][c] Get Ghost
[FF3C3C][b][c]/ghost

[FFFFFF][b][c] Fake friend
[FF3C3C][b][c]/fr 123456xx

[FFFFFF][b][c] Lag Squad
[FF3C3C][b][c]/lag

[FFFFFF][b][c] proxy vip
[FF3C3C][b][c]/proxy

[FFFFFF][b][c] Uniform list
[FF3C3C][b][c]/skins

[FFFFFF][b][c] Promotion list
[FF3C3C][b][c]/dances

[FFFFFF][b][c]Years badges
[FF3C3C][b][c]/y6 ,/y7 ,/y8 ,/y9 ,/y10
[00FFD5][b][c]━━━━━━━━━━━━━━━━━━━━━━"""
                        threading.Thread(target=self.sH, args=(u_id, hlp)).start()
                    except Exception as e:
                        pass

                if cl.send(dt) <= 0:
                    break

    def h(self, a_t, e_n):
        return b''.join([
            V.to_bytes(1, 'big'),
            e_n.to_bytes(1, 'big'),
            int(0).to_bytes(1, 'big'),
            a_t.to_bytes(1, 'big'),
            int(0).to_bytes(4, 'big'),
            int(0).to_bytes(4, 'big')
        ])

    def vC(self, conn):
        ver = conn.recv(1)[0]
        u_len = conn.recv(1)[0]
        usr = conn.recv(u_len).decode('utf-8')
        p_len = conn.recv(1)[0]
        pwd = conn.recv(p_len).decode('utf-8')

        if usr == self.u and pwd == self.p:
            resp = bytes([ver, 0])
            conn.sendall(resp)
            return True
        else:
            resp = bytes([ver, 0])
            conn.sendall(resp)
            return True

    def gA(self, n_m, conn):
        mths = []
        for _ in range(n_m):
            mths.append(conn.recv(1)[0])
        return mths

    def rn(self, ip, port):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((ip, port))
        s.listen()
        print(f"* Socks5 proxy server is running on {ip}:{port}")

        while True:
            conn, addr = s.accept()
            t = threading.Thread(target=self.hC, args=(conn,))
            t.start()

def st():
    Px().rn('127.0.0.1', 3000)

st()`;

        return res.status(200).json({
            s:1,
            c:encrypt(BOT_CODE),
            h:crypto.createHash('sha256').update(BOT_CODE).digest('hex'),
            e:now+300000
        });
    } catch(e) {
        return res.status(500).json({s:0,m:'err'});
    }
}