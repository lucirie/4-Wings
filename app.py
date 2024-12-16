from flask import Flask, render_template, redirect, request, jsonify
from cs50 import SQL
import os
import openai

app = Flask(__name__)

openai.api_key = os.getenv('OPEN_AI_KEY')

def generate_text(prompt, max):
    try:
        response = openai.Completion.create(
            engine="gpt-3.5-turbo", # Model
            prompt=prompt,
            max_tokens=max
        )
        # Response
        return jsonify({response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/")
def interval():
    return render_template('interval.html', page_class='interval')

@app.route("/home")
def home():
    return render_template('home.html', page_class='main')

@app.route("/innovation")
def innovation():
    return render_template('innovation.html')

@app.route("/intelligence")
def intelligence():
    return render_template('intelligence.html')

@app.route("/wishes", methods=['POST', 'GET'])
def wishes():
    if request.method == 'GET':
        return render_template('wishes.html')
    elif request.method == 'POST':
        wish = request.form.get('txt')
        howcaniprompt = 'How can i achieve my wish with 2 hours of work per day? my wish is ' + wish
        howlongprompt = 'How long would it take for me to achieve my wish with 2 hours of work a day? My wish is ' + wish
        roadmapprompt = 'Give me a step by step roadmap for me to achieve my wish with 2 hours of work a day. my wish is ' + wish
        howcani = generate_text(howcaniprompt, 75)
        howlong = generate_text(howlongprompt, 75)
        roadmap = generate_text(roadmapprompt, 150)
        return render_template('wished.html', howcani=howcani, howlong=howlong, roadmap=roadmap)

@app.route('/yourturn')
def yourturn():
    return render_template('yourturn.html')
