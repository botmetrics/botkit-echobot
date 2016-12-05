# Prerequisites

1. Install `foreman` with `gem install foreman`
2. Setup an `.env` file with the following variables:

`PAGE_ACCESS_TOKEN`: You will get this from the Facebook page for your
app
`VERIFY_TOKEN`: This can be a random string -- make sure you set this
same string while setting up your webhook in Facebook.

3. Install [ngrok](https://ngrok.io) for reverse tunneling

## Run

Run your bot from the command line:
```
$ ./script/server
```
