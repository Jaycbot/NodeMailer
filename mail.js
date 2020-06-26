const mailer = require('nodemailer');
const { Hello } = require('./hello_template');
const { Thanks } = require('./thanks_template');
const Auth = require('./auth');
const getEmailData = (to, name, template) => {
	let data = null;

	switch (template) {
		case 'hello':
			data = {
				from: 'Jay <dang0764@gmail.com>',
				to,
				subject: `Hello ${name}`,
				html: Hello(name),
			};
			break;

		case 'thanks':
			data = {
				from: 'Jay <dang0764@gmail.com>',
				to,
				subject: `Thanks ${name}`,
				html: Thanks(name),
			};
			break;

		default:
			data;
	}
	return data;
};

const sendEmail = (to, name, type) => {
	const smtpTransport = mailer.createTransport({
		service: 'Gmail',
		auth: {
			user: Auth.user,
			pass: Auth.pass,
		},
	});

	const mail = getEmailData(to, name, type);
	smtpTransport.sendMail(mail, function (err, response) {
		if (err) {
			console.log(err);
		} else {
			console.log('email sent successfully');
		}
		smtpTransport.close();
	});
};

module.exports = { sendEmail };
