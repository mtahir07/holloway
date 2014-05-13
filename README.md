# Holloway

[tsoundcheck](http://www.tso.ca/tsoundcheck/default.aspx) is a program for 
people aged 15 to 35 to buy tickets to Toronto Symphony Orchestra concerts at 
$14 per ticket. 

This script, which is run as a cron job, checks the tsoundcheck website, pulls
the information for on-sale concerts, and displays it in an OS X notification. 
Clicking the notification will bring you straight to the page where you can buy 
tickets. 


## Requirements

* OS X >= 10.8
* CasperJS 1.0.2
* PhantomJS 1.9.7


## Screenshot

![notification](screenshots/notification.png)  


## Instructions

1. Install [PhantomJS](http://phantomjs.org/): 

        $ brew update && brew install phantomjs

1. Install [CasperJS](http://casperjs.org/) ([Why not `brew install casperjs`?](https://github.com/n1k0/casperjs/issues/747))

        $ brew install https://raw.github.com/mxcl/homebrew/8f7a1311af77b13b2bd5cc0d760290a320024525/Library/Formula/casperjs.rb

1. Install [terminal-notifier](https://github.com/alloy/terminal-notifier):

        ysim:~$ brew install terminal-notifier

1. Find out which directory holds the CasperJS binary:

        $ dirname `which casperjs`
        /usr/local/bin

    Do the same for terminal-notifier:

        $ dirname `which terminal-notifier`
        /usr/local/bin

1. Create a cron job for the `check` script. 

    First do: 
    
        crontab -e

    This will open up the crontab, where you should indicate a frequency, 
    add the directories containing the CasperJS and terminal-notifier binaries
    to your $PATH, and finally execute the `check` file using its absolute
    path (the `> /dev/null` just makes sure that you don't get mail every time
    the script runs): 

        0 14 * * * PATH="$PATH:/usr/local/bin/" ~/Repos/holloway/check > /dev/null

    In the above example, the script is run at 2pm every day. 

    When you exiting editing the crontab, make sure you see a message like
    this: 

        crontab: installing new crontab


## Troubleshooting

> $ crontab -e
> crontab: no crontab for ysim - using an empty one
> crontab: "/usr/bin/vi" exited with status 1

Add `export EDITOR=vim` to your `.bashrc`, source it, and try again. 


## References

* [terminal-notifier](https://github.com/alloy/terminal-notifier)
* [How to Create a Cron Job (Scheduled Task) for Your Website or Blog](http://www.thesitewizard.com/general/set-cron-job.shtml)
* [tsoundcheck FAQ](http://www.tso.ca/tsoundcheck/FAQ.aspx)
