const nodemailer = require("nodemailer");
const transportador = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a130ebb9e33731",
        pass: "278f89589dce92"
    }
});



module.exports = transportador;