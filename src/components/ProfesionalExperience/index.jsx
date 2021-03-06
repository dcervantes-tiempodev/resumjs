import React from 'react';
import './ProfesionalExperience.css';

function ProfesionalExperience () {
  const [list, setList] = React.useState(JSON.parse(localStorage.getItem('tiempodev-resume-experience')) || []);

  React.useEffect(() => {
    localStorage.setItem('tiempodev-resume-experience', JSON.stringify(list));
  });

  function AddJobExperience() {
    const nextId = (list.length > 0) ? list[list.length-1].id + 1 : 0;
    const [formData, updateFormData] = React.useState({
      id: nextId,
      company: "",
      location: "",
      position: "",
      start: "",
      end: "",
      exp: "",
      tech: ""
    });
    const [isAdding, setAdding] = React.useState(false);

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
          <div className="experience-form m">
            <div className="experience-form">
              <div className="experience-form-input">
                <label>Start Date</label>
                <input className="content bold" type="text" name="start" onChange={handleChange} placeholder="e.g. November 2019" />
              </div>
              <div className="experience-form-text">-</div>
              <div className="experience-form-input">
                <label>End Date</label>
                <input className="content bold" type="text" name="end" onChange={handleChange} placeholder="Current" />
              </div>
            </div>
            <div className="experience-form-text"></div>
            <div className="experience-form-input">
              <label>Company Name</label>
              <input className="content bold" type="text" name="company" onChange={handleChange} placeholder="Tiempo Development" />
            </div>
            <div className="experience-form-text"></div>
            <div className="experience-form-input">
              <label>Company Location</label>
              <input className="content bold" type="text" name="location" onChange={handleChange} placeholder="Guadalajara, Jalisco, MX" />
            </div>
          </div>
          <div className="experience-form">
            <div className="experience-form-input">
              <label>Position</label>
              <input className="content bold" type="text" name="position" onChange={handleChange} placeholder="Software Engineer II" />
            </div>
          </div>
          <div className="experience-form-sub">
            <div className="experience-form-input">
              <label>Experience</label>
              <textarea
                rows="5"
                className="content"
                name="exp"
                onChange={handleChange}
                placeholder={'Bootcamp on Python for data science. \nProgramming for the Web with JavaScript. \nAlgorithm Design and Analysis.'}
                />
            </div>
          </div>
          <div className="experience-form-sub">
            <div className="experience-form-input">
              <label>Used Technologies</label>
              <input type="text" className="content" name="tech" onChange={handleChange} placeholder="Python3, Flask, Jupyter Notebook, Pandas, JavaScript, React." />
            </div>
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
              <div className="content eg">
                <div className="row bold">
                  <div className="col">e.g. November 2019 - Current</div>
                  <div className="col-p">Tiempo Development</div>
                  <div className="col align-right">Guadalajara, Jalisco, MX</div>
                </div>
                <div><b>Software Engineer II</b></div>
                <ul>
                  <li>Bootcamp on Python for data science.</li>
                  <li>Programming for the Web with JavaScript.</li>
                  <li>Algorithm Design and Analysis.</li>
                  <li><b>Used Technologies:</b> Python3, Flask, Jupyter Notebook, Pandas, JavaScript, React.</li>
                </ul>
              </div>
              <p><button className="add" type="text">ADD EXPERIENCE</button></p>
            </div>
            :
            <p><button className="add" type="text" onClick={toggleAdding}>ADD EXPERIENCE</button></p>
          }
        </React.Fragment>
      )
    }
  }
  function EditJobExperience({ experience }) {
    const [isEditing, setEditing] = React.useState(false);
    const [formData, updateFormData] = React.useState({
      id: experience.id,
      start: experience.start,
      end: experience.end,
      company: experience.company,
      location: experience.location,
      position: experience.position,
      exp: experience.exp,
      tech: experience.tech
    });

    function toggleEditing(){
      setEditing( !isEditing );
    }
    function cancelEditing() {
      updateFormData({
        id: experience.id,
        start: experience.start,
        end: experience.end,
        company: experience.company,
        location: experience.location,
        position: experience.position,
        exp: experience.exp,
        tech: experience.tech
      })
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
          if(item.id === experience.id) {
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
          <div className="experience-form m">
            <div className="experience-form">
              <div className="experience-form-input">
                <label>Start Date</label>
                <input className="content bold" type="text" name="start" value={formData.start} onChange={handleEditing} placeholder="e.g. November 2019" />
              </div>
              <div className="experience-form-text">-</div>
              <div className="experience-form-input">
                <label>End Date</label>
                <input className="content bold" type="text" name="end" value={formData.end} onChange={handleEditing} placeholder="Current" />
              </div>
            </div>
            <div className="experience-form-text"></div>
            <div className="experience-form-input">
              <label>Company Name</label>
              <input className="content bold" type="text" name="company" value={formData.company} onChange={handleEditing} placeholder="Tiempo Development" />
            </div>
            <div className="experience-form-text"></div>
            <div className="experience-form-input">
              <label>Company Location</label>
              <input className="content bold" type="text" name="location" value={formData.location} onChange={handleEditing} placeholder="Guadalajara, Jalisco, MX" />
            </div>
          </div>
          <div className="experience-form">
            <div className="experience-form-input">
              <label>Position</label>
              <input className="content bold" type="text" name="position" value={formData.position} onChange={handleEditing} placeholder="Software Engineer II" />
            </div>
          </div>
          <div className="experience-form-sub">
            <div className="experience-form-input">
              <label>Experience</label>
              <textarea rows="5" className="content" name="exp" value={formData.exp} onChange={handleEditing} placeholder={'Bootcamp on Python for data science. \nProgramming for the Web with JavaScript. \nAlgorithm Design and Analysis.'}/>
            </div>
          </div>
          <div className="experience-form-sub">
            <div className="experience-form-input">
              <label>Used Technologies</label>
              <input type="text" className="content" name="tech" value={formData.tech} onChange={handleEditing} placeholder="Python3, Flask, Jupyter Notebook, Pandas, JavaScript, React." />
            </div>
          </div>
          <button className="save" type="submit" onClick={handleSubmit}>SAVE</button>
          <button className="cancel" type="reset" onClick={cancelEditing}>CANCEL</button>
        </form>
      )
    }
    else {
      let experiencelist = experience.exp.split('\n').map((value, key) => {
        if(value === '') {
          return (<p key={key}></p>);
        } else {
          return (<li key={key}>{value}</li>);
        }
       });
      return (
        <button className="content" type="button" onClick={toggleEditing}>
          <div className="row bold">
            <div className="col">{experience.start} - {experience.end}</div>
            <div className="col-p">{experience.company}</div>
            <div className="col align-right">{experience.location}</div>
          </div>
          <div><b>{experience.position}</b></div>
          <ul>
            {experiencelist}
            <li className={(experience.tech==''?"empty eg":"")} ><b>Used Technologies:</b> {experience.tech?experience.tech:'e.g. JavaScript, .NET, PHP, AWS'}</li>
          </ul>
        </button>
      )
    }
  }
  function RemoveJobExperience({ id }) {
    function handleRemove() {
      setList(list.filter(item => item.id !== id));
    }
    return (
      <button className="remove" type="button" onClick={handleRemove}>&times;</button>
    )
  }

  return (
    <div className={"row m" + (list.length>0?"":" empty")} >
      <div className="col-title">
        <h4>Professional Experience</h4>
      </div>
      <div className="col-detail">
        <div className="editable-container">
          {list.map(experience => (
            <div className="editable-content m" key={experience.id}>
              <RemoveJobExperience id={experience.id} />
              <EditJobExperience experience={experience} />
            </div>
          ))}
        </div>
        <AddJobExperience />
      </div>
    </div>
  );
}

export default ProfesionalExperience;
