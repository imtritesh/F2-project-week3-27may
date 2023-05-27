
async function fetchData() {
  let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
  let data = await response.json();
  return data;
}


fetchData().then((data) => {
  let dataArr = data;
  function printData(dataArr) {
    dataArr.forEach((data) => {
      let tableBody = document.querySelector("tbody");
      let tr = document.createElement("tr");
      tr.innerHTML = `
    <td class="left"><span><img src="${data.image}" alt=""></span>${
        data.name
      }</td>
    <td>${data.symbol}</td>
    <td>$${data.current_price}</td>
    <td>$${data.total_volume}</td>
    <td class="percentColor-${
      data.price_change_percentage_24h.toFixed(2) > 0 ? "1" : "2"
    }">${data.price_change_percentage_24h.toFixed(2)}%</td>
    <td>Mkt Cap: $${data.market_cap_change_24h}</td>
  `;
      tableBody.append(tr);
    });
  }
  printData(dataArr);

  //function for sorting by mktCap
  let btnMkt = document.querySelector(".btnMkt");
  btnMkt.addEventListener("click", sortByMkt);
  function sortByMkt() {
    let mktSort = dataArr.sort((a, b) => {
      return a.market_cap_change_24h - b.market_cap_change_24h;
    });
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    printData(mktSort);
  }

  //function for sorting by percentage
  let btnPer = document.querySelector(".btnPer");
  btnPer.addEventListener("click", sortByPer);
  function sortByPer() {
    let perSort = dataArr.sort((a, b) => {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    });
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    printData(perSort);
  }

  // Function for searching
  let searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", search);
  function search() {
    let searchText = searchInput.value.toLowerCase();
    let filteredData = dataArr.filter((data) => {
      return (
        data.name.toLowerCase().includes(searchText) ||
        data.symbol.toLowerCase().includes(searchText)
      );
    });
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    printData(filteredData);
  }
});
