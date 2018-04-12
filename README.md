# twitter-wall

To start service run from project dir: 
```
node index.js
```
* http://localhost:3000/ - default feed page
* http://localhost:3000/filter.html - pre-moderation page



### In case of problems:

If something "red" is happening in console, try this is console:

```
localStorage.removeItem('tweetsJSON')
```
and
```
localStorage.removeItem('bannedUsers')
```

But all should be fine. Enjoy!
