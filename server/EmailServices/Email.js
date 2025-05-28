const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jamesiukalu@gmail.com',
        pass: process.env.EMAIL_PASS
    }

    
})

const sendEmail = async (to, subject, body) =>{
    let emailOptions = {
        to,
        from: 'jamesiukalu@gmail.com',
        subject,
        html: body
    }

    await new Promise ((resolve, reject)=>{
        transporter.sendMail(emailOptions, (err, res) =>{
            if(err){
                console.log(err);
                reject(err)
            }
            else{
                console.log(res)
                resolve(res)
            }
        })
    })


} 

module.exports = sendEmail