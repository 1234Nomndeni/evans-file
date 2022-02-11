import React, { useState } from 'react'

function QuillThree() {
    const [editorHtml, setEditorHtml] = useState("")
    const [ placeholder] = useSate("Write something....")

      constructor(props) {
    super(props);
    this.state = {
      editorHtml: "",
      theme: "snow",
      placeholder: "Write something..."
    };
    this.handleChange = this.handleChange.bind(this);
  }
  return (
    <div>QuillThree</div>
  )
}

export default QuillThree