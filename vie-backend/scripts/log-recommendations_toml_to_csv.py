# Supabase is picky how dictionaries are imported, need to be JSON-compliant
# Therefore content needs to be mapped from dict to json
import toml
import json
import uuid
import pandas as pd


# travel = toml.load(open('../../cestlavie-app/static/content/logs/log-recommendations.toml'))
travel = toml.load(open('log-recommendations.toml'))
recs = travel['recommendations']

content = list()
for rec in recs:
    row = {'contentType': 'recommendation',
            'content': json.dumps({'link': rec['linkRec'],
                                   'destination': rec['destination']}),
            'destination': rec['destination'],
            'circles': json.dumps(['friends', 'close friends']),
            'id': uuid.uuid4()}
    content.append(row)

df = pd.DataFrame.from_dict(content)
df.index.name = 'index'
df['user_id'] = '39f9e257-ede3-4b3c-ba3b-b4004ecedf89'
df.to_csv('log-recommendations.csv', index=None)
