import os
import json

arr = os.listdir('./meme_data_2')
arr_result = []
for item in arr:
    print(item)
    if item != '.DS_Store':
        with open('./meme_data_2/'+ item, 'r') as image_file:
            arr_result.append({'image':'https://nielsezeka.github.io/data/meme_data_2/'+ item});
json_string = json.dumps(arr_result)
f = open("huge_pack_pexel.json", "a")
f.write(json_string)
f.close()