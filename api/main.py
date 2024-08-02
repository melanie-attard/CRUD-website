from flask import Flask, jsonify 
  
# creating a Flask app 
app = Flask(__name__) 

# GET endpoint
@app.route("/", methods=['GET'])
def getData():
    return None

# POST endpoint

# PUT endpoint

# DELETE endpoint

if __name__ == '__main__': 
  
    app.run(debug = True) 