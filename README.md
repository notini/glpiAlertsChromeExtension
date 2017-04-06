# glpiAlertsChromeExtension
Chrome extension that pops up a Chrome Alert whenever a new ticket arrives in your GLPI database.

# Instructions
## Backend
The provided backend service needs to be running and it requires Node.
The backend service is in the folder 'RESTfulGLPIServer'. You can copy it to wherever you like.  
Open the 'server.js' file, located in the 'src' folder and set your GLPI database connection info, by altering the info on the following lines:  
```
app.use(  
    connection(mysql,{  
        host     : 'localhost',    /* Your host name/ip  */
        user     : 'root',         /* Database user      */
        password : 'rootPassword', /* User password      */ 
        database : 'glpi',         /* GLPI database name */ 
        debug    : false   
    },'request')  
); 
```
In Node, navigate to where you saved the backend folder and run 'npm install'. 
After the packages have been downloaded, run 'node src/server.js'.
The server will now be running on the default port (3030). You can switch it up in the code if you like.  
```
app.listen(3030, function () {
  console.log('RESTful GLPI server running on port 3030! ')
})
```

## Extension  
Now that the backend is running:  
1- Open Chrome and go to chrome://extensions/        
2- Click 'Load unpacked extension...'  
3- Select the source code folder  
4- Extension should now be added to Chrome  
obs: You might need to activate developer mode on Chrome for it to work.

Now that it is loaded to Chrome, it will appear on the top right side of the browser.
What you need to do now is set your running webservice address and the frequency which you'll like the extension to check for new tickets:    
1- Right-click the extension and select 'Options'   
2- On the Options page, set your running backend service address and frequency.   
Example:   
Address: http://localhost:3030/tickets   
Frequency (in minutes): 10     
3- You're good to go  

Now, every 10 minutes, whenever there's a new ticket in your glpi database, a Chrome Alert will pop-up with its ID and title.
