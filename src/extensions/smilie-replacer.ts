import { Extension, textInputRule } from '@tiptap/core'

export const SmilieReplacer = Extension.create({
  name: 'smilieReplacer',

  addInputRules() {
    return [
      textInputRule({ find: /hh $/, replace: '🌚' }),
      textInputRule({ find: /\/help $/, replace: 'adsdasdsadsadsaadkjaskjdasjdjlasjkdjklajsljdkajsjdlaskldjaksdjlsadjlasjdldkjsaldjklsajdlsajldkjk' }),
    ]
  },
})
