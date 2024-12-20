import { Extension } from '@tiptap/react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lintHeight: {
      setLintHeight: (lineHeight: string) => ReturnType;
    };
    unsetLintHeight: () => ReturnType;
  }
}

export const LintHeightExtension = Extension.create({
  name: 'lintHeight',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: 'normal'
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: element => element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {};
              }
              return { style: `line-height: ${attributes.lineHeight}` };
            }
          }
        }
      }
    ];
  },

  addCommands() {
    return {
      setLintHeight: (lineHeight: string) => ({ tr, state, dispatch }) => {
        const { selection } = state;
        const { from, to } = selection;

        state.doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            tr = tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              lineHeight
            });
          }
        });

        if (dispatch) {
          dispatch(tr);
        }

        return true;
        },
        
        // WTF
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        unsetLintHeight: () => ({ tr, state, dispatch }: { tr: any; state: any; dispatch: any }) => {
          const { selection } = state;
          const { from, to } = selection;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.doc.nodesBetween(from, to, (node: any, pos: any) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight
              });
            }
          });

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        }
    };
  }

});
