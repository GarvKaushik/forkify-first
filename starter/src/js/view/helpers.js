import { async } from 'regenerator-runtime';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchpro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchpro, timeout(10)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getjson = async function (url) {};

// export const sendjson = async function (url, uploadData) {
//   try {
//     const res = await Promise.race([fetchpro, timeout(10)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message}(${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
