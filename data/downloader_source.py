import requests
from bs4 import BeautifulSoup
import csv


path = 'movie.csv'
with open(path, 'r+') as f:
    read = csv.reader(f)
    t = []
    for index, line in enumerate(read):
        if index != 0:
            url = 'https://www.imdb.com/title/' + [s for s in ' '.join(line).split('\t') if s][1]
            print(url)
            str_html = requests.get(url)
            soup = BeautifulSoup(str_html.text, 'lxml')

            data_description = soup.find_all('span', attrs={"data-testid": "plot-xs_to_m"})
            result = ''
            if not data_description:
                result = '\t' + 'none'
            for item in data_description:
                result = '\t' + item.get_text()
            line.append(result)

            data_cover = soup.find_all('a', attrs={"aria-label": "View {Title} Poster"})
            result = ''
            if not data_cover:
                result = '\t' + 'none'
            for item in data_cover:
                result = '\t' + 'https://www.imdb.com' + item.get('href')
            line.append(result)

            data_production = soup.find_all('li', attrs={"data-testid": "title-details-companies"})
            result = ''
            if not data_production:
                result = '\t' + 'none'
            for item in data_production:
                result = '\t' + item.get_text()[18:]
            line.append(result)

            data_language = soup.find_all('li', attrs={"data-testid": "title-details-languages"})
            result = ''
            if not data_language:
                result = '\t' + 'none'
            for item in data_language:
                result = '\t' + item.get_text()[8:]
            line.append(result)

            t.append(line)
            print(line)
        if index == 100:
            break
    with open('out.csv', 'w+') as w:
        writefile = csv.writer(w)
        writefile.writerow(['none', 'movie_id', 'title', 'release_year', 'runtime', 'type', 'description', 'cover',
                            'production', 'language'])
        for index, row in enumerate(t):
            result = [s for s in ' '.join(row).split('\t') if s]
            print(result)
            writefile.writerow(result)
            if index == 100:
                break

path = 'people.csv'
with open(path, 'r+') as f:
    read = csv.reader(f)
    t = []
    for index, line in enumerate(read):
        if index != 0:
            url = 'https://www.imdb.com/name/' + [s for s in ' '.join(line).split('\t') if s][1] + '/bio'
            print(url)
            str_html = requests.get(url)
            soup = BeautifulSoup(str_html.text, 'lxml')

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
        if index == 100:
            break
    with open('new_people.csv', 'w+') as w:
        writefile = csv.writer(w)
        writefile.writerow(['none', 'people_id', 'name', 'birthYear', 'profession', 'bio', 'photo', 'place'])
        for index, row in enumerate(t):
            result = [s for s in ' '.join(row).split('\t') if s]
            print(result)
            writefile.writerow(result)
            if index == 100:
                break



