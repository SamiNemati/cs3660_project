from flask import Flask, redirect, render_template, url_for
app = Flask(__name__) 
nav = [
    {"name":"Home","link":"."},
    {"name":"About","link":"about"},
    {"name":"Contact","link":"contact"}
]

@app.route("/") 
def index(): 
    return redirect(url_for("home"))

@app.route("/home")
def home(): 
    return render_template("home.html", nav=nav)

@app.route("/about") 
def about(): 
    return render_template("about.html", nav=nav)

@app.route("/contact") 
def contact(): 
    return render_template("contact.html", nav=nav, batphone=True)

if __name__ == "__main__": 
    app.run(debug=True)
