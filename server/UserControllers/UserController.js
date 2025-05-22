const UserModel = require('../Models/UserModel')
const sendEmail = require('../EmailServices/Email')


const register = async (req, res) => {
    
    try {
        const isUserExisting = await UserModel.findOne({email: req.body.email})

        if (isUserExisting){
            console.log("User already exists")
            return res.status(400).json({message: `You have registered already`})
        }
        const date = new Date();
        const dayOfMonth = date.getDate()
        const hour = date.getHours()

        let RegNum = `${req.body.email[1]}-${dayOfMonth}${req.body.FirstName[0]}-${hour}${req.body.LastName[1]}`

        const  newUser = new UserModel({
        email: req.body.email,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        RegNum: RegNum.toUpperCase()
    })
    await newUser.save()
    const emailBody =`<p>Thank you for your interest in Tech O'Clock upcoming event. Your Registration Number is: ${RegNum.toLocaleUpperCase()}</p>`
    const subject = `Tech O'Clock 2025 CONFERENCE`
    
    
    await sendEmail(req.body.email, subject, emailBody)

    res.json("User Registered Succesfully!")
    console.log(newUser)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}
 
module.exports = register;