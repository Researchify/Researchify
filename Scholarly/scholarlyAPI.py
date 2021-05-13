from scholarly import scholarly

def getPublications(author):
    search_query = scholarly.search_author(author)
    authorObject = scholarly.fill(next(search_query))
    print(scholarly.fill(authorObject['publications'][0])['bib']['author'])
    publications = []
    for pub in authorObject['publications']:
        currentPub = scholarly.fill(pub)
        publications.append(currentPub)

    for i in publications:
        print(i)
    return publications
getPublications("Gleb belov")