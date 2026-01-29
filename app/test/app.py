from flask import Flask 
app = Flask(_name_)

@app.route("/")
def index():
    return "I'm Batman"

if __name__ == "__main__":
    app.run(debug=True)
    