import { Schema } from 'prosemirror-model'

const nodes = {
  doc: {
    // content: 'block+'
    content: 'text*'
  },

  text: {}
}

export default new Schema({ nodes })
