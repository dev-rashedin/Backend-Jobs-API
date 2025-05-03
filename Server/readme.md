
#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

 - to run a pre-request script on postman, so that you don't have to set headers every time

 ``` 
 pm.request.headers.add({
    key: 'Authorization',
    value: `Bearer ${pm.variables.get("authToken")}`
});
```

<!-- authToken should be stored as environment variable as it is secret, if it is saved in normal variable, postman will remove it immediately -->

- to run a post-response script on postman, so that you can store the token as variable when user logs in

```
const jsonData = pm.response.json();
pm.collectionVariables.set("token", jsonData.token);
```

- then set the a authorization --> Bearer token --> that stored token (& this one is much better)