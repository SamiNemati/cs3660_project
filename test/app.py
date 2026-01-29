from flask import Flask, redirect
app = Flask(__name__)

@app.route("/")
def welcome():
    return redirect("/home")
@app.route("/home")
def home():
    return "Welcome to the Batcave."
@app.route("/about")
def about():
    return "Im Batman."
@app.route("/contact")
def contact():
    return """Contact me by sending the Bat Signal into the sky. It looks like this:" <BR>
            <img src="static/batSignal.jpg" width= 200 align-items: vertical>"""
if __name__ == "__main__":
    app.run(debug=True)
    