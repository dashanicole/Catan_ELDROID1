from flask import Flask,render_template,request,flash,redirect
from sqlite3 import connect,Row

app = Flask(__name__)
app.secret_key="!@#$%"

def getprocess(sql:str)->list:
    db:object = connect('users.db')
    cursor:object = db.cursor()
    cursor.row_factory = Row
    cursor.execute(sql)
    data:list = cursor.fetchall()
    cursor.close()
    return data
    
@app.route("/userlist")
def userlist()->None:
    sql:str = f"SELECT * FROM `users`"
    data:list = getprocess(sql)
    return render_template("userlist.html",userlist=data)

@app.route("/uservalidate",methods=['POST'])
def uservalidate()->None:
    username:str = request.form['username']
    password:str = request.form['password']
    
    sql:str = f"SELECT * FROM `users` WHERE `username`= '{username}' AND `password`='{password}'"
    data:list = getprocess(sql)
    if len(data)>0:
        flash("Login Success")
        return redirect("/userlist")
    else:
        flash("Login Failed")
        return redirect("/")
    
    
@app.route("/")
def index()->None:
    return render_template("login.html")
    
if __name__=="__main__":
    app.run(debug=True)