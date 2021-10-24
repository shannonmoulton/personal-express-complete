const trash = document.getElementsByClassName("fa-trash");
const paymentUpdate = document.getElementsByClassName("paid");

// document.querySelector("option").addEventListener("click", function () {
//   const monthSelection = document.querySelector("option").innerText;
//   document.querySelector("h3").innerText = monthSelection;
//   console.log(monthSelection);
// });

document.querySelector("button").addEventListener("click", function () {
  const companyBill = this.parentNode.parentNode.childNodes[1].innerText;
  const dateOfBill = this.parentNode.parentNode.childNodes[3].innerText;
  const amount = this.parentNode.parentNode.childNodes[5].innerText;

  fetch("bills", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyBill: companyBill,
      dateOfBill: dateOfBill,
      amount: amount,
      paymentStatus: paymentStatus,
    }),
  })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      console.log(data);
      window.location.reload(true);
    });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    // const companyBill = this.parentNode.parentNode.childNodes[1].innerText;
    // const dateOfBill = this.parentNode.parentNode.childNodes[3].innerText;
    // const amount = this.parentNode.parentNode.childNodes[5].innerText;
    // const paymentStatus = this.parentNode.parentNode.childNodes[7].innerText;
    console.log(element);
    fetch("/delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: element.value,
        // companyBill: companyBill,
        // dateOfBill: dateOfBill,
        // amount: amount,
        // paymentStatus: paymentStatus,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
Array.from(paymentUpdate).forEach(function (element) {
  element.addEventListener("click", function (e) {
    let pay = e.target.value;
    fetch("update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: pay,
        pay: pay,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});
