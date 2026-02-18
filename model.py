import json
import sqlite3
def get_navLinks():
    with open("dat/nav.dat") as f: 
        return json.load(f)



#def get_professionals():
 #   with open("dat/professionals.dat") as f: 
  #      return json.load(f)
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
    cur.execute("SELECT c.id, c.name, s.servicename, c.img_ext FROM categories AS c LEFT JOIN services AS s ON s.categoryid = c.id ORDER BY c.name")
    rows = [dict(row) for row in cur.fetchall()]

    # changing rows to nested rows
    newRows = []
    category = rows[0].get("name")
    services = []
    img_ext = rows[0].get("img_ext")
    id = rows[0].get("id")
    for item in rows:
            if item.get("name") == category and item.get("img_ext") == img_ext:
                services.append({"name": item.get("servicename")})
            else:
                newRows.append({"id": id, "name": category, "services": services, "img_ext": img_ext})
                category = item.get("name")
                img_ext = item.get("img_ext")
                id = item.get("id")
                services = []
                services.append({"name": item.get("servicename")})
    newRows.append({"id": id, "name": category, "services": services, "img_ext": img_ext}) # for the last list
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