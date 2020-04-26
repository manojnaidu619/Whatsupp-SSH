# Whatsupp-SSH?

## Setup

The setup process is really simple, you just have to follow these four steps...

**Step-1**. Signup for a Twilio Account and join the Twilio Whatsapp sandbox.

* Signup for an account [here](https://www.twilio.com/try-twilio)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/wu4euy6unpglv7d7ugli.png)

* Now, login and join the [sandbox](https://www.twilio.com/console/sms/whatsapp/learn) by doing as directed on screen and complete all 3 steps. **Don't share your sandbox code with anyone** (*The red block covers my sandbox code*)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/2318vtr78kp5ivvkonaw.png)

* Now, One final thing needs to be added. We will see that later...

**Step-2** Configure port on the server/ computer.

* If you are setting up in the local computer, then you are free to skip to **Step-3**.

* If setting up in a remote server, then you need to configure the instance/ droplet to open **port 3003** for incoming requests. 

> port 3003 is where Twilio would be forwarding the requests to...

If using AWS EC2 then you need to add a new rule inside *Security Groups -> Inbound rules* of a particular instance.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/rfcm89isdqibzqoa9mmw.png)

Then add a new rule like so...

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/1veh11y5k98i3iv673ah.png)

> If using other than EC2, then refer to official docs.

**STEP-3** Let's move towards our computer/ server.

> All the actions are performed inside the terminal.

* `cd` into the directory where you want to place the app.

* Now, clone the project repo.

```bash
$ sudo git clone https://github.com/manojnaidu619/Whatsupp-SSH.git
```
* `cd` into the project folder and run `sudo npm install`

```bash
$ cd Whatsupp-SSH/ 

$ sudo npm install
```
* As we are logging the requests into a log file, we need to give appropriate permissions to the directories.

```bash
$ sudo chmod -R a+rw PATH_TO_PROJECT/Whatsupp-SSH/
```
* Now adding `env` variables, which our app relies on. *Make sure the key is same as mentioned below.*

> I am considering OS as Ubuntu.

```bash
$ sudo nano /etc/bash.bashrc
```
scroll down to the bottom of the file and add these lines by replacing the values.

```
export SSH_PSWD=YOUR_DESIRED_PASSWORD
export TWILIO_URL=http://YOUR_IPv4_PUBLIC_IP:3003/Whatsupp-SSH
export TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
```
then source the `bash.bashrc` file by typing.

```bash
$ source /etc/bash.bashrc
```
* Now, copy the same TWILIO_URL that was added to `bash.bashrc` file. 

> Remember that we had one last thing to be added to *Twilio sandbox configuration*... It's time to do that.

head to *twilio console -> programmable SMS -> Whatsapp -> Sandbox* 

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/b82ff33ai80yn0kuh4hl.png)

After adding that, scroll down and hit **Save**.

**STEP-4**. Head to your server and run these final commands.

* install `pm2`.

```bash
$ sudo npm install pm2 --global
```

* Now, run `pm2 startup` to initialize startup scripts. So, whenever the server reboots/ crashes, our node app would also be picked up automatically.

```bash
$ pm2 startup
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/yqguqyxoumm6ypjl9hrw.png)

Now copy-paste the command given by pm2 (the one outlined by red border) and hit **enter**.

* Now, to save them all run `pm2 save`.

```bash
$ pm2 save
```
* just one final command left, you have successfully setup the app. Now let's start the `pm2` server.

```bash
$ pm2 start PATH_TO_APP/src/app.js
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/dqh1tjmg392dde1czsqu.png)

**Hurray! 🙌 your app is now up and running, get started by sending a simple command to your Twilio sandbox over Whatsapp**.

## License & copyright

© Manoj Naidu

Licensed under [MIT License](LICENSE)