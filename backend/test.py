# import pymysql
# import sqlalchemy
from google.cloud.sql.connector import connector
import flask
from flask import Flask,render_template,request,send_from_directory
import json
import sqlite3
import requests
app = Flask(__name__)

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
    app.run(host='127.0.0.1', port=9898, threaded=True, debug=False)