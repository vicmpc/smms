<template>
    <div class="account-management">
        <el-tabs type="border-card">
            <el-tab-pane label="账号管理">
                <MyAccount></MyAccount>
            </el-tab-pane>
            <el-tab-pane label="添加账号">
                <AddAccount></AddAccount>
            </el-tab-pane>
            <el-tab-pane label="修改密码">
                <ChangePwd></ChangePwd>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>
<script>
  //账号管理
  import MyAccount from './MyAccount/MyAccount.vue'
  //添加账号
  import AddAccount from './AddAccount/AddAccount.vue'
  //修改密码
  import ChangePwd from './ChangePwd/ChangePwd.vue'

  export default {
    components: {
      MyAccount,
      AddAccount,
      ChangePwd
    }
  }
</script>