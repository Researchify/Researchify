from scholarly import scholarly

def getPublications(author):
    search_query = scholarly.search_author(author)
    authorObject = scholarly.fill(next(search_query))
    print(scholarly.fill(authorObject['publications'][0])['bib']['title'])
    publications = []
    for pub in authorObject['publications']:
        publications.append(scholarly.fill(pub))

    for i in publications:
        print(i)
getPublications("Gleb belov")