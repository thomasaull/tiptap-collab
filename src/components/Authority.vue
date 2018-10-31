<template>

<div>
  Editor 1 <br>
  <Editor
    ref="editorAlpha"
    @receiveSteps="receiveSteps"
  />

  Editor 2 <br>
  <Editor
    ref="editorBravo"
    @receiveSteps="receiveSteps"
  />
</div>

</template>

<script>
import Editor from '@/components/Editor.vue'

export default {
  name: 'Notebook',
  components: { Editor },

  data() {
    return {
      authority: {
        steps: [],
        stepClientIDs: []
      }
    }
  },

  methods: {
    receiveSteps(version, steps, clientID) {
      if (version != this.authority.steps.length) return

      // Apply and accumulate new steps
      steps.forEach(step => {
        this.authority.steps.push(step)
        this.authority.stepClientIDs.push(clientID)
      })

      this.$refs.editorAlpha.updateDoc()
      this.$refs.editorBravo.updateDoc()
    },

    stepsSince(version) {
      return {
        steps: this.authority.steps.slice(version),
        clientIDs: this.authority.stepClientIDs.slice(version)
      }
    }
  }
}
</script>
