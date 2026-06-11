import { useActionState, type FC } from "react";

type Response = { prev: string; name: string; error: string };

const Form: FC = () => {
  const [response, action, isLoading] = useActionState(
    async (prevResponse: Response, formData: FormData) => {
      const name = formData.get("name");

      if (typeof name === "string" && name !== "") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { prev: name, name, error: "" };
      }

      return { prev: prevResponse.prev, name: "", error: "Error" };
    },
    { prev: "", name: "", error: "" },
  );

  return (
    <form action={action}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" defaultValue={response.name} />

      <br />
      <br />

      <button type="submit">{isLoading ? "Saving" : "Save"}</button>

      <br />
      <br />

      {response.error ? <p>Error: {response.error}</p> : null}
      {response.prev ? <p>Previous: {response.prev}</p> : null}
    </form>
  );
};

export default Form;
