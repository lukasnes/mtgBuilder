const sidebarBtn = document.querySelector('#sidebar-btn')
const sidebar = document.querySelector('#sidebar')
const mainSection = document.querySelector('#content')
const cardSection = document.querySelector('#card-section')

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
//===========================================================
const displayCards = arr => {
    cardSection.innerHTML = ""
    arr.forEach(card => {
        console.log(card)
        if(card.imageUrl){
            let cardElement = document.createElement('div')
            cardElement.innerHTML = `
                <img src="${card.imageUrl}"/>
            `
            cardSection.appendChild(cardElement)
        }
    })
}
//===========================================================
const filterForm = document.querySelector('#filters')

const filter = evt => {
    evt.preventDefault()
    let filtersCollection = document.querySelectorAll('.filter-input')
    let filtersObj = {}


    for(let i = 0; i < filtersCollection.length; i++){
        // console.log(filtersCollection[i])
        let currentFilter = filtersCollection[i]
        // console.log(filtersObj)
        if(currentFilter.value != ''){
            filtersObj[currentFilter.id] = currentFilter.value
        }
        if(currentFilter.id === 'colors' || currentFilter.id === 'types'){
            let arr = []
            // console.log(currentFilter)
            let checkboxContainers = currentFilter.children
            for(let j = 0; j < checkboxContainers.length; j++){
                // console.log(checkboxContainers[j].children[0])
                if(checkboxContainers[j].children[0].checked){
                    console.log(checkboxContainers[j].children[0])
                    arr.push(checkboxContainers[j].children[0].value)
                }
            }
            if(arr.length > 0){
                if(currentFilter.id === 'colors'){
                    arr = arr.join(',')
                }
                filtersObj[currentFilter.id] = arr
            } else {
                delete filtersObj[currentFilter.id]
            }
        }
        if(currentFilter.classList.contains('chosen-subtypes')){
            let arr = []
        }
        // console.log(filtersObj)
    }
    console.log(filtersObj)
    delete filtersObj[""]

    axios.post('/cards', filtersObj)
        .then(response => {
            let { data } = response
            displayCards(data)
        })
}

filterForm.addEventListener('submit', filter)
//========================================================
const subtypeBtn = document.querySelector('#subtypes')
const subtypeArr = []

const displayModal = evt => {
    const modal = document.querySelector('.subtypes-modal')
    modal.classList.toggle('open')
    modal.innerHTML = `
        <div id="modal-choices">
            <div id="choices-div">
                <p>Chosen Subtypes:</p>
            </div>
            <button onclick="displayModal(event)">x</button>
        </div>
        <div id="modal-main">
            <div id="modal-list-container">
                <ul id="modal-list">
                    <li>Artifact Types</li>
                    <li>Creature Types</li>
                    <li>Enchantment Types</li>
                    <li>Land Types</li>
                    <li>Spell Types</li>
                </ul>
            </div>
            <div id="modal-options-container"></div>
        </div>
    `
}

subtypeBtn.addEventListener('click', displayModal)
//========================================================