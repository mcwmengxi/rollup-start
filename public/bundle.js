// src/foo.js
var foo = 'hello world!';

var version = "1.0.0";

// src/main.js
function main () {
  console.log(foo);
  console.log(version);
}

export { main as default };
