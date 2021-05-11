# Researchify API Documentation
---
[Researchify on GitHub](https://github.com/Researchify/Researchify)

You can read about the APIs that have been created for [**Researchify**](http://researchify-env.eba-ca3rpuzw.us-east-1.elasticbeanstalk.com/) - a web platform for academic professionals to present and share their publications.

Here are the APIs we have so far:

| API Name | Description | Model |
| ----------- | ------- | ----------- | 
| publications | Used to perform CRUD operations on publications from our database. | [Publication](#Publication)
| users | Used to perform CRUD and login operations on users. | [User](#User)


# Models

## Publication <a name="Publication"></a>
```
{
    "teamId": "606bb59c22201f529db920c9",
    "authors": [
        "A"
    ],
    "title": "Some title",
    "link": "https://wonder.cdc.gov/wonder/Prevguid/m0047449/m0047449.asp",
    "description": "State and local public health officials rely on health-care providers, laboratories, and other public health personnel to report the occurrence of notifiable diseases to state and local health departments.",
    "yearPublished": "2020"
}
```

## User <a name="User"></a>
```
{
    "givenName": "Joel",
    "familyName": "Selwood",
    "email": "<email>",
    "password": "<password>"
}
```