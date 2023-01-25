import twilio from "twilio";
import logger from '../logger/logger.js';

export const shoppingSMS = async (userPhone) => {
    const twilioClient = twilio(process.env.ACCOUNTSID,process.env.AUTHTOKEN);

    try{
        const message = await twilioClient.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: '+19136751727',
            to: userPhone
        })
        logger.info(message);
    } catch(err){
        logger.error(err);
    }
}


export const shoppingWPP = async (userName) => {
    const twilioClient = twilio(process.env.ACCOUNTSID,process.env.AUTHTOKEN);

    try{
        const message = await twilioClient.messages.create({
            body: `Nuevo pedido de ${userName}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.ADM_PHONE}`
        })
        logger.info(message.sid);
    } catch(err){
        logger.error(err);
    }
}