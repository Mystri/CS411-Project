# import pymysql
# import sqlalchemy
from google.cloud.sql.connector import connector
import flask
from flask import Flask,render_template,request,send_from_directory
import json
import sqlite3
import requests
import sys
from datetime import datetime
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

@app.route("/search_movie",methods=["POST", "GET"])
def search_movie():
    lan_sql_sent = ""
    typ_sql_sent = ""
    key_sql_sent = ""
    data = request.get_json(force=True)
    for tags in data:
        if tags == "language":
            for tag, state in data[tags].items():
                if state:
                    if lan_sql_sent:
                        lan_sql_sent += " UNION "
                    lan_sql_sent += "(SELECT title from movie where language = '{}')".format(tag)
        if tags == "type":
            for tag, state in data[tags].items():
                if state:
                    if typ_sql_sent:
                        typ_sql_sent += " UNION "
                    typ_sql_sent += "(SELECT title from movie where type = '{}')".format(tag)
        if tags == "keyword":
            key_sql_sent = "(SELECT title from movie where title LIKE '%{}%')".format(data[tags])
    print(lan_sql_sent, typ_sql_sent, key_sql_sent)

    
    # cursor.execute((lan_sql_sent + typ_sql_sent + key_sql_sent))

    # # Fetch the results
    # result = cursor.fetchall()

    # result = [i[0] for i in result]

    return {'rec': 0}

@app.route("/advanced_search_movie/", methods=['POST'])
def advanced_search_movie(tag):
    data = request.get_json(force=True)
    # The type of data {'request_query':[
    # {
    #  'language':xxx,
    #  'max_runtime': xxx,
    #  'type':xxx
    # }]}


    cursor.execute("SELECT title from movie where tag='{}'".format(tag))

    # Fetch the results
    result = cursor.fetchall()

    result = [i[0] for i in result]

    return {'rec':result}

@app.route("/register", methods=["POST"])
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
    
    cursor.execute("SELECT email, username, password, gender, birthday from user where email='{}' and password='{}'".format(email,data['password']))

    result = cursor.fetchall()

    if len(result) == 0:
        return {"rec": 0}
    else:
        result = result[0]
        return {"rec": {"email":result[0], 'username':result[1], "password":result[2], "gender":result[3], "birthday":datetime.strftime(result[4],'%Y-%m-%d')}}



@app.route("/update_user", methods=["POST", "GET"])
def update_user():

    data = request.get_json(force=True)
    email = data['email']

    cursor.execute(
        "UPDATE user SET username='{}', password='{}', gender='{}', birthday='{}' where email='{}'".format(
            data['username'], data['password'], data['gender'], data['birthday'], email))
    conn.commit()

    cursor.execute("SELECT count(*) from user where email='{}'".format(email))

    count = cursor.fetchall()[0][0]

    if count > 0:
        return {"rec": 0}
    else:
        return {"rec": 1}

    # return {"rec": count}


@app.route("/delete_user", methods=["POST"])
def delete_user():

    data = request.get_json(force=True)
    email = data['email']

    cursor.execute("DELETE FROM user WHERE email='{}'".format(email))
    conn.commit()

    cursor.execute("SELECT count(*) from user where email='{}'".format(email))

    count = cursor.fetchall()[0][0]

    if count > 0:
        return {"rec": 0}
    else:
        return {"rec": 1}

    # return {"rec": count}


# @app.route("/delete_list", methods=["POST", "GET"])
# def delete_list():

#     data = request.get_json(force=True)
#     name = data['name']

#     cursor.execute("DELETE FROM List WHERE name='{}'".format(name))
#     conn.commit()

#     cursor.execute("SELECT count(*) from List where name='{}'".format(name))

#     count = cursor.fetchall()[0][0]

#     return {"rec": count}
    
@app.route("/top_5_actor", methods=["GET"])
def top_5_actor():
    cursor.execute("SELECT People.name FROM movie INNER JOIN mp on movie.movie_id=mp.tconst INNER JOIN People ON People.peopleid=mp.nconst GROUP BY People.peopleid ORDER BY COUNT(movie.movie_id) LIMIT 5")
    result = cursor.fetchall()

    result = [i[0] for i in result]

    return {'rec':result}

if __name__ == '__main__':
    app.run(port=8000, debug=True)
