'use server'

import nodemailer from "nodemailer"

const getText = ({ link = '', email = '', message = '' }) =>
`Link: ${link}

From: ${email ? email : '---'}

Message: ${message ? message : '---'}`

const sendEmail = async (body) => {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${process.env.EMAIL_USER}" <${process.env.EMAIL_USER}>`,
    to: `"${process.env.EMAIL_USER}" <${process.env.EMAIL_USER}>`,
    subject: "WebDev Town Resource Submission",
    text: getText(body),
  });

  console.log("Message sent: %s", info.messageId);

  return
}

export async function submit(formData) {
  try {
    const body = {
      link: formData.get('link'),
      email: formData.get('email'),
      message: formData.get('message')
    }
    await sendEmail(body)

    return { success: true }
  } catch (e) {
    return { success: false }
  }
}
