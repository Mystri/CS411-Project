# import pymysql
# import sqlalchemy
from google.cloud.sql.connector import connector
import flask
from flask import Flask,render_template,request,send_from_directory
import json
import sqlite3
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
conn = connector.connect(
    "festive-planet-281310:us-central1:cs411",
    "pymysql",
    user="root",
    password='Xu440987',
    db="cs411",
)
cursor = conn.cursor()


@app.route("/photo_url", methods=['GET'])
def photo_url():
    
    cursor.execute("SELECT photo from People LIMIT 20")

    # Fetch the results
    result = cursor.fetchall()

    result = [i[0] for i in result]

    return {'rec':result}

@app.route("/search_movie/<string:name>", methods=['GET'])
def search_movie(name):
    
    cursor.execute("SELECT title from movie where title LIKE '%{}%'".format(name))

    # Fetch the results
    result = cursor.fetchall()

    result = [i[0] for i in result]

    return {'rec':result}

if __name__ == '__main__':
    app.run(port=8000, debug=True)

# import flask
# from flask import request  #获取参数
# from flask_cors import CORS



# server = flask.Flask(__name__) #创建一个flask对象
# CORS(server)
# @server.route('/login', methods=['get','post'])
# def login():
#     username = request.values.get('username') #获取参数
#     password = request.values.get('password')
#     if username and password:
#         #sql = 'select User from user where User="%s"'%username
#         #data = conn_mysql(sql)     
#             return '{msg:"无数据"}'


# server.run(port=8000,debug=True)