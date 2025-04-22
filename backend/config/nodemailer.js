import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth:{
        user:'8ace15001@smtp-brevo.com',
        pass:'MGSyxjdRVn6LDq1J',
    }
});

export default transporter;