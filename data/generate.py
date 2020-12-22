import os
import json
import blurhash

arr = os.listdir('./meme_data')
arr_result = []
for item in arr:
    print(item)
    if item != '.DS_Store':
        with open('./meme_data/'+ item, 'r') as image_file:
            hash = blurhash.encode(image_file, x_components=4, y_components=3)
            arr_result.append({'image':'https://nielsezeka.github.io/data/meme_data/'+ item, 'blur_hash': hash});
json_string = json.dumps(arr_result)
f = open("huge_pack_blur.json", "a")
f.write(json_string)
f.close()