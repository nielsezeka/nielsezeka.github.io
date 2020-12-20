import os
import json

arr = os.listdir('./meme_data')
json_string = json.dumps(arr)
f = open("huge_pack.json", "a")
f.write(json_string)
f.close()