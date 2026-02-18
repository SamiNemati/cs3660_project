from flask import Flask, send_file, url_for, render_template, redirect
from model import get_navLinks, get_professionals, get_services, data_backup, data_restore

app = Flask(__name__)
application = app
app.jinja_env.globals["nav"] = get_navLinks()

@app.route("/")
def welcome():
    return redirect(url_for("home"))

@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/professionals")
def func_professionals():
    return render_template("professionals.html", professionals= get_professionals())

@app.route("/services")
def func_services():
    return render_template("services.html", services = get_services())

@app.route("/contact")
def contact():
    return render_template("contact.html")





@app.route("/data_backup")
def backup():
    message = "Success!"
    try: 
        data_backup() 
    except: 
        message = "Database Error!"
    return render_template("admin.html", message = message)

@app.route("/data_restore")
def restore():
    message = "Success!"
    try: 
        data_restore() 
    except: 
        message = "Database Error!"
    return render_template("admin.html", message = message)

@app.route("/admin")
def admin():
    return render_template("admin.html", message="")






@app.route("/common/index.css")
def css():
    return send_file("static/index.css")

@app.route("/images/<filename>")
def image(filename):
    return send_file(f"static/images/{filename}")

if __name__ == "__main__":
    app.run(debug=True)
