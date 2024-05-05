import axios from "axios";

(BigInt.prototype as any).toJSON = function (): string {
  return `BigInt::` + this.toString();
};
let w = (typeof window !== "undefined" ? window : null) as any;
let g = (typeof global !== "undefined" ? global : undefined) as any;

export const fetchViaProxy = async (
  target_url: string,
  data?: any,
  _headers?: any
) => {
  const headers = { ..._headers };

  let body = null as any;
  let isFile = false;
  let uploadProgress = null as any;

  const files: File[] = [];
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item instanceof File) {
        files.push(item);
        isFile = true;
      }
      if (typeof item === "function") {
        uploadProgress = item;
      }
    }
  } else if (data instanceof File) {
    isFile = true;
    files.push(data);
  }

  if (!isFile) {
    body = JSON.stringify(data);
    headers["content-type"] = "aplication/json";
  } else {
    const fd = new FormData();
    for (const file of files) {
      fd.append(file.name, file);
    }
    body = fd;
    delete headers["content-type"];
    headers["enctype"] = `multipart/form-data;`;
  }

  const to_url = new URL(target_url);

  if (w !== null) {
    const cur_url = new URL(location.href);
    let final_url = "";

    if (
      to_url.host === cur_url.host ||
      (!!g && typeof g.server_hook === "function")
    ) {
      final_url = to_url.toString();
    } else {
      final_url = `${cur_url.protocol}//${
        cur_url.host
      }/_proxy/${encodeURIComponent(to_url.toString())}`;
    }

    if (final_url) {
      if (uploadProgress) {
        const res = await axios({
          method: data ? "post" : undefined,
          url: final_url,
          data: body,
          onUploadProgress: uploadProgress,
        });

        return res.data;
      } else {
        const res = await fetch(
          final_url,
          data
            ? {
                method: "POST",
                body,
                headers,
              }
            : undefined
        );
        const raw = await res.text();
        try {
          return JSON.parse(raw, replacer);
        } catch (e) {
          return raw;
        }
      }
    }
  }

  const res = await fetch(
    to_url,
    data
      ? {
          method: "POST",
          body,
          headers,
        }
      : undefined
  );
  const raw = await res.text();
  try {
    return JSON.parse(raw, replacer);
  } catch (e) {
    return raw;
  }
};

const replacer = (key: string, value: string) => {
  if (typeof value === "string" && value.startsWith("BigInt::")) {
    return BigInt(value.substring(8));
  }
  return value;
};
