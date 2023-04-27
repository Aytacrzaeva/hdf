let addBtn=document.getElementById("addBtn")
const companyNameInp = document.getElementById("companyName")
const contactNameInp = document.getElementById("contactName")
const contactTitleInp = document.getElementById("contactTitle")
const items=document.getElementById("items")

addBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let companyNameValue = companyNameInp.value
    let contactNameValue = contactNameInp.value
    let contactTitleValue = companyNameInp.value

    let product = {
        compacyName:companyNameValue ,
        contactName:contactNameValue,
        contactTitle:contactTitleValue
    }
    axios.post(API_URL, product).then(res => console.log(res))
    companyNameInp.value="",
    contactNameInp.value="",
    contactTitleInp.value="",
    renderList()
})

async function deleteProduct(id) {
  await axios.delete(`${API_URL}/${id}`) // 2san
  renderList() // 1sn
}

function renderList(){
axios.get(API_URL).then(res => {
        let html = ""
        for (let i = 0; i < res.data.length; i++) {
            const {
                id,
                companyName,
                contactName,
                contactTitle,
            } = res.data[i]
            html += `
            <tr>
            <th scope="row">${id}</th>
            <td>${companyName}</td>
            <td>${contactName}</td>
            <td>${contactTitle}</td>
            <td>    <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onclick="editProduct(${id})"
            >
              Edit
            </button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button></td>
          </tr>
            `
        }
        items.innerHTML = html
    })}
    renderList()
