import axios from "axios";

const dataUrl =
  "https://v6.exchangerate-api.com/v6/25db39558041378c50ec0774/latest";

export async function getInfo(currency = null) {
  try {
    const res = await axios.get(`${dataUrl}/${currency}`);
    let obj = {};
    if (currency === "USD") {
      obj = {
        UAH: res.data.conversion_rates.UAH,
        EUR: res.data.conversion_rates.EUR,
      };
    } else if (currency === "UAH") {
      obj = {
        USD: res.data.conversion_rates.USD,
        EUR: res.data.conversion_rates.EUR,
      };
    } else {
      obj = {
        USD: res.data.conversion_rates.USD,
        UAH: res.data.conversion_rates.UAH,
      };
    }
    if (Object.keys(obj).length > 0) return obj;

    return null;
  } catch (error) {
    throw new Error(error);
  }
}
