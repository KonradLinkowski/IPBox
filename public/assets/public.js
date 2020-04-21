'use strict';
(async () => {
  const currentData = []

  const map = L.map('visitors-map', {
    worldCopyJump: true,
    maxZoom: 19,
    minZoom: 3
  })

  const markers = L.markerClusterGroup()
  map.addLayer(markers)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 20,
  }).addTo(map)

  const fetchData = async () => {
    return await (await fetch('info')).json()
  }

  const formatDate = date => {
    const dtf = new Intl.DateTimeFormat('en-gb', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }) 
    return dtf.format(new Date(date))
  }

  const renderTable = data => {
    const $table = document.querySelector('#visitors-table tbody')

    const $rowTemplate = document.createElement('tr')
    $rowTemplate.classList.add("visitors__row")
    const $cellTemplate = document.createElement('td')
    $cellTemplate.classList.add("visitors__tcell")

    const createCell = text => {
      const $cell = $cellTemplate.cloneNode(true)
      $cell.textContent = text
      return $cell
    }

    data.forEach(datum => {
      const $row = $rowTemplate.cloneNode(true)
      $row.appendChild(createCell(datum.position))
      $row.appendChild(createCell(datum.ip))
      $row.appendChild(createCell(datum.country))
      $row.appendChild(createCell(datum.region))
      $row.appendChild(createCell(datum.postalCode))
      $row.appendChild(createCell(datum.organization))
      $row.appendChild(createCell(datum.latitude))
      $row.appendChild(createCell(datum.longitude))
      $row.appendChild(createCell(formatDate(datum.createdAt)))
      $table.insertBefore($row, $table.firstChild)
    })
  }

  const createMarkers = (data) => {
    data.forEach(datum => {
      if (datum.latitude !== undefined && datum.longitude != undefined) {
        const marker = L.marker([datum.latitude, datum.longitude])
        markers.addLayer(marker)
        marker.on('mouseover', e => {
          e.target.openPopup()
        })
        marker.on('mouseout', e => {
          e.target.closePopup()
        })
        marker.bindPopup([
          `# ${datum.position}`,
          `IP: ${datum.ip}`,
          `Country: ${datum.country}`,
          `Region: ${datum.region}`,
          `Lat: ${datum.latitude}`,
          `Lon: ${datum.longitude}`,
          `Org: ${datum.organization}`,
          `Date: ${formatDate(datum.createdAt)}`
        ].join('<br>'))
      }
    })
  }

  const filterNewData = data => {
    return data.filter(datum => !currentData.find(currentDatum => currentDatum._id === datum._id))
  }

  const run = async () => {
    const data = await fetchData()
    const newData = filterNewData(data)
    Array.prototype.unshift.apply(currentData, newData)
    if (newData.length) {
      const firstTrue = newData.find(datum => datum.latitude && datum.longitude)
      map.setView([firstTrue.latitude, firstTrue.longitude], 13)
      renderTable(newData)
      createMarkers(newData)
    }
  }

  setInterval(run, 3000)
  run()
})();
