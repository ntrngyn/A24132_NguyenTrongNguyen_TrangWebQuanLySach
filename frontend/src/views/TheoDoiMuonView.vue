<template>
  <div>
    <TheoDoiMuonList :danhSachDonMuon="danhSachDonMuon" @duyetMuon="duyetMuon" @xacNhanTra="xacNhanTra"
      @xoaDonMuon="xoaDonMuon" />
  </div>
</template>

<script>
import TheoDoiMuonList from "@/components/TheoDoiMuonList.vue";
import axios from "axios";

export default {
  components: { TheoDoiMuonList },
  data() {
    return {
      danhSachDonMuon: [],
    };
  },
  mounted() {
    this.loadDanhSachMuon();
  },
  methods: {
    async loadDanhSachMuon() {
      try {
        const res = await axios.get('https://a24132-nguyentrongnguyen.onrender.com/api/theodoimuonsach');
        this.danhSachDonMuon = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn mượn:", error);
      }
    },
    async duyetMuon(don) {
      try {
        await axios.put(`https://a24132-nguyentrongnguyen.onrender.com/api/muonsach/duyet/${don._id}`);
        this.loadDanhSachMuon();
      } catch (error) {
        console.error("Lỗi khi duyệt mượn:", error);
      }
    },
    async xacNhanTra(don) {
      try {
        await axios.put(`https://a24132-nguyentrongnguyen.onrender.com/api/muonsach/tra/${don._id}`);
        this.loadDanhSachMuon();
      } catch (error) {
        console.error("Lỗi khi xác nhận trả:", error);
      }
    },
    async xoaDonMuon(don) {
      if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) return;

      try {
        await axios.delete(`https://a24132-nguyentrongnguyen.onrender.com/api/theodoimuonsach/${don._id}`);
        this.danhSachDonMuon = this.danhSachDonMuon.filter(item => item._id !== don._id);
        alert("Xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa yêu cầu:", error);
        alert("Xóa không thành công!");
      }
    },
  }
};
</script>
