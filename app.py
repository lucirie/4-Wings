from flask import Flask, render_template, redirect, request, jsonify
from cs50 import SQL
import markdown
import os
import openai
import json
import requests


app = Flask(__name__)

# Load the configuration file
with open('config.json', 'r') as file:
    config = json.load(file)

# Get the API key
api_key = config['OPEN_AI_KEY']
openai.api_key = api_key

def generate_text(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Chat model
            messages=[
                {"role": "system", "content": "Reply with optimism! Directly answer the question, and give examples for resources to use. immediatly answer the question, without saying anything at the start."},
                {"role": "user", "content": prompt}
            ],
        )
        # Convert the response to Markdown
        raw_text = response.choices[0].message["content"].strip()
        # Convert Markdown to HTML
        formatted_text = markdown.markdown(raw_text)
        return formatted_text
    except Exception as e:
        # Return the error message as a string
        return f"Error: {str(e)}"


@app.route('/api/openai', methods=['POST'])
def openai_proxy():
    data = request.json
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'response': 'Invalid prompt provided.'}), 400

    try:
        node_response = requests.post('http://localhost:5001/api/openai', json={'prompt': prompt})
        node_response.raise_for_status()
        return jsonify({'response': node_response.json().get('response', 'No response provided.')})
    except requests.RequestException as e:
        return jsonify({'response': f'Error connecting to Node.js server: {str(e)}'}), 500
    
    
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
        howlongprompt = 'How long would it take for me to achieve my wish with 2 hours of work a day? Answer in 50 words and give a clear answer. My wish is ' + wish
        roadmapprompt = 'Give me a step by step roadmap for me to achieve my wish with 2 hours of work a day. my wish is ' + wish
        howcani = generate_text(howcaniprompt)
        howlong = generate_text(howlongprompt)
        roadmap = generate_text(roadmapprompt)
        return render_template('wished.html', howcani=howcani, howlong=howlong, roadmap=roadmap)

@app.route('/yourturn')
def yourturn():
    return render_template('yourturn.html')
