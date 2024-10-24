'''
    database helper
'''
    
from mysql.connector import connect

def dbconnect()->object:
    return connect(
        host='127.0.0.1',
        user='root',
        password='',
        database='myuser'
    )
    
def getprocess(sql:str)->list:
    db:object = dbconnect()
    cursor:object = db.cursor(dictionary=True)
    cursor.execute(sql)
    data:list = cursor.fetchall()
    cursor.close()
    return data
    
def getall_record(table:str)->list:
    sql:str = f"SELECT * FROM `{table}`"
    return getprocess(sql)