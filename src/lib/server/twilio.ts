import {
	SECRET_TWILIO_ACCOUNT_SID,
	SECRET_TWILIO_AUTH_TOKEN,
	SECRET_TWILIO_PHONE_NUMBER
} from '$env/static/private';

const accountSid = SECRET_TWILIO_ACCOUNT_SID;
const authToken = SECRET_TWILIO_AUTH_TOKEN;

export const text = (To = '', Body = '') =>
	fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({ From: SECRET_TWILIO_PHONE_NUMBER, To, Body })
	});
