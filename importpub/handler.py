"""
This file contains the AWS lambda handler for importing publications from google scholar.
"""
from gscholar import get_publications 
import logging
import sys

def enable_logging():
    """
    This function sets up the logging module to log to stdout.
    """
    root = logging.getLogger()
    root.setLevel(logging.DEBUG)
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.DEBUG)
    root.addHandler(handler)

def lambda_handler(event,context):
    """
    This function is called when the lambda is invoked.
    :param event: a json object containing the author_id
    :param context: object with context properties see: https://docs.aws.amazon.com/lambda/latest/dg/python-context.html
    """
    # enable_logging()
    author_id = event["author_id"]
    # logging.debug(author_id)
    return get_publications(author_id) 


