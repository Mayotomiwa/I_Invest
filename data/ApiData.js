import axios from "axios";

const cache  = {};

export const fetchUser = async () => {
    if (cache["https://my.api.mockaroo.com/mock_api"]) {
        return cache["https://my.api.mockaroo.com/mock_api"];
    } else {
        const res = await axios.get("https://my.api.mockaroo.com/mock_api", {
            headers: {
                'X-API-Key': 'aa5e79b0'
            }
        }); // fetch User Data
        cache["https://my.api.mockaroo.com/mock_api"] = res.data;
        return res.data;
    }
};
