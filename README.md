How to use:
    Run "npm i" in all of the modules to install dependencies.
    Run DDX_Complete to use the utilities.  It will launch ALL of them currently.

Update cycle:
    Add new modules, both front end and back end modules, separately, and as standalone tools 
    Add new modules to DDX_Complete launching script
    Incorporate modules to main React client
    Phase out external modules
    repeat

Structure:
    Front end modules are created as separate npm projects
    Back end modules will be handled in client classes.
    Python modules are handled as scripts run with child_process || as Flask servers.
    
