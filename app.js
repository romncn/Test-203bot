const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    if(msg){
        console.log('Can Chat!');
        reply(reply_token, msg)
    }
    
    // if(msg === "rom"){
    //    push(req)
    // } else {
    //     reply(reply_token, msg)
    // }
    res.sendStatus(200)
})
router.listen(port);

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
                                text: "อยากดูแบบไหนครับ?"
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
                                    label: "ดูแผนทั้งหมด",
                                    type: "uri",
                                    uri: "https://linecorp.com"
                                },
                                type: "button",
                                color: "#C25738",
                                height: "sm",
                                margin: "xs",
                                style: "primary"
                            },
                            {
                                margin: "xs",
                                color: "#C25738",
                                height: "sm",
                                style: "primary",
                                action: {
                                    data: "text",
                                    label: "ดูแผนวันนี้",
                                    type: "postback",
                                    text: "ดูแผนวันนี้"
                                },
                                type: "button"
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
// function push(req) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer {2bBnSBs3jWWl6deWeeGRlY/hwrKmid+DCmyVQZFvPzF8SnK+cTl8ICFTfwid5zUeSv55oLr+6HUIc6VzcWD3SKY8MCOYqSXWX8nZmUPa9PHrmG7xatUxlTWfn+mAK6rMMTmz/PY9JMY4ANUIeZkiIAdB04t89/1O/w1cDnyilFU=}'
//     }

//     let body = JSON.stringify({
//         to: "Uda66a8e7400b2e7fafd699f3b294ec4d",
//         messages: [
//             {
//                 type: "text",
//                 text: JSON.stringify(req.body)
//             }
//         ]
//     })

//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// } 