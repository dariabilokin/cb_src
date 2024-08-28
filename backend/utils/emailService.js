const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendResetEmail = async (to, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  })
}

// const sendVerificationEmail = async (to, verificationToken) => {
//   const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`

//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to,
//     subject: 'Verify Your Email',
//     html: `
//       <p>Please click the link below to verify your email address:</p>
//       <a href="${verificationUrl}">${verificationUrl}</a>
//       <p>If you didn't create an account, please ignore this email.</p>
//     `,
//   })
// }

const sendVerificationEmail = async (to, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`

  const msg = {
    to, // Change to your recipient
    from: process.env.EMAIL_FROM, // Change to your verified sender
    subject: 'Verify Your Email',
    html: `
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>If you didn't create an account, please ignore this email.</p>
    `,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
module.exports = { sendResetEmail, sendVerificationEmail }
