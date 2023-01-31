import nodemailer from 'nodemailer';
import logger from '../logger/logger.js';

export const signupMail = async (req, res) => {
    
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {user: process.env.ADM_MAIL_USER, pass: process.env.ADM_MAIL_PASS}
    })
    console.log(`${process.env.ADM_MAIL_USER} ${process.env.ADM_MAIL_PASS}`);
    let message = {
        from: "coderclass",
        to: process.env.ADM_MAIL_USER,
        subject: "Nuevo registro",
        html: `<b>${JSON.stringify(req.body)}</b>`
    }

    transporter.sendMail(message)
        .then(info => {
            logger.info(`message ${message}`);
        })
        .catch(err => logger.error(`err ${err}`));
   
}

export const shoppingMail = async (products, userName) => {
    
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {user: process.env.ADM_MAIL_USER, pass: process.env.ADM_MAIL_PASS}
    })
    
    let message = {
        from: "coderclass",
        to: process.env.ADM_MAIL_USER,
        subject: `Nuevo pedido de ${userName}` ,
        html: `<b>${JSON.stringify(products)}</b>`
    }

    transporter.sendMail(message)
        .then(info => {
            logger.info(`message ${message}`);
        })
        .catch(err => logger.error(`err ${err}`));
   
}
