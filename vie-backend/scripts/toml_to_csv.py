# Supabase is picky how dictionaries are imported, need to be JSON-compliant
# Therefore content needs to be mapped from dict to json
import toml
import json
import uuid
import pandas as pd


# travel = toml.load(open('../../cestlavie-app/static/content/logs/log-travel.toml'))
# transpLookup = toml.load(open('../../cestlavie-app/static/content/logs/transportation-code-lookup.toml'))
transpLookup = toml.load(open('transportation-code-lookup.toml'))
travel = toml.load(open('log-travel.toml'))
trips = travel['trips']

content = list()
trip_id = uuid.uuid4()
for trip in trips:
    del trip['startDate'], trip['endDate']
    title = trip['title']
    if 'stays' in trip.keys():
        trip_stays = trip.pop('stays')
        for stay in trip_stays:
            stay.update(trip)
            if 'carrier' in stay and stay['carrier']:
                stay.update(transpLookup[stay['carrier']])
            if 'linkAlbum' in stay:
                photoAlbum = stay.pop('linkAlbum')
                if photoAlbum:
                    photoAlbum = {'link': photoAlbum}
                    row = {'contentType': 'photoAlbum',
                           'content': json.dumps(photoAlbum),
                           'title': title,
                           'visibility': 'private',
                           'id': uuid.uuid4(),
                           'tripId': trip_id}
                    content.append(row)
            row = {'contentType': 'tripInfo',
                   'content': json.dumps(stay),
                   'title': title,
                   'visibility': 'public',
                   'id': uuid.uuid4(),
                   'tripId': trip_id}

            content.append(row)
            trip_id = uuid.uuid4()
    else:
        row = {'contentType': 'tripInfo',
               'content': json.dumps(trip),
               'title': title,
               'visibility': 'public',
               'id': uuid.uuid4(),
               'tripId': trip_id}
        content.append(row)
        trip_id = uuid.uuid4()

df = pd.DataFrame.from_dict(content)
df.index.name = 'index'
df['user_id'] = '39f9e257-ede3-4b3c-ba3b-b4004ecedf89'
df.to_csv('log-travel.csv', index=None)
