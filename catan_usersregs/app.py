from flask import Flask,render_template
from dbhelper import *

app = Flask(__name__)

@app.route("/")
def index()->None:
    users:list = getall_record('users')
    return render_template("index.html",users=users,pagetitle='Users List')
    
if __name__=="__main__":
    app.run(debug=True,host="0.0.0.0")