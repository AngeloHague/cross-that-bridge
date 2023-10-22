import React from 'react'
import Overlay from '../Overlay'

const input_class_list = "my-3 py-2 px-4 rounded-xl text-black";

export default function AddProject({onSubmit}) {
    return (
        <Overlay title={"Add Project"}>
          <form className='px-8 mt-3' onSubmit={onSubmit}>
          <div className="flex flex-col justify-center">
            <input
              className={input_class_list}
              name="name"
              placeholder="Project title"
              label="Project Title"
              labelHidden
              variation="quiet"
              required
            />
            <textarea
              className={"h-40 " + input_class_list}
              name="description"
              placeholder="Description"
              label="Project Description"
              labelHidden
              variation="quiet"
              required
            />
            <button type="submit" variation="primary">
              Create Note
            </button>
          </div>
        </form>
        </Overlay>
    )
}
