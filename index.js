let gifArray = []
function resetContainers(){
  const gifSummary = document.getElementById('gif-summary-container')
  const gifsFilter = document.getElementById('gif-bar')
  gifSummary.innerHTML = ''
  gifsFilter.innerHTML = ''
  fetchAll()
}

document.addEventListener('DOMContentLoaded',()=>{
  fetchAll()
})

function fetchAll(){
  fetch(' http://localhost:3000/gifs')
  .then(res=>res.json())
  .then(data=>renderData(data))
}

document.addEventListener('keydown',()=>{
  resetContainers()
})

function renderData(gifs){
  const gifSummary = document.getElementById('gif-summary-container')
  const gifsFilter = document.getElementById('gif-bar')
  gifs.forEach(gif=>{
    gifArray.push(gif)
    let gifDiv = document.createElement('div')
    let gifImage = document.createElement('img')
    gifImage.src = gif.image
    let gifName = document.createElement('h3')
    gifName.textContent = gif.name
    let gifSentiment = document.createElement('p')
    gifSentiment.textContent = gif.sentiment
    gifDiv.append(gifImage,gifName,gifSentiment)
    const gifFilter = document.createElement('p')
    gifFilter.setAttribute('id',gif.id)
    gifFilter.textContent = gif.name
    gifFilter.className = 'good-gif-filter'
    gifsFilter.append(gifFilter)
    gifSummary.append(gifDiv)
    gifFilter.addEventListener('click',()=>{
      handleFilter(gif)
    })
  })
}

function handleFilter(gif){
  fetch(`http://localhost:3000/gifs/${gif.id}`)
  .then(res=>res.json())
  .then(data=>{
    const gifSummary = document.getElementById('gif-summary-container')
    gifSummary.innerHTML = ''
    let gifDiv = document.createElement('div')
    let gifImage = document.createElement('img')
    gifImage.src = data.image
    let gifName = document.createElement('h3')
    gifName.textContent = data.name
    let gifSentiment = document.createElement('p')
    gifSentiment.textContent = data.sentiment
    gifDiv.append(gifImage,gifName,gifSentiment)
    gifSummary.append(gifDiv)
  })
}



