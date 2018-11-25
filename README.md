# Lohbs-crawler

Crawling Lohbs sale information by the scheduler

Lohbs Tags parser [lib/dailyCollector.js] was ignore.
because it was sensitive
If you want, 
please contact kyewon76@gmail.com

### Need
- config/secret.js
```
module.exports = {
    mqtt: {
            url: 'mqtt://localhost',
        },
        db: {
            mongodb_user: '',
            mongodb_url: '',
            db_name: ''
        },

}
```

### Test
Need mqtt broker (mosca)

- npm install
- node bin/index.js
