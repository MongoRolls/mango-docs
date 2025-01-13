import { Extension, textInputRule } from '@tiptap/core'

export const SmilieReplacer = Extension.create({
  name: 'smilieReplacer',

  addInputRules() {
    return [
      textInputRule({ find: /hh $/, replace: '🌚' }),
      textInputRule({ find: /\/help $/, replace: '🤔' }),
      textInputRule({ find: /红神 $/, replace: '🔥 🌟 小黑盒,快手' }),
    ]
  },
})
