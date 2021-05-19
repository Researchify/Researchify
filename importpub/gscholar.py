"""
This file contains the functions relating to getting publications from google scholar.
"""
from scholarly import scholarly
from multiprocessing import Pipe, Process
import json

def fill_pub(pub, conn):
    filled_pub = scholarly.fill(pub)
    del filled_pub["source"]
    # pub_list.append(filled_pub)
    conn.send([filled_pub])
    conn.close()

def get_publications(author_id):
    """
    This function uses the scholarly library to retrieve publications associated with an author.
    :param author_id: google scholar user id extracted from their profile url
    :return: json string of publications in a list
    """
    global pub_list
    search_query = scholarly.search_author_id(author_id)
    author_object = scholarly.fill(search_query, publication_limit=10)
    pub_list = []

    processes = []
    parent_connections = []

    for pub in author_object["publications"]:
        parent_conn, child_conn = Pipe()
        parent_connections.append(parent_conn)
        process = Process(target=fill_pub, args=(pub,child_conn))
        processes.append(process)

    for process in processes:
        process.start()

    for process in processes:
        process.join()

    for parent_connection in parent_connections:
        pub_list.append(parent_connection.recv()[0])
        
    pub_json = json.dumps({ "publications": pub_list })
    return pub_json