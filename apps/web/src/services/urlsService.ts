import { AxiosPromise } from "axios";
import { UrlMutateSchema } from "../schemas/urlMutateSchema";
import api from "./api";

type PostUrlOptions = {
    data: UrlMutateSchema;
};

export const postUrl = async ({ data }: PostUrlOptions): AxiosPromise<void> => {
    const response = await api.post<void, UrlMutateSchema>("/", data);
    return response;
};

