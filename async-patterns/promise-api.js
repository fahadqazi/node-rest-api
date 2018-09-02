const p1 = Promise.resolve({ id: 1 });
p1.then(result => console.log(result));

const p2 = Promise.reject(new Error("Cannot resolve this one..."));
p2.catch(err => console.log(err));
