from datetime import datetime
import json 
import sqlite3
import os
def get_navLinks():
    with open("dat/nav.dat") as f: 
        return json.load(f)

ALLOWED_FILETYPES = ["jpg", "jpeg", "gif", "png"]
def allowedFile(file): 
    return getExt(file.filename) in ALLOWED_FILETYPES
 
def get_professionals():
    with sqlite3.connect("dat/company.db") as conn:
        conn.row_factory = sqlite3.Row 
        cur = conn.cursor()
        cur.execute("SELECT id,name, image_ext FROM professionals")
        rows = [dict(row) for row in cur.fetchall()]
        return rows

def get_services():
    with sqlite3.connect("dat/company.db") as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        # order by - ensure all services with same category are together
        # so the for loop below doesn't miss any added services that is seperated
        cur.execute("SELECT c.id, c.name, s.id as serviceid, s.servicename, c.image_ext FROM categories AS c LEFT JOIN services AS s ON s.categoryid = c.id ORDER BY c.name")
        rows = [dict(row) for row in cur.fetchall()]
        Service = {
        "id": 0,
        "name": ""
        }

        # changing rows to nested rows
        newRows = []
        category = rows[0].get("name")
        services = []
        image_ext = rows[0].get("image_ext")
        id = rows[0].get("id")
        for item in rows:
                if item.get("name") == category and item.get("image_ext") == image_ext:
                    if item.get('servicename') is not None:
                        service = { "id": item.get('serviceid'),
                                "name": item.get('servicename')
                        }
                        services.append(service)
                else:
                    newRows.append({"id": id, "name": category, "services": services, "image_ext": image_ext})
                    category = item.get("name")
                    image_ext = item.get("image_ext")
                    id = item.get("id")
                    services = []
                    if item.get('servicename') is not None:
                        service = { "id": item.get('serviceid'),
                                "name": item.get('servicename')
                        }
                        services.append(service)
        newRows.append({"id": id, "name": category, "services": services, "image_ext": image_ext}) # for the last list
        return newRows

def data_backup():
    try:

        source = sqlite3.connect("dat/company.db")
        dest = sqlite3.connect("dat/backup.db")
        source.backup(dest)
        source.close()
        dest.close()
        return "ok"
    except:
        return "err_db"
def data_restore():
    try:
        source = sqlite3.connect("dat/backup.db")
        dest = sqlite3.connect("dat/company.db")
        source.backup(dest)
        source.close()
        dest.close()
        return "ok"
    except:
        return "err_db"
    
def professionals_add(name, image_file):
    image_filename = image_file.filename
    ext = getExt(image_filename)
    query = """
        INSERT INTO 
        professionals(name, image_ext)
        VALUES (?, ?)
    """
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[name,ext])
        id = cur.lastrowid
        if not save_image(image_file, "professional", id, ext, "professionals"):
            raise "err_file"
        db.commit()
        return id

def services_add_category(name, image_file):
    image_filename = image_file.filename
    ext = getExt(image_filename)
    query = """
        INSERT INTO 
        categories(name, image_ext) 
        VALUES (?,?)
    """
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[name, ext])
        id = cur.lastrowid
        if not save_image(image_file, "service", id, ext, "services"):
            raise "err_file"
        db.commit()
        return id 
    
def services_add(categoryid, servicename):
    query = """
        INSERT INTO
        services(categoryid, servicename)
        VALUES(?, ?)
    """
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[categoryid, servicename])
        db.commit()

def getExt(filename):
    return filename.rsplit(".", 1)[1]
def save_image(file, prefix, id, image_ext, dir):
    try: file.save(f"static/images/{dir}/{prefix}{id}.{image_ext}")
    except: return 0
    return 1


############### part 7 #####################

def get_users():
    with sqlite3.connect("dat/company.db") as conn:
        conn.row_factory = sqlite3.Row 
        cur = conn.cursor()
        cur.execute("SELECT id, firstname, lastname, username, level FROM users;")
        rows = [dict(row) for row in cur.fetchall()]
        return rows
def get_user(id):
    query = f"SELECT id, firstname, lastname, username, level FROM users WHERE id=?;";
    with sqlite3.connect("dat/company.db") as conn:
        conn.row_factory = sqlite3.Row 
        cur = conn.cursor()
        cur.execute(query, [id])
        rows = [dict(row) for row in cur.fetchall()]
        return rows

def update_field(table, id, name, value):
    query = f"UPDATE {table} SET {name}=? WHERE id=?;"
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[ value, id])
        db.commit()
    return True
 
def update_image(dir, prefix, table, id, image_file):
    filename = image_file.filename
    ext = getExt(filename)
    if not save_image(image_file, prefix, id, ext, dir): return False
    query = f"UPDATE {table} SET image_ext=? WHERE id= ?;"
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[ext, id])
        db.commit()
        return True
 
def delete_row(dir, table, id):
    if dir != None:
        try: 
            ext = getext_fromdb(table, id)
            if not delete_image(id, "professional", ext, dir): 
                return False
        except: 
            return False
    query = f"DELETE FROM {table} WHERE id=?;"
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[id])
        db.commit()
        return True
    
def delete_category_rows(table, id):
    query = f"DELETE FROM {table} WHERE categoryid=?;"
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[id])
        db.commit()
        return True

def getext_fromdb(table, id):
    query = f"SELECT image_ext FROM {table} WHERE id=?"
    with sqlite3.connect("dat/company.db") as db:
        db.row_factory = sqlite3.Row
        cur = db.cursor()
        cur.execute(query,[id])
        rows = [dict(row) for row in cur.fetchall()]
        return rows[0]["image_ext"]

def delete_image(id, prefix, suffix, dir): 
    filename = f"static/images/{dir}/{prefix}{id}.{suffix}"
    if not os.path.exists(filename): 
        return 1
    try: 
        os.remove(filename)
    except: 
        return 0
    return 1

################## part 8 #######################

def get_users_namesonly():
    with sqlite3.connect("dat/company.db") as conn:
        conn.row_factory = sqlite3.Row 
        cur = conn.cursor()
        cur.execute("SELECT id, firstname, lastname FROM users;")
        rows = [dict(row) for row in cur.fetchall()]
        return rows
    
def get_transactions(userid, limitstart):
    query = f"SELECT id, ttype, date, amount, memo, paymenttype, paymentnumber, COUNT(*) OVER() AS transactioncount from transactions WHERE userid=? ORDER BY date DESC LIMIT 5 OFFSET {limitstart};"
    with sqlite3.connect("dat/company.db") as conn:
        conn.row_factory = sqlite3.Row 
        cur = conn.cursor()
        cur.execute(query, [userid])
        rows = [dict(row) for row in cur.fetchall()]
        return rows
    
def get_balance(userid):
    query = f"SELECT SUM(amount) FROM transactions WHERE userid={userid};"
    with sqlite3.connect("dat/company.db") as conn:
        conn.row_factory = sqlite3.Row 
        cur = conn.cursor()
        cur.execute(query)
        balance = cur.fetchone()[0]
        return balance

def transactions_add(userid, ttype, amount, memo, paymenttype, paymentnumber):
    date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    query = """
            INSERT INTO transactions(userid, ttype, date, amount, memo, paymenttype, paymentnumber)
            VALUES(?, ?, ?, ?, ?, ?, ?)
            """
    with sqlite3.connect("dat/company.db") as db:
        cur = db.cursor()
        cur.execute(query,[userid, ttype, date, amount, memo, paymenttype, paymentnumber])
        db.commit()

