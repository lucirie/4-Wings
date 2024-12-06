from flask import Flask, render_template, redirect, request
from cs50 import SQL

app = Flask(__name__)


@app.route("/")
def interval():
    return render_template('interval.html', page_class='interval')

@app.route("/home")
def home():
    return render_template('home.html', page_class='main')

@app.route("/innovation")
def innovation():
    return render_template('innovation.html')

