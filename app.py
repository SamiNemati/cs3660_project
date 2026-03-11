from flask import Flask, request, send_file, url_for, render_template, redirect
from model import get_navLinks, get_professionals, get_services, data_backup, data_restore, allowedFile, professionals_add, services_add, services_add_category
import sqlite3

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




@app.route("/admin")
def admin():
    return render_template("admin.html", message="")

@app.route("/professionals_add", methods=["GET"])
def func_professionals_load():
    return render_template("professionals_add.html", message="", professionals=get_professionals())
@app.route("/professionals_add", methods=["POST"])
def func_professionals_add():
    name = request.form.get("name")
    image_file = request.files["image_file"] if "image_file" in request.files else None
    message = ""
    if not all([name, image_file]): message="err_missing"
    elif not allowedFile(image_file): message="err_filetype"
    else: 
        try:
            professionals_add(name, image_file)
            message = "ok"
        except Exception as e:
            message = str(e)
    return message

@app.route("/services_add", methods=["GET"])
def func_service_add():
    return render_template("services_add.html", message="", services=get_services())
@app.route("/services_add", methods=["POST"])
def service_add():
    name = request.form.get("name")
    id = request.form.get("id")
    message = ""
    if not name: message="err_missing"
    else: 
        try: 
            services_add(id, name)
            message = "ok"
        except sqlite3.IntegrityError:
            message = "Bad category id error."
    return message

@app.route("/services_add_category", methods=["POST"])
def func_services_add_category():
    name = request.form.get("name")
    image_file = request.files["image_file"] if "image_file" in request.files else None
    message = ""
    if not all([name, image_file]): message="err_missing"
    elif not allowedFile(image_file): message="err_filetype"
    else:
        try:
            services_add_category(name, image_file)
            message = "ok"
        except Exception as e:
            message = str(e)
            
    return message

@app.route("/professionals_refresh")
def professionals_refresh():
    return render_template("professionals_list.html", message="", professionals=get_professionals())

@app.route("/services_refresh")
def services_refresh():
    return render_template("services_list.html", showForm = True, services=get_services())


@app.route("/data_backup")
def backup():
    message = ""
    try: 
        message = data_backup() 
    except: 
        message = "err_db"
    return message

@app.route("/data_restore")
def restore():
    message = ""
    try: 
        message = data_restore() 
    except: 
        message = "err_db"
    return message 


@app.route("/images/<filename>")
def image(filename):
    return send_file(f"static/images/{filename}")

if __name__ == "__main__":
    app.run(debug=True)
