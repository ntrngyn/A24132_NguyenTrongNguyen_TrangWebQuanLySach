<style scoped>
.form-container {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
}

.form-input:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.25);
}

.radio-group {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-save {
  background: #4a90e2;
  color: white;
}

.btn-cancel {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
}
</style>

<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-body">
        <h5 class="card-title mb-4">Thông Tin Cá Nhân</h5>

        <form @submit.prevent="saveChanges">
          <!-- Địa chỉ -->
          <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input v-model="form.diaChi" class="form-control" placeholder="Nhập địa chỉ">
          </div>

          <!-- Họ và tên -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Họ lót</label>
              <input v-model="form.hoLot" class="form-control" placeholder="Nhập họ lót">
            </div>
            <div class="col">
              <label class="form-label">Tên</label>
              <input v-model="form.ten" class="form-control" placeholder="Nhập tên">
            </div>
          </div>

          <!-- Ngày sinh -->
          <div class="mb-3">
            <label class="form-label">Ngày sinh</label>
            <input v-model="form.ngaySinh" type="date" class="form-control">
          </div>

          <!-- Giới tính -->
          <div class="mb-4">
            <label class="form-label">Giới tính</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input v-model="form.gioiTinh" value="Nam" type="radio" class="form-check-input">
                <label class="form-check-label">Nam</label>
              </div>
              <div class="form-check">
                <input v-model="form.gioiTinh" value="Nữ" type="radio" class="form-check-input">
                <label class="form-check-label">Nữ</label>
              </div>
            </div>
          </div>

          <!-- Nút -->
          <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
              Hủy
            </button>
            <button type="submit" class="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/services/accService'

export default {
  props: {
    user: Object,
    role: String,
    userId: String
  },
  emits: ['cancel', 'update'],
  data() {
    return {
      form: {
        diaChi: this.user?.diaChi || '',
        hoLot: this.user?.hoLot || '',
        ten: this.user?.ten || '',
        hoTen: this.user?.hoTen || '',
        gioiTinh: this.user?.gioiTinh || 'Nam',
        ngaySinh: this.user?.ngaySinh ? this.user.ngaySinh.split('T')[0] : ''
      }
    }
  },
  watch: {
    user: {
      handler(newUser) {
        if (newUser) {
          this.form.diaChi = newUser.diaChi || ''
          this.form.hoLot = newUser.hoLot || ''
          this.form.ten = newUser.ten || ''
          this.form.hoTen = newUser.hoTen || ''
          this.form.ngaySinh = newUser.ngaySinh
            ? newUser.ngaySinh.split('T')[0]
            : ''
          this.form.gioiTinh = newUser.gioiTinh || 'Nam'
        }
      },
      immediate: true
    }
  },
  methods: {
    async saveChanges() {
      if (!this.userId) {
        alert('Lỗi: Không tìm thấy userId!')
        return
      }

      try {
        let updateData
        if (this.role === 'docgia') {
          updateData = {
            HOLOT: this.form.hoLot,
            TEN: this.form.ten,
            DIACHI: this.form.diaChi,
            NGAYSINH: this.form.ngaySinh,
            PHAI: this.form.gioiTinh
          }
        } else {
          updateData = {
            HOTENNV: this.form.hoTen,
            DIACHI: this.form.diaChi
          }
        }

        await updateUserInfo(this.role, this.userId, updateData)

        alert('Cập nhật thành công!')
        this.$emit('update')
        this.$emit('cancel')
      } catch (error) {
        alert('Có lỗi xảy ra!')
        console.error(error)
      }
    }
  }
}
</script>
