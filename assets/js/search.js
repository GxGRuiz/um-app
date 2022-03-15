function movieSearch() {

    let filter, table, tr, td, i, txtValue;
    filter = searchBar.value.toUpperCase();
    table = document.getElementById("movie-list");
    tr = table.getElementsByTagName("tr");
  
  
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }