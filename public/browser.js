const form = document.getElementById('form')
const inputval = document.getElementById('name')
const list = document.querySelector('.ll')



form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(inputval.value)
    axios.post('/create-item', { name: inputval.value }).then((res) => {
        // window.location.pathname = '/'
        console.log(res?.data?.data)
        inputval.value = ''
        inputval.focus()
        list.insertAdjacentHTML('beforeend', `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${res?.data?.data?.name}</span>
            <div>
              <button data-id='${res?.data?.data?._id}' class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button  data-id='${res?.data?.data?._id}'  class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`)
    })
})


const getList = () => {
    axios.get('/get-list').then((res) => {
        console.log(res)
        list.insertAdjacentHTML("beforeend", res?.data?.data?.map((item) => {
            return ` <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item?.name}</span>
            <div>
              <button data-id='${item?._id}' class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button  data-id='${item?._id}'  class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`
        }).join(''))
    })
}
getList()

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-me')) {
        const propm = prompt('Enter Edit', e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
        if (propm) {
            axios.post('/update-item', { name: propm, id: e.target.getAttribute('data-id') }).then((res) => {
                console.log(res, e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = res.data.data
            })
        }
    }
    if (e.target.classList.contains('delete-me')) {
        if (confirm('Do you wannna delete this item?')) {
            axios.post('/delete-item', { name: e.target.parentElement.parentElement.querySelector('.item-text').innerHTML }).then((res) => {
                console.log(res)
                e.target.parentElement.parentElement.remove()
            })
        }
    }
})
