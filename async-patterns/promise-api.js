// Resolved promises

const p1 = Promise.resolve({ id: 1 });
p1.then(result => console.log(result));

const p2 = Promise.reject(new Error("Cannot resolve this one..."));
p2.catch(err => console.log(err));

// Running promises in parallel

const p3 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation one...");
    resolve(1);
  }, 2000);
});

const p4 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation two...");
    resolve(2);
  }, 2000);
});

const p5 = new Promise(reject => {
  setTimeout(() => {
    reject(new Error("something went wrong"));
  }, 2000);
});
Promise.all([p3, p4, p5])
  .then(result => console.log("result: ", result))
  .catch(err => console.log("error: ", err.message));

Promise.race([p3, p4])
  .then(result => console.log("result: ", result))
  .catch(err => console.log("err: ", err));
