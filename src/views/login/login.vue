<template>
  <div class="card">
    <a-card title="请先登录" style="width: 500px">
      <a-form layout="horizontal" :form="form" @submit="handleSubmit">
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: '请输入用户名!' }] },
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input-password
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码！' }] },
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("要发送的数据: ", values);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.card {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
