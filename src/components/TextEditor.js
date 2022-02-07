import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import * as Icons from 'images/icons';

import { Remarkable } from 'remarkable';
// import TextEditor from './components/TextEditor';

const md = new Remarkable()


const TextEditor = () => {
    const [text, setText] = useState("")


    const [editorState] = useState("");
    // const [text, setText] = useState("")



    return (
        <div className="b w-7/12 mx-auto h-auto mb-12">

            <main className="items-center p-5  justify-items-center">
                <h1 className="text-center">Markdown Editor</h1>
                <article>
                    <label htmlFor="markdown"></label>

                    <textarea name="textarea" id="markdown" cols="30" rows="10" placeholder="Type message" value={text} onChange={(e) => setText(e.target.value)} >

                    </textarea>

                    <h3>Output</h3>
                    <div className="bg-gray-700 rounded-full prose" dangerouslySetInnerHTML={{ __html: md.render(text) }} >

                    </div>
                </article>
            </main>

            <div className="mb-12 border-2 p-3">

                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName text-3xl"
                    value={editorState}
                    // onChange={(e) => setText(e.target.value)}
                    id="markdown"
                    placeholder="Start your blog"
                // value={text}
                // toolbar={{
                //     options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],


                //     emoji: {
                //         icon: emoji,
                //         className: undefined,
                //         component: undefined,
                //         popupClassName: undefined,
                //         emojis: [
                //             '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                //             '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                //             '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                //             '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
                //             '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                //             '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                //             '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                //             '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                //             '✅', '❎', '💯',
                //         ],
                //     },
                // }}
                // onChange={(e) => setText(e.target.value)}
                />;




            </div>
            {/* <textarea
                disabled
                value={editorState}
            /> */}
        </div>
    )
}

export default TextEditor
