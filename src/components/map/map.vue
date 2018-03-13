<template>
  <div id="Map" style="width: 100%; height: 100%;"></div>
</template>
<script>
import BMap from 'BMap'

export default {
  name: 'Map',
  data () {
    return {
      lon: '120',
			lat: '36'
    }
  },
  mounted () {
    let map = new BMap.Map('Map')
		let point = new BMap.Point(this.lon, this.lat)
		map.centerAndZoom(point, 12)
  }
}
</script>

