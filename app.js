const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {2bBnSBs3jWWl6deWeeGRlY/hwrKmid+DCmyVQZFvPzF8SnK+cTl8ICFTfwid5zUeSv55oLr+6HUIc6VzcWD3SKY8MCOYqSXWX8nZmUPa9PHrmG7xatUxlTWfn+mAK6rMMTmz/PY9JMY4ANUIeZkiIAdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: 'Hello'
            },
            {
                type: 'text',
                text: 'How are you?'
            },
            {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "separator",
                        "color": "#C3C3C3"
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "margin": "lg",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Merchant",
                                "align": "start",
                                "color": "#C3C3C3"
                            },
                            {
                                "type": "text",
                                "text": "BTS 01",
                                "align": "end",
                                "color": "#000000"
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "margin": "lg",
                        "contents": [
                            {
                                "type": "text",
                                "text": "New balance",
                                "color": "#C3C3C3"
                            },
                            {
                                "type": "text",
                                "text": "฿ 45.57",
                                "align": "end"
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "lg",
                        "color": "#C3C3C3"
                    }
                ]
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