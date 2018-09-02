async function customers() {
  try {
    const customer = await getCustomer(1);
    const movies = await getTopMovies();
    if (customer.isGold) {
      const email = await sendEmail(customer.email, movies);
    }
    console.log("Customers: ", customer);
    console.log("Top Movies: ", movies);
    console.log("Email sent...");
  } catch (err) {
    console.log("error: ", err);
  }
}

function getCustomer(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email"
      });
    }, 1000);
  });
}

function getTopMovies() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 1000);
  });
}

function sendEmail(email, movies) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
customers();
