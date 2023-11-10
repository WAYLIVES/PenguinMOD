// Name: Useful Blocks
// Id: usefulblocks
// Description: Here you will find the basic, useful and frequently used blocks for the development of various projects.
// Created by: WAYLIVES (https://scratch.mit.edu/users/WAYLIVES/)




(function (Scratch) {
  "use strict";

  
  const computing = new Map();
  const computed = new Map();

  const pingWebSocket = async (uri) => {
    if (!(await Scratch.canFetch(uri))) {
      return {
        expires: 0,
        value: false,
      };
    }

    let ws;
    try {
      ws = new WebSocket(uri);
    } catch (e) {
      return {
        expires: 0,
        value: false,
      };
    }

    let timeoutId;
    const isUp = await new Promise((resolve) => {
      ws.onopen = () => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      };
      ws.onclose = () => {
        resolve(false);
      };
      ws.onerror = () => {
        resolve(false);
      };
      timeoutId = setTimeout(() => {
        ws.close();
      }, 5000);
    });

    ws.close();
    clearTimeout(timeoutId);

    return {
      expires: Date.now() + 60000,
      value: isUp,
    };
  };
  

  const cachedPingWebSocket = (uri) => {
    const computingEntry = computing.get(uri);
    if (computingEntry) {
      return computingEntry.then((entry) => entry.value);
    }

    const computedEntry = computed.get(uri);
    if (computedEntry && Date.now() < computedEntry.expires) {
      return computedEntry.value;
    }

    const promise = pingWebSocket(uri);
    computing.set(uri, promise);
    return promise.then((entry) => {
      computing.delete(uri);
      computed.set(uri, entry);
      return entry.value;
    });
  };
  


  
  class lmsmcutils {
    getInfo() {
      return {              
        id: "FreeServers",
        name: "FREE SERVERS",
        color1: "#E22648",
        color2: "#B01D38",
        color3: "#B01D38",
        
        
        blocks: [
          
          {
            blockType: "label",
            text: "Is cloud data server up?",
          },
          
          {
            opcode: "ping",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is cloud data server up [SERVER] ?",
            arguments: {
              SERVER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            blockType: "label",
            text: "Free servers:",
          },



          
          
          {
            opcode: "1",
            blockType: Scratch.BlockType.REPORTER,
            text: "1 - (wss://clouddata.turbowarp.org)",
          },

          {
            opcode: "2",
            blockType: Scratch.BlockType.REPORTER,
            text: "2 - (ws://127.0.0.1:3000/)",
          },

          {
            opcode: "3",
            blockType: Scratch.BlockType.REPORTER,
            text: "3 - (wss://cloudlink.mikedev101.cc/0.2.0)",
          },

          {
            opcode: "4",
            blockType: Scratch.BlockType.REPORTER,
            text: "4 - (wss://cl4-test.meower.org)",
          },

          {
            opcode: "5",
            blockType: Scratch.BlockType.REPORTER,
            text: "5 - (wss://cl4.tnix.dev/)",
          },

          {
            opcode: "6",
            blockType: Scratch.BlockType.REPORTER,
            text: "6 - (wss://cl.ssh.surf/)",
          },

          {
            opcode: "7",
            blockType: Scratch.BlockType.REPORTER,
            text: "7 - (wss://cl2.ssh.surf/)",
          },

          {
            opcode: "8",
            blockType: Scratch.BlockType.REPORTER,
            text: "8 - (wss://echoserver.redman13.repl.co)",
          },



          
              
        ],
      };
    }


    ping({ SERVER }) {
      return cachedPingWebSocket(SERVER);
    }

    1() {
      return 'wss://clouddata.turbowarp.org';
    }

    2() {
      return 'ws://127.0.0.1:3000/';
    }


    


  }
  Scratch.extensions.register(new lmsmcutils());
})(Scratch);
