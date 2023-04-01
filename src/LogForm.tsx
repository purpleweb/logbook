import { useNavigate } from "react-router-dom";
import { useState, forwardRef, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  date: string
  km: number
  operations: string
  cost: number
  garage: string
}

export function LogForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(errors)

  const navigate = useNavigate();
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
        <form name="newlog" id="newlog" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label htmlFor="" className="label">
              Date
            </label>
            <div className="control">
              <input {...register("date")} className="input" type="text" placeholder="" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Km
            </label>
            <div className="control">
              <input
                {...register("km", { required: "This field is mandatory", pattern: {value: /[0-9]+/, message: "Valid number required"} })}
                className={errors.km ? "input is-danger" : "input"}
                type="text"
                placeholder="125 234"
              />
            </div>
            <p className="help is-danger">{errors.km?.message}</p>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Opération(s)
            </label>
            <div className="control">
              <input
                {...register("operations", { required: "Operations are mandatory" })}
                className={errors.operations ? "input is-danger" : "input"}
                type="text"
                placeholder="Vidange"
              />
            </div>
            <p className="help is-danger">{errors.operations?.message}</p>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Cost
            </label>
            <div className="control">
              <input {...register("cost")} className="input" type="text" placeholder="150" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Garage
            </label>
            <div className="control">
              <input
                {...register("garage")}
                className="input"
                type="text"
                placeholder="Garage de la mairie"
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" >Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light" onClick={goBack}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
