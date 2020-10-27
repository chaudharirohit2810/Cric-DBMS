import csv
import os
import json


json_file = open('../../backend/data/Teams/ipl.json', 'r')
json_data = json.load(json_file)

delhi = ["Delhi Capitals", "Delhi Daredevils"]
filepath = "match_data.csv"

with open(filepath, 'r') as csvfile:
    rows = csv.reader(csvfile)
    data = list(rows)

    years = [2015]
    for year in years:
        data_2008 = []
        new_data = []
        for item in data:
            try:
                if int(item[1]) == year:
                    data_2008.append(item)
            except:
                pass

        data_2008.sort()
        for index, item in enumerate(data_2008):
            team1 = -1
            team2 = -1
            won_by = -1
            for team in json_data:
                if item[4] == "Delhi Daredevils":
                    team1 = 8
                    break
                elif team['team_name'] == item[4]:
                    team1 = team['team_id']
                    break
            for team in json_data:

                if item[5] == "Delhi Daredevils":
                    team2 = 8
                    break
                elif team['team_name'] == item[5]:
                    team2 = team['team_id']
                    break
            for team in json_data:
                if item[8] == "Delhi Daredevils":
                    won_by = 8
                    break
                elif team['team_name'] == item[8]:
                    won_by = team['team_id']
                    break
            new_data.append({
                'team1': team1,
                'team2': team2,
                'won_by': won_by,
                'league_id': 23,
                'match_number': index + 1,
                'match_date': item[3]
            })
        filename = str(year) + ".json"
        with open(filename, "w") as outfile:
            json.dump(new_data, outfile)
