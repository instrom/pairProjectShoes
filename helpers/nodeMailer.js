var nodemailer = require("nodemailer");
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "tommysutjipto96@gmail.com",
        pass: "Sumtingwong123"
    }
});

module.exports = smtpTransport