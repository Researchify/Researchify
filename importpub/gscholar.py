from scholarly import scholarly
import json

def getPublications(author_id):
    """
    This function uses the scholarly library to retrieve publications associated with an author.
    :param author_id: google scholar user id extracted from their profile url
    :return: json string of publications in a list
    """
    search_query = scholarly.search_author_id(author_id)
    authorObject = scholarly.fill(search_query, publication_limit=10)
    pub_list = []

    for i in range(len(authorObject["publications"])):
        currentPub = scholarly.fill(authorObject["publications"][i])
        del currentPub["source"]
        pub_list.append(currentPub)

    pub_json = json.dumps({ "publications": pub_list })
    return pub_json