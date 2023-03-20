import boto3
from dotenv import load_dotenv
import os

load_dotenv()

def get_bucket():
    aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    client = boto3.client(
        's3',
        aws_access_key_id = aws_access_key_id,
        aws_secret_access_key = aws_secret_access_key,
        endpoint_url='http://localhost:4566'
    )
    return client