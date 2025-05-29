<template>
    <div class="profile-settings">
        <h2 class="title">{{ t('settings.profile') }}</h2>

        <el-descriptions border :column="1" class="descriptions" v-if="!isEditing">
            <el-descriptions-item :label="t('settings.avatar')">
                <el-avatar :size="64" :src="user.avatar" />
            </el-descriptions-item>
            <el-descriptions-item :label="t('settings.username')">
                {{ user.name || t('settings.unset') }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('settings.email')">
                <strong>{{ user.email }}</strong>
            </el-descriptions-item>
            <el-descriptions-item :label="t('settings.password')">
                {{ t('settings.unset') }}
            </el-descriptions-item>
        </el-descriptions>

        <el-form v-else label-width="80px" class="form">
            <el-form-item :label="t('settings.avatar')">
                <el-avatar :size="64" :src="user.avatar" class="mr-2" />
            </el-form-item>
            <el-form-item :label="t('settings.username')">
                <el-input size="large" v-model="form.name" :placeholder="t('settings.usernamePlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.email')">
                <el-input size="large" v-model="form.email" readonly />
                <small>{{ t('settings.emailTips') }}</small>
            </el-form-item>
            <el-form-item :label="t('settings.password')">
                <el-button size="large" type="default">{{ t('settings.resetPassword') }}</el-button>
                <div class="desc">{{ t('settings.passwordTips') }}</div>
            </el-form-item>
        </el-form>

        <div class="btns">
            <el-button v-if="!isEditing" @click="isEditing = true">{{ t('settings.edit') }}</el-button>
            <template v-else>
                <el-button type="primary" @click="onSubmit">{{ t('settings.save') }}</el-button>
                <el-button @click="isEditing = false">{{ t('settings.cancel') }}</el-button>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useI18n } from 'vue-i18n'
import { updateUserProfile } from '@/api/user'
import { ElMessage } from 'element-plus'

const { t } = useI18n({ useScope: 'global' })
const userStore = useUserStore()
const user = userStore.$state

const isEditing = ref(false)
const form = ref({
    name: user.name,
    email: user.email,
    team: '',
    avatar: user.avatar
})

const onSubmit = async () => {
    try {
        if (form.value.name !== user.name) {
            await updateUserProfile( form.value.name)
        }

        userStore.setUser({
            ...user,
            name: form.value.name
        })

        ElMessage.success(t('settings.updateSuccess'))
        isEditing.value = false
    } catch (err) {
        console.error(err)
        ElMessage.error(t('settings.updateFail'))
    }
}

</script>

<style scoped>
.profile-settings {
    padding: 20px;
    border-radius: 8px;
    border: 1px solid var(--el-border-color);
    background: var(--el-bg-color);
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
}

.btns {
    margin-top: 24px;
}

.desc {
    font-size: 12px;
    color: #888;
    margin-top: 3px;
    margin-left: 10px;
}
</style>
