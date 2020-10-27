import os
import json
import csv

json_file = open('../../backend/data/teams.json', 'r')
json_data = json.load(json_file)
# print(data)

dirpath = "."
files = os.listdir('./')

new_data = []
for filename in files:

    try:
        if filename == "script.py" or filename == "rankings.json":
            continue
        sub = 1997
        league_id = int(filename.split()[1])
        if league_id == 2015:
            league_id = 23
            sub += 1
        else:
            league_id = league_id - sub
        csv_file = open(os.path.join(dirpath, filename), 'r')
        data = csv.reader(csv_file)
        data = list(data)[1:]

        for index, item in enumerate(data):
            try:
                item[0] = ' '.join(word for word in item[0].split()[:-1])
                team_id = -1
                for team in json_data:
                    if team['team_name'] == item[0]:
                        team_id = team['team_id']
                if team_id == -1:
                    print(item[0], team_id)
                new_data.append({
                    'team_id': team_id,
                    'league_id': league_id,
                    'ranks': index + 1,
                    'points': item[-1]
                })
                data[index] = item
            except:
                pass

    except:
        pass
print(new_data)
with open("sample.json", "w") as outfile:
    json.dump(new_data, outfile)
