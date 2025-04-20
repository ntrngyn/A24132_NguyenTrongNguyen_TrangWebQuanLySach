<style scoped>
.home-container {
  padding: 2rem 1rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-indicator {
  font-weight: 500;
  color: #4a5568;
}
</style>

<template>
  <div class="home-container">
    <InputSearch v-model="search" />

    <div class="books-grid">
      <SachCard v-for="sach in paginatedBooks" :key="sach.MASACH" :sach="sach" :nxbs="nxbs" />
    </div>

    <div class="pagination-controls">
      <button class="btn-outline" @click="prevPage" :disabled="currentPage === 1">
        ← Trước
      </button>
      <span class="page-indicator">
        Trang {{ currentPage }} / {{ totalPages }}
      </span>
      <button class="btn-primary" @click="nextPage" :disabled="currentPage >= totalPages">
        Sau →
      </button>
    </div>
  </div>
</template>

<script>
import SachCard from '@/components/SachCard.vue'
import InputSearch from '@/components/InputSearch.vue'
import { fetchBooks } from '@/services/sachService'
import { fetchNXB } from '@/services/nxbService'

export default {
  components: {
    SachCard,
    InputSearch
  },
  data() {
    return {
      sachList: [],
      search: '',
      nxbs: [],
      currentPage: 1,
      pageSize: 8
    }
  },
  mounted() {
    this.loadBooks()
    this.loadNXBs()
  },
  computed: {
    filteredBooks() {
      return this.sachList.filter(book => {
        const keyword = this.search.toLowerCase().trim()
        const manxbValue = book.MANXB?._id || book.MANXB?.MANXB || ''

        // Tìm NXB trong danh sách nxbs
        const nxb = this.nxbs.find(n => String(n._id) === String(manxbValue))
        const tenNXB = nxb ? nxb.TENNXB.toLowerCase() : ''
        return (
          book.TENSACH?.toLowerCase().includes(keyword) ||
          book.MASACH?.toLowerCase().includes(keyword) ||
          book.NGUONGOC_TACGIA?.toLowerCase().includes(keyword) ||
          (String(book.NAMXUATBAN) || '').toLowerCase().includes(keyword) ||
          tenNXB.includes(keyword)
        )
      })
    },

    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.pageSize)
    },

    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredBooks.slice(start, end)
    }
  },
  methods: {
    async loadBooks() {
      try {
        this.sachList = await fetchBooks()
      } catch (error) {
        console.error('Lỗi khi tải sách:', error)
      }
    },
    async loadNXBs() {
      try {
        this.nxbs = await fetchNXB()
      } catch (error) {
        console.error('Lỗi khi tải nhà xuất bản:', error)
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  }
}
</script>
