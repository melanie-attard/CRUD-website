import requests
import json

api_url = 'https://api.tvmaze.com/shows?page=1'

# make a request to the API
response = requests.get(api_url)

# check if the request was successful
if response.status_code == 200:
    data = response.json()
    
    # extract the required features from each record
    filtered_data = [
        {
            "id": index + 1,  # assigning a new sequential ID
            "name": item["name"],
            "genre": ", ".join(item["genres"]),  # converting genres array to a string
            "status": item["status"],
            "premiered": item["premiered"],
            "network": item["network"]["name"] if item["network"] else None
        }
        for index, item in enumerate(data[:200])  # restrict to the first 200 items
    ]
    
    # save the data to a JSON file
    with open('tv_shows.json', 'w') as f:
        json.dump(filtered_data, f, indent=4)
    
    print("Data saved to tv_shows.json")
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")
