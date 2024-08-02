from flask import Flask, jsonify, send_file
import json
  
# creating a Flask app 
app = Flask(__name__) 

# GET endpoint
@app.route("/", methods=['GET'])
def getData():
    # send the json data to the frontend
    return send_file('tv_shows.json', mimetype='application/json')

# POST endpoint

# PUT endpoint

# DELETE endpoint

if __name__ == '__main__': 
  
    app.run(debug = True) 