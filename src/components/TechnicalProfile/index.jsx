import React from 'react';
import TechSummary from './TechSummary';
import './TechnicalProfile.css';

function TechnicalProfile() {
  const [list, setList] = React.useState(JSON.parse(localStorage.getItem('tiempodev-resume-tech')) || []);

  React.useEffect(() => {
    localStorage.setItem('tiempodev-resume-tech', JSON.stringify(list));
  });

  function AddTech() {
    const nextId = (list.length > 0) ? list[list.length-1].id + 1 : 0;
    const [isAdding, setAdding] = React.useState(false);
    const [formData, updateFormData] = React.useState({ id: nextId, tech: "" });

    function toggleAdding() {
      setAdding(!isAdding);
    }

    function handleChange(e) {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
    }

    function handleSubmit(e) {
      e.preventDefault();
      setList(list.concat(formData));
      setAdding(!isAdding);
    }

    if(isAdding) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="profile-form-input">
            <label htmlFor="addTech">Technical item</label>
            <textarea rows="2" className="content" id="addTech" name="tech" onChange={handleChange} placeholder="e.g. Software Engineer with 10+ years of experience in software development specializing in web applications, mostly in the client side along JavaScript libraries."/>
          </div>
          <button className="save" type="submit" onClick={handleSubmit}>SAVE</button>
          <button className="cancel" type="reset" onClick={toggleAdding}>CANCEL</button>
        </form>
      )
    }
    else {
      return (
        <React.Fragment>
          { list.length === 0 ?
            <div onClick={toggleAdding}>
              <div className="content eg">e.g. Software Engineer with 10+ years of experience in software development specializing in web applications, mostly in the client side along JavaScript libraries.</div>
              <button className="add" type="button">ADD PROFILE ITEM</button>
            </div>
            :
            <button className="add" type="button" onClick={toggleAdding}>ADD PROFILE ITEM</button>
          }
        </React.Fragment>
      )
    }
  }

  function EditTech({ tech }) {
    const [isEditing, setEditing] = React.useState(false);
    const [formData, updateFormData] = React.useState({ id: tech.id, tech: tech.tech });

    function toggleEditing() {
      setEditing(!isEditing);
    }

    function cancelEditing() {
      updateFormData({ id: tech.id, tech: tech.tech })
      setEditing(!isEditing);
    }

    function handleEditing(e) {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    function handleSubmit(e) {
      e.preventDefault();
      setList(
        list.map(item => {
          if(item.id === tech.id) {
            return formData;
          }
          else {
            return item;
          }
        })
      )
    }

    if(isEditing) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="profile-form-input">
            <label htmlFor="editTech">Technical item</label>
            <textarea rows="2" className="content" id="editTech" name="tech" value={formData.tech} onChange={handleEditing} />
          </div>
          <button className="save" type="submit" onClick={handleSubmit}>SAVE</button>
          <button className="cancel" type="reset" onClick={cancelEditing}>CANCEL</button>
        </form>
      )
    }
    else {
      return (
        <button className="content" type="button" onClick={toggleEditing}>{tech.tech}</button>
      )
    }
  }

  function RemoveTech({ id }) {
    function handleRemove() {
      setList(list.filter(item => item.id !== id));
    }
    return (
      <button className="remove" type="button" onClick={handleRemove}>&times;</button>
    )
  }

  return (
    <div className={"row" + (list.length>0?"":" empty")} >
      <div className="col-title">
        <h4>Technical Profile</h4>
      </div>
      <div className="col-detail">
        <ul className="editable-container">
          {list.map(tech => (
            <li className={"editable-content" + (list.length>0?"":" eg empty")} key={tech.id}>
              <RemoveTech id={tech.id} />
              <EditTech tech={tech} />
            </li>
          ))}
          <li className="add-content">
            <AddTech />
          </li>
        </ul>
        <TechSummary />
      </div>
    </div>
  );
}

export default TechnicalProfile;
