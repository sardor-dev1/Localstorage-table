let customer = JSON.parse(localStorage.getItem("custom")) || [
  {
    fname: "Jasur",
    lname: "G'ofurov",
    phones: "+998939273298",
    region: "Andijon",
    budget: "-10_000",
  },
  {
    fname: "Akbar",
    lname: "Maripov",
    phones: "+998939923898",
    region: "Samarqand",
    budget: "1_000",
  },
  {
    fname: "Samandar",
    lname: "Aliyev",
    phones: "+9989992732323",
    region: "Toshkent",
    budget: "-30_000",
  },
  {
    fname: "Sayfullo",
    lname: "Sharipov",
    phones: "+998949172128",
    region: "Namangan",
    budget: "20_000",
  },
];

const form = document.querySelector(".form");
const inputfirstname = document.querySelector("#fname");
const inputlastname = document.querySelector("#lname");
const inputphones = document.querySelector("#phones");
const inputregion = document.querySelector("#region");
const inputbudget = document.querySelector("#budget");

const firstname = document.querySelector("#sorting__fname");
const lastname = document.querySelector("#sorting__lname");
const budget = document.querySelector("#sorting__budget");
const filterRegionSelect = document.querySelector("#region__register");
const filterBudjetSelect = document.querySelector("#filter__budget");

function sortingString(value, type) {
  if (value === "descending") {
    customer.sort((a, b) => {
      let first = a[type].toLowerCase();
      let second = b[type].toLowerCase();
      if (second > first) return 1;
      if (second < first) return -1;
      return 0;
    });
  } else if (value === "ascending") {
    customer.sort((a, b) => {
      let first = a[type].toLowerCase();
      let second = b[type].toLowerCase();
      if (second > first) return -1;
      if (second < first) return 1;
      return 0;
    });
  }
  createCustomer(customer);
}

function filterRegion(region) {
  let rescustomers;
  if (region === "all") {
    createCustomer(customer);
  } else {
    rescustomers = customer.filter(
      (customer) => customer.region.toLowerCase() === region.toLowerCase()
    );
  }
  createCustomer(rescustomers);
}

function filterBudjet(value, type) {
  if (value === "all") {
    createCustomer(customer);
  } else {
    let filterBud = customer.filter((cust) => {
      if (value === "descending") {
        return cust[type] >= 0;
      } else {
        return cust[type] < 0;
      }
    });
    createCustomer(filterBud);
  }
}

filterBudjetSelect.addEventListener("change", (e) => {
  filterBudjet(e.target.value, "budget");
});

filterRegionSelect.addEventListener("change", (e) => {
  filterRegion(e.target.value);
});

firstname.addEventListener("change", (e) => {
  sortingString(e.target.value, "fname");
});

lastname.addEventListener("change", (e) => {
  sortingString(e.target.value, "lname");
});

const tbody = document.querySelector(".tbody");
function createCustomer(data) {
  while (tbody.firstChild) {
    tbody.firstChild.remove();
  }
  data.forEach((custom, index) => {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${custom.fname}</td>
            <td>${custom.lname}</td>
            <td>${custom.phones}</td>
            <td>${custom.region}</td>
            <td>${custom.budget} $ </td>
        `;
    tbody.appendChild(tableRow);
  });
}
createCustomer(customer);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!inputfirstname.value.trim()) {
    return alert("firstname to'liq kiriting");
  }
  if (!inputlastname.value.trim()) {
    return alert("lastname to'liq kiriting");
  }
  if (!inputphones.value.trim()) {
    return alert("phones to'liq kiriting");
  }
  if (!inputregion.value.trim()) {
    return alert("region to'liq kiriting");
  }

  if (!inputbudget.value.trim()) {
    return alert("budget to'liq kiriting");
  }

  let newCustom = {
    id: "5",
    fname: inputfirstname.value,
    lname: inputlastname.value,
    phones: inputphones.value,
    region: inputregion.value,
    budget: inputbudget.value,
  };
  customer.push(newCustom);
  createCustomer(customer);
  localStorage.setItem("custom", JSON.stringify(customer));

  inputfirstname.value = "";
  inputlastname.value = "";
  inputphones.value = "";
  inputregion.value = "";
  inputbudget.value = "";
});
