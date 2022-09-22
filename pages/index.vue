<script setup lang="ts">
    const { data: categoriesData } = await useFetch('/api/CategoriesLatest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
    
    // const {data: diagnosticsData} = await useFetch('/api/DiagnosticsLatest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
    </script>
    
    <template>
        <div>
            Hello
            <div>{{categoriesData}}</div>
            <!-- <div>{{diagnosticsData}}</div> -->
        </div>
    </template>
    
    
    
    
    <style>
    
    </style>
    