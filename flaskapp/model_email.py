import os
import smtplib
from email.message import EmailMessage
from flask import render_template 

email_to = "11039618@uvu.edu"

def contact_email(subject, message):
    username = os.environ.get("USER") 
    
    email_from = f"{username}@host71.registrar-servers.com"
    email_message = render_template("contact_email.html",
                                        subject=subject,
                                        message=message
                                    )
    msg=EmailMessage()
    msg.set_content(email_message, subtype="html")
    msg["Subject"] = subject
    msg["From"] = email_from
    msg["To"] = email_to
    try:
        s = smtplib.SMTP('localhost')
        s.send_message(msg)
        s.quit()
        return "ok"
    except Exception as e:
        #print(e)
        return str(e)
