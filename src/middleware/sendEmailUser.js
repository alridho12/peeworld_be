const nodemailer = require('nodemailer');

module.exports = async (nama, email, subject, url) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // service: process.env.SMTP_SERVICE,
      // port: Number(process.env.SMTP_EMAIL_PORT),
      // secure: Boolean(process.env.SMTP_SECURE),
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL_USER,
      to: email,
      subject: subject,
      html: `<div style="background-color: #FBF7F5; display:flex;">
  <img src="https://cdn.discordapp.com/attachments/1118733891738554480/1147721385767080047/Screenshot_119-removebg-preview.png" style="width: 200px;height: 100%;"/>
</div>
<div style="padding:20px">
  <p style=" font-size:22px; font-weight:bold;">Confirm Your Register</p>
  <p>
    Dear ${nama}
  </p>
  <p>
    Thank you for registering an account with Peworld! We're excited to have you on board.

To complete your registration and activate your account, please click the following link:
  </p>
  <p>
    To complete your registration and activate your account, please click the following link:
  </p>
  <a href='${url}'>Click here</a>
  <p>
    Please ensure that you use the link within the next 24 hours to confirm your email address and gain access to your new account. If you don't verify your email within this timeframe, your registration may be incomplete.
  </p>
  <p>
    If you have trouble with the link, you can also copy and paste the URL below into your web browser's address bar:
  </p>
  <p>
  ${url}
  </p>
  <p>
    If you believe you received this email in error, or if you did not register for an account on Peworld, please disregard this message.
  </p>
  <p>
    Thank you for choosing Peworld. We look forward to serving you!
  </p>
  <p>
    Best regards,
  </p>
  <p>
    Peworld
  </p>
  <a href='https://rekrut-client.vercel.app/'>
  <p>
  Back to Peworld site.
  </p>
  </a>

</div>
`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};