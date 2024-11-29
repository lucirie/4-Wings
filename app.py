from flask import Flask, render_template, redirect
from cs50 import SQL

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/innovation")
def innovation():
    return render_template('innovation.html')

