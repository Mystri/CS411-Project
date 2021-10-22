import requests
from bs4 import BeautifulSoup
import csv
import time


path = 'people_filtered.csv'
with open(path, 'r+') as f:
    read = csv.reader(f)
    t = []
    for index, line in enumerate(read):
        if index != 0:
            url = 'https://www.imdb.com/name/' + [s for s in ' '.join(line).split('\t') if s][1] + '/bio'
            print(url)
            try_count = True
            while try_count:
                try:
                    str_html = requests.get(url)
                    soup = BeautifulSoup(str_html.text, 'lxml')
                except:
                    print("except")
                    time.sleep(5)
                else:
                    try_count = False

            data_bio = soup.find('div', attrs={"class": "soda odd"}).find('p')
            result = '\t'
            print(data_bio)
            if not data_bio:
                result = 'none'
            for item in data_bio:
                result += item.get_text().strip()
            result = result.replace('\n', '')
            line.append(result)

            data_photo = soup.find_all('img', attrs={"class": "poster"})
            result = ''
            if not data_photo:
                result = '\t' + 'none'
            for item in data_photo:
                result = '\t' + item.get('src')
            print(result)
            line.append(result)

            data_place = soup.find('table', attrs={"id": "overviewTable"}).find_all('a')
            result = ''
            if not data_place:
                result = '\t' + 'none'
            for item in data_place:
                result = '\t' + item.get_text()
            line.append(result)

            t.append(line)
            print(line)
        # if index == 501:
        #     break
    with open('new_people_filtered.csv', 'w+') as w:
        writefile = csv.writer(w)
        writefile.writerow(['none', 'people_id', 'name', 'birthYear', 'profession', 'bio', 'photo', 'place'])
        for index, row in enumerate(t):
            result = [s for s in ' '.join(row).split('\t') if s]
            print(result)
            writefile.writerow(result)
            # if index == 500:
            #     break