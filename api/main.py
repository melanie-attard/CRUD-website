from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
import json
import traceback
  
# creating a Flask app 
app = Flask(__name__) 
CORS(app)

# GET endpoint
@app.route("/", methods=['GET'])
def getData():
    # send the json data to the frontend
    return send_file('tv_shows.json', mimetype='application/json')

# POST endpoint
@app.route("/add", methods=['POST'])
def addShow():
    try:
        # load the existing data from the JSON file
        with open('api/tv_shows.json', 'r') as file:
            data = json.load(file)
        
        # get new show from request body
        newShow = request.get_json()

        if data:
            # calculate a new ID for the show by incrementing the highest id value in the list
            max_id = max(int(show['id']) for show in data)
            new_id = str(max_id + 1)
        else:
            # show list is empty
            new_id = '1'
        
        # add the new ID to the show
        newShow['id'] = new_id

        # append the new show to the list
        data.append(newShow)

        # save the updated data back to the JSON file
        with open('api/tv_shows.json', 'w') as file:
            json.dump(data, file, indent=4)

        return jsonify({"message": f"Show {new_id} added successfully"}), 200

    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        # print full traceback of exception
        print("Exception occurred:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# PUT endpoint
@app.route("/update/<showID>", methods=['PUT'])
def updateShow(showID):
    try:
        # load the existing data from the JSON file
        with open('api/tv_shows.json', 'r') as file:
            data = json.load(file)

        # find the show with the specified ID and update its details
        for show in data:
            if str(show.get('id')) == showID:
                show.update(request.get_json())
                break

        # save the updated data back to the JSON file
        with open('api/tv_shows.json', 'w') as file:
            json.dump(data, file, indent=4)

        return jsonify({"message": f"Show {showID} updated successfully"}), 200

    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        # print full traceback of exception
        print("Exception occurred:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# DELETE endpoint
@app.route("/delete/<showID>", methods=['DELETE'])
def deleteEntry(showID):
    try:
        # load the existing data from the JSON file
        with open('api/tv_shows.json', 'r') as file:
            data = json.load(file)

        # remove the entry with the specified showID
        updated_data = [show for show in data if str(show.get('id')) != showID]

        # save the updated data back to the JSON file
        with open('api/tv_shows.json', 'w') as file:
            json.dump(updated_data, file, indent=4)

        return jsonify({"message": f"Show {showID} deleted successfully"}), 200

    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        # print full traceback of exception
        print("Exception occurred:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__': 
  
    app.run(debug = True) 