# CRUD-website

The website provides a table of tv shows and allows the user to perform CRUD actions on this table.

Data:
To emulate a data store, 200 records of tv show data was collected from the public api provided by TvMaze (https://www.tvmaze.com/api) and filtered to only contain a select number of features. This process is done in 'generate_data.py' and the data was saved in 'tv_shows.json'. In a production environment this would be replaced by a database.

Server-side:
The REST API is developed using Flask since it provides an easy syntax for developing an API from scratch. It consists of four endpoints representing CRUD operations.

Front-end:
For simplicity, the frontend is implemented using vanilla html, css, and javascript. The application only includes one page showing the table of tv show data. The content is responsive to different screen sizes.
