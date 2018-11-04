<template>

<div class="RawEditor" ref="editor">
  <div class="RawEditor-content" ref="content">
    <p>Example Content</p>
  </div>
</div>

</template>

<script>
import { EditorState } from "prosemirror-state"; // eslint-disable-line
import { EditorView } from "prosemirror-view"; // eslint-disable-line
import { Schema, DOMParser } from "prosemirror-model"; // eslint-disable-line
// import { schema } from "prosemirror-schema-basic"; // eslint-disable-line
// import mySchema from '@/basic-schema'; // eslint-disable-line
import {
  collab, // eslint-disable-line
  receiveTransaction, // eslint-disable-line
  sendableSteps, // eslint-disable-line
  getVersion // eslint-disable-line
} from 'prosemirror-collab'

export default {
  data() {
    return {
      doc: undefined,
      state: undefined,
      view: undefined
    }
  },

  props: {
    schema: { type: Object, required: true }
  },

  mounted() {
    // this.doc = DOMParser.fromSchema(this.schema).parse(this.$refs.content)
    this.state = EditorState.create({
      // doc: this.doc,
      schema: this.schema,
      plugins: [collab()]
    })

    this.view = new EditorView(this.$refs.editor, {
      state: this.state,
      dispatchTransaction: this.dispatchTransaction
    })
  },

  methods: {
    dispatchTransaction(transaction) {
      this.state = this.state.apply(transaction)
      this.view.updateState(this.state)

      let sendable = sendableSteps(this.state)

      if (!sendable) return

      this.$emit(
        'receiveSteps',
        sendable.version,
        sendable.steps,
        sendable.clientID
      )
    },

    updateDoc() {
      let newData = this.$parent.stepsSince(getVersion(this.state))

      const transaction = receiveTransaction(
        this.state,
        newData.steps,
        newData.clientIDs
      )

      this.view.dispatch(transaction)
    }
  }
}
</script>
