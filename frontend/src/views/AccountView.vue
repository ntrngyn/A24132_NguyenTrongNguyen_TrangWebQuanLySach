<style scoped>
.account-view {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.info-item {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.label {
  display: block;
  color: #6c757d;
  font-size: 0.9em;
  margin-bottom: 0.5rem;
}

.value {
  font-weight: 500;
  color: #2c3e50;
}

.edit-btn {
  background: #4a90e2;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  border: none;
  width: 100%;
  font-size: 1rem;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.edit-btn:hover {
  opacity: 0.9;
}

@media (max-width: 640px) {
  .account-view {
    margin: 1rem;
    padding: 1rem;
  }
}
</style>

<template>
  <div class="account-view">
    <div class="profile-header">
      <h1>Thông Tin Cá Nhân</h1>
    </div>

    <div v-if="userInfo">
      <div v-if="!isEditing">
        <div class="info-item">
          <span class="label">Số điện thoại</span>
          <span class="value">{{ userInfo.sdt }}</span>
        </div>

        <div class="info-item">
          <span class="label">Họ và tên</span>
          <span class="value">{{ userInfo.hoTen }}</span>
        </div>

        <div v-if="userRole === 'docgia'" class="info-item">
          <span class="label">Ngày sinh</span>
          <span class="value">{{ formatDate(userInfo.ngaySinh) }}</span>
        </div>

        <div class="info-item">
          <span class="label">Vai trò</span>
          <span class="value">{{ userInfo.chucVu }}</span>
        </div>

        <button class="edit-btn" @click="toggleEdit">Chỉnh sửa</button>
      </div>

      <AccountForm v-else :user="userInfo" :role="userRole" :userId="userInfo._id" @update="fetchUser"
        @cancel="isEditing = false" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/services/accService'
import AccountForm from '@/components/AccountForm.vue'

export default {
  components: { AccountForm },
  data() {
    return {
      userInfo: null,
      isEditing: false
    }
  },
  computed: {
    ...mapState({
      userRole() {
        return this.$store.state.user.role
      },
      userID() {
        return this.$store.state.user._id
      }
    })
  },
  methods: {
    async fetchUser() {
      if (!this.userID) {
        console.error('Không tìm tài khoản!')
        return
      }
      try {
        const userData = await getUserInfo(this.userID, this.userRole)
        this.userInfo = {
          _id: userData._id,
          sdt: userData.SODIENTHOAI || 'Không có số điện thoại',
          diaChi: userData.DIACHI || 'Chưa cập nhật',
          role: this.userRole,
          hoTen:
            this.userRole === 'docgia'
              ? `${userData.HOLOT || ''} ${userData.TEN || ''}`
              : userData.HOTENNV || '',
          hoLot: userData.HOLOT || '',
          ten: userData.TEN || '',
          gioiTinh: userData.PHAI || '',
          chucVu:
            this.userRole === 'docgia'
              ? 'Độc giả'
              : userData.CHUCVU === 'QuanLyThuVien'
                ? 'Quản lý'
                : 'Nhân viên',
          ngaySinh:
            this.userRole === 'docgia' && userData?.NGAYSINH
              ? userData.NGAYSINH.split('T')[0]
              : ''
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin tài khoản:', error)
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
    },
    formatDate(dateString) {
      if (!dateString) return 'Chưa cập nhật'
      const [year, month, day] = dateString.split('-')
      return `${day}/${month}/${year}`
    }
  },
  mounted() {
    this.fetchUser()
  }
}
</script>
