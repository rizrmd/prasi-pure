import { parseFile } from "@swc/core";

export const parseArgs = async (path: string) => {
  const res = await parseFile(path, { syntax: "typescript" });
  const args: string[] = [];
  for (const e of res.body) {
    if (
      e.type === "ExportDeclaration" &&
      e.declaration.type === "VariableDeclaration"
    ) {
      const declare = e.declaration.declarations[0];
      if (
        declare &&
        declare.type === "VariableDeclarator" &&
        declare.id.type === "Identifier" &&
        declare.id.value === "_" &&
        declare.init?.type === "ObjectExpression"
      ) {
        for (const prop of declare.init.properties) {
          if (prop.type === "MethodProperty") {
            for (const param of prop.params) {
              if (
                param.type === "Parameter" &&
                param.pat.type === "Identifier"
              ) {
                args.push(param.pat.value);
              }
            }
          }
        }
      }
    }
  }
  return args;
};
