# mcdcverify
A simple system to link Discord with Minecraft!

<h1>1. Setup</h1>
First, execute the following commands in the terminal:
<ul>		
<li><i>npm init</i></li>		
<li><i>npm install</i></li>	
</ul>
If there is an error, please contact me on Discord: ModeratorPS#9225
<h3>1.1 Minecraft Server</h3>
In order for the Minecraft bot to be able to enter the server, you must set <strong>online-mode</strong> to false <strong>(online-mode=false)</strong> in the <strong>server.properties</strong> file on your server.
<h3>1.2 Discord Bot</h3>
To create a Discord Bot go to this page: https://discord.com/developers/applications <br>
Now follow these steps:
<ul>		
<li><i>Press NEW APPLICATION</i></li>		
<li><i>For NAME enter the name of your Discord bot</i></li>
<li><i>Go to BOT in the menu and then click on ADD BOT</i></li>
<li><i>In the menu, go to OAuth2 and then to URL GENERATOR. Then select Bot. Then select ADMINISTRATOR under BOT PERMISSIONS.</i></li>
<li><i>Copy the link and paste it into your browser. Then add it to your server.</i></li>
<li><i>Now go back to Bot in the menu and click on RESET TOKEN and then on COPY</i></li>
</ul>
<h3>1.3 config.json</h3>
Download this code and place it in a folder. Unzip the .zip file in the folder! <br>
Finally, you only need to fill in the config.json file! <br>
<strong>Tutorial:</strong><br>
{<br>
    "mc-bot-ip": "server-ip", <strong>(Minecraft Server IP)</strong><br>
    "mc-bot-username": "mc-bot-username", <strong>(Minecraft Bot Username (Example: MCDCVerify))</strong><br>
    "dc-bot-token": "your-token", <strong>(The token from the bot you copied.)</strong><br>
    "dc-bot-activity": "playing-activity-text", <strong>(Discord status)</strong><br>
    "dc-server-guild-id": "server-guild-id", <strong>(Server id: https://youtu.be/NLWtSHWKbAI)</strong><br>
    "dc-server-role-name": "name-of-the-verify-role" <strong>(The name of the role you created!)</strong><br>
}<br>
<strong>Example:</strong><br>
{<br>
    "mc-server-ip": "gameps.de",<br>
    "mc-bot-username": "MCDCVerify",<br>
    "dc-bot-token": "OTQzMj****************************************UrGVAYzQ",<br>
    "dc-bot-activity": "with Minecraft",<br>
    "dc-server-guild-id": "999******619186296",<br>
    "dc-server-role-name": "verify"<br>
}<br>
<h1>2. Starten</h1>
Start the Minecraft server and then run <strong>node main.js</strong> from the folder in the terminal!
<h1>3. Usage</h1>
Write in the Minecraft Chat <strong>!verify</strong> and you will be guided through the registration process!
<h1>4. Info</h1>
If there is an error, please contact me on Discord: ModeratorPS#9225
<h2>Current version: v1.0-Beta</h2> <br><br>
<h1>You are welcome to use the system, but you must not pass it off as your own!</h1>
