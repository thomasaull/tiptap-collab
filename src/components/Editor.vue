<template>

<div class="Editor">

  <Editor 
    ref="editor"
    :extensions="extensions"
    @update="editorUpdate"
  >

    <div slot="content" slot-scope="props">
      <p>Hi, I'm just a boring paragraph</p>
    </div>

  </Editor>

</div>

</template>

<script>
import { Editor } from 'tiptap'
import Collab from '@/extensions/Collab'
import {
  receiveTransaction,
  sendableSteps,
  getVersion
} from 'prosemirror-collab'

export default {
  components: { Editor },

  data() {
    return {
      extensions: [new Collab()]
    }
  },

  methods: {
    editorUpdate(event) {
      let sendable = sendableSteps(event.state)

      if (!sendable) return

      this.$emit(
        'receiveSteps',
        sendable.version,
        sendable.steps,
        sendable.clientID
      )
    },

    updateDoc() {
      const view = this.$refs.editor.view

      let newData = this.$parent.stepsSince(getVersion(view.state))

      const transaction = receiveTransaction(
        view.state,
        newData.steps,
        newData.clientIDs
      )

      view.dispatch(transaction)
    }
  }
}
</script>
