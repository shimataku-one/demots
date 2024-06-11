#!/usr/bin/python
import json
import os
os.chdir(os.path.expanduser('~/Downloads'))
# standard geojson file
f = open('/Users/taku.shimada/herokuapp/demots/la-zip-code-areas-2012.geojson', 'r')
json_contents = json.loads(f.read())
features = json_contents["features"]
for i in features:
    i["id"] = i["properties"]["external_id"]
json_contents["features"] = features
# Normalized geojson for Tableau map
out_file = open("/Users/taku.shimada/herokuapp/demots/out_la_zip_code_areas_2012.json", "w")
out_file.write(json.dumps(json_contents))
out_file.close()
