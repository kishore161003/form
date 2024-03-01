import { signUpSchema } from "../../../../lib/types";

export const POST = async (req: Request) => {
  const data = await req.json();
  const result = signUpSchema.safeParse(data);
  console.log(result);
  let zodErrors = {};

  //   if there are errors in the response, we can address each issues by error.issues
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      console.log(issue, "iss");
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }
  return Response.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { message: "Success" }
  );
};
