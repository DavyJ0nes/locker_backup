# The Locker Backup Script
```
    ____                        ______                 _    __               __            
   / __ \____ __   ____  __    / / __ \____  ___  ____( )  / /   ____  _____/ /_____  _____
  / / / / __ `/ | / / / / /_  / / / / / __ \/ _ \/ ___//  / /   / __ \/ ___/ //_/ _ \/ ___/
 / /_/ / /_/ /| |/ / /_/ / /_/ / /_/ / / / /  __(__  )   / /___/ /_/ / /__/ ,< /  __/ /    
/_____/\__,_/ |___/\__, /\____/\____/_/ /_/\___/____/   /_____/\____/\___/_/|_|\___/_/     
                  /____/                                                                   
```

### How to use
- git clone this to your local directory
- ensure that locker_backup.js is executable (`chmod +x locker_backup.js`)
- Make $HOME/bin directory (this is where all extra custom scripts should live)
- Add $HOME/bin to your PATH
- make symlink to $HOME/bin/locker_backup
`ln -s $HOME/path/to/locker_backup/locker_backup.js $HOME/bin/locker_backup`
- run either with config.json file in this directory or with command line arguments
`locker_backup from_dir to_dir`

### Why I created this?
I was messing about with creating come custom scripts and wanted an easy and fast backup script using rsync. So decided to write it in node.js.
It is basically a wrapper around mattijs' node-rsync module: https://github.com/mattijs/node-rsync so all credit goes to him.

### License
MIT
