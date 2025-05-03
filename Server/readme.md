
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

 - to run a pre-request on postman, so that you don't have to set headers every time

 ``` 
 pm.request.headers.add({
    key: 'Authorization',
    value: `Bearer ${pm.variables.get("authToken")}`
});
```

<!-- authToken should be stored as environment variable as it is secret, if it is saved in normal variable, postman will remove it immediately -->

