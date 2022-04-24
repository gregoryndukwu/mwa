const promise1 = new Promise((resolve, reject) => {
  let number = Math.random();
  setTimeout(() => {
    if (number > 0.5) {
      resolve();
    } else {
      reject("Promise 1 Error Message");
    }
  }, 3000);
});

promise1
  .then((num) => {
    console.log("Done", num);
  })
  .catch((err) => {
    console.log("Error.");
    console.log(err);
  });

readFromDatabase().then(function (docs) {});

readFromDatabase().then(handelReturnData(docs)).catch(handleError(err));

const promise2 = new Promise((resolve, reject) => {
  let number = Math.random() + 0.5;
  setTimeout(() => {
    if (number > 0.5) {
      resolve();
    } else {
      reject("Promise 2 Error Message");
    }
  }, 3000);
});

promise2
  .then((num) => {
    console.log("Done2", num);
  })
  .catch((err) => {
    console.log("Error.");
    console.log(err);
  });
