from bs4 import BeautifulSoup
from requests import get
import json
import os


def get_names_links(filename):

    fi = open(filename, 'r')
    data = fi.read()
    soup = BeautifulSoup(data, 'html.parser')
    photos = soup.find_all("img", {"data-widget": "player-image"})
    photo_links = ["http:" + photo['src'] for photo in photos]
    names = soup.find_all("p", {"class": "player-name"})
    names = [name.text.strip('\r\t\n').strip() for name in names]
    data = []
    for index in range(len(names)):
        data.append({
            'first_name': names[index].split()[0],
            'last_name': ' '.join(word for word in names[index].split()[1:]),
            'image_link': photo_links[index]
        })
    return data


def get_roles(page):

    fi = open(page, 'r')
    data = fi.read()
    soup = BeautifulSoup(data, 'html.parser')
    roles = soup.find_all("div", {"class": "cb-text-gray"})
    names = soup.find_all("div", {"class": "cb-font-16 text-hvr-underline"})
    names = [name.text.strip() for name in names]
    roles = [role.text for role in roles]
    data = []
    for index in range(len(names)):
        data.append({
            'first_name': names[index].split()[0],
            'last_name': ' '.join(word for word in names[index].split()[1:]),
            'roles': roles[index].lower()
        })
    return data


def combine_data(filename):
    roles = get_roles("Roles/" + filename)
    names = get_names_links("Names/"+filename)
    for index in range(min(len(roles), len(names))):
        try:
            first_names = [name['first_name'] for name in roles]
            item = first_names.index(names[index]['first_name'])
            names[index]['role'] = roles[item]['roles']
        except:
            pass
    filename = "IPL/" + filename.split('.')[0] + ".json"
    with open(filename, 'w') as json_file:
        json.dump(names, json_file)


filenames = ['mi.html', 'rcb.html', 'csk.html',
             'dc.html', 'kkr.html', 'rr.html', 'srh.html']

for filename in filenames:
    combine_data(filename)
