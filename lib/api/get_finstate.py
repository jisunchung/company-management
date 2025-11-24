import sys
import json
import OpenDartReader
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("DART_API_KEY")
dart = OpenDartReader(api_key)

company, year, report, statement = sys.argv[1:5]
try:
    result = dart.finstate(company, int(year))
    print(result.to_json(orient='records'), end='')
except Exception as e:
    print(json.dumps({'error': str(e)}), end='')
