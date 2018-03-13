<template>
  <el-dialog
    :title="$t('label.remove_chennel_member')"
		:visible="this.$parent.removeDialogVisible"
		:show-close="false">
    <span>{{$t('message.remove_info')}}</span>
		<span slot="footer">
      <el-button @click="$emit('closeDialog', false)">{{$t('button.cancel')}}</el-button>
      <el-button type="primary" @click="this.$parent.removeChannelTerminal">{{$t('button.accept')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
	name: 'remove-terminal-dialog'
}
</script>

