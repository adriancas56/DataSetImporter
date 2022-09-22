<script setup lang="ts">
    import { ref } from 'vue';
        // import axios from '@nuxtjs/axios'
    const categoryName = ref('')
    const categoryDescription = ref('')
    const spreadsheet = ref(null)
    
    const createCategory = async () => {
        const formCategory = new FormData()
        formCategory.append('name', categoryName.value)
        formCategory.append('description', categoryDescription.value)
        formCategory.append('spreadsheet', spreadsheet.value.files[0])
    
        const { data, error } = await useFetch(`/importer-api/Category`, { initialCache: false, method: 'post', body: formCategory,
        headers: { Authorization: `Bearer ${useCookie('token').value}`}})
        console.log(error)
        console.log(data.value)
     }
    
    </script>
    
    <template>
        <div>
            Importer Process
            <form @submit.prevent>
                <BaseInput v-model="categoryName" label="Category Name" type="text" name="categoryName" id="categoryName"/>
                <BaseInput v-model="categoryDescription" label="Category Description" type="text" name="categoryDes" id="categoryDes"/>
                <input ref="spreadsheet"  type="file" name="categoryFile" id="categoryFile">
    
                <button class="p-5 bg-blue-500 text-white rounded-sm mt-5 " @click="createCategory">
                    Create Category
                </button>
            </form>
        </div>
    </template>