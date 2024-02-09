### Node.js HTTP/2 server with zero dependency

### Description
This is a small example of the Node.js HTTP/2 server without any frameworks and additional libs.<br />
This project includes `CORS` option and possibility to generate `self-signed SSL` and includes next routes:
```
    GET /            - default route generates simple html page
    GET /api/todos   - returns array of todo objects 
```


### Tools
`Node.js` - that is it 😎

### How to run this project
1. Create a trusted self-signed SSL cert for localhost
    - **For Windows (choco)**
        1. Open Windows PowerShell, run as administrator
        install Chocolatey following this hyperlink.
        2. use `choco install mkcert` to install mkcert.
            - if `choco` doesn't exist install it [choco install](https://chocolatey.org/install)
        3. Go to security folder `cd security`
        4. run `mkcert -install` will create local CA.
        5. run `mkcert localhost 127.0.0.1 ::1` will create a trusted cert for localhost in the current directory.

    - **For Linux/Mac**
        ```
        openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
        -keyout security/localhost+2-key.pem -out security/localhost+2.pem
        ```
    - **For Windows (bash)**
        ```
        openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout security/localhost+2-key.pem -out security/localhost+2.pem
        ```
2. `npm run dev`