# import pymysql
# import sqlalchemy
from google.cloud.sql.connector import connector
import flask
from flask import Flask,render_template,request,send_from_directory
import json
import sqlite3
import requests
import sys
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

@app.route("/advanced_search_movie/<string:tag>", methods=['GET'])
def advanced_search_movie(tag):
    
    cursor.execute("SELECT title from movie where tag='{}'".format(tag))

    # Fetch the results
    result = cursor.fetchall()

    result = [i[0] for i in result]

    return {'rec':result}

@app.route("/register", methods=["POST", "GET"])
def register():

    data = request.get_json(force=True)
    email = data['email']
    
    cursor.execute("SELECT count(*) from user where email='{}'".format(email))

    count = cursor.fetchall()[0][0]

    if count > 0:
        return {"rec": 0}
    else:
        cursor.execute("INSERT INTO user VALUES ('{}','{}','{}','{}','{}','')".format(data['username'],email,data['password'],data['gender'], data['birthday']))
        conn.commit()
        return {"rec": 1}


@app.route("/login", methods=["POST"])
def login():

    data = request.get_json(force=True)
    email = data['email']
    
    cursor.execute("SELECT count(*) from user where email='{}'".format(email))

    count = cursor.fetchall()[0][0]

    return {"rec": count}


@app.route("/update_user", methods=["POST", "GET"])
def update_user():

    data = request.get_json(force=True)
    email = data['email']

    cursor.execute(
        "UPDATE user SET username='{}', password='{}', gender='{}', date_of_birth='{}' where email='{}'".format(
            data['username'], data['password'], data['gender'], data['date_of_birth'], email))
    conn.commit()

    cursor.execute("SELECT count(*) from user where email='{}'".format(email))

    count = cursor.fetchall()[0][0]

    if count > 0:
        return {"rec": 0}
    else:
        return {"rec": 1}

    # return {"rec": count}


@app.route("/delete_user", methods=["POST", "GET"])
def delete_user():

    data = request.get_json(force=True)
    name = data['name']

    cursor.execute("DELETE FROM user WHERE name='{}'".format(name))
    conn.commit()

    cursor.execute("SELECT count(*) from user where name='{}'".format(name))

    count = cursor.fetchall()[0][0]

    if count > 0:
        return {"rec": 1}
    else:
        return {"rec": 0}

    # return {"rec": count}


@app.route("/delete_list", methods=["POST", "GET"])
def delete_list():

    data = request.get_json(force=True)
    name = data['name']

    cursor.execute("DELETE FROM List WHERE name='{}'".format(name))
    conn.commit()

    cursor.execute("SELECT count(*) from List where name='{}'".format(name))

    count = cursor.fetchall()[0][0]

    return {"rec": count}
    

if __name__ == '__main__':
    app.run(port=8000, debug=True)
