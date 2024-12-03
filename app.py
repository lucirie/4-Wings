from flask import Flask, render_template, redirect
from cs50 import SQL

app = Flask(__name__)

@app.route("/")
def fullscreen_prompt():
    return render_template('fullscreen.html')

@app.route("/interval")
def interval():
    return render_template('interval.html')

@app.route("/home")
def home():
    return render_template('home.html')

@app.route("/innovation")
def innovation():
    return render_template('innovation.html')

