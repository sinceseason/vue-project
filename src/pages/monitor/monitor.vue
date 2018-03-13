<template>
    <div style="width: 100%; height: 100%;">
        <map-view></map-view>
    </div>
</template>
<script>
import Map from '@/components/map/map'

export default {
    name: 'monitor',
    components: {
        'map-view': Map
    }
}
</script>

