import React, { Component } from 'react'
import ReactQuill from "react-quill";

export default class QuillTest extends Component {
  // const [editorHtml, setEditorHtml] = useState()

  
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: "",
      theme: "snow",
      placeholder: "Write something..."
    };
    this.handleChange = this.handleChange.bind(this);
  }

   handleChange(html) {
    console.log(html);
    this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }


  render() {
    return (
      <div className='mt-44'> 
      <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={ QuillTest.modules}
          formats={ QuillTest.formats}
          bounds={".app"}
          placeholder={this.state.placeholder}
        />
      </div>
    )
  }
}

 QuillTest.modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ header: [1, 2, 3, false] }],

    ["link", "image", "formula"],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["clean"] // remove formatting button
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}

// export default  QuillTest;
