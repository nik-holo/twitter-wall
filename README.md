# twitter-wall

To start service run from project dir: 
```
node index.js
```
* http://localhost:3000/ - default feed page
* http://localhost:3000/filter.html - pre-moderation page

Chrome is recommended. Cmd+Shift+F — enters fullscreen without any interface.



### In case of problems:

If something "red" is happening in console, run this
to clear the queue or un-ban all banned users: 
```
localStorage.removeItem('tweetsJSON')
```
```
localStorage.removeItem('bannedUsers')
```

But all should be fine. Enjoy!
