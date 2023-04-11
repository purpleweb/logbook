import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { createLog, fetchLog, LogCreate } from "../utils/api";
import React, { useState } from "react";
import { toast } from "react-toastify";

export function InterventionForm({title, subtitle, id}: {title: string, subtitle: string, id?: number}) {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<LogCreate>(
    id ?
      {defaultValues: async () => fetchLog(id)}
      :
      {}
  )

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)

  const mutation = useMutation({
    mutationFn: createLog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      navigate("/", {state: {id: data.id}});
      toast.success("Intervention created", {position: "bottom-center"});
    },
    onError: () => {
      setIsError(true)
    },
  });

  const onSubmit: SubmitHandler<LogCreate> = (data) => {
    mutation.mutate(data);
  };

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
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
              <input
                {...register("date", {
                  required: "Date is required",
                  pattern: {
                    value: /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
                    message: "Date is not valid, format = yyyy-mm-dd",
                  },
                })}
                className={errors.date ? "input is-danger" : "input"}
                type="text"
                placeholder="2020-12-31"
              />
            </div>
            <p className="help is-danger">{errors.date?.message}</p>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Km
            </label>
            <div className="control">
              <input
                {...register("km", {
                  required: "Km is required",
                  pattern: { value: /[0-9]+/, message: "Not a valid number" },
                })}
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
                {...register("operations", {
                  required: "Operations are required",
                })}
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
              <input
                {...register("cost", { required: "Cost is required" })}
                className={errors.cost ? "input is-danger" : "input"}
                type="text"
                placeholder="150"
              />
            </div>
            <p className="help is-danger">{errors.cost?.message}</p>
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
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light" onClick={goBack}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </section>

      {isError && (
        <article className="message is-danger">
          <div className="message-body">
            An error have occured. Unable to post data.
          </div>
        </article>
      )}
    </>
  );
}