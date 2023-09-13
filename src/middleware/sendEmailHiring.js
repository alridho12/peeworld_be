const nodemailer = require('nodemailer');

module.exports = async (company_name, recruiter_email, worker_email, worker_name, offering, description, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: 'Peworld App',
      to: worker_email,
      subject: subject,
      html: `<div style="background-color: #FBF7F5; display:flex;">
      <img src="https://cdn.discordapp.com/attachments/1118733891738554480/1147721385767080047/Screenshot_119-removebg-preview.png" style="width: 200px;height: 100%;"/>
    </div>
    <div style="padding:20px">
      <p>
        Dear ${worker_name}
      </p>
      <p>
        We are delighted to offer you the position of ${offering} at ${company_name}. Your qualifications and experience have impressed us, and we believe you would be a valuable addition to our team.
      </p>
      <p>
        Position: ${offering}
      </p>
    <p>
        Description: ${description}
      </p>
      <p>
        Please let us know if you have any questions or need further information, feel free to reach out to our recruiter at ${recruiter_email}.
      </p>
      <p>
        We look forward to your positive response and the possibility of you joining our team.
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
        ${company_name}
      </p>
    </div>
`,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};