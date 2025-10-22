const musicListContainer = document.querySelector(".tracks-list")
const statsContainer = document.querySelector(".stats")

async function getMusicTracks() {
    const apiResponse = await fetch("https://kitek.ktkv.dev/songs.json")
    const tracksArray = await apiResponse.json()

    let overallTime = 0
    
    for (let counter = 0; counter < tracksArray.length; counter++) {
        const listItem = document.createElement("li")
        listItem.classList.add("track-item")
        
        const trackInfo = tracksArray[counter].track
        const performers = trackInfo.artists

        const orderElement = document.createElement("div")
        orderElement.classList.add("track-number")
        orderElement.textContent = counter + 1
        
        const primaryContent = document.createElement("div")
        primaryContent.classList.add("track-main")
        
        const detailsContainer = document.createElement("div")
        detailsContainer.classList.add("track-info")
        
        const songTitle = document.createElement("div")
        songTitle.classList.add("track-name")
        songTitle.textContent = trackInfo.name

        const performersList = document.createElement("div")
        const namesList = performers.map(performer => performer.name)
        performersList.textContent = namesList

        const albumInfo = document.createElement("div")
        albumInfo.textContent = trackInfo.album.name

        const albumCover = document.createElement("img")
        albumCover.classList.add("album-art")
        albumCover.src = trackInfo.album.images[0].url
        albumCover.alt = trackInfo.album.images[0].url

        const additionalInfo = document.createElement("div")
        additionalInfo.classList.add("track-meta")
        
        const timeElement = document.createElement("div")
        timeElement.classList.add("duration")
        const milliseconds = trackInfo.duration_ms
        timeElement.textContent = (milliseconds / 60000).toFixed(2)

        const popularityIndicator = document.createElement("div")
        popularityIndicator.classList.add("popularity")
        popularityIndicator.textContent = "♪ " + trackInfo.popularity

        additionalInfo.appendChild(timeElement)
        additionalInfo.appendChild(popularityIndicator)
        detailsContainer.appendChild(songTitle)
        detailsContainer.appendChild(performersList)
        detailsContainer.appendChild(albumInfo)
        primaryContent.appendChild(albumCover)
        primaryContent.appendChild(detailsContainer)
        listItem.appendChild(orderElement)
        listItem.appendChild(primaryContent)
        listItem.appendChild(additionalInfo)
        musicListContainer.appendChild(listItem)
        overallTime += milliseconds
    }

    const statsOutput = document.createElement("h5")
    statsOutput.classList.add("total-duration")

    const hoursTotal = Math.floor(overallTime / 3600000)
    const minutesTotal = Math.floor((overallTime % 3600000) / 100000)
    statsOutput.textContent = "Треков: " + tracksArray.length + " Общая длительность: " + hoursTotal + " ч " + minutesTotal + " мин "

    statsContainer.appendChild(statsOutput)
}

getMusicTracks()