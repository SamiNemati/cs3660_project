import json
import sqlite3
def get_navLinks():
    with open("dat/nav.dat") as f: 
        return json.load(f)

ALLOWED_FILETYPES = ["jpg", "jpeg", "gif", "png"]
def allowedFile(file): 
    return getExt(file.filename) in ALLOWED_FILETYPES

def get_professionals():
    conn = sqlite3.connect("dat/company.db")
    conn.row_factory = sqlite3.Row 
    cur = conn.cursor()
    cur.execute("SELECT id,name, image_ext FROM professionals")
    rows = [dict(row) for row in cur.fetchall()]
    return rows

def get_services():
    conn = sqlite3.connect("dat/company.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    # order by - ensure all services with same category are together
    # so the for loop below doesn't miss any added services that is seperated
    cur.execute("SELECT c.id, c.name, s.servicename, c.image_ext FROM categories AS c LEFT JOIN services AS s ON s.categoryid = c.id ORDER BY c.name")
    rows = [dict(row) for row in cur.fetchall()]

    # changing rows to nested rows
    newRows = []
    category = rows[0].get("name")
    services = []
    image_ext = rows[0].get("image_ext")
    id = rows[0].get("id")
    for item in rows:
            if item.get("name") == category and item.get("image_ext") == image_ext:
                if item.get('servicename') is not None:
                    services.append({"name": item.get("servicename")})
            else:
                newRows.append({"id": id, "name": category, "services": services, "image_ext": image_ext})
                category = item.get("name")
                image_ext = item.get("image_ext")
                id = item.get("id")
                services = []
                if item.get('servicename') is not None:
                    services.append({"name": item.get("servicename")})
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
    db = sqlite3.connect("dat/company.db")
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
    db = sqlite3.connect("dat/company.db")
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
    db = sqlite3.connect("dat/company.db")
    cur = db.cursor()
    cur.execute(query,[categoryid, servicename])
    db.commit()


def getExt(filename):
    return filename.rsplit(".", 1)[1]
def save_image(file, prefix, id, image_ext, dir):
    try: file.save(f"static/images/{dir}/{prefix}{id}.{image_ext}")
    except: return 0
    return 1