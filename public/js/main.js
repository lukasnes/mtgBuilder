const sidebarBtn = document.querySelector('#sidebar-btn')
const sidebar = document.querySelector('#sidebar')
const mainSection = document.querySelector('section')

const toggleWich = evt => {
    let { target } = evt
    console.log(target)
    while(target.id != 'sidebar-btn'){
        target = target.parentNode
    }
    target.classList.toggle('open')
    sidebar.classList.toggle('open')
    mainSection.classList.toggle('open')
}

sidebarBtn.addEventListener('click', toggleWich)

const testBtn = document.querySelector('#test')
testBtn.addEventListener('click', () => {
    axios.get('/test')
        .then(response => {
            console.log(response.status)
        })
})

const filter = evt => {
    let filtersCollection = document.querySelector('filter-input')
    let filtersObj = {}


    for(let i = 0; i < filtersCollection.length; i++){
        if(filtersCollection[i].value != ''){
            filtersObj[filtersCollection[i].id] = filtersCollection[i].value
        }
    }
}