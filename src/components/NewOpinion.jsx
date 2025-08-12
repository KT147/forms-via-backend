import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {

  const {addOpinion} = use(OpinionsContext);

  // await jaoks on vaja async
  async function shareOpinionAction(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (userName.length === 0|| title.length === 0 || body.length === 0) {
      errors.push("Please fill all inputs")
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({ title, body, userName })
    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        {formState.errors && <p className="errors">{formState.errors}</p>}

      <Submit />
      </form>
    </div>
  );
}
