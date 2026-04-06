from flask import Flask, request, send_file, url_for, render_template, redirect
from model_main import get_navLinks, get_professionals, get_services, data_backup, data_restore, allowedFile, professionals_add, services_add, services_add_category
from model_login import check_login, create_token, read_token, users_add, access_required
import sqlite3
from flask_cors import CORS
from flask import jsonify


app = Flask(__name__)
app.config["SECRET_KEY"] = "SECRETSECRETKEYOFKEYS#999!"
CORS(app)

application = app
app.jinja_env.globals["nav"] = get_navLinks()


@app.route("/register", methods=["POST"])
def func_register():
    firstname = request.form.get("firstname")
    lastname = request.form.get("lastname")
    username = request.form.get("username")
    password = request.form.get("password")
    level = 1
    message = ""
    try:
        users_add(firstname, lastname, username, level, password)
        message = "ok"
    except:
        message = "err_db"
    return message

@app.route("/login", methods=["POST"])
def func_login():
    username = request.form.get("username")
    password = request.form.get("password")
    user = check_login(username, password)
    if not user: 
        return "err_login_failed"
    user["token"] = create_token(user)
    user["ok"] = "true"
    return jsonify(user)



@app.route("/professionals")
def func_professionals():
    professionals = get_professionals()
    return jsonify(professionals)

@app.route("/services")
def func_services():
    services = get_services()
    return jsonify(services)

@app.route("/professionals_add", methods=["POST"])
@access_required(2)
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

@app.route("/services_add", methods=["POST"])
@access_required(2)
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
@access_required(2)
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

@app.route("/data_backup")
@access_required(3)
def backup():
    message = ""
    try: 
        message = data_backup() 
    except: 
        message = "err_db"
    return message

@app.route("/data_restore")
@access_required(3)
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
