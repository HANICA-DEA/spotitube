# Spotitube [![Build Status](https://travis-ci.org/HANICA-DEA/spotitube.svg?branch=master)](https://travis-ci.org/HANICA-DEA/spotitube) [![Coverage Status](https://coveralls.io/repos/github/HANICA-DEA/spotitube/badge.svg?branch=master)](https://coveralls.io/github/HANICA-DEA/spotitube?branch=master)

This repository contains a front-end for the final programming assignment 
of the course OOSE-DEA at the [HAN University of Applied Sciences](https://www.han.nl/).

## Stories

Stories are created for you to have an overview of the functionality that needs to be implemented and to have a structured working process. These stories include prerequisites and acceptance criteria to provide a clear description of the functionality. See the stories on the [Spotitube project](https://github.com/orgs/HANICA-DEA/projects/4/views/1) page. To copy these stories to your own GitHub user:
* Click the dots ... below your profile picture and select 'Make a copy'
* Select the checkbox 'Draft issues will be copied if selected'
* Use the dropdown menu to select your own GitHub user as the new owner
* Give the project a name and click on 'Copy project'
* You should now have your own board with stories

These stories are still in Draft mode. This is not a problem, you can still label the stories and change their respective status. However, if you find that you are missing options, try selecting a story and click 'Convert to issue'. You should now be able to access all options for each story.

## Hosted version

Local installation (see bottom of this file) of the Spotitube front-end (i.e. the client) is not recommended due to possibly outdated dependencies. Therefore, use the web-based version found here:

[Spotitube client](https://hanica-dea.github.io/spotitube/)

## The assignment
The assignment is to build a back-end Web application for the Spotitube front-end, using the Java EE stack that you've learned. The goal is to provide all endpoint implementations based on the mentioned JSON requests/responses.
All views are provided by the Spotitube client and should update accordingly each time you implement an API endpoint as expected.

To communicate with your server using the Spotitube client, you will first need to login using the login form provided.
For 'Server URL' use `localhost` (include protocol and port) as value. Depending on your configuration, your artifact (i.e the WAR file) may be deployed under different context paths. This could be the name of your artifact or it could be empty. To edit the context path, update the `<warName>` tag of your `maven-war-plugin` dependency.

If the entered information is provided accurately, the Spotitube client application will be able to call the appropriate endpoint (`/login`) on your IP address when you hit the `Login` button.

It is _strongly_ recommended that you build your API using the TDD approach. This will greatly aid you in planning your implementation and save a lot of time when done right. Don't forget to regularly check how you are doing using the mentioned assignment criteria. 

## Enabling CORS headers in your JavaEE container

For the entirety of this assignment, make sure to use your client inspection tools to see what is happening in your client-server communication layer. You may notice errors hinting at a CORS issue.
To use this Spotitube client with your back-end application, you will need to enable CORS headers in your JavaEE container. If you have not done this yet, you may receive the HTTP statuscode `0` in your browser.

The CORS headers are required because the client is served from a different domain than the Server. Your browser will only allow this 
if the Server has the CORS Headers set in its HTTP response. More information about this will be given during class.
 
## API

In general, your back-end API must conform to the standards of a RESTful API. It must use HTTP methods, return JSON data (when required) and correct HTTP statuscodes in its responses. The API must be backed by a persistence layer that outputs SQL queries to store and retrieve data from your datasource.

It is up to you to properly define and implement the correct relations between data objects in your database, e.g. user data. The client application requires the following from the REST API to be able to work properly:
* The REST API has a pre-defined list of user credentials to be able to login
* The REST API generates a random token upon a successful login
* The REST API has a pre-defined list of tracks that can be added to a playlist

How to implement these requirements is up to you, but generally using a database is the best option.

### Methods used

For requests and responses specified by the Spotitube client application, use the correct HTTP methods as follows:
* GET : In case of acquiring one, or multiple resources.
* POST: In case of creating a resource.
* PUT: In case of modifying  a resource.
* DELETE: In case of deleting a resource.

### Response codes

In addition, the Spotitube client expects status codes to match their intended use. If not, you may run in to unexpected errors. For example:
* 200: OK. The request was fulfilled. 
* 201: CREATED. The request was fulfilled and has resulted in one or more new resources being created.
* 204: NO_CONTENT. The request was fulfilled and there is no additional content to send in the response payload body. NOTE: All content in the response will be deleted (!).
* 400: BAD_REQUEST. The request was not fulfilled due to something that is perceived to be a client error.
* 401: UNAUTHORIZED. The request was not fulfilled because it lacks valid authentication credentials for the target resource.
* 403: FORBIDDEN. The request was not fulfilled because access to the resource was not authorized.
* 404: NOT_FOUND. The request was not fulfilled because the (representation for the) resource was not found or does not want to be found.
* 500: INTERNAL_SERVER_ERROR. The request was not fulfilled because of something that is perceived to be a server error.

You may use any status codes you want to, as long as they are used appropriately. For more detailed information, see the standards defined by the [IETF](https://datatracker.ietf.org/doc/html/rfc7231#section-6.1).

### Endpoints
Your API must implement endpoints for all the following requests and responses.

#### Login
To perform a login:
```
url:    /login 
method: POST
```

The Spotitube client will perform a JSON request with the following data:
```json
{
  "user":     "meron", 
  "password": "MySuperSecretPassword12341"
}
```

The Spotitube client will expect a JSON response with the following data:
```json
{
  "token":  "1234-1234-1234", 
  "user":   "Meron Brouwer"
}
```

This token is then stored in LocalStorage by the Spotitube client and automatically added to each request.

### Playlists

##### Get all Playlists

To acquire a list of all existing playlists:
```
url:              /playlists 
method:           GET
query parameter:  token
```


The Spotitube client will expect a response containing the complete list of playlists (`tracks` omitted for simplicity, but see below):
```json
{
   "playlists": [
      {
         "id": 1,
         "name": "Heavy Metal",
         "owner": true,
         "tracks": []
      },
      {
         "id": 2,
         "name": "Pop",
         "owner": false,
         "tracks": []
      }
   ],
   "length": 123445
}
```

A playlist can only have one owner. The value of `owner` should be determined by you. The property `length` should be in seconds and represents the total length of all playlists. The client will convert this to hh:mm:ss.

##### Delete a Playlist

To delete a playlist:
```
url:              /playlists/:id
method:           DELETE
query parameter:  token
```
The Spotitube client will expect a response containing the complete and modified list of playlists:
```json
{
   "playlists": [
      {
         "id": 1,
         "name": "Heavy Metal",
         "owner": true,
         "tracks": []
      }
   ],
   "length": 6445
}
```

##### Add a Playlist

To add a playlist:
```
url:              /playlists
method:           POST
query parameter:  token
```

The body should contain the new playlist:
```json
{
   "id": -1,
   "name": "Progressive Rock",
   "owner": false,
   "tracks": []
}
```

Note that the client will set the id to `-1`. The server is responsible for generating a unique id.

The Spotitube client will expect a response containing the complete and modified list of playlists:
```json
{
   "playlists": [
      {
         "id": 1,
         "name": "Heavy Metal",
         "owner": true,
         "tracks": []
      },
      {
         "id": 2,
         "name": "Pop",
         "owner": false,
         "tracks": []
      },
      {
         "id": 3,
         "name": "Progressive Rock",
         "owner": true,
         "tracks": []
      }
   ],
   "length": 123445
}
```
The property `length` should be in seconds. The client will convert this to `hh:mm:ss` format.

##### Edit a Playlist

To edit the name of a playlist:
```
url:              /playlists/:id
method:           PUT
query parameter:  token
```

The body should contain the modified playlist:
```json
{
   "id": 1,
   "name": "Death Metal",
   "owner": true,
   "tracks": []
}
```

The Spotitube client will expect a response containing the complete and modified list of playlists:
```json
{
   "playlists": [
      {
         "id": 1,
         "name": "Death Metal",
         "owner": true,
         "tracks": []
      },
      {
         "id": 2,
         "name": "Pop",
         "owner": false,
         "tracks": []
      }
   ],
   "length": 123445
}
```

### Tracks

##### Get all tracks that belong to a Playlist

To receive all tracks from a given Playlist
```
url:              /playlists/:id/tracks
method:           GET
query parameter:  token
```

The Spotitube client will make this request when viewing a specific Playlist. It will expect a response containing the complete list of tracks for the given Playlist:
```json
{
    "tracks": [
        {
            "id": 1,
            "title": "Song for someone",
            "performer": "The Frames",
            "duration": 350,
            "album": "The cost",
            "playcount": undefined,
            "publicationDate": undefined,
            "description": undefined,
            "offlineAvailable": false
        },
        {
            "id": 2,
            "title": "The cost",
            "performer": "The Frames",
            "duration": 423,
            "album": undefined,
            "playcount": 37,
            "publicationDate": "19-03-2006",
            "description": "Title song from the Album The Cost",
            "offlineAvailable": true
        }
    ]
}
```
The property `duration` should be in seconds. The client will convert this to `hh:mm:ss` format.
The property `publicationDate` should be a String representation of a Date, formatted as `MM-dd-yyyy`. Note: be warned that `M`  is not the same as `m` in this instance. 

##### Get available tracks

To receive the available tracks:
```
url:              /tracks
method:           GET
query parameter:  forPlaylist
query parameter:  token
```

The client will make this request when the user wants to add a track to a Playlist. In this case the query parameter
`forPlaylist` is added to ensure the server only returns the Tracks that are not yet in the Playlist. The value of this query
parameter is the `id` of the Playlist. Only tracks that are _not_ yet in a Playlist can be added.

The Spotitube client will expect a response containing the complete list of available tracks. Some properties may not be included:
```json
{
   "tracks": [
      {
         "id": 3,
         "title": "Ocean and a rock",
         "performer": "Lisa Hannigan",
         "duration": 337,
         "album": "Sea sew",
         "playcount": undefined,
         "publicationDate": undefined,
         "description": undefined,
         "offlineAvailable": false
      },
      {
         "id": 4,
         "title": "So Long, Marianne",
         "performer": "Leonard Cohen",
         "duration": 546,
         "album": "Songs of Leonard Cohen",
         "playcount": undefined,
         "publicationDate": undefined,
         "description": undefined,
         "offlineAvailable": false
      },
      {
         "id": 5,
         "title": "One",
         "performer": "Metallica",
         "duration": 423,
         "album": undefined,
         "playcount": 37,
         "publicationDate": "18-03-2001",
         "description": "Long version",
         "offlineAvailable": true
      }
   ]
}
```

##### Add a track to a Playlist

```
url:              /playlists/:id/tracks
method:           POST
query parameter:  token
```

The request body should contain the track to be added:
```json
{
    "id": 4,
    "title": "So Long, Marianne",
    "performer": "Leonard Cohen",
    "duration": 546,
    "album": "Songs of Leonard Cohen",
    "playcount": undefined,
    "publicationDate": undefined,
    "description": undefined,
    "offlineAvailable": false
}
```

Note that the relevant parts are the `id` and `offlineAvailable`. The `id` should be used by the server to lookup the
Track, before adding it to the Playlist. The offline availability property is simply a toggle that does nothing, but should be persisted in the back-end.
The implementation does not have to be specific for a user or playlist. This means that this property can only be set once, during adding of a Track to a Playlist.

The Spotitube client will expect a response containing the complete list of tracks for the given playlist.
Note that different types of Tracks include different properties.
```json
{
    "tracks": [
        {
            "id": 1,
            "title": "Song for someone",
            "performer": "The Frames",
            "duration": 350,
            "album": "The cost",
            "playcount": undefined,
            "publicationDate": undefined,
            "description": undefined,
            "offlineAvailable": false
        },
        {
            "id": 2,
            "title": "The cost",
            "performer": "The Frames",
            "duration": 423,
            "album": undefined,
            "playcount": 37,
            "publicationDate": "19-03-2006",
            "description": "Title song from the Album The Cost",
            "offlineAvailable": true
        },
        {
            "id": 4,
            "title": "So Long, Marianne",
            "performer": "Leonard Cohen",
            "duration": 546,
            "album": "Songs of Leonard Cohen",
            "playcount": undefined,
            "publicationDate": undefined,
            "description": undefined,
            "offlineAvailable": false
        }
    ]
}
```

##### Remove a track from a Playlist

To remove a Track from a Playlist
```
url:              /playlists/:id/tracks/:id
method:           DELETE
query parameter:  token
```

The Spotitube client will expect a response containing the complete and modified list of tracks:
```json
{
    "tracks": [
        {
            "id": 1,
            "title": "Song for someone",
            "performer": "The Frames",
            "duration": 350,
            "album": "The cost",
            "playcount": undefined,
            "publicationDate": undefined,
            "description": undefined,
            "offlineAvailable": false
        }
    ]
}
```

## TIPS / Troubleshooting
* It is possible you may receive a CORS issue even though your headers are properly set. This may be the result of an inappropriately configured endpoint and/or its parameters
* Those that are aware of the concept HATEOAS might notice that this API is not HATEOAS. That is not a problem, HATEOAS is not within the scope of this exercise
* To implement the DataMapper pattern you can use the code from the book, e.g. the AbstractMapper class. This class has to be modified a little to conform to the JDBC standard but should be 80% functional
* When you save the password in the database using a password type, you can check the value from the database against a hashed version of the password given by the user:

  ```java
  if (DigestUtils.sha256Hex(pass_given_by_user).equals(pass_from_the_database)))
  ```

  DigestUtils is a class from the Commons Codecs library:
  ```xml
  <dependency>
    <groupId>commons-codec</groupId>
    <artifactId>commons-codec</artifactId>
    <version>1.10</version>
  </dependency>
  ```

* To generate a unique token you can use the Java class method `UUID.randomUUID()`. Save the generated token in memory (e.g. a List or Map) or in the database, but be sure to use the same token as a reference to a user on successive requests

## For local installation of the client

To install the client locally you will need Node.js and angular-cli.

### Install Node.js

Download and install [Node.js](https://nodejs.org/en/).

### Install angular-cli

To install [Angular CLI](https://github.com/angular/angular-cli), run the following command in admin/superuser mode:
```
  npm install -g @angular/cli
```

### Run the client
 
You can now use Angular CLI to run a local server that hosts the client. To do this, run the following command:
```
ng serve
```

This will run a server on http://localhost:4200.

So navigate your browser to

```
http://localhost:4200/
```

