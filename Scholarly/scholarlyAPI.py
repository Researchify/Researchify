from scholarly import scholarly
import json

def lambda_handler(event,context):
    author = event["author"]
    print(author)
    return getPublications(author) 

def getPublications(author_id):
    # author is going to be id
    search_query = scholarly.search_author_id(author_id)
    # print("one")
    authorObject = scholarly.fill(search_query, publication_limit=10)
    # print("two")
    pub_list = []

    for i in range(len(authorObject["publications"])):
        currentPub = scholarly.fill(authorObject["publications"][i])
        del currentPub["source"]
        pub_list.append(currentPub)

    pub_json = json.dumps({ "publications": pub_list })
    # print(pub_json)
    return pub_json