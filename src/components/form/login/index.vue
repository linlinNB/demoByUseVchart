<template>
  <nut-form
    :class="styles.loginFormContainer"
    ref="formRef"
    :model-value="formData"
  >
    <nut-form-item
      prop="tel"
      :rules="formConfig.tel.rules"
      :class="styles.formItem"
    >
      <nut-input v-model="formData.tel" :placeholder="formConfig.tel.placeholder" type="text" />
    </nut-form-item>

    <nut-form-item
      prop="smsCode"
      :rules="formConfig.smsCode.rules"
      :class="styles.formItem"
    >
      <nut-input
        v-model="formData.smsCode"
        :placeholder="formConfig.smsCode.placeholder"
        type="text"
      />
    </nut-form-item>

    <nut-form-item
      prop="agreeProtocol"
      :class="styles.agreeProtocolGroup"
    >
      <nut-radio-group direction="horizontal" v-model="formData.agreeProtocol">
        <nut-radio label="1">
          <view>
            我已阅读并同意
          </view>
          <a>《用户隐私政策》</a>
        </nut-radio>
      </nut-radio-group>
    </nut-form-item>
  </nut-form>
</template>

<script setup>
import styles from "./index.module.scss";
import { ref, defineExpose, defineEmits } from 'vue';
const formData = ref({
  name: '',
  tel: '',
  agreeProtocol: false,
});

// 暴露表单，方便调用
defineExpose({
  formRef,
})
const emits = defineEmits([
  'submit',
  'reset',
])

const formConfig = {
  tel: {
    placeholder: '请输入手机号码',
    rules: [
      { required: true, message: '请填写姓名' },
    ]
  },
  smsCode: {
    placeholder: '请输入验证码',
    rules: [
      { required: true, message: '请填写姓名' },
    ]
  },
  agreeProtocol: {
    rules: [
      { required: true, message: '同意隐私协议' },
    ]
  }
}

const formRef = ref(null);

const reset = () => {
  formRef.value?.reset();
};

const submit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log('success:', formData.value);
      emits('submit', formData.value);
    } else {
      console.warn('error:', errors);
    }
  });
};


const asyncValidator = (val) => {
  const telReg = /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/;
  return new Promise((resolve, reject) => {
    console.log('模拟异步验证中...');
    setTimeout(() => {
      if (!val) {
        reject('请输入联系电话');
      } else if (!telReg.test(val)) {
        reject('联系电话格式不正确');
      } else {
        resolve('');
      }
    }, 1000);
  });
};


const customBlurValidate = (prop) => {
  formRef.value?.validate(prop).then(({ valid, errors }) => {
    if (valid) {
      console.log('success:', formData.value);
    } else {
      console.warn('error:', errors);
    }
  });
};

</script>
