import { useState } from "react";
import "./App.css";

const INITIAL_STATE = {
  fullName: "",
  address: "",
  phone: "",
  email: "",
  complaint: "",
  contact : "",
  consent : false,
  
  
}

export default function App() {
  const [form, setForm] = useState(INITIAL_STATE);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(form);
    fetch("http://localhost:3000", {
      method: "POST",
      headers: { "content-type" : "application/json" },
      body: JSON.stringify(form),
    })

    setForm(INITIAL_STATE);
    console.log(form);
  }

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === "checkbox") {
      setForm({...form, [name] : checked})
    }else {
      setForm({...form, [name] : value})
    }
    console.log(form);
  }



  //TODO: Add your state fields here

  return (
    <>
      <form className="form">
        <h2>Complaining form!</h2>
        <div className="form__section-left">
          <label>
            Full name
            <input 
            onChange={(e) => handleChange(e)}
            value={form.fullName}
            type="text"
            name="fullName"
            required />
          </label>
          <label>
            Address
            <input 
            onChange={(e) => handleChange(e)}
            value={form.address}
            type="text" name="address" />
          </label>
          <label>
            Phone Number
            <input
            onChange={(e) => handleChange(e)}
            value={form.phone}
            type="tel" name="phone" />
          </label>

          <label>
            Email
            <input
            onClick={(e) => handleChange(e)}
            type="email" name="email" />
          </label>
        </div>

        <div className="form__section-right">
          <label>
            Write your complaint
            <textarea
            onChange={(e) => handleChange(e)}
            value={form.complaint}
              name="complaint"
              rows="10"
              placeholder="You can complain here"
            ></textarea>
          </label>

          <div className="form__radio-group">
            <p>How do you want to be contacted? </p>
            <label>
              <input 
              onChange={(e) => handleChange(e)}
              type="radio" name="contact" value="phone"
              checked= {form.contact === "phone"}
              />
              Phone
            </label>

            <label>
              <input 
              onChange={(e) => handleChange(e)}
              checked = {form.contact === "email"}
              type="radio" name="contact" value="email" />
              Email
            </label>

            <label>
              <input 
              onChange={(e) => handleChange(e)}
              checked = {form.contact === "post"}
              type="radio" name="contact" value="post" />
              Slow Mail
            </label>

            <label>
              <input 
              onChange={(e) => handleChange(e)}
              checked = {form.contact === "none"}
              type="radio" name="contact" value="none" />
              No contact!
            </label>
          </div>

          <label>
            I agree you take my data, and do whatever
            <input 
            onChange={(e) => handleChange(e)}
            checked= {form.consent}
            type="checkbox" name="consent" id="consent" />
          </label>
        </div>
        <input type="submit" value="Submit!" />
      </form>
    </>
  );
}
