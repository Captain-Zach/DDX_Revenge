const { spawn, exec, fork } = require("child_process");

// This simple script opens my server and client for me. 
// Might be useful for launching the rest of the modules as well

let server =  fork("server/server.js", []);

let gc_client = spawn("dir", ["&&", "cd", "gc_client", "&&", "npm", "start" ], {cwd: process.cwd(), env: process.env, shell: true, detached: true});
// let gc_client = spawn("dir");

// gc_client.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`);
// })

// gc_client.stderr.on("data", (data) => {
//     console.log(`stderr: ${data}`);
// })


console.log("Hello world");
let client =  spawn("cd", ["client", "&&", "npm", "start"], {cwd: process.cwd(), shell: true, detached: true});
