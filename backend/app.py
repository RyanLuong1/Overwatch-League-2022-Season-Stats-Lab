from flask import Flask
from aws_helper_functions.helper_functions import get_bucket

app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/bucket')
def list_bucket():
    client = get_bucket()
    client_response = client.list_buckets()
    buckets = []
    for bucket in client_response['Buckets']:
        print(f'Bucket name {bucket["Name"]}')
        buckets.append(bucket["Name"])
    return buckets

if __name__ == '__main__':
    app.run(debug=True)