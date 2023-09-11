const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
var Mailgen = require('mailgen');
const fs = require("fs");
const path = require("path");
const e = require("cors");

const sendEmail = async (email, subject, payload) => {
    try {
        let test = nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'ProMaster@gmail.com',
                pass: 'qiukqijwxypfqiua'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("ready for message");
                console.log(success);
            }
        })
        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "PlanIt",
                link: 'https://mailgen.js/'
            }
        });
        let response
        if (payload.link == null) {
            response = {
                body: {
                    name: payload.InstName,
                    intro: subject,
                    outro: payload.Message,
                }
            }
        }
        else {
            response = {
                body: {
                    name: payload.InstName,
                    intro: subject,
                    outro: payload.Message,
                    action: {
                        instructions: 'To get started with Mailgen, please click here:',
                        button: {
                            color: '#22BC66', // Optional action button color
                            text: 'Create your account',
                            link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                        }
                    },
                }
            }
        }

        let mail = MailGenerator.generate(response)
        console.log(email);
        const options = () => {
            return {
                // from: process.env.FROM_EMAIL,
                from: "workstyle2103@gmail.com",
                to: email,
                subject: subject,
                html: mail,
            };
        };

        // Send email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                console.log(error);
                return error;
            } else {
                console.log("info");

            }
        });
    } catch (error) {
        return error;
    }
};

module.exports = { sendEmail };