require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

function sendProfilePictureUploadEmail(to = 'taha.shakeel@venturedive.com', success = true) {
  const msg = {
    to: to,
    from: 'test@example.com',
    subject: 'Profile picture uploaded Sucessfully',
    text: 'Your profile picture was successfully uploaded'
  };
  if(!success) {
    msg.subject = 'Profile picture upload failed';
    msg.text = 'Your profile picture was failed to upload';
  }
  sgMail.send(msg);
}

module.exports.sendProfilePictureUploadEmail = sendProfilePictureUploadEmail;