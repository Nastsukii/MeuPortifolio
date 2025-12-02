const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name, email, and message are required.' }),
    };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'comiranbueno0@gmail.com', // Replace with your recipient email
    from: 'comiranbueno0@gmail.com', // Replace with your verified SendGrid sender
    subject: `New message from ${name} (${email})`,
    text: message,
    html: `<strong>Name:</strong> ${name}<br/>
           <strong>Email:</strong> ${email}<br/>
           <strong>Message:</strong> ${message}`,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email.' }),
    };
  }
};
