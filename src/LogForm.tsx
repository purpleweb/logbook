import { useNavigate } from "react-router-dom";
import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export function LogForm() {
  const [date, setDate] = useState<Date>(new Date())

  const navigate = useNavigate()
  const title: string = "New Entry";
  const subtitle: string =
    "Your can use this form to add as many entries as you want in your book log.";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </section>
      <section>
        <div className="field">
          <label htmlFor="" className="label">
            Date
          </label>
          <div className="control">
            <DatePicker className="input" selected={date} onChange={(date: Date) => setDate(date)} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Km
          </label>
          <div className="control">
            <input className="input" type="text" placeholder="125 234" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Opération(s)
          </label>
          <div className="control">
            <input className="input" type="text" placeholder="Vidange" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Cost
          </label>
          <div className="control">
            <input className="input" type="text" placeholder="150" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Garage
          </label>
          <div className="control">
            <input className="input" type="text" placeholder="Garage de la mairie" />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={goBack}>Cancel</button>
          </div>
        </div>
      </section>
    </>
  );
}
