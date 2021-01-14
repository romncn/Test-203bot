const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
   
    if(msg === "rom"){
       push(req)
    } else if(msg === "login") {
        replyLogin(reply_token, msg)
    } else {
        reply(reply_token, msg)
    }
    res.sendStatus(200)
})
app.listen(port);

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {2bBnSBs3jWWl6deWeeGRlY/hwrKmid+DCmyVQZFvPzF8SnK+cTl8ICFTfwid5zUeSv55oLr+6HUIc6VzcWD3SKY8MCOYqSXWX8nZmUPa9PHrmG7xatUxlTWfn+mAK6rMMTmz/PY9JMY4ANUIeZkiIAdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: msg
            },
            {
                type: "flex",
                altText: "Flex Message",
                contents: {
                    type: "bubble",
                    body: {
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                align: "center",
                                weight: "bold",
                                text: "สวัสดีฮับ"
                            }
                        ],
                        type: "box"
                    },
                    direction: "ltr",
                    footer: {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                action: {
                                    label: "เปิดเว็บ",
                                    type: "uri",
                                    uri: "https://liff.line.me/1655576450-r2YQgdEJ"
                                },
                                type: "button",
                                color: "#187bcd",
                                height: "sm",
                                margin: "xs",
                                style: "primary"
                            }
                        ]
                    }
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
function replyLogin(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {2bBnSBs3jWWl6deWeeGRlY/hwrKmid+DCmyVQZFvPzF8SnK+cTl8ICFTfwid5zUeSv55oLr+6HUIc6VzcWD3SKY8MCOYqSXWX8nZmUPa9PHrmG7xatUxlTWfn+mAK6rMMTmz/PY9JMY4ANUIeZkiIAdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: msg
            },
            {
                type: "flex",
                altText: "Flex Message",
                contents: {
                    type: "bubble",
                    body: {
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                align: "center",
                                weight: "bold",
                                text: "ต้องการเข้าสู่ระบบหรือไม่?"
                            }
                        ],
                        type: "box"
                    },
                    direction: "ltr",
                    footer: {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                action: {
                                    label: "LOGIN",
                                    type: "uri",
                                    uri: "https://liff.line.me/1655576450-pygXx8V6"
                                },
                                type: "button",
                                color: "#187bcd",
                                height: "sm",
                                margin: "xs",
                                style: "primary"
                            }
                        ]
                    }
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
function push(req) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {2bBnSBs3jWWl6deWeeGRlY/hwrKmid+DCmyVQZFvPzF8SnK+cTl8ICFTfwid5zUeSv55oLr+6HUIc6VzcWD3SKY8MCOYqSXWX8nZmUPa9PHrmG7xatUxlTWfn+mAK6rMMTmz/PY9JMY4ANUIeZkiIAdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        to: "Ufc39dbdef409aab576dd55ecf52ea391",
        messages: [
            {
                type: "text",
                text: 'Hi'
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
} 