import os

# get current directory
current_dir = os.getcwd()

# create HTML for directory listing
html = "<html><head><title>P5 Experiments</title>"
html += "<style>body {font-family: Arial, sans-serif; background-color: #e7e7e7;}"
html += "body {max-width:700px; margin:auto}"
html += "h1 {text-align: center; margin-top: 50px;}"
html += "ul {list-style-type: none; padding: 0; margin-top: 50px;}"
html += "li {background-color: #fff; padding: 1rem; margin-bottom: 1rem; border-radius: 5px;}"
html += "li:hover {background-color: #ddd;}"
html += "a {text-decoration: none; color: #333; font-weight: bold; font-size: 1.3rem;}"
html += "</style></head><body><h1>P5 Experiments</h1><ul>"

# iterate over subdirectories
for subdir in os.listdir(current_dir):
  # check if subdir is a content directory
  if os.path.isdir(os.path.join(current_dir, subdir)) and subdir != "_template":
    # check if subdir contains an index.html file
    index_file = os.path.join(current_dir, subdir, "index.html")
    if os.path.isfile(index_file):
      # add link to index.html file in subdir
      html += "<a href=\"{}\"><li>{}</li></a>".format(os.path.join(subdir, "index.html"), subdir)

# close HTML tags
html += "</ul></body></html>"

# write HTML to file
with open("index.html", "w") as f:
  f.write(html)

# start Python3 simple server
os.system("python3 -m http.server")