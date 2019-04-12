---
title:  Build basic D3.js(D3 Plus) Data Visualizations with your Email Data
date: "2017-11-17T23:46:37.121Z"
layout: post
path: "/create-data-visualizations-and-convert-mbox-to-csv-to-json/"
categories:
  - D3.js
  - D3Plus
  - .mbox
  - .csv
  - Python
  - Ruby
  - Google Takeout
  - Gmail
  - data
  - data visualization

description: "Download your email .mbox file, convert to .csv, convert to .json, clean your data, and then create some basic D3.js Data Visualizations"
---

Recently I was shown a D3.js tutorial and I think it would be pretty cool to do a data visualization using D3.js with my email data. If you want to skip to the code bits, you can scroll down to Step 1 or click [this.](#step_one)

<strong>Lets go over a few of the goals I want to accomplish with this project:</strong>

-Download Gmail data from one Gmail Account

-Try recover my other Gmail account’s password and download that data as well (Google Takeout requires you to be signed into Gmail’s desktop-browser application to use it and I have no idea what that password is)

-Convert these email files into usable format such as .csv or .json

-Try learn something from any notable trends of those statistics

-Visualize those trends with D3.js

The first thing I needed to do is download my Gmail data using Google Takeout. Anyone can do that with this simple [Google Takeout](https://takeout.google.com/settings/takeout?pli=1) link and a Gmail account

<strong>Recovering all of your emails from an old Gmail Account</strong>

I have an old Android phone that is still logged into Gmail via Android’s Gmail App. For just reading emails and responding to the messages of old friends/family with, “Please email my other account @”, I don’t really need to recover the password. But for situations like using Google’s Takeout tool you need to be signed into their desktop app which means I need to get a new password.

I’ve tried three or four times to recover my old Gmail account’s password  in the last year by going through Gmail’s security protocol. Unfortunately, I ended up at this screen twice after two more attempts:

<img height="400" src="./image3.png" alt="Google locking me out of Gmail page">
<figcaption>You shall not pass</figcaption>

Because I couldn’t access my last ten years of emails, I only had emails from the last year so my dataset for this project is rather small but it should still do the job.

<a name="step_one"></a><strong>Step 1 - Use Python to convert your .mbox file to .csv (and later .json)(No Python experience necessary)</strong>



Most email clients (Gmail, Mozilla Thunderbird, Microsoft Outlook, etc.) allow users to download all of their emails in a [.mbox](https://en.wikipedia.org/wiki/Mbox) file. This allows users who want to transfer from one client to another client, or i guess one account to another account, to simply download their emails, and drop it into their new client to allow users to keep all of their emails in one place.

Now we need convert that .mbox file to a useable format so we can manipulate it.

There are online services and tools you can download to convert .mbox files to more readable formats, but I thought looking for simple scripts that we can read and try understand is preferable so we can learn a little more about this process, and try to avoid a maliciously designed tool/service from stealing our sensitive information.

Macs come with Python pre-installed. If you aren’t using a Mac you’ll have to download it. My machine had Python 2.7.13 installed on it. Syntax might be different if you have a different Python version. You can check if Python is installed in your terminal by typing python -V
in your terminal. I used [@Claire Willett](https://twitter.com/clairedwillett?lang=en)'s [article](http://www.ripariandata.com/blog/how-to-export-your-gmail-to-excel#comments-outer-wrapper=) as a guide here. I’ve never done anything in Python before but Claire's article offers some pretty basic instructions. If you don’t feel like reading her article, here are the directions I used:

-Create a project directory directory

-Place your .mbox file in that directory

-Create a file titled: `mbox_parser.py`

-Put this in that python file:

`import mailbox`

`import csv`

`writer = csv.writer(open("name_the_file_you_want_this_script_to_create_and_save_as_a_csv.csv", "wb"))
for message in mailbox.mbox('this_is_the_name_of_your_mbox_file.mbox'):
    writer.writerow([message['from'], message['subject'], message['date'], message['Received'], message['sender-time']])`

<strong>Notice in that python file, the title of the .mbox file and that title of the .csv file. Change the titles of those files as necessary.</strong>

-Run the python file (by running in your terminal: `python mbox_parser.py`)

Now we have a .csv file. If that works for you, and you don’t want to convert that file to .json, you’re done!

I’m going to convert it to .json though…

<strong>Converting a .csv file to a .json file using Python:</strong>

-Create a project directory directory

-Place your .csv file in that directory

-Create a file titled: `csv_to_json.py`

-Put this in that python file:

`import csv`

`import json`

`csvfile = open(name_of_your_csv_file.csv', 'r')
jsonfile = open(the_desired_name_of_your_new_json_this_script_will_create_and_save.json', 'w')`

`fieldnames = ("Sender","Subject","Time_Sent")`

`reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(', ')`

<strong>Notice in that python file, the title of the .csv file and that title of the .json file. Change the titles of those files as necessary.</strong>

-Run the python file (by running in your terminal: `python csv_to_json.py
.py`)

Now you have a JSON file!

<strong>Step 2 - Ruby: Reading through, manipulating, and extracting notable information from your .csv file in Ruby</strong>

I guess you can totally step around this section if you're comfortable editing your .csv file in Excel, Google Sheets, or whatever other .csv programs there are. I originally learned to program in Ruby and I find manipulating data in Ruby very easy (Yes I am aware I probably use Ruby as a crutch rather than learning more appropriate tools/languages to do this kind of work).

I wanted to convert my .csv data into some kind of Ruby array or Ruby Hash to more easily play with it. I only had about 4000 emails from the last year of my emails so my inefficient Ruby script can easily do the job.

My Ruby script is very ugly and I’m sure most experienced programmers will find it laughably ugly but it gets the job done. I didn’t even put my code in individual methods so it really is a mess. I chose to only select the "Sender", "Subject", and "Time_Sent" off of each email but you can easily pull more information off each email if you lookup common mbox headers. I noticed that extracting the message content itself could be a little confusing because you pull all of the html tags in all of those fancy marketing emails. A link to my Ruby script can be found at this repo: [Github](https://github.com/fatcatdog/mboxToD3JSproject)




<strong>This Ruby script does a few things:</strong>

-Takes a .json file and turns it into a Ruby hash

<strong>A few functions are written to organize some information such as:</strong>

-By the second, when emails were sent

-By the hour, most popular hours during which emails were sent

-Email senders sorted by how many emails they sent

-Most common words in subject lines I received sorted by frequency

<strong>To use my Ruby script you have to do the following:</strong>

-Have Ruby installed on your computer (my machine is running Ruby version  2.3.1)

-In your terminal: get to the directory where the ruby script is living in

-In your terminal run:
`ruby name_of_the_ruby_file_whatever_that_is.rb`

-The script doesn't return or print you anything by design. If you get any errors you should probably deal with that before moving forward.

-To actually view any of the output of those variables which are stored as variables at the bottom of the file, simply type print in front of one of those variables, save the file, and again run the file in your terminal to see what kind of output you get. Once again, you run the file by going to your terminal and running:
`ruby name_of_the_ruby_file_whatever_that_is.rb`

I only had 4000 records so I simply copy and pasted the outputs of each individual variable into different text files.

Once I had my data in text files, I did some further editing. First of all, I deleted emails from people with personal email domains. I also deleted sensitive email addresses of companies I don't want people knowing about. I also deleted @gmail.com from that group considering it doesn't really help me learn about my dataset and it was by far the biggest email sender with about 500 emails coming from @gmail accounts. I further edited my data by changing the key values to more understandable texts, so rather than “sender”, I changed it to “email_address” I did these things with [Atom](https://ide.atom.io/)'s convenient find and replace all button.

<strong>D3.js and D3Plus</strong>

I was initially introduced to D3.js as an easy to use tool to build charts/graphs with code. When it comes to actually using D3.js charts in your React application, it is not easy to use. [Elijah Meeks](https://twitter.com/Elijah_Meeks) details how to implement [D3.js charts into React apps here.](https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71)

You can make very cool interactive data visualizations like [this](https://rd3.now.sh/) by [Thibaut Tiberghien](https://twitter.com/tibotiber). D3.js is really a great tool to use for building interactive charts. I was also told by a friend that claimed to have used D3.js for work multiple times, that D3.js has a rather steep learning curve, and for static data representations, a simple image of that D3.js chart does most of the trick. I found a tool called D3Plus (D3plus.org) which basically allows you to create simple D3.js charts without actually knowing any D3.js.

<strong>Step 3 - D3Plus: Create data visualizations</strong>

[D3PLus](https://d3plus.org/) offers a bunch of premade charts here at its examples [page](https://d3plus.org/examples/). You just have to choose a chart that takes the same amount of arguments as your data has and you get a pretty nice graph spit out on the other end of things after you rename your labels and get rid of your typos. My simple D3Plus charts can be found in this repo: [Github](https://github.com/fatcatdog/mboxToD3JSproject)

(To run any of those charts, you'll have to spin up a local server in your directory, and just click any of the .html file's in the directory)

-For some reason those charts wouldn't render locally for me and I had to spin up a local server to help out. To do so just follow this one next step.

-In the terminal, go to the project directory where your html files of D3PLus files are stored. Start a local server using Python by running this command in terminal: `python -m SimpleHTTPServer`

By default, this will run the contents of the directory on a local web server, on port 8000. So just paste `localhost:8000` in your browser to view it. Click the html file that you saved and see if it renders correctly.

Any findings from my data visualizations?

Let’s start with times email are sent to me by the hour:

<img height="400" src="./image2.png" alt="Bar chart of when emails are sent to me by the hour">

No real notable findings here. People usually send mass marketing emails during the day.

How about most common words in subject lines (A bubble chart that looks a lot better in D3.js rather than a simple image of that D3.js chart. When you hover over a bubble in D3.js, the frequency of that word appears):


<img height="200" src="./image4.png" alt="Bubble chart of most common words sent to me in subject lines">




No real notable findings here.
How about who is emailing me?


<img height="600" src="./image1.png" alt="Who is emailing me ranked by frequency">


When I was looking for a job, LinkedIn and ZipRecruiter emailed me a lot. I wasted hours applying to jobs I wasn't qualified for on ZipRecruiter and those other job websites. Twitter’s marketing recently paid off, you can see my tweets [@jakeduchen](https://twitter.com/jakeduchen).

<strong>Any actions I can take based on all of this?</strong>

I noticed I could easily have missed all of these emails and my life would not have changed. While I was looking for work, I was forced to hand out my personal information to tons of websites and treat every notification like it could me by next job.

I also noticed, my parents had not emailed me in the last year, and I really only had a handful of personal emails from friends. Email clearly is not as common a form of communication I use compared to texting, facebooking, and phone.

Considering I am no longer looking for a new job, I think a reasonable plan of action is to disable Gmail’s notifications on my phone considering I really don't need their 3 or 4 buzzes in my pocket a day to let me know company X is having a sale.

<strong>Thoughts on the project</strong>

I'm happy I was able to accomplish my goals in a relatively short period of time. I still feel like I don't know any D3.js because D3Plus was so easy to use. I think D3Plus exists exactly for situations like mine today where someone is charged with creating one simple D3.js chart, and if they don't want to spend the time learning/building an exciting/interactive visualization they can just plug in their data to a D3Plus example. Judging by their examples though, they can get pretty sophisticated as well. If you read the whole article, or part of it, or just happen to be reading this sentence, let me know what you think about my writing. All feedback is appreciated.