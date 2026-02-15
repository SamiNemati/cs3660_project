import json
def get_navLinks():
    with open("dat/nav.dat") as f: 
        return json.load(f)
def get_professionals():
    with open("dat/professionals.dat") as f: 
        return json.load(f)
def get_services():
    with open("dat/services.dat") as f: 
        return json.load(f)