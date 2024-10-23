import { ref } from "vue";
import apiClient from "../apiClient.js";

export default function () {
    const products = ref([]);
    const product = ref();
    const error = ref();
    const statusCode = ref();

    const loading = ref(false);
    const isLoading = ref(false);

    const getProducts = async () => {
        isLoading.value = true;

        await apiClient
            .get("products")
            .then(({ data, status, code }) => {
                statusCode.value = status;
                // products.value = data.data;
                if (status == 200) {
                    if (data?.status == 200) {
                        products.value = data.data;
                    }
                } else if (code == 500) {
                    error.value = code;
                    // console.log(code);
                } else if (code == 401) {
                    error.value = code;
                    // console.log(code);
                } else if (code == 404) {
                    error.value = code;
                    // console.log(code);
                }
                isLoading.value = false;
                // loading.value = false;
            })
            .catch((e) => {
                // console.log({ e: e });
                error.value = e;
                statusCode.value = e?.response?.status;
            })
            .finally(() => {
                isLoading.value = false;
                // loading.value = false;
            });
    };

    const postProduct = async (postedData) => {
        loading.value = true;
        const formData = new FormData();

        formData.append(
            "business_sector_id",
            parseInt(postedData.business_sector_id)
        );

        console.log(postedData);

        formData.append("title", postedData.title);
        formData.append("description", postedData.description);
        formData.append("start_date", postedData.start_date); // Remplacez `file` par le fichier que vous souhaitez start_date
        formData.append("end_date", postedData.end_date);
        formData.append("status", postedData.status);
        formData.append("budget", postedData.budget);
        // formData.append("priority", postedData.priority);
        formData.append("customer_id", postedData.customer_id ?? 1);
        formData.append("user_id", postedData.user_id);
        // formData.append("team_members", postedData.team_members);
        formData.append("progress", postedData.progress);
        formData.append("cover", postedData.cover);
        // formData.append("attachments", postedData.attachments);
        // formData.append("investment_closure", postedData.investment_closure);
        await apiClient
            .post("products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data, status, code }) => {
                if (status == 200) {
                    if (data?.status == 200) {
                        Products.value.push(data.data);
                        statusCode.value = status;
                        console.log({ result: data.data });
                    }
                } else if (code == 500) {
                    console.log({ code: code });
                } else if (code == 401) {
                    console.log({ code: code });
                    statusCode.value = code;
                } else if (code == 404) {
                    console.log({ code: code });
                }
                isLoading.value = false;
                loading.value = false;
            })
            .catch((e) => {
                error.value = e;
                console.log({ error: e });
                statusCode.value = e.response.status;
            })
            .finally(() => {
                loading.value = false;
            });
    };

    const updateProducts = async (postedData) => {
        loading.value = true;
        console.log({ postedData: postedData });

        await axios
            .put(`Products/${postedData.id}`, postedData)
            .then(({ data, status, code }) => {
                if (status == 200) {
                    if (data?.status == 200) {
                        Product.value.push(data.data);
                        console.log({ result: data.data });
                    }
                } else if (code == 500) {
                    console.log({ code: code });
                } else if (code == 401) {
                    statusCode.value = 401;
                    console.log({ code: code });
                } else if (code == 404) {
                    console.log({ code: code });
                }
                isLoading.value = false;
                loading.value = false;
            })
            .catch((e) => {
                console.log({ error: e });
            })
            .finally(() => {
                loading.value = false;
            });
        s;
    };

    const showProduct = async (slug) => {
        loading.value = true;

        await apiClient
            .get(`Products/${slug}`)
            .then(({ data, status, code }) => {
                if (status == 200) {
                    if (data?.status == 200) {
                        Product.value = data.data;
                        console.log({ result: data.data });
                    }
                } else if (code == 500) {
                    console.log({ code: code });
                } else if (code == 401) {
                    console.log({ code: code });
                } else if (code == 404) {
                    console.log({ code: code });
                }
                isLoading.value = false;
                loading.value = false;
            })
            .catch((e) => {
                console.log({ error: e });
            })
            .finally(() => {
                loading.value = false;
            });
    };

    return {
        error,
        products,
        loading,
        isLoading,
        product,
        getProducts,
        postProduct,
        updateProducts,
        showProduct,
        statusCode
    };
}
