## API

### Create Room

Get `session/:roomName`

Response body

```
{
    "sessionId": "1_MX40NjI2NDk1Mn5-MTYyMjAyODA3OTgwOH44Tmd0VXR3dGlVdG1ZYjVpeDVXNGxMOGN-fg",
    "token": "T1==cGFydG5lcl9pZD00NjI2N.......",
    "apiKey": "1234566"
}
```

### Start Recording

POST `archive/start`

Request body

```
{
    "sessionId" : "1_MX40NjI2NDk1Mn5-MTYyMTk2ODg0MDIzOX5GZzhQY0pHY1hOOFcwT0ZPOEtQT3NpN2t-fg"
}
```

Response body

```
{
    "archiveId": "b67d02b5-c32e-4ea8-b82a-ba6c89edde59",
    "status": "started"
}
```

### Stop Recording

GET `archive/stop/:archiveId`

Response body

```
{
    "archiveId": "b67d02b5-c32e-4ea8-b82a-ba6c89edde59",
    "status": "stopped"
}
```

### List Archives

GET `archive/:sessionId`

Response body

```
[
    {
        "id": "b67d02b5-c32e-4ea8-b82a-ba6c89edde59",
        "status": "available",
        "name": "",
        "reason": "user initiated",
        "sessionId": "1_MX40NjI2NDk1Mn5-MTYyMjAzNjM4Nzk1NX4xV1Vkd25RMWwyZkRicWtLVGNVd1BVd2t-fg",
        "projectId": 1234567,
        "createdAt": 1622039724000,
        "size": 19262817,
        "duration": 66,
        "outputMode": "composed",
        "hasAudio": true,
        "hasVideo": true,
        "sha256sum": "4l6MKdPeiCOnt1UaQWMBSovKcTrg+Co5eNsyUp7Q/Jo=",
        "password": "",
        "updatedAt": 1622039794000,
        "resolution": "640x480",
        "partnerId": 1234567,
        "event": "archive",
        "url": "https://s3.eu-west-1.amazonaws.com/..."
    }
]
```
