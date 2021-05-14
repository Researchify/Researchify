from gscholar import getPublications 

def lambda_handler(event,context):
    """
    This function is called when the lambda is invoked.
    :param event: a json object containing the author_id
    :param context: object with context properties see: https://docs.aws.amazon.com/lambda/latest/dg/python-context.html
    """
    author_id = event["author_id"]
    print(author_id)
    return getPublications(author_id) 


