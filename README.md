# Holloway

A script that you can run as a cron job check the tsoundcheck website, pull the 
information for on-sale concerts (usually for $14!), and display it in an OS X
notification. 


## Instructions

1. Install [PhantomJS](http://phantomjs.org/) and 
   [CasperJS](http://casperjs.org/) using Homebrew:

    ```bash
    $ brew update && brew install phantomjs
    $ brew install casperjs
    ```

1. Install Terminal Notifier: 

    ```bash
    $ sudo gem install terminal-notifier
    Password:
    Fetching: terminal-notifier-1.4.2.gem (100%)
    Successfully installed terminal-notifier-1.4.2
    1 gem installed
    Installing ri documentation for terminal-notifier-1.4.2...
    Installing RDoc documentation for terminal-notifier-1.4.2...
    ```

1. `chmod +x check`

1. Find out where the casperjs binary lives: 

    ```bash
    $ dirname `which casperjs`
    /usr/local/bin
    ```

    And also where the terminal-notifier binary lives: 

    ```bash
    $ which terminal-notifier
    /Users/yiqing/.rvm/rubies/ruby-1.9.3-p392/bin/terminal-notifier
    ```

1. `crontab -e`, then add a frequency, the directory containing the CasperJS
   binary (from the previous step), and the *absolute* path to the `caller` 
   file. 

    ```bash
    0 14 * * * PATH="$PATH:/usr/local/bin/:/Users/yiqing/.rvm/rubies/ruby-1.9.3-p392/bin/" ~/Repos/holloway/check > /dev/null
    ```

    This will run the script at 2pm every day. 


## References

* [terminal-notifier](https://github.com/alloy/terminal-notifier)
* [How to Create a Cron Job (Scheduled Task) for Your Website or Blog](http://www.thesitewizard.com/general/set-cron-job.shtml)

