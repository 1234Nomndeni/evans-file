import { useState } from "react"
import AddHashTags, { SelectOption } from "./AddHashTags"

const options = [
    { label: "Software", value: 1},
    { label: "Javascript", value: 2},
    { label: "TypeScript", value: 3},
    { label: "Python", value: 4},
    { label: "Help", value: 5},
    { label: "Ask", value: 6},
    { label: "Appriciate", value: 7},
    { label: "General", value: 8},

]
const TagsOptions = () => {
    const [value, setValue] = useState<SelectOption[]>([options[0]])
    // const [value, setValue] = useState<SelectOption | undefined>(options[0])
  return (
    <AddHashTags multiple options={options} value={value} onChange={(opt) => setValue(opt)}/>
  )
}

export default TagsOptions