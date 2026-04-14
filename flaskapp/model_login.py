from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3 
import jwt
from flask import current_app, request
from datetime import datetime, timezone, timedelta
import functools
 
def users_add(firstname, lastname, username, level, password):
    hashed_password = generate_password_hash(password)
    id = get_users_id()
    query = """
        INSERT INTO users(id, firstname, lastname, username, level, password_hash)
        VALUES(?, ?, ?, ?, ?, ?);
    """
    db = sqlite3.connect("dat/company.db")
    cur = db.cursor()
    cur.execute(query,[id, firstname, lastname, username, level, hashed_password])

    db.commit()
    db.close()

def check_login(username, password):
    row = get_users_row(username)
    if row and check_password_hash(row[5], password):
        return {"id": row[0], "firstname": row[1], "lastname": row[2], "username": row[3], "level": row[4]}
    else:
        return None

def create_token(user):
    token_payload={
        'user': user,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=30)
    }
    user["exp"] = token_payload["exp"].timestamp()
    return jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')
def read_token():
    token = request.headers.get('Authorization')
    if not token: 
        return None
    try:
        token = token.split(" ")[1] #remove the "Bearer ..." prefix
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if "user" not in payload: 
            raise Exception("err_login_notoken")
        return payload["user"]
    except jwt.ExpiredSignatureError: 
        raise Exception("err_login_expired")
    except jwt.InvalidTokenError: 
        raise Exception("err_login_invalid")

def access_required(level): 
    def decorator(f):  ## this f is the function being wrapped
        @functools.wraps(f) # this preserves the function being wrapped metadata
        def decorated_function(*args, **kwargs):
            try: 
                user = read_token()
            except Exception as e: 
                return str(e)
            if not user: 
                return "err_login_required"
            if user["level"] < level: 
                return "err_access_denied"
            return f(*args, **kwargs) # here we are returning the wrapped function
        return decorated_function 
    return decorator

## helper functions

def get_users_row(username):
    query = """
        SELECT * FROM users 
        WHERE username = ?
        LIMIT 1;
    """
    with sqlite3.connect("dat/company.db") as conn:
        cur = conn.cursor()
        cur.execute(query,[username])
        row = cur.fetchone()
        return row

def get_users_id():
    query = """
        SELECT id FROM users 
        ORDER BY id
        DESC 
        LIMIT 1;
    """
    with sqlite3.connect("dat/company.db") as conn:
        cur = conn.cursor()
        cur.execute(query)
        id = cur.fetchone()
        if id == None:
            return 1 # table empty 
        else:
            return id[0] + 1
        
##################### part 7 ########################
def update_user(id, field, value):
    if field == "password_hash":
        value = generate_password_hash(value)
    query = f"UPDATE users SET {field}=? WHERE id= ?;"
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[value, id])
        db.commit()

def check_level(level):
    try: 
        user = read_token()
    except Exception as e: 
        return False
    return True if int(user["level"]) >= level else False

def check_username(username):
    try: 
        user = read_token()
    except Exception as e: 
        return False
    return True if user["username"] == username else False

def check_id(id):
    try: 
        user = read_token()
    except Exception as e: 
        return False
    if user["level"] > 2:
        return True
    return True if user["id"] == id else False


def check_password(password):
    try: 
        user = read_token()
    except Exception as e: 
        return False
    row = get_users_row(user["username"])
    if row and check_password_hash(row[5], password):
        return True
    else:
        return False

def delete_user(id):
    query = f"DELETE FROM users WHERE id=?;"
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[id])
        db.commit()