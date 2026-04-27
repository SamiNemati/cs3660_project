from flask import Flask, request, send_file
from model_main import get_navLinks, get_professionals, get_services, data_backup, data_restore, allowedFile, professionals_add, services_add, services_add_category, update_field, update_image, delete_row, delete_category_rows, get_users, get_user, get_users_namesonly, get_transactions, get_balance, transactions_add
from model_login import check_login, create_token, read_token, users_add, access_required, update_user, check_level, check_password, check_username, delete_user, check_id
from model_pay import pay_order, pay_capture, fakepay_token
import sqlite3
from flask_cors import CORS
from flask import jsonify
from model_email import contact_email
 
app = Flask(__name__)
app.config["SECRET_KEY"] = "SECRETSECRETKEYOFKEYS#999!!!!??????"
CORS(app)

application = app
app.jinja_env.globals["nav"] = get_navLinks()

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


@app.route("/professionals")
def func_professionals():
    professionals = get_professionals()
    return jsonify(professionals)


################## part 7 #############

@app.route("/professionals", methods=["POST"])
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

@app.route("/professional/<int:id>/name", methods=["PATCH"])
@access_required(2)
def func_professional_field(id):
    name = request.form.get("value")
    message = ""
    table = "professionals"
    try:
        if update_field(table, id, "name", name):
            message = "ok"
    except Exception as e:
        message = str(e)
    return message

@app.route("/professional/<int:id>/image_file", methods=["PUT"])
@access_required(2)
def func_professional_image(id):
    image_file = request.files["image_file"] if "image_file" in request.files else None
    dir = "professionals"
    prefix = "professional"
    table = "professionals"
    message = ""
    if not (image_file): 
        message="err_missing"
    else: 
        try:
            if update_image(dir, prefix, table, id, image_file):
                message = "ok"
        except Exception as e:
            message = str(e)
    return message

@app.route("/professional/<int:id>", methods=["DELETE"])
@access_required(2)
def func_professional_delete(id):
    message = ""
    dir = "professionals"
    table = "professionals"
    if delete_row(dir, table, id):
        message = "ok"
    else:
        message = "err_db"
    return message


@app.route("/services")
def func_services():
    services = get_services()
    return jsonify(services)

@app.route("/services", methods=["POST"])
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

@app.route("/service/<int:id>/<field>", methods=["PATCH"])
@access_required(2)
def func_service_field(id, field): 
    value = request.form.get("name")
    message = ""
    table = "services"
    try:
        if update_field(table, id, field, value):
            message = "ok"
    except Exception as e:
        message = str(e)
    return message

@app.route("/service/<int:id>", methods=["DELETE"])
@access_required(2)
def func_service_delete(id):
    message = ""
    dir = None
    table = "services"
    if delete_row(dir, table, id):
        message = "ok"
    else:
        message = "err_db"
    return message

@app.route("/service_category/<int:id>/name", methods=["PATCH"])
@access_required(2)
def func_category_field(id):
    name = request.form.get("value")
    message = ""
    table = "categories"
    try:
        if update_field(table, id, "name", name):
            message = "ok"
    except Exception as e:
        message = str(e)
    return message

@app.route("/service_category/<int:id>/image_file", methods=["PUT"])
@access_required(2)
def func_service_image(id):
    image_file = request.files["image_file"] if "image_file" in request.files else None
    dir = "services"
    prefix = "service"
    table = "categories"
    message = ""
    if not (image_file): 
        message="err_missing"
    else: 
        try:
            if update_image(dir, prefix, table, id, image_file):
                message = "ok"
        except Exception as e:
            message = str(e)
    return message

@app.route("/service_category/<int:id>", methods=["DELETE"])
@access_required(2)
def func_category_delete(id):
    message = ""
    table = "services"
    if delete_category_rows(table, id): #delete rows
        if delete_row("services", "categories", id): # delete category
            message = "ok"
        else:
            message = "err_db"
    else:
        message = "err_db"
    return message

@app.route("/user/<int:id>", methods=["GET"])
def get_user_route(id): 
    user = get_user(id)
    return jsonify(user[0])


@app.route("/users", methods=["POST"])
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
@app.route("/user/<int:id>", methods=["DELETE"])
@access_required(3)
def user_delete_route(id):
    delete_user(id)
    return "ok"

@app.route("/user/<int:id>/password", methods=["PATCH"])
def user_password_route(id):
    if user_update_password_route(id) == "ok":
        return "ok"
    else: 
        return "err_field"

@app.route("/user/<int:id>/<field>", methods=["PATCH"])
def user_update_route(id, field):
    value = request.form.get("value")
    if field == "firstname": 
        return user_update_firstname_route(id, value)
    elif field == "lastname": 
        return user_update_lastname_route(id, value)
    elif field == "username":
        return user_update_username_route(id, value)
    elif field == "level":
        return user_update_level_route(id)
    else: 
        return "err_field"

def user_update_password_route(id):
    oldpassword = request.form.get("oldpassword")
    newpassword = request.form.get("newpassword")
    if not newpassword: return "err_missing"
    if not check_level(3):
        if not check_id(id): 
            return "err_user"
        if not check_password(oldpassword): 
            return "err_password"
    update_user(id, "password_hash", newpassword)
    return "ok"
def user_update_firstname_route(id, value):
    if not check_id(id): 
        return "err_user"
    update_user(id, "firstname", value)
    return "ok"

def user_update_lastname_route(id, value):
    if not check_id(id): 
        return "err_user"
    update_user(id, "lastname", value)
    return "ok"

def user_update_username_route(id, value):
    if not check_id(id): 
        return "err_user"
    update_user(id, "username", value)
    return "ok"

@access_required(3)
def user_update_level_route(id):
    value = request.form.get("value")
    if not value: return "err_missing"
    if int(value) < 1 or int(value) > 3: 
        return "err_level"
    update_user(id, "level", value)
    return "ok"

################# part 8 ####################
@app.route("/contact", methods=["POST"])
def contact_post():
    subject = request.form.get('subject')
    message = request.form.get('message')
    if not all([subject, message]):
        return "err_missing"
    response = ""
    response = contact_email(subject, message)
    if response == "ok":
        return "ok"
    else: 
        return response
    
@app.route("/users", methods=["GET"])
@access_required(2)
def get_users_route(): 
    if check_level(3):
        users = get_users()
    else:
        users = get_users_namesonly()
    return jsonify(users)

@app.route("/transactions/user/<int:id>", methods=["GET"])
@access_required(1)
def get_user_(id): 
    limitstart = request.args.get('limitstart', 0)
    user = get_transactions(id, limitstart)
    return jsonify(user)
    
@app.route("/transactions/user/<int:id>", methods=["POST"])
@access_required(2)
def transaction_add(id):
    ttype = request.form.get("ttype")
    amount = request.form.get("amount")
    if not all([ttype, amount]): return "err_missing"

    memo = request.form.get("memo", "")
    paymenttype = request.form.get("paymenttype", "") 
    paymentnumber = request.form.get("paymentnumber", "") 

    message = ""
    try:
        transactions_add(id, ttype, amount, memo, paymenttype, paymentnumber)
        message = "ok"
    except Exception as e:
        message = str(e)
    return message
 
@app.route("/balance/user/<int:id>", methods=["GET"])
@access_required(1)
def get_user_balance(id): 
    balance = get_balance(id)
    if not check_level(2):
        if check_id(id):
            #print(balance)
            return jsonify({"balance": balance})
        else:
            return "err_level"
    else:
        return balance


@app.route("/order/<int:userid>", methods=["POST"])
@access_required(1)
def order_route(userid):
    amount = request.form.get("amount")
    if not amount: return "err_missing"

    message = ""
    try:
        orderid = pay_order(amount)
        if orderid:
            print(orderid)
            return jsonify({"orderid": orderid})
        else:
            message = "err_order_request"
            return message
    except Exception as e:
        #print("Failed here")
        message = str(e)
    return message

@app.route("/capture/<int:userid>/<string:orderid>", methods=["POST"])
@access_required(1)
def capture_route(userid, orderid):
    amount = request.form.get("amount")
    name = request.form.get("name")
    number  = request.form.get("number")
    expiry = request.form.get("expiry")
    securitycode = request.form.get("securitycode")
    postalcode = request.form.get("postalcode")
    address_line_1 =  request.form.get("street")
    city =  request.form.get("city")
    state = request.form.get("state")
    country = "USA"
    #print(amount, name, number, expiry, securitycode, postalcode)
    if not all([amount, name, number, expiry, securitycode, postalcode]): return "err_missing"
    cardinfo = {
        "name": name,
        "number": number,
        "expiry": expiry,
        "security_code": securitycode,
        "billing_address": {
            "address_line_1": address_line_1,
            "admin_area_2": city,   
            "admin_area_1": state,  
            "postal_code": postalcode,
            "country_code": country
        }
    }

    response = pay_capture(orderid, amount, cardinfo, userid)
    if response.get("status") == "COMPLETED":
        result =  response
    else:
        result = jsonify({"success": False, "response": response})
    if not check_level(2):
        if check_id(userid):
            return result
        else:
            return "err_access"


if __name__ == "__main__":
    app.run(debug=True)
