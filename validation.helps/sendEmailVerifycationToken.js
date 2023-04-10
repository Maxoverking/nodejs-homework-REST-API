const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
  const msg = {
    to: email, // Change to your recipient
    from: "avemax7@gmail.com", // Change to your verified sender
    subject: "Verifycation account",
    html: `<h1>Письмо для верификации!</h1>
    <button>
    <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click varify email</a>
    </button>`,
  };
  await sgMail.send(msg);
};
module.exports = { sendEmail };

// ======================= Это история

// const formData = require("form-data");
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun(formData);

// const sendEmail = async (email, verificationToken) => {
//   const emailTransport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const emailConfig = {
//     from: "From avemax7@gmail.com",
//     to: email,
//     subject: "Try ro send",
//     // text: `http://localhost:3000/api/users/verify/${verificationToken}`,
//     html: `<h1> Письмо для верификации!</h1>
//         <button>
//           <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">
//           Click varify email</a>
// </button>`,
//   };

//   await emailTransport.sendMail(emailConfig);
// };

// ========= Oтправка с помощью mailgun приходит на почту
// const sendEmail = async (email, verificationToken) => {
//   const mg = mailgun.client({
//     username: "api",
//     key: `${process.env.MAILGUN_API_KEY}`,
//   });
//   mg.messages
//     .create(`${process.env.SAND_BOX}`, {
//       from: email,
//       to: ["avemax7@gmail.com"],
//       subject: "Hello i am test message ",
//       text: "Testing some Mailgun awesomness  ",
//       html: `<h1>Письмо для верификации!</h1>
//       <button>
//         <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">
//         Click varify email</a>
//       </button>`,
//     })
//     .then((msg) => console.log(msg)) // logs response data
//     .catch((err) => console.log(err));
// };

// //==============================================

// ======== Это не работает не SendGrid не дал доступ
// const sendEmail = (email, verificationToken) => {
//   const emailTransport = nodemailer.createTransport({
//     service: "SendGrid",
//     auth: {
//       user: process.env.SENDGRID_USER_NAME,
//       pass: process.env.SENDGRID_API_KEY,
//     },
//   });

//   const emailConfig = {
//     from: `From SendGrid  ${process.env.SENDGRID_FROM}`,
//     to: email,
//     subject: "Try ro send",
//     text: `http://localhost:3000/api/users/verify/${verificationToken}`,
//   };

//   emailTransport.sendMail(emailConfig);
// };
