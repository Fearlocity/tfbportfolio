
require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/projects', (req, res) => res.render('projects'));
app.get('/contact', (req, res) => res.render('contact'));

// Handle contact form POST
app.post('/contact', async (req, res) => {
	const { name, email, message } = req.body;
	try {
		// Configure your transporter (for demo, using ethereal)
		let transporter = nodemailer.createTransport({
			service: 'yahoo',
			auth: {
				user: process.env.YAHOO_USER,
				pass: process.env.YAHOO_PASS
			}
		});

		let mailOptions = {
			from: 'tbryant3614@yahoo.com',
			to: 'tbryant3614@yahoo.com',
			subject: `Portfolio Contact Form: ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`
		};

		await transporter.sendMail(mailOptions);
		res.render('contact', { success: true });
	} catch (err) {
		console.error(err);
		res.render('contact', { error: true });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
